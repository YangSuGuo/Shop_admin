<template>
  <MenuLogo></MenuLogo>
  <el-menu
      :collapse="isCollapse"
      :default-active="activeIndex"
      background-color="#304156"
      class="el-menu-vertical-demo"
      :hide-timeout="200"
      router
      :show-timeout="200"
      style="height:92.5vh; overflow-x: hidden; overflow-y: hidden; border-right-color: transparent"
      text-color="#fff"
      unique-opened
      @close="handleClose"
      @open="handleOpen">
    <MenuItem :menu-list="menuList"></MenuItem>
  </el-menu>
</template>
<script lang="ts" setup>
// Vue
import {computed, reactive} from "vue";
import {useRoute} from "vue-router";
// Components
import MenuItem from "./components/MenuItem.vue";
import MenuLogo from "./components/MenuLogo.vue";
// Store
import {collapseStore} from '@/stores/collapse';

const collStore = collapseStore()
const isCollapse = computed(() => {
  return collStore.getCollapse
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 路由
const route = useRoute()
const activeIndex = computed(() => {
  const {path} = route;
  return path
})

let menuList = reactive([
  {
    path: "/dashboard",
    component: "Layout",
    name: "dashboard",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:dashboard"],
    },
  },
  {
    path: "/system",
    component: "Layout",
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Setting",
      roles: ["sys:manage"],
    },
    children: [

      {
        path: "/adminUser",
        component: "/system/AdminUser",
        name: "adminUser",
        meta: {
          title: "管理员管理",
          icon: "UserFilled",
          roles: ["sys:adminUser"],
        },
      },
      {
        path: "/userList",
        component: "/system/UserList",
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "Wallet",
          roles: ["sys:userList"],
        },
      },
      {
        path: "/menuList",
        component: "/system/MenuList",
        name: "menuList",
        meta: {
          title: "菜单管理",
          icon: "Menu",
          roles: ["sys:menu"],
        },
      },
    ],
  },
  {
    path: "/goodsRoot",
    component: "Layout",
    name: "goodsRoot",
    meta: {
      title: "商品管理",
      icon: "Files",
      roles: ["sys:goodsRoot"],
    },
    children: [
      {
        path: "/goodsType",
        component: "/goods/GoodsType",
        name: "goodsType",
        meta: {
          title: "商品分类",
          icon: "Grid",
          roles: ["sys:goodsType"],
        },
      },
      {
        path: "/unusedList",
        component: "/goods/UnusedList",
        name: "unusedList",
        meta: {
          title: "闲置商品",

          icon: "Filter",
          roles: ["sys:unusedList"],
        },
      },
      {
        path: "/buyList",
        component: "/goods/BuyList",
        name: "buyList",
        meta: {
          title: "求购商品",
          icon: "Aim",
          roles: ["sys:buyList"],
        },
      },
    ],
  },
  {
    path: "/order",
    component: "Layout",
    name: "order",
    meta: {
      title: "订单管理",
      icon: "DocumentCopy",
      roles: ["sys:order"],
    },
    children: [
      {
        path: "/unusedOrder",
        component: "/order/UnusedOrder",
        name: "unusedOrder",
        meta: {
          title: "闲置订单",
          icon: "Tickets",
          roles: ["sys:unusedOrder"],
        },
      },
      {
        path: "/buyOrder",
        component: "/order/BuyOrder",
        name: "buyOrder",
        meta: {
          title: "求购订单",
          icon: "Document",
          roles: ["sys:buyOrder"],
        },
      },
    ],
  },
  {
    path: "/comment",
    component: "Layout",
    name: "comment",
    meta: {
      title: "评论管理",
      icon: "ChatLineSquare",
      roles: ["sys:comment"],
    },
    children: [
      {
        path: "/commentList",
        component: "/comment/CommentList",
        name: "commentList",
        meta: {
          title: "评论列表",
          icon: "ChatDotSquare",
          roles: ["sys:commentList"],
        },
      },
    ],
  },
])

</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 92.5vh;
}

:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}

/* 菜单点中文字的颜色 */
:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}

/* 当前打开菜单的所有子菜单颜色 */
:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}

/* 鼠标移动菜单的颜色 */
:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>
