<script lang="ts" setup>
  import Menu from "@/layout/aside/Menu.vue";
  import Collapse from "./header/Collapse.vue"
  import BreadCrumb from "@/layout/header/BreadCrumb.vue";
  import Logout from "@/layout/header/Logout.vue";
</script>

<template>
  <div style="height: 100%">
    <el-container class="myContainer">
      <el-aside class="aside" width="auto">
        <Menu/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <Collapse></Collapse>
            <BreadCrumb></BreadCrumb>
          </div>
          <Logout class="header-right"/>
        </el-header>
        <el-main class="myMain">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .myContainer {
    height: 100%;
    background-color: #E4E7ED; /* 设置背景为浅灰色 */

    .header {
      background-color: #334154;
      display: flex;
      align-items: center;
      color: #FFF;
      justify-content: space-between;

     .header-left{
       display: flex;
       align-items: center;
     }

      .header-right{
        margin-right: 3%;
      }
    }

    .myMain {
      background-color: #F5F7FA;
      border-radius: 10px;
    }
  }
</style>
