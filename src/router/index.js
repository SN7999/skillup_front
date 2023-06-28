// createRouter: 创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'

import Open from "@/views/open/index.vue"
import Login from "@/views/login/index.vue"
import StudentLayout from "@/views/studentLayout/index.vue"
import TeacherLayout from "@/views/teacherLayout/index.vue"
import AdminLayout from "@/views/teacherLayout/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path:'/',
    component: Open,
    },
    {
    path:'/login',
    component: Login
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