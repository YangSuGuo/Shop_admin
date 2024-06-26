import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
// 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import path from "path";

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
    plugins: [
        vue(),
        VueDevTools(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
            ],
            dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ],
            dts: path.resolve(pathSrc, 'components.d.ts'),
        })
    ],
    resolve: {
        alias: {
            '@': pathSrc,
        }
    }
})
