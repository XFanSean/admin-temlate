<template>
  <div class="flex flex-col h-full" style="background-color: #001529; color: #fff">
    <div class="flex items-center justify-center h-64px">
      <span>{{ appTitle }}</span>
    </div>
    <div class="flex-1">
      <Scrollbar>
        <a-menu
          v-model:openKeys="appStore.menuOpenKeys"
          v-model:selectedKeys="appStore.menuSelectKeys"
          mode="inline"
          style="width: 100%"
          theme="dark"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import { Scrollbar } from '@/components/Scrollbar'
import { useRoute, useRouter } from 'vue-router'

const appStore = useAppStore()
const { push } = useRouter()
const { path } = useRoute()

onMounted(() => {
  appStore.menuSelectKeys = [path]
  const pathArr = path.split('/')
  pathArr.shift()
  pathArr.pop()
  appStore.menuOpenKeys = pathArr.map((str: string) => '/' + str)
})

const menuList = computed(() => {
  return appStore.menuList
})

function handleMenuItem(event: any) {
  push(event.key)
}

const appTitle = ref('雷神商城商家后台')
watch(
  () => appStore.collapsed,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        appTitle.value = '雷神商城商家后台'
      }, 200)
    } else {
      appTitle.value = '商家后台'
    }
  }
)
</script>
