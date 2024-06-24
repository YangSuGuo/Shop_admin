<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img class="userimg" src="@/assets/ConneR_Logo.png" alt="头像"/>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="updatePassBth">修改密码</el-dropdown-item>
        <el-dropdown-item @click="loginBtn">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
             @onClose="onClose" @onConfirm="commit">
    <template v-slot:content>
      <el-form ref="addRef" :rules="rulse" :model="addModel" label-position="left" label-width="auto">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="addModel.oldPassword"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="addModel.password"/>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import useWarnConfirm from "@/hooks/useWamConfirm";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import {userStore} from "@/stores/user";
import {updatePasswordApi} from "@/api/user";

const addRef = ref<FormInstance>();
const {global} = useWarnConfirm()
const router = useRouter()
const user = userStore()

const loginBtn = async () => {
  const confirm = await global.$warningConfirm("确定退出登录吗?")
  if (confirm) {
    sessionStorage.clear()
    await router.push({name: 'login'})
  }
}

const {dialog, onClose, onShow} = useDialog()

const updatePassBth = async () => {
  dialog.title = "修改密码";
  onShow()
}

const addModel = reactive({
  userId: "",
  oldPassword: "",
  password: "",
});

// 表单验证
const rulse = reactive({
  oldPassword: [{required: true, message: '请输入旧登录密码', trigger: 'blur'}],
  password: [{required: true, message: '请输入新登录密码', trigger: 'blur'}],
});

// 修改密码
const commit = () => {
  addRef.value?.validate(async (valid) => {
    if (valid) {
      if (addModel.password === addModel.oldPassword) {
        global.$warningConfirm("新密码不能与旧密码相同")
      } else {
        addModel.userId = user.userId;
        console.log(addModel)
        let res = await updatePasswordApi(addModel)
        if (res && res.code === 200) {
          // 提示
          ElNotification({
            title: '成功',
            message: res.msg,
            type: 'success',
          });
          // 关闭弹框
          dialog.visible = false;
          sessionStorage.clear()
          await router.push({name: 'login'})
        }
      }
    }
  })
}

</script>

<style scoped lang="scss">
.userimg {
  width: 40px;
  height: 40px;
  border-radius: 7px;
}
</style>
