<script lang="ts" setup>
import {collapseStore} from "@/stores/collapse";
import {computed} from 'vue';
import {Expand, Fold} from "@element-plus/icons-vue";

const store = collapseStore()
const status = computed(() => {
  return store.getCollapse
})

// 点击图标
const iconClick = () => {
  store.setCollapse(!store.collapse)
}
</script>

<template>
  <el-icon :size="30" @click="iconClick">
    <component :is="status ? Expand : Fold"></component>
  </el-icon>
</template>

<style lang="scss" scoped>

</style>
