import {onMounted, reactive} from 'vue'

export default function useDialog() {
    const dialog = reactive({
        title: "新增",
        visible: false,
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.2,
    });

    onMounted(() => {
        window.addEventListener('resize', handleResize);
    })

    const handleResize = () => {
        dialog.width = window.innerWidth * 0.4;
        dialog.height = window.innerHeight * 0.2;
    }

    const onClose = () => { dialog.visible = false }
    const onConfirm = () => { dialog.visible = false }
    const onShow = () => {
        dialog.visible = true;
        handleResize();
    }

    return {
        dialog,
        onClose,
        onConfirm,
        onShow
    }
}
