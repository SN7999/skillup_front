//入口函数
import './assets/main.css'
//createAPP和new Vue()一样创建应用实例对象
import { createApp } from 'vue'
import App from './App.vue'

//1.以APP作为参数生成一个应用实例对象
//2.挂载到id为app的节点上
createApp(App).mount('#app')
