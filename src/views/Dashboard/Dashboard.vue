<template>
  <el-divider content-position="left">用户管理</el-divider>
  <div>
    <Card :text="{ title: '用户数量', brief: '微信用户与普通用户的总和', cardQuantity: '2' }"
          :imageSrc="'src/assets/svg/user.svg'"/>
  </div>
  <el-divider content-position="left">商品管理</el-divider>
  <div>
    <Card :text="{ title: '在售商品数量', brief: '目前闲置商品数量', cardQuantity: '1145 件' }"
          :imageSrc="'src/assets/svg/FormBuilder.svg'"/>
  </div>
  <el-divider content-position="left" class="flex flex-row">订单管理</el-divider>
  <div class="flex flex-row gap-6">
    <Card :text="{ title: '订单数量', brief: '当前完成的订单数量', cardQuantity: '145' }"
          :imageSrc="'src/assets/svg/PurchaseTasks.svg'"/>
    <Card :text="{ title: '订单交易总额', brief: '当前完成的订单成交金额', cardQuantity: '5536.26 元' }"
          :imageSrc="'src/assets/svg/SettlementManagement.svg'"/>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
</script>

<style scoped>
</style>
