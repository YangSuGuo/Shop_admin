<template>
  <!--  <el-divider content-position="left">用户管理</el-divider>-->
  <div>
    <Card :text="{ title: '用户数量', brief: '当前微信注册用户'}"
          :imageSrc="'src/assets/svg/user.svg'"
          :cardQuantity="userCount.toString()"
          @click="() => {router.push({name: 'userList'})}"/>
  </div>
  <el-divider content-position="left">商品管理</el-divider>
  <div>
    <Card :text="{ title: '当前在售商品数量', brief: '目前闲置商品数量'}"
          :imageSrc="'src/assets/svg/FormBuilder.svg'"
          :cardQuantity="idleProductQuantity.toString() + ' 件'"
          @click="() => {router.push({name: 'unusedList'})}"/>
  </div>
  <div ref="categoryProductCount"
       class="w-full h-64 bg-white rounded-xl shadow-lg items-center overflow-hidden mt-6 pt-3 transition duration-150 hover:-translate-y-1"/>

  <el-divider content-position="left">订单管理</el-divider>

  <div class="flex flex-row gap-6">
    <Card :text="{ title: '闲置订单数量', brief: '当前已完成订单数量'}"
          :imageSrc="'src/assets/svg/PurchaseTasks.svg'" class="flex-auto"
          :cardQuantity="idleOrderCount.toString()"
          @click="() => {router.push({name: 'unusedOrder'})}"/>
    <Card :text="{ title: '求购订单数量', brief: '当前已完成订单数量'}"
          :imageSrc="'src/assets/svg/PurchaseTasks.svg'" class="flex-auto"
          :cardQuantity="purchaseOrderCount.toString()"
          @click="() => {router.push({name: 'buyOrder'})}"/>
    <Card :text="{ title: '全部订单数量', brief: '当前已完成订单数量'}"
          :imageSrc="'src/assets/svg/PurchaseTasks.svg'" class="flex-auto"
          :cardQuantity="(purchaseOrderCount + idleOrderCount).toString()"/>
  </div>

  <div class="mt-6">
    <Card :text="{ title: '订单成交总额', brief: '当前完成的总订单成交金额'}"
          :imageSrc="'src/assets/svg/SettlementManagement.svg'"
          :cardQuantity="orderTotalAmount.toString() + ' 元'"/>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
import {getUserCountApi} from "@/api/wxuser";
import {onMounted, ref} from "vue";
import {getQueryIdleItemCountApi, getQueryPurchaseItemQuantityApi} from "@/api/goods";
import {
  getQueryIdleOrderListCountApi,
  getQueryOrderTotalAmountApi,
  getQueryPurchaseOrderListCountApi
} from "@/api/order";
import useWarnConfirm from "@/hooks/useWamConfirm";
import {useRouter} from "vue-router";

const router = useRouter()

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
  let res = await getQueryIdleItemCountApi();
  if (res && res.code == 200) {
    idleProductQuantity.value = res.data
  }
};

// 获取求购商品数量
const requestedProductQuantity = ref(0);
const getQueryPurchaseItemQuantity = async () => {
  let res = await getQueryPurchaseItemQuantityApi();
  if (res && res.code == 200) {
    requestedProductQuantity.value = res.data
  }
};

// 获取闲置订单数量
const idleOrderCount = ref(0);
const getQueryIdleOrderListCount = async () => {
  let res = await getQueryIdleOrderListCountApi();
  if (res && res.code == 200) {
    idleOrderCount.value = res.data
  }
};

// 获取求购订单数量
const purchaseOrderCount = ref(0);
const getQueryPurchaseOrderListCount = async () => {
  let res = await getQueryPurchaseOrderListCountApi();
  if (res && res.code == 200) {
    purchaseOrderCount.value = res.data
  }
};

// 获取订单总额
const orderTotalAmount = ref(0);
const getQueryOrderTotalAmount = async () => {
  let res = await getQueryOrderTotalAmountApi();
  if (res && res.code == 200) {
    orderTotalAmount.value = res.data
  }
};

// 获取商品分类数量图表
const {global} = useWarnConfirm();
const categoryProductCount = ref();
// 图表配置
const option = {
  title: {
    text: '供需对比表',
    subtext: '在售商品数量与求购商品数量之间的关系',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '30%',
    left: '5%',
    right: '5%',
    bottom: '10%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'category',
      data: ['闲置', '求购'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  xAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      barWidth: '60%',
      data: [{}, {}]
    }
  ]
};
const getCategoryProductCount = () => {
  const infoEl = categoryProductCount.value;
  const userEc = global.$echarts.init(infoEl, "light");
  // 更新图表数据
  option.series[0].data = [{
    value: idleProductQuantity.value,
    itemStyle: {color: '#DFF4BD'}
  }, {
    value: requestedProductQuantity.value,
    itemStyle: {color: '#D6E5F4'}
  }];
  userEc.setOption(option);
}

onMounted(async () => {
  await getUserCount(); // 用户数量
  await getQueryIdleItemCount() // 闲置商品数量
  await getQueryPurchaseItemQuantity() // 求购商品数量
  await getQueryIdleOrderListCount() // 闲置订单数量
  await getQueryPurchaseOrderListCount() // 求购订单数量
  await getQueryOrderTotalAmount() // 订单总额
  getCategoryProductCount() // 商品分类数量图表
})

</script>

<style scoped>
</style>
