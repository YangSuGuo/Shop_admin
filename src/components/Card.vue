<template>
  <div class="card">
    <div class="card-image-container">
      <el-image class="card-left" :src="imageSrcOrDefault" fit="cover"/>
    </div>
    <div class="card-content-container">
      <div class="card-title">
        <div class="text-title">{{ text.title }}</div>
        <div class="text-brief">{{ text.brief }}</div>
      </div>
      <div class="card-extra">
        <div class="text-cardQuantity">{{ text.cardQuantity }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface TextProps {
  title: string;
  brief: string;
  cardQuantity: string;
}

const props: {
  text: TextProps,
  imageSrc: string
} = defineProps<{
  text: TextProps;
  imageSrc: string
}>();

// 提供默认值以防止未定义的props值导致的错误
const defaultImageSrc = "src/assets/svg/FormBuilder.svg";
const imageSrcOrDefault = props.imageSrc ?? defaultImageSrc;

</script>

<style scoped lang="scss">
.card {
  background-color: #FFF;
  border-radius: 10px;
  max-width: 380px;
  height: 130px;

  display: flex;
  //align-items: center;

  &-image-container {
    display: flex;
    justify-content: center;
    align-items: center;

    //background-color: #F43030;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    width: 30%;
    height: 130px;
    margin-left: 10px;
  }

  &-content-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &-title {
    display: flex;
    flex-direction: column;

    height: 100%;
    margin-left: 8%;
    margin-top: 10%;
  }

  &-extra {
    width: 35%;
    height: 100%;
    //background-color: #B0375D;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.text {
  &-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &-brief {
    font-size: 15px;
    color: #909399;
  }

  &-cardQuantity {
    opacity: 0;
    font-size: 20px;
  }
}
</style>
