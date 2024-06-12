import {defineStore} from "pinia"

export const collapseStore = defineStore('collapseStore', {
    // 定义共享数据
    state: () => {
        return {
            // 侧边栏状态
            collapse: false
        }
    },
    // 修改共享数据
    actions: {
        setCollapse(collapse: boolean) {
            this.collapse = collapse;
        }
    },
    // 获取共享数据
    getters: {
        getCollapse(state) {
            return state.collapse
        }
    },
})
