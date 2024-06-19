<template>
<MkStickyContainer>
	<template #header>
		<MkPageHeader :actions="headerActions" :tabs="headerTabs"/>
	</template>
	<MkSpacer :contentMax="800">
		<div class="yweeujhr">
			<div class="buttons">
				<MkButton primary class="start" @click="start"><i class="ti ti-plus"></i> {{ i18n.ts.startMessaging }}</MkButton>
				<MkButton primary class="start" @click="gotoGroup"><i class="ti ti-users"></i> {{ i18n.ts.groups }}</MkButton>
			</div>

			<div v-if="messages.length > 0" class="history">
				<MkA
					v-for="(message, i) in messages"
					:key="message.id"
					v-anim="i"
					class="message _panel"
					:class="{ isMe: isMe(message), isRead: message.groupId ? message.reads.includes($i.id) : message.isRead }"
					:to="message.groupId ? `/my/messaging/group/${message.groupId}` : `/my/messaging/${getAcct(isMe(message) ? message.recipient : message.user)}`"
					:data-index="i"
				>
					<div>
						<MkAvatar class="avatar" :user="message.groupId ? message.user : isMe(message) ? message.recipient : message.user" indicator link preview/>
						<header v-if="message.groupId">
							<span class="name">{{ message.group.name }}</span>
							<MkTime :time="message.createdAt" class="time"/>
						</header>
						<header v-else>
							<span class="name"><MkUserName :user="isMe(message) ? message.recipient : message.user"/></span>
							<span class="username">@{{ acct(isMe(message) ? message.recipient : message.user) }}</span>
							<MkTime :time="message.createdAt" class="time"/>
						</header>
						<div class="body">
							<p class="text"><span v-if="isMe(message)" class="me">{{ i18n.ts.you }}:</span>{{ message.text }}</p>
						</div>
						<footer v-if="message.groupId">
							<div class="typeIcon">
								<i class="ti ti-users"/>
								{{ i18n.ts.groups }}
							</div>
						</footer>
						<footer v-else>
							<div class="typeIcon">
								<i class="ti ti-user"/>
								{{ i18n.ts.users }}
							</div>
						</footer>
					</div>
				</MkA>
			</div>
			<div v-if="!fetching && messages.length == 0" class="_fullinfo">
				<img src="https://xn--931a.moe/assets/info.jpg" class="_ghost"/>
				<div>{{ i18n.ts.noHistory }}</div>
			</div>
			<MkLoading v-if="fetching"/>
		</div>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { markRaw, onActivated, onDeactivated, onMounted, onUnmounted, ref, computed } from 'vue';
import * as Misskey from 'misskey-js';
import MkButton from '@/components/MkButton.vue';
import { acct } from '@/filters/user.js';
import * as os from '@/os.js';
import { useStream } from '@/stream.js';
import { useRouter } from '@/router/supplier.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { $i } from '@/account.js';
import { misskeyApi } from '@/scripts/misskey-api.js'

const router = useRouter();
let fetching = ref(true);
let messages = ref([]);
let connection: Misskey.ChannelConnection<Misskey.Channels['messages']>;
const getAcct = Misskey.acct.toString;
let isFirstLoad = ref(true);

function isMe(message) {
	return message.userId === $i.id;
}

function onMessage(message) {
	if (message.recipientId) {
		messages.value = messages.value.filter(m => !(
			(m.recipientId === message.recipientId && m.userId === message.userId) ||
				(m.recipientId === message.userId && m.userId === message.recipientId)));
		messages.value.unshift(message);
	} else if (message.groupId) {
		messages.value = messages.value.filter(m => m.groupId !== message.groupId);
		messages.value.unshift(message);
	}
}

function onRead(ids) {
	for (const id of ids) {
		const found = messages.value.find(m => m.id === id);
		if (found) {
			if (found.recipientId) {
				found.isRead = true;
			} else if (found.groupId) {
				found.reads.push($i.id);
			}
		}
	}
}

function gotoGroup() {
	router.push('/my/groups');
}

function start(ev) {
	os.popupMenu([{
		text: i18n.ts.messagingWithUser,
		icon: 'ti ti-user',
		action: () => { startUser(); },
	}, {
		text: i18n.ts.messagingWithGroup,
		icon: 'ti ti-users',
		action: () => { startGroup(); },
	}], ev.currentTarget ?? ev.target);
}

async function startUser() {
	os.selectUser().then(user => {
		router.push(`/my/messaging/${Misskey.acct.toString(user)}`);
	});
}

async function startGroup() {
	const groups1 = await misskeyApi('users/groups/owned');
	const groups2 = await misskeyApi('users/groups/joined');
	if (groups1.length === 0 && groups2.length === 0) {
		os.alert({
			type: 'warning',
			title: i18n.ts.youHaveNoGroups,
			text: i18n.ts.joinOrCreateGroup,
		});
		return;
	}
	const { canceled, result: group } = await os.select({
		title: i18n.ts.group,
		items: groups1.concat(groups2).map(group => ({
			value: group, text: group.name,
		})),
	});
	if (canceled) return;
	router.push(`/my/messaging/group/${group.id}`);
}

function attach() {
	console.debug('[chat index] attach');
	// @ts-ignore
	if (connection) connection.dispose();
	connection = markRaw(useStream().useChannel('messagingIndex'));
	connection.on('message', onMessage);
	connection.on('read', onRead);
	misskeyApi('messaging/history', { group: false, limit: 100 }).then(userMessages => {
		misskeyApi('messaging/history', { group: true, limit: 100 })
			.then((groupMessages) => {
				const _messages = userMessages.concat(groupMessages);
				_messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
				messages.value = _messages;
				fetching.value = false;
			})
			.finally(() => {
				isFirstLoad.value = false;
			});
	});
}

function detach() {
	console.debug('[chat index] detach');
	if (connection) connection.dispose();
}

onMounted(() => {
	attach();
});
onUnmounted(() => {
	detach();
});
onActivated(() => {
	if (isFirstLoad.value) return;
	attach();
});
onDeactivated(() => {
	detach();
});

const headerActions = computed(() => []);
const headerTabs = computed(() => []);
definePageMetadata({
	title: i18n.ts.messaging,
	icon: 'ti ti-messages',
});
</script>

<style lang="scss" scoped>
.yweeujhr {
	> .buttons {
		display: flex;
		justify-content: center;
		margin: var(--margin) 0;
		gap: var(--margin);
	}

	> .start {
		margin: 0 auto var(--margin) auto;
	}
	> .history {
		> .message {
			display: block;
			text-decoration: none;
			margin-bottom: var(--margin);
			* {
				pointer-events: none;
				user-select: none;
			}
			&:hover {
				.avatar {
					filter: saturate(200%);
				}
			}
			&:active {
			}
			&.isRead,
			&.isMe {
				opacity: 0.8;
			}
			&:not(.isMe):not(.isRead) {
				> div {
					background-image: url("/client-assets/unread.svg");
					background-repeat: no-repeat;
					background-position: 0 center;
				}
			}
			&:after {
				content: "";
				display: block;
				clear: both;
			}
			> div {
				padding: 20px 30px;
				&:after {
					content: "";
					display: block;
					clear: both;
				}
				> header {
					display: flex;
					align-items: center;
					margin-bottom: 2px;
					white-space: nowrap;
					overflow: hidden;

					> .name {
						margin: 0;
						padding: 0;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 1em;
						font-weight: bold;
						transition: all 0.1s ease;
					}
					> .username {
						margin: 0 8px;
					}
					> .time {
						margin-left: auto;
					}
				}
				> .avatar {
					float: left;
					width: 54px;
					height: 54px;
					margin: 0 16px 0 0;
					border-radius: 8px;
					transition: all 0.1s ease;
				}
				> .body {
					> .text {
						display: block;
						margin: 0 0 0 0;
						padding: 0;
						overflow: hidden;
						overflow-wrap: break-word;
						font-size: 1.1em;
						color: var(--faceText);
						.me {
							opacity: 0.7;
						}
					}
					> .image {
						display: block;
						max-width: 100%;
						max-height: 512px;
					}
				}
				> footer {
					display: flex;
					align-items: center;
					margin-top: 2px;
					white-space: nowrap;
					overflow: hidden;
					> .typeIcon {
						margin-left: auto;
					}
				}
			}
		}
	}
}
	@container (max-width: 400px) {
		.yweeujhr {
			> .history {
				> .message {
					&:not(.isMe):not(.isRead) {
						> div {
							background-image: none;
							border-left: solid 4px #3aa2dc;
						}
					}
					> div {
						padding: 16px;
						font-size: 0.9em;
						> .avatar {
							margin: 0 12px 0 0;
						}
					}
				}
			}
		}
	}
	</style>
