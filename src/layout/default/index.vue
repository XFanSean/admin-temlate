<template>
  <a-layout class="h-full">
    <a-layout-sider v-model:collapsed="collapsed" theme="light"><Menu /></a-layout-sider>
    <a-layout>
      <a-layout-header><Header /></a-layout-header>
      <a-layout-content><Content /></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Header from '../Header/index.vue'
import Menu from '../Menu/index.vue'
import Content from './content/index.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const collapsed = computed(() => {
  return appStore.collapsed
})
</script>

<style lang="less" scoped>
.ant-layout-header {
  height: 54px;
  padding: 0;
  background-color: #fff;
}
</style>
