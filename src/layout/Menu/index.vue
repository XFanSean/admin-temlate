<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-center h-64px">
      <span>商家后台</span>
    </div>
    <div class="flex-1">
      <Scrollbar>
        <a-menu
          v-model:openKeys="appStore.menuOpenKeys"
          v-model:selectedKeys="appStore.menuSelectKeys"
          mode="inline"
          style="width: 100%"
          @click="handleMenuItem"
        >
          <template v-for="item in menuList" :key="item.name">
            <MenuItem v-if="!item.children" :menu-info="item" />
            <template v-else>
              <SubMenu :menu-info="item" />
            </template>
          </template>
        </a-menu>
      </Scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import { Scrollbar } from '@/components/Scrollbar'

const appStore = useAppStore()

const menuList = computed(() => {
  return appStore.menuList
})

watch(
  () => appStore.menuSelectKeys,
  (val) => {
    console.log(val)
  }
)

watch(
  () => appStore.menuOpenKeys,
  (val) => {
    console.log(val)
  }
)

function handleMenuItem({ item }) {
  console.log(item)
}
</script>
