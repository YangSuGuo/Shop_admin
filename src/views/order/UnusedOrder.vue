<template>
  <!-- 搜索栏 -->
  <el-form :model="searchParm" :inline="true" size="default">
    <el-form-item>
      <el-input placeholder="请输入商品名称" v-model="searchParm.goodsName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button icon="Search" @click="searchBtn">搜索</el-button>
      <el-button type="danger" plain icon="Close" @click="resetBtn">重置</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableList" :height="tableHeight" border stripe>
    <el-table-column label="商品图片" prop="image">
      <template #default="scope">
        <el-image v-if="scope.row.image" style="width: 100px; height: 60px"
                  :src="scope.row.image.split(',')[0]"/>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="goodsName"/>
    <el-table-column label="期望价格" prop="goodsPrice"/>
    <el-table-column label="交易价格" prop="price"/>
    <el-table-column label="购买人" prop="nickName"/>
    <el-table-column label="交易时间" prop="createTime"/>
  </el-table>

  <!-- 分页组件 -->
  <el-pagination :current-page.sync="searchParm.currentPage" :page-size="searchParm.pageSize"
                 :page-sizes="[10,20,40,80,100]"
                 :total="searchParm.total" background
                 layout="total,sizes,prev,pager,next,jumper"
                 @size-change="sizeChange"
                 @current-change="currentChange"
                 style="margin-top: 5px;margin-left: 10px"/>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {getUnusedOrderListApi} from "@/api/order";

//表格高度
const tableHeight = ref(0)
const tableList = ref([])

const getList = async () => {
  let res = await getUnusedOrderListApi(searchParm);
  if (res && res.code == 200) {
    console.log(res);
    tableList.value = res.data.records;
    searchParm.total = res.data.total;
  }
}

onMounted(() => {
  //计算表格高度
  tableHeight.value = window.innerHeight - 200
  getList();
})

const searchParm = reactive({
  currentPage: 1,
  pageSize: 10,
  goodsName: '',
  total: 0
})

// 搜索
const searchBtn = () => {
  getList();
}

// 重置
const resetBtn = () => {
  searchParm.currentPage = 1;
  searchParm.goodsName = '';
  getList();
}

//页容量改变时触发
const sizeChange = (size: number) => {
  searchParm.pageSize = size;
  getList();
}
//页数改变时触发
const currentChange = (page: number) => {
  searchParm.currentPage = page;
  getList();
}
</script>

<style scoped>

</style>
