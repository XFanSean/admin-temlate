<template>
  <div class="flex justify-between h-full">
    <div
      class="flex justify-center items-center w-48px hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer"
      @click="handleCollapsed"
    >
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <div class="flex items-center pr-10px">
      <a-space class="h-full">
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-dropdown>
          <div class="flex justify-center items-center w-80px cursor-pointer" @click.prevent>
            {{ username }}
            <DownOutlined />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleLogoutBtn"> 登出 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
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

const username = computed(() => userStore.userInfo.realname)

function handleLogoutBtn() {
  userStore.resetToken()
  resetRouter()
}
</script>
