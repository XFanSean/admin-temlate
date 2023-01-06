<template>
  <div class="h-full bg-gray-100 pt-72px">
    <div class="text-center mb-72px">
      <div class="text-33px font-600">{{ title }}</div>
    </div>
    <div class="login-form w-368px mx-auto">
      <a-tabs v-model:activeKey="activeTab" animated centered>
        <a-tab-pane key="1" tab="账号密码登录">
          <a-form ref="credentialsLoginFormRef" :model="credentialsLoginForm">
            <a-form-item :rules="[{ required: true, message: '请输入账号' }]" name="username">
              <a-input
                v-model:value.trim="credentialsLoginForm.username"
                allow-clear
                placeholder="账号"
                size="large"
              >
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '请输入密码' }]" name="password">
              <a-input-password
                v-model:value.trim="credentialsLoginForm.password"
                allow-clear
                placeholder="密码"
                size="large"
              >
                <template #prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input-password>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机号码登录">
          <a-form ref="mobileLoginFormRef" :model="mobileLoginForm">
            <a-form-item :rules="[{ required: true, message: '请输入手机号' }]" name="phoneNumber">
              <a-input
                v-model:value="mobileLoginForm.phoneNumber"
                placeholder="手机号"
                size="large"
              >
                <template #prefix>
                  <MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '请输入验证码' }]" name="code">
              <a-row :gutter="16">
                <a-col :span="16">
                  <a-input
                    v-model:value="mobileLoginForm.phoneNumber"
                    placeholder="验证码"
                    size="large"
                  >
                    <template #prefix>
                      <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-col>
                <a-col :span="8">
                  <a-button size="large">获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
      <div>
        <a-button
          :loading="loginBtnLoading"
          block
          size="large"
          type="primary"
          @click="handleLoginBtn"
        >
          登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { getAppEnvConfig } from '@/utils/env'
import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons-vue'

const { VITE_GLOB_APP_TITLE: title } = getAppEnvConfig()

// tab选中值
const activeTab = ref('1')

const credentialsLoginFormRef = ref<FormInstance | null>(null)
// 账号密码登录表单
const credentialsLoginForm = reactive({
  // 账号
  username: '',
  // 密码
  password: '',
})

const mobileLoginFormRef = ref<FormInstance | null>(null)
// 手机号码登录表单
const mobileLoginForm = reactive({
  // 手机号
  phoneNumber: '',
  // 验证码
  code: '',
  // 验证码ID
  codeKey: '',
})

// 登录按钮加载状态
const loginBtnLoading = ref(false)

// 点击登录按钮
function handleLoginBtn() {
  activeTab.value === '1' ? loginByPassword() : loginByPhoneNumber()
}

// 账号密码登录
async function loginByPassword() {
  try {
    await credentialsLoginFormRef.value!.validateFields()
    loginBtnLoading.value = true
  } catch (e) {
    loginBtnLoading.value = false
    console.error(e)
  }
}

// 手机号验证码登录
async function loginByPhoneNumber() {
  try {
    await mobileLoginFormRef.value!.validateFields()
    loginBtnLoading.value = true
  } catch (e) {
    loginBtnLoading.value = false
    console.error(e)
  }
}
</script>

<style lang="less" scoped></style>
