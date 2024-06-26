<template>
<MkStickyContainer>
	<template #header>
		<XPageHeader :onlineUserCount="onlineUserCount" :groupUsers="groupUsers" :groupId="props.groupId"/>
	</template>
	<div
		ref="rootEl"
		:class="$style.root"
		@dragover.prevent.stop="onDragover"
		@drop.prevent.stop="onDrop"
	>
		<div :class="$style.body">
			<XPagination v-if="pagination" ref="pagingComponent" :key="userAcct || groupId" :pagination="pagination">
				<template #empty>
					<div class="_fullinfo">
						<img src="https://xn--931a.moe/assets/info.jpg" class="_ghost"/>
						<div>{{ i18n.ts.noMessagesYet }}</div>
					</div>
				</template>
				<template #default="{ items: messages, fetching: pFetching }">
					<MkDateSeparatedList
						v-if="messages.length > 0"
						v-slot="{ item: message }"
						:class="{ [$style.messages]: true, 'deny-move-transition': pFetching }"
						:items="messages"
						direction="up"
						reversed
					>
						<XMessage :key="message.id" :message="message" :isGroup="group != null"/>
					</MkDateSeparatedList>
				</template>
			</XPagination>
		</div>
		<footer :class="$style.footer">
			<div v-if="typers.length > 0" :class="$style.typers">
				<I18n :src="i18n.ts.typingUsers" textTag="span">
					<template #users>
						<b v-for="typer in typers" :key="typer.id" :class="$style.user">{{ typer.username }}</b>
					</template>
				</I18n>
				<MkEllipsis/>
			</div>
			<Transition :name="animation ? 'fade' : ''">
				<div v-show="showIndicator" :class="$style.newMessage">
					<button class="_buttonPrimary" :class="$style.newMessageButton" @click="onIndicatorClick">
						<i class="fas ti-fw fa-arrow-circle-down" :class="$style.newMessageIcon"></i>{{ i18n.ts.newMessageExists }}
					</button>
				</div>
			</Transition>
			<XForm v-if="!fetching" ref="formEl" :user="user" :group="group" :class="$style.form"/>
		</footer>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { watch, onMounted, nextTick, onBeforeUnmount, shallowRef, ref, computed, Ref } from 'vue';
import * as Misskey from 'misskey-js';
import XMessage from './messaging-room.message.vue';
import XForm from './messaging-room.form.vue';
import XPageHeader from './messaging-room.header.vue';
import XPagination, { Paging } from './messaging-room.pagenation.vue';
import MkDateSeparatedList from '@/components/MkDateSeparatedList.vue';
import { isBottomVisible, onScrollBottom, scrollToBottom } from '@/scripts/scroll';
import * as os from '@/os';
import { useStream } from '@/stream';
import * as sound from '@/scripts/sound';
import { i18n } from '@/i18n';
import { $i } from '@/account';
import { defaultStore } from '@/store';
import { definePageMetadata } from '@/scripts/page-metadata';
import { misskeyApi } from '@/scripts/misskey-api';

const props = defineProps<{
		userAcct?: string;
		groupId?: string;
	}>();
let rootEl = shallowRef<HTMLDivElement | undefined>();
let formEl = shallowRef<InstanceType<typeof XForm>>();
let pagingComponent = shallowRef<InstanceType<typeof XPagination>>();
let fetching = ref(true);
let user: Misskey.entities.UserDetailed | null = null;
let typers: Misskey.entities.User[] = [];
let connection: Misskey.ChannelConnection<Misskey.Channels['messaging']> | null = null;
let showIndicator = ref(false);

let onlineUserCount = ref(0);
const groupUsers = ref<unknown[]>([]); // 初期化を追加
let group = ref<Misskey.entities.UserGroup | null>(null); // group を ref で初期化

console.log('group =', group.value);

const fetchGroupData = async () => {
	if (props.groupId) {
		try {
			const groupData = await misskeyApi('users/groups/show', {
				groupId: props.groupId,
			});
			group.value = groupData;
			console.log('Fetched group data =', group.value);
		} catch (error) {
			console.error('Error fetching group data:', error);
		}
	}
};

watch(
	() => group.value,
	async (newGroup) => {
		console.debug('Watch triggered, new group =', newGroup);
		if (!newGroup) {
			onlineUserCount.value = 0; // グループが存在しない場合はオンラインユーザー数を0に設定
			groupUsers.value = []; // ここもrefに対して操作
			console.debug('Group is null, setting onlineUserCount to 0 and clearing groupUsers.');
			return;
		}

		const userIds: string[] = newGroup.userIds;
		console.debug('Fetching user data for userIds =', userIds);

		const fetchedUsers = await Promise.all(
			userIds.map((userId) => {
				return misskeyApi('users/show', {
					userId: userId,
				});
			}),
		);

		console.debug('Fetched users =', fetchedUsers);

		groupUsers.value = fetchedUsers; // ここもrefに対して操作
		onlineUserCount.value = fetchedUsers.filter((fetchedUser) => fetchedUser.onlineStatus === 'online').length;
		console.log(`Online user count updated: ${onlineUserCount.value}`);
	},
	{ immediate: true } // 初期化時にも実行されるように設定
);

onMounted(() => {
	fetchGroupData();
});

const {
	animation,
} = defaultStore.reactiveState;
let pagination: Paging | null = null;
watch([() => props.userAcct, () => props.groupId], () => {
	if (connection) connection.dispose();
	fetch();
});

async function fetch() {
	fetching.value = true;
	if (props.userAcct) {
		const acct = Misskey.acct.parse(props.userAcct);
		user = await misskeyApi('users/show', { username: acct.username, host: acct.host || undefined });
		group = null;

		pagination = {
			endpoint: 'messaging/messages',
			limit: 100,
			params: {
				userId: user.id,
			},
			reversed: true,
			pageEl: rootEl.value,
		};
		connection = useStream().useChannel('messaging', {
			otherparty: user.id,
		});
	} else {
		user = null;
		group = await misskeyApi('users/groups/show', { groupId: props.groupId });
		pagination = {
			endpoint: 'messaging/messages',
			limit: 100,
			params: {
				groupId: group.id,
			},
			reversed: true,
			pageEl: rootEl.value,
		};
		connection = useStream().useChannel('messaging', {
			group: group.id,
		});
	}

	connection.on('message', onMessage);
	connection.on('read', onRead);
	connection.on('deleted', onDeleted);
	connection.on('typers', _typers => {
		typers = _typers.filter(u => u.id !== $i?.id);
	});
	document.addEventListener('visibilitychange', onVisibilitychange);
	nextTick(() => {
		pagingComponent.value?.reload().then(() => {
			thisScrollToBottom();
		});
		window.setTimeout(() => {
			fetching.value = false;
		}, 300);
	});
}

function onDragover(ev: DragEvent) {
	if (!ev.dataTransfer) return;
	const isFile = ev.dataTransfer.items[0].kind === 'file';
	const isDriveFile = ev.dataTransfer.types[0] === _DATA_TRANSFER_DRIVE_FILE_;
	if (isFile || isDriveFile) {
		switch (ev.dataTransfer.effectAllowed) {
			case 'all':
			case 'uninitialized':
			case 'copy':
			case 'copyLink':
			case 'copyMove':
				ev.dataTransfer.dropEffect = 'copy';
				break;
			case 'linkMove':
			case 'move':
				ev.dataTransfer.dropEffect = 'move';
				break;
			default:
				ev.dataTransfer.dropEffect = 'none';
				break;
		}
	} else {
		ev.dataTransfer.dropEffect = 'none';
	}
}

function onDrop(ev: DragEvent): void {
	if (!ev.dataTransfer) return;
	// ファイルだったら
	if (ev.dataTransfer.files.length === 1) {
		formEl.value.upload(ev.dataTransfer.files[0]);
		return;
	} else if (ev.dataTransfer.files.length > 1) {
		os.alert({
			type: 'error',
			text: i18n.ts.onlyOneFileCanBeAttached,
		});
		return;
	}
	//#region ドライブのファイル
	const driveFile = ev.dataTransfer.getData(_DATA_TRANSFER_DRIVE_FILE_);
	if (driveFile != null && driveFile !== '') {
		const file = JSON.parse(driveFile);
		formEl.value.file = file;
	}
	//#endregion
}

function onMessage(message) {
	sound.playMisskeySfx('chat');
	const _isBottom = isBottomVisible(rootEl.value, 64);
	pagingComponent.value.prepend(message);
	if (message.userId !== $i?.id && !document.hidden) {
		connection?.send('read', {
			id: message.id,
		});
	}
	if (_isBottom) {
		// Scroll to bottom
		nextTick(() => {
			thisScrollToBottom();
		});
	} else if (message.userId !== $i?.id) {
		// Notify
		notifyNewMessage();
	}
}

function onRead(x: any) {
	if (!pagingComponent.value || !(pagingComponent.value.items instanceof Map)) {
		console.error('pagingComponent.value.items is not a Map');
		return;
	}

	const itemsMap = pagingComponent.value.items;

	if (user) {
		if (!Array.isArray(x)) x = [x];
		for (const id of x) {
			if (itemsMap.has(id)) {
				const item = itemsMap.get(id);
				if (item) {
					itemsMap.set(id, {
						...item,
						isRead: true,
					});
				}
			}
		}
	} else if (group) {
		if (x && Array.isArray(x.ids)) {
			for (const id of x.ids) {
				if (itemsMap.has(id)) {
					const item = itemsMap.get(id);
					if (item) {
						itemsMap.set(id, {
							...item,
							reads: [...(item.reads || []), x.userId],
						});
					}
				}
			}
		} else {
			console.error('Invalid input: x.ids is not an array');
		}
	}
}

function onDeleted(id) {
	const msg = pagingComponent.value.items.find(m => m.id === id);
	if (msg) {
		pagingComponent.value.items = pagingComponent.value.items.filter(m => m.id !== msg.id);
		// ページをリロードする
		pagingComponent.value.reload().then(() => {
			thisScrollToBottom();
		});
	}
}

function thisScrollToBottom() {
	scrollToBottom(rootEl.value, { behavior: 'smooth' });
}

function onIndicatorClick() {
	showIndicator.value = false;
	thisScrollToBottom();
}

let scrollRemove: (() => void) | null = null;

function notifyNewMessage() {
	showIndicator.value = true;
	scrollRemove = onScrollBottom(rootEl.value, () => {
		showIndicator.value = false;
		scrollRemove = null;
	});
}

function onVisibilitychange() {
	if (document.hidden) return;
	for (const message of pagingComponent.value.items) {
		if (message.userId !== $i?.id && !message.isRead) {
			connection?.send('read', {
				id: message.id,
			});
		}
	}
}

onMounted(() => {
	fetch();
});
onBeforeUnmount(() => {
	connection?.dispose();
	document.removeEventListener('visibilitychange', onVisibilitychange);
	if (scrollRemove) scrollRemove();
});
definePageMetadata(computed(() => !fetching ? user ? {
	userName: user,
	avatar: user,
} : {
	title: group?.name,
	icon: 'ti ti-users',
} : null));
</script>

	<style lang="scss" module>
	.root {
		display: content;
	}
	.body {
		min-height: 80%;
	}
	.more {
		display: block;
		margin: 16px auto;
		padding: 0 12px;
		line-height: 24px;
		color: #fff;
		background: rgba(#000, 0.3);
		border-radius: 12px;
		&:hover {
			background: rgba(#000, 0.4);
		}
		&:active {
			background: rgba(#000, 0.5);
		}
		> i {
			margin-right: 4px;
		}
	}
	.fetching {
		cursor: wait;
	}
	.messages {
		padding: 16px 0 0;
		> * {
			margin-bottom: 16px;
		}
	}
	.footer {
		width: 100%;
		position: sticky;
		z-index: 2;
		padding-top: 8px;
		bottom: var(--minBottomSpacing);
	}
	.newMessage {
		width: 100%;
		padding-bottom: 8px;
		text-align: center;
	}
	.newMessageButton {
		display: inline-block;
		margin: 0;
		padding: 0 12px;
		line-height: 32px;
		font-size: 12px;
		border-radius: 16px;
	}
	.newMessageIcon {
		display: inline-block;
		margin-right: 8px;
	}
	.typers {
		position: absolute;
		bottom: 100%;
		padding: 0 8px 0 8px;
		font-size: 0.9em;
		color: var(--fgTransparentWeak);
	}
	.user + .user:before {
		content: ", ";
		font-weight: normal;
	}
	.user:last-of-type:after {
		content: " ";
	}
	.form {
		max-height: 12em;
		overflow-y: scroll;
		border-top: solid 0.5px var(--divider);
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.fadeEnterActive, .fadeLeaveActive {
		transition: opacity 0.1s;
	}
	.fadeEnterFrom, .fadeLeaveTo {
		transition: opacity 0.5s;
		opacity: 0;
	}
	</style>
