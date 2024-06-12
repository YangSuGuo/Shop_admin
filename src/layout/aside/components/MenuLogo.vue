<template>
  <!-- logo图片 -->
  <div class="logo">
    <el-image :src="ConneR_Logo" class="img" fit="cover" loading="lazy">
      <template #error>
        <div class="image-slot">
          <el-icon>
            <icon-picture/>
          </el-icon>
        </div>
      </template>
    </el-image>
    <span v-show="show" class="logo-title">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import ConneR_Logo from '@/assets/ConneR_Logo.png'

import {collapseStore} from "@/stores/collapse";

const store = collapseStore();
const show = ref(true)

// 观察侧边栏是否折叠
watch(
    () => store.getCollapse,
    (collapsed: boolean) => {
      if (!collapsed) {
        setTimeout(() => {
          show.value = !collapsed;
        }, 350);
      } else {
        show.value = !collapsed;
      }
    }
)

// logo标题
const title ="转转乐";
</script>

<style scoped>
.logo {
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #334054;
  text-align: center;
  cursor: pointer;
  align-items: center;
}

/* 图片 */
.img {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  margin-left: 20px;
  border-radius: 35%;
}

.logo-title {
  color: #FFF;
  font-weight: 800;
  line-height: 60px;
  font-size: 22px;
  font-family: FangSong;
}
</style>
