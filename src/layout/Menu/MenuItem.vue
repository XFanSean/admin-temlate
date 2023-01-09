<template>
  <a-menu-item :key="menuInfo.path">
    <template #icon>
      <MenuIcon :icon="menuInfo.icon" />
    </template>
    {{ menuInfo.name }}
  </a-menu-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import MenuIcon from './MenuIcon.vue'

const props = defineProps({
  menuInfo: Object,
})

const getIcon = computed(() => props.menuInfo?.icon)
</script>
