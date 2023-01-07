<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-center h-64px">
      <span>商家后台</span>
    </div>
    <div class="flex-1">
      <a-menu></a-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const menuList = computed(() => {
  return userStore.menuList
})
</script>
