<template>
  <div class="flex justify-between h-full">
    <div
      class="flex justify-center items-center w-48px hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer"
      @click="handleCollapsed"
    >
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <a-dropdown>
      <div class="flex items-center pr-16px pl-16px cursor-pointer hover:bg-gray-500/20">
        <a-avatar :src="userInfo.avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="ml-8px">
          {{ userInfo.realname }}
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleLogoutBtn">注销</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { resetRouter } from '@/router'

const userStore = useUserStore()
const appStore = useAppStore()

const collapsed = computed(() => appStore.collapsed)
function handleCollapsed() {
  appStore.menuOpenKeys = []
  appStore.collapsed = !appStore.collapsed
}

const userInfo = computed(() => userStore.userInfo)

function handleLogoutBtn() {
  userStore.resetToken()
  resetRouter()
}
</script>
