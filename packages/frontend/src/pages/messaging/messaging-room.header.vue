<template>
<div v-if="show" ref="el" :class="[$style.root]" :style="{ background: bg }">
	<div :class="$style.upper">
		<template v-if="metadata">
			<div :class="$style.titleContainer" @click="top">
				<div :class="$style.title">
					<div v-if="metadata.title">{{ metadata.title }}</div>
				</div>
			</div>
		</template>
		<div v-if="groupId" :class="$style.buttonsRight">
			<button
				ref="buttonEl"
				class="_button"
				:class="$style.button"
				@click.stop="actionHandler"
				@touchstart="preventDrag"
			>
				<I18n :src="i18n.ts.onlineUsersCount" tag="span" class="text">
					<template #n>
						<b>{{ onlineUserCount }}</b>
					</template>
				</I18n>
			</button>
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { computed, shallowRef, onMounted, onUnmounted, ref, inject, defineAsyncComponent, Ref, watch } from 'vue';
import tinycolor from 'tinycolor2';
import { scrollToTop } from '@@/js/scroll.js';
import { globalEvents } from '@/events';
import { injectReactiveMetadata } from '@/scripts/page-metadata';
import { $i, openAccountMenu as openAccountMenu_ } from '@/account';
import { i18n } from '@/i18n';
import { misskeyApi } from '@/scripts/misskey-api.js';
import * as os from '@/os';

const props = withDefaults(defineProps<{
	initialOnlineUserCount?: number;
	groupId?: string;
  actions?: {
    text: string;
    icon: string;
    highlighted?: boolean;
    handler: (ev: MouseEvent) => void;
  }[];
  thin?: boolean;
  displayMyAvatar?: boolean;
}>(), {
	initialOnlineUserCount: 0,
	groupId: '',
	actions: () => [],
	thin: false,
	displayMyAvatar: false,
});

console.log(props.groupUsers);

// オンラインユーザー数のリアクティブな状態
const onlineUserCount = ref(props.initialOnlineUserCount);

// オンラインユーザー数の更新を監視
watch(onlineUserCount, (newCount) => {
	console.log(`Online user count updated: ${newCount}`);
});

// 初期化時にログを出力
onMounted(() => {
	console.log(`Initial online user count: ${onlineUserCount.value}`);
});

// ここでオンラインユーザー数を更新するロジックを追加します
// 例えば、WebSocketやAPIからのデータを受け取る部分
function updateOnlineUserCount(newCount: number) {
	onlineUserCount.value = newCount;
}

const emit = defineEmits<{
  (ev: 'update:tab', key: string);
}>();

const metadata = injectReactiveMetadata();
const hideTitle = inject('shouldOmitHeaderTitle', false);
let el = shallowRef<HTMLElement | undefined>(undefined);
const bg = ref<string | undefined>(undefined);

const show = computed(() => {
	return !hideTitle;
});

let buttonEl = shallowRef<HTMLElement | undefined>(undefined);
let showing = ref(false);
let popupModal: Ref<Promise<{ dispose: () => void }> | undefined> = ref(undefined);

const groupUsers = ref<unknown[]>([]);

const fetchGroupUsers = async (groupId: string) => {
	try {
		const groupData = await misskeyApi('users/groups/show', { groupId });
		console.log('Group data:', groupData);
		const userIds: string[] = groupData?.userIds || [];
		console.log('User IDs:', userIds); // 追加

		const users = await Promise.all(
			userIds.map((userId) => {
				return misskeyApi('users/show', { userId });
			}),
		);

		groupUsers.value = users;
		onlineUserCount.value = users.filter(user => user.onlineStatus === 'online').length;
		console.log(`Online user count updated: ${onlineUserCount.value}`);
	} catch (error) {
		console.error('Error fetching group users:', error);
	}
};

const actionHandler: (ev: MouseEvent) => void = async () => {
	showing.value = !showing.value;
	if (!showing.value) {
		if (popupModal.value) {
			console.debug('popupModal =', await popupModal);
			(await popupModal.value).dispose();
			popupModal.value = undefined;
		}
		return;
	}

	if (props.groupId) {
		await fetchGroupUsers(props.groupId);
	}

	if (groupUsers.value.length > 0) { // データが取得された後にポップアップを表示
		popupModal.value = os.popup(
			defineAsyncComponent(() => import('./messaging-room.member-details.vue')),
			{
				showing: showing.value,
				users: groupUsers.value,
				count: onlineUserCount.value,
				targetElement: buttonEl.value as HTMLElement,
				reaction: '',
			},
			{},
			'end',
		);
		console.log('Users for popup:', groupUsers.value);
	} else {
		console.log('No users fetched.');
	}
};

const preventDrag = (ev: TouchEvent) => {
	ev.stopPropagation();
};

const top = () => {
	if (el.value) {
		scrollToTop(el.value as HTMLElement, { behavior: 'smooth' });
	}
};

const calcBg = () => {
	const rawBg = metadata?.bg || 'var(--bg)';
	const tinyBg = tinycolor(
		rawBg.startsWith('var(') ? getComputedStyle(document.documentElement).getPropertyValue(rawBg.slice(4, -1)) : rawBg,
	);
	tinyBg.setAlpha(0.85);
	bg.value = tinyBg.toRgbString();
};

let ro: ResizeObserver | null;
onMounted(() => {
	calcBg();
	globalEvents.on('themeChanged', calcBg);
	watch(() => onlineUserCount.value, (newCount) => {
		console.log(`Online user count updated: ${newCount}`);
		// 必要に応じて追加の処理をここに記述する
	});
});

onUnmounted(() => {
	globalEvents.off('themeChanged', calcBg);
	if (ro) ro.disconnect();
});
</script>

<style lang="scss" module>
.root {
  -webkit-backdrop-filter: var(--blur, blur(15px));
  backdrop-filter: var(--blur, blur(15px));
  border-bottom: solid 0.5px var(--divider);
  width: 100%;
}
.upper,
.lower {
  width: 100%;
  background: transparent;
}
.upper {
  --height: 50px;
  display: flex;
  gap: var(--margin);
  height: var(--height);
  .tabs:first-child {
    margin-left: auto;
  }
  .tabs:not(:first-child) {
    padding-left: 16px;
    mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(0, 0, 0) 16px, rgb(0, 0, 0) 100%);
  }
  .tabs {
    margin-right: auto;
  }
  &.slim {
    text-align: center;
    gap: 0;
    .tabs:first-child {
      margin-left: 0;
    }
    > .titleContainer {
      margin: 0 auto;
      max-width: 100%;
    }
  }
}
.lower {
  --height: 40px;
  height: var(--height);
}
.buttons {
  --margin: 8px;
  display: flex;
  align-items: center;
  min-width: var(--height);
  height: var(--height);
  &:empty {
    width: var(--height);
  }
}
.buttonsLeft {
  composes: buttons;
  margin: 0 var(--margin) 0 0;
}
.buttonsRight {
  composes: buttons;
  margin: 0 0 0 var(--margin);
	font-size: 0.65em;
  width: fit-content;
  position: absolute;
  right: 32px;
}
.avatar {
  $size: 32px;
  display: inline-block;
  width: $size;
  height: $size;
  vertical-align: bottom;
  margin: 0 8px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height);
	width: 100%;
  box-sizing: border-box;
  position: relative;
  border-radius: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &.highlighted {
    color: var(--accent);
  }
}
.fullButton {
  & + .fullButton {
    margin-left: 12px;
  }
}
.titleContainer {
  display: flex;
  align-items: center;
  max-width: min(30vw, 400px);
  overflow: auto;
  white-space: nowrap;
  text-align: left;
  font-weight: bold;
  flex-shrink: 1;
  margin-left: 24px;
}
.titleAvatar {
  $size: 32px;
  display: inline-block;
  width: $size;
  height: $size;
  vertical-align: bottom;
  margin: 0 8px;
  pointer-events: none;
}
.titleIcon {
  margin-right: 8px;
  width: 16px;
  text-align: center;
}
.title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.1;
}
.subtitle {
  opacity: 0.6;
  font-size: 0.8em;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.activeTab {
    text-align: center;
    > .chevron {
      display: inline-block;
      margin-left: 6px;
    }
  }
}
</style>
