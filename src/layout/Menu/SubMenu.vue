<template>
  <a-sub-menu :key="menuInfo.path">
    <template #icon>
      <MenuIcon :icon="menuInfo.icon" />
    </template>
    <template #title>{{ menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <MenuItem v-if="!item.children" :menu-info="item" />

      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script lang="ts" setup>
import SubMenu from '@/layout/Menu/SubMenu.vue'
import MenuItem from './MenuItem.vue'
import MenuIcon from './MenuIcon.vue'

const props = defineProps({
  menuInfo: Object,
})
</script>
