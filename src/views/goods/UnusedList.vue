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

  <el-table :height="tableHeight" :data="tableList" border stripe>
    <el-table-column prop="image" label="商品图片">
      <template #default="scope">
        <el-image v-if="scope.row.image" style="width: 160px; height: 60px"
                  :src="scope.row.image.split(',')[0]"/>
      </template>
    </el-table-column>

    <el-table-column prop="type" label="类型">
      <template #default="scope">
        <el-tag type="danger" v-if="scope.row.type == '0'" size="default" effect="dark">闲置</el-tag>
        <el-tag type="success" v-if="scope.row.type == '1'" size="default" effect="dark">求购</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="goodsPrice" label="商品价格"></el-table-column>
    <el-table-column prop="goodsDDesc" label="商品描述"></el-table-column>
    <el-table-column prop="userName" label="发布人"></el-table-column>
    <el-table-column prop="phone" label="发布人电话"></el-table-column>
    <el-table-column prop="wxNum" label="发布人微信"></el-table-column>
    <el-table-column prop="address" label="商品地址"></el-table-column>
    <el-table-column prop="status" label="上下架状态">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="'0'" :inactive-value="'1'"
                   :before-change="beforeStatus" @change="changeStatus(scope.row.status,scope.row.goodsId)"/>

      </template>
    </el-table-column>

    <el-table-column prop="setIndex" label="推荐首页">
      <template #default="scope">
        <el-switch v-model="scope.row.setIndex" :active-value="'1'" :inactive-value="'0'"
                   :before-change="beforeSetIndex" @change="changeSetIndex(scope.row.setIndex,scope.row.goodsId)"/>
      </template>
    </el-table-column>

    <el-table-column prop="sellStatus" label="出售状态">
      <template #default="scope">
        <el-tag type="danger" v-if="scope.row.type == '0'" size="default" effect="dark">未出售</el-tag>
        <el-tag type="success" v-if="scope.row.type == '1'" size="default" effect="dark">已出售</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger" icon="Delete" size="default" @click="deleteBtn(scope.row.goodsId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination @size-change="sizeChange" @current-change="currentChange"
                 :current-page.sync="searchParm.currentPage"
                 :page-sizes="[10,20,40,80,100]" :page-size="searchParm.pageSize"
                 layout="total,sizes,prev,pager,next,jumper" :total="searchParm.total" background
                 style="margin-top: 5px;margin-left: 10px"/>
</template>
<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from "vue";

//导入api
import {deleteApi, getGoodsListApi, setIndexApi, upanddownApi} from "@/api/goods";
import useWarnConfirm from "@/hooks/useWamConfirm";

const {global} = useWarnConfirm();

//收缩栏绑定对象
const searchParm = reactive({
  currentPage: 1,
  pageSize: 10,
  goodsName: "",
  total: 0,
})

const tableList = ref([]);

//表格分页高度
const tableHeight = ref(0)

//删除
const deleteBtn = async (goodsId: string) => {
  console.log(goodsId);
  let confirm = await global.$warningConfirm("确定删除吗");
  if (confirm) {
    let res = await deleteApi({
      goodsId: goodsId,
    });
    if (res && res.code == 200) {
      await getGoodsList();//刷新
    }
  }
}

//获取表格数据
const getGoodsList = async () => {
  let res = await getGoodsListApi(searchParm);
  if (res && res.code == 200) {
    console.log(res);
    tableList.value = res.data.records;
    searchParm.total = res.data.total;
  }
};


//分页容量改变时触发
const sizeChange = (size: number) => {
  searchParm.pageSize = size;
  getGoodsList();
};

//分页数改变时触发
const currentChange = (page: number) => {
  searchParm.currentPage = page;
  getGoodsList();
};

//重置
const resetBtn = () => {
  searchParm.goodsName = '';
  getGoodsList();
}
//搜搜
const searchBtn = () => {
  getGoodsList();
}

//上下架操作之前的时间--弹窗
const beforeStatus = async () => {
  let confirm = await global.$warningConfirm("确定上下架吗");
  return new Promise((resolve, reject) => {
    if (confirm) {
      return resolve(confirm);
    } else {
      return reject(confirm);
    }
  })
}

//上下级操作
const changeStatus = async (status: string, goodsId: string) => {
  let res = await upanddownApi({
    goodsId: goodsId,//商品id
    status: status,//上下架参数
  });
  if (res && res.code == 200) {
    await getGoodsList();//刷新列表
  }
};

//推荐首页操作之前的事
const beforeSetIndex = async () => {
  let confirm = await global.$warningConfirm("确定推荐首页吗");
  return new Promise((resolve, reject) => {
    if (confirm) {
      return resolve(confirm);
    } else {
      return reject(confirm);
    }
  })
};

//首页操作
const changeSetIndex = async (type: string, goodsId: string) => {
  console.log(type);
  console.log(goodsId);
  let res = await setIndexApi({
    goodsId: goodsId,//商品id
    setIndex: type,//上下架参数
  });
  if (res && res.code == 200) {
    await getGoodsList();//刷新列表
  }
};


onMounted(() => {
  getGoodsList();
  nextTick(() => {
    //计算表格高度
    tableHeight.value = window.innerHeight - 200;
  });
})
</script>
<style scoped>

</style>
