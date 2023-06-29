<script setup>
import { useLogoStore } from '@/stores/getlogo'
import { ref } from 'vue'
//1.导入use打头的方法
import { useEndoutStore } from '@/stores/endout'
//2.执行方法得到store实例对象
const endoutStore = useEndoutStore()
const getLogoStore = useLogoStore()
const getHeadImage = () => {
    return new URL(`@/assets/images/logo.png`,import.meta.url).href
}
const userInfo = ref(false)
const hideInfo = ()=>{
  setTimeout(()=>{
    userInfo.value = false
  },3000)
}
const showInfo = () => {
  userInfo.value = true
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu
      :ellipsis="false"
      @select="handleSelect"
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      ext-color="#000"
      active-text-color="#4095e5"
      router  
      >
        <el-image style="height:45px;margin: auto;" :src="getLogoStore.logoUrl"/>
        <el-menu-item index="/student">课程</el-menu-item>
        <el-menu-item index="/student/exam">考试</el-menu-item>
        <el-menu-item index="/student/training">在线培训</el-menu-item>
        <el-menu-item index="/student/score">成绩查询</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/student/detail">个人中心</el-menu-item>
        <div class="box1">
          <el-avatar :size="100" class="userMessage" :src="getHeadImage()" @mouseover="showInfo" @mouseleave="hideInfo"/>
          <div v-show="userInfo" class="box2">
            <p @click="endoutStore.endOut">退出</p>
          </div> 
        </div>
      </el-menu>
    </el-header>
    <el-main>
    <!-- 二级路由入口 -->
    <RouterView/>
    </el-main>
  </el-container>
</template>

<style lang="scss">
  .flex-grow {
      flex-grow: 1;
  }
  .box1{
    position: relative;
    width: 7%;
    height: 50px;
    margin-right: 20px;
    .userMessage{
        width: 100%;
        height: 100%;
        &:hover{
            cursor: pointer;
        }
    }
  .box2{
      position: absolute;
      bottom: -38px;
      right: -50%;
      border: 1px solid #ccc;
      width: 50px;
      height: 35px;
      background-color: #fff;
      box-sizing: border-box;
      p{
          margin-top: 3px;
          text-align: center;
          font-size: 8px;
          &:hover{
              cursor: pointer;
          }
      }
    }
  }

</style>
