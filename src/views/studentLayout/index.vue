<script setup>
import { useLogoStore } from '@/stores/getlogo'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
//1.导入use打头的方法
import { useEndoutStore } from '@/stores/endout'
import { useUserStore } from '@/stores/user'
import { getSignUp } from '@/apis/studentAPI'
import { ElMessage } from 'element-plus'
//2.执行方法得到store实例对象
const endoutStore = useEndoutStore()
const getLogoStore = useLogoStore()
const userStore = useUserStore().userInfo

const userInfo = ref(false)
const hideInfo = () => {
  setTimeout(() => {
    userInfo.value = false
  }, 1000)
}
const showInfo = () => {
  userInfo.value = true
}

const route = useRoute()

let activePath = () => {
  if (route.meta.active) {
    return route.meta.active
  }
  return route.path
}
// const getHeadImage = () => {
//     return new URL(`@/assets/images/logo.png`,import.meta.url).href
// }

//签到
const signUp = async () => {
  const result = await getSignUp()
  if (result.data.code == 200) {
    ElMessage.success(result.data.msg)
  } else {
    ElMessage.error('签到失败')
  }
}

onBeforeMount(() => {
  activePath()
})
</script>

<template>
  <el-container class="container">
    <el-header class="fixed-header">
      <el-menu :ellipsis="false" @select="handleSelect" :default-active="activePath()" class="el-menu-demo" mode="horizontal" background-color="#fff" ext-color="#000" active-text-color="#4095e5" router>
        <el-image style="height:45px;margin: auto;" :src="getLogoStore.logoUrl" />
        <el-menu-item index="/student">课程</el-menu-item>
        <el-menu-item index="/student/exam">考试</el-menu-item>
        <el-menu-item index="/student/training">在线培训</el-menu-item>
        <el-menu-item index="/student/score">成绩查询</el-menu-item>
        <div class="flex-grow" />
        <el-button style="margin-right: 15px;margin-top: auto;margin-bottom: auto;" @click="signUp">签到</el-button>
        <el-menu-item index="/student/detail">个人中心</el-menu-item>

        <el-avatar :size="50" shape="circle" class="userMessage" :src="userStore.data.imageurl" @mouseover="showInfo" @mouseleave="hideInfo" />
        <div class="box1">
          <div v-show="userInfo" class="box2">
            <p @click="endoutStore.endOut">退出</p>
          </div>
        </div>
      </el-menu>
    </el-header>
    <el-main class="main-content">
      <!-- 二级路由入口 -->
      <RouterView />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
}

.fixed-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.main-content {
  margin-top: 40px; /* 根据 .fixed-header 的高度来调整 margin-top */
}

.flex-grow {
  flex-grow: 1;
}
.userMessage:hover {
  cursor: pointer;
}

.box1 {
  position: relative;
  width: auto;
  height: 50px;
  margin-right: 20px;

  .box2 {
    position: absolute;
    bottom: -38px;
    right: -50%;
    border: 1px solid #ccc;
    width: 50px;
    height: 35px;
    background-color: #fff;
    box-sizing: border-box;
    p {
      margin-top: 3px;
      text-align: center;
      font-size: 8px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
