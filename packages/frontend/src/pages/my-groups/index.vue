<!--
	from oran.ski
		https://github.com/nacika-ins/misskey
-->

<template>
<MkStickyContainer>
	<template #header>
		<MkPageHeader v-model:tab="tab" :actions="headerActions" :tabs="headerTabs"/>
	</template>
	<MkSpacer :contentMax="700">
		<div v-if="tab === 'owned'" class="_content">
			<MkButton primary style="margin: 0 auto var(--margin) auto" @click="create">
				<i class="fas fa-plus"></i> {{ i18n.ts.createGroup }}
			</MkButton>

			<MkPagination v-slot="{ items }" ref="owned" :pagination="ownedPagination">
				<div v-for="group in items" :key="group.id" class="_card">
					<div class="_title">
						<div class="_title__name">
							<MkA :to="`/my/groups/${group.id}`" class="_link">{{ group.name }}</MkA>
						</div>
					</div>
					<div class="_divider"/>
					<div class="_content">
						<MkAvatars :userIds="group.userIds"/>
					</div>
				</div>
			</MkPagination>
		</div>

		<div v-else-if="tab === 'joined'" class="_content">
			<MkPagination v-slot="{ items }" ref="joined" :pagination="joinedPagination">
				<div v-for="group in items" :key="group.id" class="_card">
					<div class="_title">
						<div class="_title__name">{{ group.name }}</div>
						<div class="_buttons">
							<MkButton danger @click="leave(group)">{{ i18n.ts.leaveGroup }}</MkButton>
						</div>
					</div>
					<div class="_divider"/>
					<div class="_content">
						<MkAvatars :userIds="group.userIds"/>
					</div>
				</div>
			</MkPagination>
		</div>

		<div v-else-if="tab === 'invites'" class="_content">
			<MkPagination v-slot="{ items }" ref="invitations" :pagination="invitationPagination">
				<div v-for="invitation in items" :key="invitation.id" class="_card">
					<div class="_title">
						<div class="_title__name">{{ invitation.group.name }}</div>
						<div class="_buttons">
							<MkButton primary inline @click="acceptInvite(invitation)">
								<i class="fas fa-check"></i> {{ i18n.ts.accept }}
							</MkButton>
							<MkButton danger inline @click="rejectInvite(invitation)">
								<i class="fas fa-ban"></i> {{ i18n.ts.reject }}
							</MkButton>
						</div>
					</div>
					<div class="_divider"/>
					<div class="_content">
						<MkAvatars :userIds="invitation.group.userIds"/>
					</div>
				</div>
			</MkPagination>
		</div>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, shallowRef, ref } from 'vue';
import MkPagination from '@/components/MkPagination.vue';
import MkButton from '@/components/MkButton.vue';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import MkAvatars from '@/components/MkAvatars.vue';

const props = withDefaults(
	defineProps<{
    initialTab?: string;
  }>(),
	{
		initialTab: 'owned',
	},
);

const headerActions = computed(() => []);

const headerTabs = computed(() => [
	{
		key: 'owned',
		icon: 'ti ti-bolt',
		title: i18n.ts.ownedGroups,
	},
	{
		key: 'joined',
		icon: 'ti ti-users',
		title: i18n.ts.joinedGroups,
	},
	{
		key: 'invites',
		title: i18n.ts.invites,
	},
]);

let tab = ref(props.initialTab);

let invitations = shallowRef();
let owned = shallowRef();
let joined = shallowRef();

/**
 * グループを作成
 */
async function create() {
	const { canceled, result: name } = await os.inputText({
		title: i18n.ts.groupName,
	});
	if (canceled) return;
	await misskeyApi('users/groups/create', { name: name });
	owned.value.reload();
	os.success();
}

/**
 * 招待を承認する
 */
function acceptInvite(invitation) {
	misskeyApi('users/groups/invitations/accept', {
		invitationId: invitation.id,
	}).then(() => {
		os.success();
		invitations.value.reload();
		joined.value.reload();
	});
}

/**
 * 招待を拒否する
 */
function rejectInvite(invitation) {
	misskeyApi('users/groups/invitations/reject', {
		invitationId: invitation.id,
	}).then(() => {
		invitations.value.reload();
	});
}

/**
 * グループから脱退する
 */
async function leave(group) {
	const { canceled } = await os.confirm({
		type: 'warning',
		text: i18n.t('leaveGroupConfirm', { name: group.name }),
	});
	if (canceled) return;
	os.apiWithDialog('users/groups/leave', {
		groupId: group.id,
	}).then(() => {
		joined.value.reload();
	});
}

let ownedPagination = ref({
	endpoint: 'users/groups/owned' as const,
	limit: 10,
});
let joinedPagination = ref({
	endpoint: 'users/groups/joined' as const,
	limit: 10,
});
let invitationPagination = ref({
	endpoint: 'i/user-group-invites' as const,
	limit: 10,
});

definePageMetadata(
	computed(() => ({
		title: i18n.ts.groups,
		icon: 'ti ti-users',
		bg: 'var(--bg)',
		actions: [
			{
				icon: 'ti ti-plus',
				text: i18n.ts.createGroup,
				handler: create,
			},
		],
	})),
);
</script>

<style lang="scss" scoped>
._content {
  ._card {
    padding: 1em;
    border: 1px solid var(--border);
    border-radius: 0.5em;
    margin-bottom: 1em;

    ._title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--panel);
      color: var(--fg);
      font-size: 1.2em;
      font-weight: bold;
      padding: 0.25em;
      gap: 0.25em;
      border-radius: 0.5em 0.5em 0 0;

      ._title__name {
        margin: 0.5em;
      }
    }

    ._divider {
      border-bottom: 1px solid var(--divider);
    }

    ._content {
      display: flex;
      gap: 0.5em;
      margin-bottom: 0.5em;
      padding: 1em;
      background: var(--panel);
      color: var(--fg);
      border-radius: 0 0 0.5em 0.5em;
    }

    ._buttons {
      display: flex;
      row-gap: 0.5em;
      justify-content: flex-end;
      padding: 1em;
      color: var(--fg);
      border-radius: 0 0 0.5em 0.5em;
      font-size: 0.8em;
    }
  }
}
</style>
