<template>
  <el-divider content-position="left">用户管理</el-divider>

<!--  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 hover:bg-sky-700">
    <div class="shrink-0">
      <img class="h-12 w-12" src="/src/assets/svg/purchaseLedger.svg" alt="ChitChat Logo">
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>-->

  <el-divider content-position="left">商品管理</el-divider>
  <Card
      :text="{ title: '卡片标题', brief: '这是简述', cardQuantity: '10' }"
      :imageSrc="'src/assets/svg/FormBuilder.svg'"
  />
  <el-divider content-position="left">订单管理</el-divider>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
</script>

<style scoped>
</style>
