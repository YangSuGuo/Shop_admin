<template>
  <div id="app">
    <div class="HomeLink">
      <el-icon class="HomeIcon" color="#FAFCFF" style="background-color: #B0375D; border-radius: 50%; padding: 3px">
        <HomeFilled/>
      </el-icon>
      <el-link
          :underline="false"
          class="home-title"
          href="http://localhost:5173/#/"
          target="_blank"
          type="warning">
        Project Login
      </el-link>
    </div>
    <div class="welcome-message">
      <label class="w">W</label>
      <label class="Welcome1">
        elcome
      </label>
      <div class="welcome-content">
        <label class="Welcome2">
          Join us now and<br>
          Let's have some fun
        </label>
      </div>
    </div>
    <div id="login">
      <h1 class="login-title">Login</h1>
      <el-form
          ref="form"
          :model="loginModel"
          :rules="rules"
          class="login-form"
          status-icon
          style="margin-top: 60px">

        <el-form-item prop="username">
          <el-input
              v-model="loginModel.username"
              size="large"
              class="username-input"
              :placeholder="'请输入用户名'"
              name="username"
              autocomplete="on"
              prefix-icon="User"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              v-model="loginModel.password"
              size="large"
              type="password"
              class="password-input"
              :placeholder="'请输入密码'"
              name="password"
              prefix-icon="Lock"
              :show-password="true"/>
        </el-form-item>

        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-input
                  v-model="loginModel.code"
                  size="large"
                  class="username-input"
                  :placeholder="'请输入验证码'"
                  name="username"
                  autocomplete="on"
                  prefix-icon="Finished"/>
            </el-col>
            <el-col :span="5" :offset="0">
              <img :src="imgsrc" class="image" @click="getImg" alt="code"/>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item>
          <div
              class="confirm"
              style="
                margin-top: 5%;
                margin-left: 80%">
            <el-button
                icon="Right"
                round
                style="zoom:195%; opacity: 0.7;"
                type="primary"
                @click="commit">
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <label
          class="agreement"
          style="
                  color: #606266;
                  margin-left: 20%;
                  font-size: 14px;
                  font-family: '苹方 常规', serif;">
        登录即同意楊蘇國的
        <el-link
            :underline="false"
            href="https://www.microsoft.com/zh-cn/legal/terms-of-use"
            target="_blank"
            type="primary">
          用户协议
        </el-link>
        和
        <el-link
            :underline="false"
            href="https://privacy.microsoft.com/zh-cn/privacystatement"
            target="_blank"
            type="primary">
          隐私政策
        </el-link>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import {getCodeApi, loginApi} from "@/api/user";
import {userStore} from "@/stores/user";

import {HomeFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const imgsrc = ref('')

const form = ref<FormInstance>();

const loginModel = reactive({
  username: '',
  password: '',
  code: '',
  userId: ''
})

const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'change'}],
  password: [{required: true, message: '请输入密码', trigger: 'change'}],
  code: [{required: true, message: '请输入验证码', trigger: 'change'}]
});

const getImg = async () => {
  let res = await getCodeApi()
  if (res && res.code == 200) {
    imgsrc.value = res.data.captchaBase64;
    loginModel.userId = res.data.key;
  }
}

const store = userStore()
const router = useRouter()

const commit = () => {
  form.value?.validate(async (valid) => {
    if (valid) {
      let res = await loginApi(loginModel)
      if (res && res.code == 200) {
        store.setUserId(res.data.userId);
        router.push({path: '/dashboard'})
      } else {
        await getImg()
      }
    }
  })
}

onMounted(() => {
  getImg()
  setInterval(getImg, 120000);
})
</script>

<style scoped>
body {
  background: rgb(135, 206, 235); /*网页背景*/
}

#app {
  background: url("https://img.picui.cn/free/2024/06/03/665dda459afd4.jpg");
  background-size: 100% 100%;
}

#login {
  /*位置与大小*/
  top: 13%;
  left: 63%;
  width: 500px;
  height: 600px;
  position: absolute;
  /*样式*/
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10%; /*圆角*/
  box-shadow: 5px 6px 8px rgba(74, 124, 199, 0.7); /*阴影*/
}

.login-form {
  margin-left: 40px;
  margin-right: 40px;
}

.login-title {
  /*位置设置*/
  margin-top: 15%;
  margin-bottom: 60px;
  /*字体设置*/
  text-align: center;
  font-size: 60px;
  font-family: Elephant, serif;
  font-style: italic;
  color: #606266;
}

.HomeLink {
  zoom: 175%;
  margin-left: 13px;
  font-family: Elephant, serif;
  opacity: 0.8;
  height: 20px;

  position: relative;
  top: 20px;
  display: flex;
  align-items: center;
  /*  width: 135px;
    height: 30px;
    background: rgba(78, 117, 186, 0.8);
    border-radius: 6%; !*圆角*!
    box-shadow: 3px 3px 10px rgba(158, 189, 236, 0.7); !*阴影*!*/
}

.home-title {
  padding: 3px 5px;
  margin-left: 5px;
  background-color: #606266;
  border-radius: 10px;
}

.welcome-message {
  margin-top: 145px;
  margin-left: 45px;

  font-family: Elephant, serif;
  font-size: 115px;
  color: rgba(236, 241, 245, 0.9);
  opacity: 0.8;
}

.welcome-content {
  margin-top: 45px;
  font-size: 65px;
}

.w {
  color: crimson;
  margin-left: -25px;
}

.Welcome1 {
  font-size: 110px;
  color: aliceblue;
  margin-left: -25px;
}
</style>
