// createRouter: 创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'

import Open from "@/components/open/index.vue"
import Login from "@/components/login/index.vue"
import StudentLayout from "@/components/studentLayout/index.vue"
import TeacherLayout from "@/components/teacherLayout/index.vue"
import AdminLayout from "@/components/teacherLayout/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path:'/',
      component: Open,
      children:[
        {
          path:'/login',
          component: Login
        }
      ]
   },
   {
    path:'/student',
    component: StudentLayout
   },
   {
    path:'/teacher',
    component: TeacherLayout
   },
   {
    path:'/admin',
    component: AdminLayout
   }
  ]
})

export default router