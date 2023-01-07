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
import Header from '../components/Header.vue'
import Menu from '../components/Menu.vue'
import Content from './content/index.vue'
</script>
