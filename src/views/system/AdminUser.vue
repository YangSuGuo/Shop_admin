<template>
  <Search
      v-model:searchParm=searchParm
      :showAddButton=true
      input-placeholder="请输入姓名"
      @on-search="searchBtn"
      @on-reset="resetBtn"
      @on-add="addBtn"
  />

  <SysDialog
      :height="dialog.height"
      :title="dialog.title"
      :visible="dialog.visible"
      :width="dialog.width"
      @on-close="onClose"
      @on-confirm="commit">
    <template v-slot:content>
      <el-form ref="addRef" :model="addModel" :rules="rulse" label-position="left" label-width="auto">
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="addModel.nickName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addModel.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="登录账户" prop="username">
          <el-input v-model="addModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addModel.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="addModel.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>

  <!-- 管理员数据列表 -->
  <el-table :data="tableList" :height="tableHeight" border stripe>
    <el-table-column label="姓名" prop="nickName"></el-table-column>
    <el-table-column label="性别" prop="sex">

      <template #default="scope">
        <el-tag v-if="scope.row.status == '1'" effect="dark" type="danger">女</el-tag>
        <el-tag v-if="scope.row.status == '0'" effect="dark">男</el-tag>
      </template>

    </el-table-column>
    <el-table-column label="电话" prop="phone"></el-table-column>
    <el-table-column label="账户" prop="username"></el-table-column>
    <el-table-column label="状态" prop="status">

      <template #default="scope">
        <el-tag v-if="scope.row.status == '1'" effect="dark" type="danger">停用</el-tag>
        <el-tag v-if="scope.row.status == '0'" effect="dark">启用</el-tag>
      </template>

    </el-table-column>
    <el-table-column align="center" label="操作" width="220">

      <template #default="scope">
        <el-button icon="Edit" size="default" type="primary" @click="editBtn(scope.row)">编辑</el-button>
        <el-button icon="Delete" size="default" type="danger" @click="deleteBtn(scope.row)">删除</el-button>
      </template>

    </el-table-column>
  </el-table>

  <!--  分页  -->
  <el-pagination :current-page.sync="searchParm.currentPage"
                 :page-size="searchParm.pageSize"
                 :page-sizes="[10, 20, 40, 80, 100]"
                 :total="searchParm.total" background
                 layout="total, sizes, prev, pager, next, jumper"
                 @size-change="sizeChange"
                 @current-change="currentChange"
                 style="margin-top: 5px;margin-left: 10px"
  />
</template>

<script lang="ts" setup>
import Search from "@/components/Search.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import useWarnConfirm from "@/hooks/useWamConfirm";
import {Title} from "@/type/BaseEnum";
import {addAdminUserApi, deleteAdminApi, editAdminApi, getListApi} from "@/api/user/";
import type {User} from "@/api/user/UserModel";
import type {FormInstance} from "element-plus";

const {global} = useWarnConfirm();
const addRef = ref<FormInstance>();
const {dialog, onClose,} = useDialog();
const tags = ref("")

const searchParm = reactive({
  nickName: "",
  pageSize: 10,
  currentPage: 1,
  total: 0
});

//表格数据
const tableList = ref([])

//表格高度
const tableHeight = ref(0)

// 表单实体
const addModel = reactive({
  userId: "",
  username: "",
  password: "",
  nickName: "",
  phone: "",
  sex: "",
  status: "",
});

// 表单验证
const rulse = reactive({
  username: [{required: true, message: '请输入登录账号', trigger: 'blur'}],
  password: [{required: true, message: '请输入登录密码', trigger: 'blur'}],
  nickName: [{required: true, message: '请输入名字', trigger: 'blur'}],
  phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
  sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
});

const commit = () => {
  addRef.value?.validate(async (valid) => {
    if (valid) {
      console.log(addModel);
      //提交数据
      let res = null;
      if (tags.value == "0") { // add
        res = await addAdminUserApi(addModel);
      } else { // edit
        res = await editAdminApi(addModel);
      }

      if (res && res.code === 200) {
        // 提示
        ElNotification({
          title: '成功',
          message: res.msg,
          type: 'success',
        });
        await getList();
        // 关闭弹框
        dialog.visible = false;
      }
    }
  });
};

const getList = async () => {
  let res = await getListApi(searchParm);
  if (res && res.code == 200) {
    console.log("---------------------");
    console.log(res);
    tableList.value = res.data.records;//管理员数据
    searchParm.total = res.data.total;//查询总条数
  }
}

// 一进入管理员管理页面就查询管理员信息并显示列表
onMounted(() => {
  tableHeight.value = window.innerHeight - 200
  getList();
})

// 新增
const addBtn = () => {
  addModel.userId = ""
  addModel.username = ""
  addModel.password = ""
  addModel.nickName = ""
  addModel.phone = ""
  addModel.sex = ""
  addModel.status = ""

  tags.value = '0'
  dialog.title = Title.ADD;
  dialog.height = 300;
  dialog.visible = true;
};

// 编辑
const editBtn = (row: User) => {
  tags.value = "1"
  dialog.title = Title.EDIT//将编辑弹窗的标题换成编辑
  dialog.height = 300;//编辑弹窗高度
  dialog.visible = true;//显示弹窗

  nextTick(() => {
    Object.assign(addModel, row)
  });
}

// 删除
const deleteBtn = async (row: User) => {
  console.log(row)
  console.log(global)
  const confirm = await global.$warningConfirm("确定删除该数据吗？")
  if (confirm) {
    let res = await deleteAdminApi(row.userId!)
    if (res && res.code == 200) {
      ElMessage.success(res.msg)
      await getList()
    }
  }
}

//页容量改变时触发
const sizeChange = (size: number) => {
  console.log(size)
}

//页数改变时触发
const currentChange = (page: number) => {
  console.log(page)
}

// 搜索
const searchBtn = () => {
  getList()
}

// 重置
const resetBtn = () => {
  searchParm.nickName = ''
  getList()
}
</script>

<style lang="scss" scoped>
</style>


