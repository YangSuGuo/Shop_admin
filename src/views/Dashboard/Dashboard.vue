<template>
  <el-divider content-position="left">用户管理</el-divider>
  <div>
    <Card :text="{ title: '用户数量', brief: '微信用户与普通用户的总和'}"
          :imageSrc="'src/assets/svg/user.svg'"
          :cardQuantity="userCount.toString()"
    />
  </div>
  <el-divider content-position="left">商品管理</el-divider>
  <div>
    <Card :text="{ title: '在售商品数量', brief: '目前闲置商品数量'}"
          :imageSrc="'src/assets/svg/FormBuilder.svg'"
          :cardQuantity="idleProductQuantity.toString()+' 件'"
    />
  </div>
  <el-divider content-position="left" class="flex flex-row">订单管理</el-divider>
  <div class="flex flex-row gap-6">
    <Card :text="{ title: '订单数量', brief: '当前完成的订单数量'}"
          :imageSrc="'src/assets/svg/PurchaseTasks.svg'"
          :cardQuantity="'145'"
    />
    <Card :text="{ title: '订单交易总额', brief: '当前完成的订单成交金额'}"
          :imageSrc="'src/assets/svg/SettlementManagement.svg'"
          :cardQuantity="'5536.26 元'"
    />
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
import {getUserCountApi} from "@/api/wxuser";
import {onMounted, ref} from "vue";
import {getgetQueryIdleItemCountApi} from "@/api/goods";

// 获取正常用户数量
const userCount = ref(0);
const getUserCount = async () => {
  let res = await getUserCountApi();
  if (res && res.code == 200) {
    userCount.value = res.data
  }
};

// 获取闲置商品数量
const idleProductQuantity = ref(0);
const getQueryIdleItemCount = async () => {
  let res = await getgetQueryIdleItemCountApi();
  if (res && res.code == 200) {
    idleProductQuantity.value = res.data
  }
};

onMounted(() => {
  getUserCount(); // 用户数量
  getQueryIdleItemCount() // 闲置商品数量
})

</script>

<style scoped>
</style>
