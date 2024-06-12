<script lang="ts" setup>
// 弹出框变量赋值
import type {DialogProps} from "@/type/DialogProps";

const props = withDefaults(defineProps<DialogProps>(), {
  title: '标题',
  visible: false,
  width: window.innerWidth * 0.4,
  height: window.innerWidth * 0.2
});

//接收父组件传递的方法
const emit = defineEmits(["onClose", "onConfirm"]);
//定义弹框的关闭
const onClose = () => {
  emit("onClose");
};
//定义弹框的确定
const onConfirm = () => {
  emit("onConfirm");
};
</script>

<template>
  <!-- 弹出框+标题 -->
  <el-dialog
      :before-close="onClose"
      :close-on-click-modal="false"
      :modal="false"
      :model-value="props.visible"
      :show-close="false"
      :title="props.title"
      :width="props.width + 'px'"
      append-to-body
      center
      draggable>
    <!-- 内容 -->
    <div :style="{ height: height + 'px' }" class="container">
      <slot name="content"></slot>
    </div>
    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
// 弹出框样式
.container {
  overflow-x: initial;
  overflow-y: auto;
}

.el-dialog {
  //border-top-left-radius: 7px !important;
  border-radius: 7px !important;
  padding: 0;
  // 头部
  .el-dialog__header {
    margin-right: 0px;
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #304156 !important;
    padding: 10px;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }

  // 主体内容
  .el-dialog__body {
    padding: 10px;
  }

  // 底部
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>
