import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
// 全局注册
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import warningConfirm from "@/utils/warningConfirm";
// ECharts
import * as echarts from 'echarts'
const app = createApp(App)

app.use(ElementPlus, {locale: zhCn})
app.use(createPinia())
app.use(router)

// 全局注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//全局挂载警告弹窗
app.config.globalProperties.$warningConfirm = warningConfirm;
// 全局挂载echarts
app.config.globalProperties.$echarts = echarts;

app.mount('#app')
