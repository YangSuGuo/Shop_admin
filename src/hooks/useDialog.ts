import {onMounted, reactive} from 'vue'

export default function useDialog() {
    // 弹框属性
    const dialog = reactive({
        title: "新增",
        visible: false,
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.2,
    });

    // 监听窗口尺寸变化并更新dialog的宽高
    onMounted(() => {
        window.addEventListener('resize', handleResize);
    })

    const handleResize = () => {
        dialog.width = window.innerWidth * 0.4;
        dialog.height = window.innerHeight * 0.2;
    }

    // 弹框关闭
    const onClose = () => {
        dialog.visible = false;
    };

    // 弹框确定
    const onConfirm = () => {
        dialog.visible = false;
        // 可在此处添加确认操作的逻辑
    }

    // 显示弹框，并更新尺寸（如果需要的话）
    const onShow = () => {
        dialog.visible = true;
        handleResize(); // 在显示时确保尺寸是最新的
    }

    return {
        dialog,
        onClose,
        onConfirm,
        onShow
    }
}