<template>
  <a-layout class="h-full">
    <a-layout-sider theme="light"><Menu /></a-layout-sider>
    <a-layout>
      <a-layout-header style="background-color: #fff; padding: 0"><Header /></a-layout-header>
      <a-layout-content><Content /></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Header from '../Header/index.vue'
import Menu from '../Menu/index.vue'
import Content from './content/index.vue'
</script>
