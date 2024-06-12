<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img class="userimg" src="@/assets/ConneR_Logo.png"/>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click="loginBtn">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import useWarnConfirm from "@/hooks/useWamConfirm";

const {global} = useWarnConfirm()
const router = useRouter()

const loginBtn = async () => {
  const confirm = await global.$warningConfirm("确定退出登录吗?")
  if (confirm) {
    sessionStorage.clear()
    router.push({name: 'login'})
  }
}

</script>

<style scoped lang="scss">
.userimg{
  width: 40px;
  height: 40px;
  border-radius: 7px;
}
</style>
