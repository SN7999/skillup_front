// createRouter: 创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import { getSessionCookie } from '@/cookie.js'

import Open from '@/views/open/index.vue'
import Login from '@/views/login/index.vue'
import AdminLogin from '@/views/login/adminLogin.vue'
import StudentLayout from '@/views/studentLayout/index.vue'
import TeacherLayout from '@/views/teacherLayout/index.vue'
import AdminLayout from '@/views/adminLayout/index.vue'
import StudentCurriculum from '@/views/studentLayout/component/curriculum/studentCurriculum.vue'
import studentCurriculumDetail from '@/views/studentLayout/component/curriculum/curriculumDetail.vue'
import StudentExam from '@/views/studentLayout/component/studentExam.vue'
import ExamDetail from '@/views/studentLayout/component/exam/examDetail.vue'
import ExamDetailContent from '@/views/studentLayout/component/exam/examContent.vue'
import StudentScore from '@/views/studentLayout/component/studentScore.vue'
import StudentTraining from '@/views/studentLayout/component/training/studentTraining.vue'
import StudentDetail from '@/views/studentLayout/component/studentDetail.vue'
import TrainingDetail from '@/views/studentLayout/component/training/trainingDetail.vue'
import TeacherCurriculum from '@/views/teacherLayout/component/class/teacherCurriculum.vue'
import TeachetPublishClass from '@/views/teacherLayout/component/class/publishClass.vue'
import TeacherStudent from '@/views/teacherLayout/component/teacherStudent.vue'
import TeacherDetail from '@/views/teacherLayout/component/teacherDetail.vue'
import TeacherPassDetail from '@/views/teacherLayout/component/class/passDetail.vue'
import TeacherUnpassDetail from '@/views/teacherLayout/component/class/unpassDetail.vue'
import TeacherRejectedDetail from '@/views/teacherLayout/component/class/rejectedDetail.vue'
import AdminCurriculum from '@/views/adminLayout/component/class/adminCurriculum.vue'
import AdminStudent from '@/views/adminLayout/component/student/adminStudent.vue'
import AdminStudentCancel from '@/views/adminLayout/component/student/cancel.vue'
import AdminTeacher from '@/views/adminLayout/component/teacher/adminTeacher.vue'
import AdminTeacherCancel from '@/views/adminLayout/component/teacher/cancel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Open,
      meta: {
        title: 'Skillup'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/adminlogin',
      component: AdminLogin,
      meta: {
        title: '管理员登录'
      }
    },
    {
      path: '/student',
      component: StudentLayout,
      meta: {
        isLogin: true,
        active: '/student',
        title: '学生主页'
      },
      children: [
        {
          path: '/student',
          component: StudentCurriculum,
          meta: {
            isLogin: true,
            active: '/student',
            title: '学生课程'
          }
        },
        {
          path: '/student/exam',
          component: StudentExam,
          meta: {
            isLogin: true,
            title: '学生考试'
          }
        },
        {
          path: '/student/score',
          component: StudentScore,
          meta: {
            isLogin: true,
            title: '学生成绩'
          }
        },
        {
          path: '/student/training',
          component: StudentTraining,
          meta: {
            isLogin: true,
            title: '学生培训'
          }
        },
        {
          path: '/student/detail',
          component: StudentDetail,
          meta: {
            isLogin: true,
            title: '学生个人中心'
          }
        },
        {
          path: '/student/curriculum/:id',
          component: studentCurriculumDetail,
          meta: {
            isLogin: true,
            active: '/student',
            title: '学生选课'
          }
        },
        {
          path: '/student/training/detail/:id',
          component: TrainingDetail,
          meta: {
            isLogin: true,
            active: '/student/training',
            title: '培训详情'
          }
        },
        {
          path: '/student/exam/detail/:id',
          component: ExamDetail,
          meta: {
            isLogin: true,
            active: '/student/exam',
            title: '考试详情'
          }
        },
        {
          path: '/student/exam/detail/content/:id',
          component: ExamDetailContent,
          meta: {
            isLogin: true,
            active: '/student/exam',
            title: '考试内容'
          }
        }
      ]
    },
    {
      path: '/teacher',
      component: TeacherLayout,
      meta: {
        isLogin: true,
        title: '老师课程'
      },
      children: [
        {
          path: '/teacher',
          component: TeacherCurriculum,
          meta: {
            isLogin: true,
            title: '老师课程'
          }
        },
        {
          path: '/teacher/student',
          component: TeacherStudent,
          meta: {
            isLogin: true,
            title: '老师查看学生'
          }
        },
        {
          path: '/teacher/detail',
          component: TeacherDetail,
          meta: {
            isLogin: true,
            title: '老师个人中心'
          }
        },
        {
          path: '/teacher/publish',
          component: TeachetPublishClass,
          meta: {
            isLogin: true,
            title: '老师发布课程',
            active: '/teacher'
          }
        },
        {
          path: '/teacher/passdetail/:id',
          component: TeacherPassDetail,
          meta: {
            isLogin: true,
            title: '老师通过课程详情',
            active: '/teacher'
          }
        },
        {
          path: '/teacher/unpassdetail/:id',
          component: TeacherUnpassDetail,
          meta: {
            isLogin: true,
            title: '老师审核中课程详情',
            active: '/teacher'
          }
        },
        {
          path: '/teacher/rejectdetail/:id',
          component: TeacherRejectedDetail,
          meta: {
            isLogin: true,
            title: '老师已驳回课程详情',
            active: '/teacher'
          }
        }
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        isLogin: true,
        title: '管理员主页'
      },
      children: [
        {
          path: '/admin',
          component: AdminCurriculum,
          meta: {
            isLogin: true,
            title: '管理员课程'
          }
        },
        {
          path: '/admin/student',
          component: AdminStudent,
          meta: {
            isLogin: true,
            title: '管理学生'
          }
        },
        {
          path: '/admin/teacher',
          component: AdminTeacher,
          meta: {
            isLogin: true,
            title: '管理老师'
          }
        },
        {
          path: '/admin/student/cancel',
          component: AdminStudentCancel,
          meta: {
            isLogin: true,
            title: '学生注销处理',
            active: '/admin/student'
          }
        },
        {
          path: '/admin/teacher/cancel',
          component: AdminTeacherCancel,
          meta: {
            isLogin: true,
            title: '老师注销处理',
            active: '/admin/teacher'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    // 判断当前路由是否需要路由验证
    const JSESSIONID = getSessionCookie()
    if (JSESSIONID) {
      // 判断当前的session是否存在
      next() // 存在继续执行
    } else {
      next('/login') //不存在需要跳到登陆页
    }
  } else {
    // 不需要验证路由，继续执行
    next()
  }
})

export default router
