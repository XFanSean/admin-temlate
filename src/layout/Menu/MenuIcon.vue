<template>
  <Icon v-if="getIcon" :icon="getIcon" :size="18" class="leiGod-wrapper__icon mr-2" />
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

const props = defineProps({
  icon: String as PropType<string>,
})
const getIcon = computed(() => props.icon)
</script>
