<template>
<MkTooltip ref="tooltip" :showing="showing" :targetElement="targetElement" :maxWidth="340" @closed="emit('closed')">
	<div :class="$style.root">
		<div :class="$style.users">
			<div v-for="u in users" :key="u.id" :class="$style.user" @click="navigateToProfile(u.id)">
				<template v-if="groupOwnerId === u.id">
					<div :class="$style.crownContainer">
						<MkEmoji :normal="true" :noStyle="true" emoji="👑" :class="$style.crown"/>
					</div>
				</template>
				<MkAvatar :class="$style.avatar" :user="u" indicator/>
				<MkUserName :user="u" :nowrap="true"/>
			</div>
		</div>
	</div>
</MkTooltip>
</template>

<script lang="ts" setup>
import { watch, onMounted } from 'vue';
import MkTooltip from '@/components/MkTooltip.vue';
import { useRouter } from '@/router/supplier.js';
const props = defineProps<{
  showing: boolean;
  reaction: string;
  users: any[];
  groupOwnerId?: string;
  count: number;
  targetElement: HTMLElement;
}>();

const emit = defineEmits<{
  (ev: 'closed'): void;
}>();

const router = useRouter();

const navigateToProfile = (userId: string) => {
	router.push(`/${userId}`);
};

const closeModal = () => {
  emit('closed');
};

// デバッグ用のログ出力
onMounted(() => {
	console.log('Tooltip props:', props);
});

onMounted(() => {
	console.log('Tooltip showing:', props.showing);
});

onMounted(() => {
	console.log('Tooltip users:', props.users);
});

onMounted(() => {
	console.log('Tooltip targetElement:', props.targetElement);
});
</script>

<style lang="scss" module>
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto; /* オーバーレイがクリックイベントをキャッチ */
  z-index: 1000; /* 必要に応じて調整 */
}

.modalContent {
  pointer-events: auto; /* モーダル本体がクリックイベントをキャッチ */
}

.root {
  display: flex;
  pointer-events: auto; /* モーダルがクリックイベントをキャッチ */
}

.reaction {
  max-width: 100px;
  text-align: center;
}

.reactionIcon {
  display: block;
  width: 60px;
  font-size: 60px; // unicodeな絵文字についてはwidthが効かないため
  object-fit: contain;
  margin: 0 auto;
}

.reactionName {
  font-size: 1em;
}

.users {
  flex: 1;
  min-width: 0;
  font-size: 0.95em;
  padding-left: 10px;
  margin-left: 10px;
  margin-right: 14px;
  text-align: left;
}

.user {
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:not(:last-child) {
    margin-bottom: 3px;
  }
}

.crownContainer {
  width: 0;
  height: 0;
}

.crown {
  margin-left: -1.6em;
  width: 1em;
  height: 1em;
}

.avatar {
  width: 24px;
  height: 24px;
  margin-right: 3px;
}
</style>
