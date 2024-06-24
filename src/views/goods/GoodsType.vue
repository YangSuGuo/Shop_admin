<template>
  <!-- 搜索栏 -->
  <el-form :inline="true" :model="searchParm" size="default">
    <el-form-item>
      <el-input v-model="searchParm.categoryName" placeholder="请输入分类名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button icon="Search" @click="searchBtn">搜索</el-button>
      <el-button icon="Close" plain type="danger" @click="resetBtn">重置</el-button>
      <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
    </el-form-item>
  </el-form>
  <!-- 弹框组件 -->
  <SysDialog :height="dialog.height" :title="dialog.title" :visible="dialog.visible" :width="dialog.width"
             @onClose="onClose" @onConfirm="commit">
    <template v-slot:content>
      <el-form ref="addForm" :model="addModel" :rules="rules" label-width="100px" size="default">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="addModel.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类序号" prop="orderNum">
          <el-input v-model="addModel.orderNum" type="number"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>

  <!-- 表格 -->
  <el-table :data="tableList" :height="tableHeight" border stripe>
    <el-table-column label="分类名称" prop="categoryName"></el-table-column>
    <el-table-column label="分类序号" prop="orderNum"></el-table-column>
    <el-table-column align="center" label="操作" width="200">
      <template #default="scope">
        <el-button icon="Plus" size="default" type="primary" @click="editBtn(scope.row)">
          编辑
        </el-button>
        <el-button icon="Delete" size="default" type="danger" @click="deleteBtn(scope.row)">
          删除
        </el-button>

      </template>
    </el-table-column>

  </el-table>

  <!-- 分页组件 -->
  <el-pagination :current-page.sync="searchParm.currentPage" :page-size="searchParm.pageSize"
                 :page-sizes="[10,20,40,80,100]"
                 :total="searchParm.total" background
                 layout="total,sizes,prev,pager,next,jumper" @size-change="sizeChange" @current-change="currentChange"
                 style="margin-top: 5px;margin-left: 10px"/>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import useDialog from "@/hooks/useDialog";
import SysDialog from "@/components/SysDialog.vue";

import {addCategoryApi, deleteCategoryApi, editCategoryApi, listApi} from "@/api/category"
import {Title} from "@/type/BaseEnum";
import type {FormInstance} from "element-plus";
import useWarnConfirm from "@/hooks/useWamConfirm";
import type {Category} from "@/api/category/CategoryModel";

const {dialog, onClose, onShow} = useDialog();

//表单ref属性
const addForm = ref<FormInstance>();

const searchParm = reactive({
  currentPage: 1,
  pageSize: 10,
  categoryName: "",
  total: 0
});

const {global} = useWarnConfirm()

//表格数据
const tableList = ref([])
const getList = async () => {
  let res = await listApi(searchParm)
  if (res && res.code == 200) {
    console.log(res)
    tableList.value = res.data.records;
    searchParm.total = res.data.total;
  }
}

//搜索
const searchBtn = () => {
  getList()
}
//重置
const resetBtn = () => {
  searchParm.categoryName = ''
  getList()
}

//编辑
const editBtn = (row: Category) => {
  tags.value = '1'
  dialog.title = Title.EDIT
  dialog.height = 150;
  onShow();
  nextTick(() => {
    Object.assign(addModel, row)
  })
}

//删除
const deleteBtn = async (row: Category) => {
  //确定信息
  let confirm = await global.$warningConfirm('确定删除该数据')
  if (confirm) {
    let res = await deleteCategoryApi(row)
    if (res && res.code == 200) {
      ElMessage.success(res.msg)
      //刷新表格
      await getList()
    }
  }
}

//表格高度
const tableHeight = ref(0)

//加载数据
onMounted(() => {
  //计算表格高度
  tableHeight.value = window.innerHeight - 200
  getList()
})
//状态： 0 新增 1 编辑
const tags = ref('')
//新增按钮
const addBtn = () => {
  tags.value = '0'
  dialog.title = Title.ADD//将弹窗变成新增
  dialog.height = 120;
  //弹窗显示
  onShow();
};

//表单提交
const commit = () => {
  //表单验证
  addForm.value?.validate(async (valid) => {
    if (valid) {
      //提交
      let res = null;
      if (tags.value == '0') {
        res = await addCategoryApi(addModel)
      } else {
        res = await editCategoryApi(addModel)
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg)
        //刷新表格数据
        await getList()
        onClose()
      }
    }
  })
}

//表单绑定对象
const addModel = reactive({
  categoryId: "",
  categoryName: "",
  orderNum: "",
});
//表单验证规则
const rules = reactive({
  categoryName: [{required: true, message: "请填写分类名称", trigger: "blur"},],
  orderNum: [{required: true, message: "请填写分类序号", trigger: "blur"},]
})

//页容量改变时触发
const sizeChange = (size: number) => {
  console.log(size)
}
//页数改变时触发
const currentChange = (page: number) => {
  console.log(page)
}

</script>

<style scoped>

</style>
