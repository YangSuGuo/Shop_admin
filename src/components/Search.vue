<template>
  <el-form :inline="true" :model="searchParm" class="form-inline" size="default">
    <el-form-item>
      <el-input v-model="searchParm.nickName" :placeholder="inputPlaceholder"/>
    </el-form-item>
    <el-form-item>
      <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
      <el-button icon="Close" plain type="danger" @click="reset">重置</el-button>
      <el-button v-if="showAddButton" class="ml-5" icon="Plus" type="primary" @click="add">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { SearchProps } from '@/type/SearchProps';

// 定义Props
const props = defineProps<SearchProps>();

// 定义Emit事件
const emit = defineEmits(['on-search', 'on-reset', 'on-add']);

// 搜索事件处理
const search = () => {
  emit('on-search', props.searchParm);
};

// 重置事件处理
const reset = () => {
  emit('on-reset');
  props.searchParm.nickName = '';
};

// 新增事件处理
const add = () => {
  emit('on-add');
};
</script>

<style scoped>

</style>
