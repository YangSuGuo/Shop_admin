import {defineStore} from "pinia"

export const userStore = defineStore('userStore', {
    // 定义共享数据
    state: () => {
        return {
            userId: '',
            nickName: ''
        }
    },
    // 修改共享数据
    actions: {
        setUserId(userId: string) {
            this.userId = userId
        }
    },
    // 获取共享数据
    getters: {
        getUserId: (state) => {
            return state.userId
        }
    },
})
