// createRouter: 创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'

import Open from "@/views/open/index.vue"
import Login from "@/views/login/index.vue"
import StudentLayout from "@/views/studentLayout/index.vue"
import TeacherLayout from "@/views/teacherLayout/index.vue"
import AdminLayout from "@/views/adminLayout/index.vue"
import StudentCurriculum from "@/views/studentLayout/component/curriculum/studentCurriculum.vue"
import studentCurriculumDetail from '@/views/studentLayout/component/curriculum/curriculumDetail.vue'
import StudentExam from "@/views/studentLayout/component/studentExam.vue"
import StudentScore from "@/views/studentLayout/component/studentScore.vue"
import StudentTraining from "@/views/studentLayout/component/studentTraining.vue"
import StudentDetail from "@/views/studentLayout/component/studentDetail.vue"
import TeacherCurriculum from "@/views/teacherLayout/component/teacherCurriculum.vue"
import TeacherStudent from "@/views/teacherLayout/component/teacherStudent.vue"
import TeacherDetail from "@/views/teacherLayout/component/teacherDetail.vue"
import AdminCurriculum from "@/views/adminLayout/component/adminCurriculum.vue"
import AdminStudent from "@/views/adminLayout/component/adminStudent.vue"
import AdminTeacher from "@/views/adminLayout/component/adminTeacher.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: Open,
    },
    {
      path:'/login',
      component: Login,
	  },
    {
      path:'/student',
      component: StudentLayout,
      children:[
        {
          path:'/student',
          component: StudentCurriculum,
          children:[
            {
              path:'/student',
              component: studentCurriculumDetail
            }
          ]
        },
        {
          path:'/student/exam',
          component: StudentExam,
        },
        {
          path:'/student/score',
          component: StudentScore,
        },
        {
          path:'/student/training',
          component: StudentTraining,
        },
        {
          path:'/student/detail',
          component: StudentDetail,
        }
      ]
    },
    {
      path:'/teacher',
      component: TeacherLayout,
      children:[
        {
          path:"/teacher",
          component:TeacherCurriculum,
        },
        {
          path:"/teacher/student",
          component:TeacherStudent,
        },
        {
          path:"/teacher/detail",
          component:TeacherDetail,
        },
        ]
    },
    {
      path:'/admin',
      component: AdminLayout,
      children:[
        {
          path:"/admin",
          component:AdminCurriculum,
        },
        {
          path:"/admin/student",
          component:AdminStudent,
        },
        {
          path:"/admin/teacher",
          component:AdminTeacher,
        }
      ]

   }
  ]
})

export default router