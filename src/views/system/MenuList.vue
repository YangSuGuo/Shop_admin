<template>

  <el-button icon="Plus" type="primary" size="default" @click="addBtn" style="margin-bottom: 10px">新增</el-button>
  <!-- 表格 -->
  <el-table :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="menuId" :data="tableList"
            border stripe>
    <el-table-column prop="title" label="菜单名称"></el-table-column>
    <el-table-column prop="type" label="菜单类型">
      <template #default="scope">
        <el-tag v-if="scope.row.type == '1'" type="success" size="default">菜单</el-tag>
        <el-tag v-if="scope.row.type == '2'" type="danger" size="default">按钮</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="icon" label="图标">
      <template #default="scope">
        <el-icon>
          <component v-if="scope.row.icon" :is="scope.row.icon"></component>
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column prop="parentName" label="上级菜单"></el-table-column>
    <el-table-column prop="path" label="路由"></el-table-column>
    <el-table-column prop="code" label="权限字段"></el-table-column>
    <el-table-column prop="orderNum" label="序号"></el-table-column>


    <el-table-column label="操作" align="center" width="220">
      <template #default="scope">
        <el-button type="primary" icon="Edit" size="default" @click="editBtn(scope.row)">编辑</el-button>
        <el-button type="danger" icon="Delete" size="default"
                   @click="deleteBtn(scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增弹框 -->
  <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
             @on-close="onClose" @on-confirm="commit">
    <template v-slot:content>
      <el-form :model="addModel" ref="addRef" :rules="rules" :inline="false" label-width="80px"
               size="default">
        <el-form-item prop="type" label="菜单类型">
          <el-radio-group v-model="addModel.type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="parentId" label="上级菜单">
              <el-tree-select v-model="addModel.parentId" :data="parentList"
                              :render-after-expand="false" @check="nodeClick" show-checkbox check-strictly/>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="title" label="菜单名称">
              <el-input v-model="addModel.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="权限字段">
              <el-input v-model="addModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="orderNum" label="菜单序号">
              <el-input v-model="addModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addModel.type != '2'">
          <el-col :span="12" :offset="0">
            <el-form-item prop="path" label="路由">
              <el-input v-model="addModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="icon" label="菜单图标">
              <el-input v-model="addModel.icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>

</template>
<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { reactive, ref, onMounted,nextTick } from 'vue';
import type {FormInstance} from "element-plus";
import useWarnConfirm from "@/hooks/useWamConfirm";
import {Title} from "@/type/BaseEnum";
import {addApi, deleteApi, editApi, getParentApi, listApi} from "@/api/menu";
import type {Menu} from "@/api/menu/MenuModel";
const {global} =useWarnConfirm();
const addRef = ref<FormInstance>();
//弹窗属性
const { dialog, onClose, onShow } = useDialog();
//新增按钮的标识
const tags = ref("");
const addBtn = () => {
  tags.value = "0";
  dialog.title = Title.ADD;
  //表单高度
  dialog.height = 200;
  getParentList();
  //展示弹窗
  onShow();
  addRef.value?.resetFields();
}

//表单弹窗绑定数据
const addModel = reactive({
  menuId: '',
  parentId: '',
  title: '',
  code: '',
  type: '',
  icon: '',
  path: '',
  parentName: '',
  orderNum: ''
});
//表格数据
const tableList = ref([]);
//获取表格数据
const getList = async () => {
  let res = await listApi()
  console.log(res)
  if (res && res.code == 200) {
    tableList.value = res.data;
  }
}

onMounted(() => {
  // tableHeight.value =window.innerHeight -200
  getList()
})
const editBtn = (row: Menu) => {
  tags.value = '1';
  dialog.title = Title.EDIT;
  console.log(row)
  getParentList();
  // dialog.titie =Title.EDIT
  // dialog.height =300
  // dialog.visible=true

  nextTick(() => {
    Object.assign(addModel, row);
  });
  onShow();
  addRef.value?.resetFields();
}

const deleteBtn = async (row: Menu) => {
  console.log(row)
  const confirm = await global.$warningConfirm('确定删除该数据吗?')
  if(confirm){
    let res = await deleteApi(row);
    if(res && res.code==200){
      ElMessage.success(res.msg)
      await getList();
    }
  }
}

//获取上级菜单数据
const parentList = ref([]);
const getParentList = async () => {
  let res = await getParentApi();
  if (res && res.code == 200) {
    parentList.value = res.data;
  }
};
const nodeClick = (e: any) => {
  addModel.parentName = e.title;//获取菜单标题名
}

const rules = reactive({
  type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
  parentId: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
  title: [{ required: true, message: "请填写菜单标题", trigger: "blur" }],
  code: [{ required: true, message: "请填写菜单权限字段", trigger: "blur" }],
  icon: [{ required: true, message: "请填写菜单图标", trigger: "blur" }],
  path: [{ required: true, message: "请填写菜单path", trigger: "blur" }],
  orderNum: [{ required: true, message: "请填写序号", trigger: "blur" }],
});

//提交新建表单
const commit = () => {
  addRef.value?.validate(async (valid) => {
    // 验证通过
    if (valid) {
      let res = null;
      if(tags.value =='0'){
        res =await addApi(addModel);
      }else{
        res =await editApi(addModel);
      }
      if(res && res.code ==200) {
        ElMessage.success(res.msg)
        await getList()
        onClose()
        // dialog.visible= false;
      }
    }
  });
}
</script>

<style scoped></style>
