<script lang="ts" setup>
import {onMounted, type Ref, ref, watch} from "vue";
import {type RouteLocationMatched, useRoute} from "vue-router";

const route = useRoute();
const tabs: Ref<RouteLocationMatched[]> = ref([]);

watch(
    () => route.path,
    () => getBredcrumb()
);

//获取面包屑导航数据
const getBredcrumb = () => {
  let mached = route.matched.filter((item) => item.meta && item.meta.title);
  const first = mached[0]
  if (first.path !== '/dashboard') {
    mached = [{
      path: '/dashboard',
      meta: {title: '首页'}
    } as any].concat(mached)
  }
  tabs.value = mached
};

onMounted(() => {
  getBredcrumb()
})
</script>

<template>
  <el-breadcrumb class="bread" separator="/">
    <el-breadcrumb-item v-for="item in tabs" :key="item.path" :to="{ path: item.path }">{{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
//修改字体颜色
:deep(.el-breadcrumb__inner) {
  color: #fff !important;
}

.bread {
  margin-left: 20px;
}

// 修改字体大小
:deep(.el-breadcrumb__item) {
  font-size: 15px !important;
}
</style>
