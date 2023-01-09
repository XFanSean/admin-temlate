<template>
  <a-menu-item :key="menuInfo.path">
    <template #icon>
      <PieChartOutlined />
    </template>
    {{ menuInfo.name }}
  </a-menu-item>
</template>

<script lang="ts" setup>
import { PieChartOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  menuInfo: Object,
})
</script>
