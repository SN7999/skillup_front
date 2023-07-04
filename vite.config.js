import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //resolvers: [ElementPlusResolver()],
      resolvers: [
        //1.配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass" })
      ]
    }),
  ],
  resolve: {
    alias: {
      // 实际的路径转换 @ -> src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        //2.自动导入定制化样式文件进行样式覆盖
        additionalData:`
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  },
  //开启代理服务器
  server: {
    port: '5173',
    host: true,
    open: true,
    proxy: {
      '/api1': {
        // 后台地址
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api1/, '')
      },
      '/api2':{
        target:'http://skillup.oss-cn-beijing.aliyuncs.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api2/, '')
      }
    }
  },
		


  // build: {
  //   outDir: 'lib',
  //   lib: {
  //     entry: 'packages/index.js',
  //     formats: ['es'],
  //     fileName: (format) => `index.${format}.js`
  //   },
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖,解决插件报错问题(reading 'isCE')
  //     external: ['vue'],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: 'Vue'
  //       }
  //     }
  //   }
  // }
})
