<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
const router = useRouter()
const goLogin = () => {
  router.replace({ path: '/login' })
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">Skillup</RouterLink>
        </h1>
        <RouterLink class="entry" to="/adminlogin">=ω=</RouterLink>
      </div>
    </header>

    <section class="login-section">
      <div class="wrapper">
        <nav>
          <h1>开启新知路程 掌握未来先机</h1>
        </nav>
        <br>
        <p>
        <div class="txt">解锁更高成长境界，掌握最新技能，获得最佳学习体验！</div>
        <div class="txt">训练计划严选，考试助您全面提升技能素质！</div>
        <div class="txt">现在开始，为自己的未来加码！</div>
        </p>
        <el-button size="large" class="loginBtn" @click="goLogin">去登录</el-button>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>技术支持：Skillup小组</p>
        <p>联系我们：1234567895@qq.com</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 100px;
    height: 60px;
    margin-top: 0%;
    margin-bottom: 10px;
    a {
      margin-bottom: 0%;
      display: block;
      height: 60px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px /
        contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 20px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: #666;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/background3.jpg') no-repeat center 18px /
    100% 100%;
  /* background-repeat: repeat;  */
  height: 630px;
  position: relative;

  .wrapper {
    width: 50%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    left: 40%;
    top: 30%;
    transform: translate3d(100px, 0, 0);
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); */
    text-align: center;

    nav {
      white-space: pre-wrap;
      font-size: 40px;
      height: 60px;
      margin-bottom: 20px;
      border-bottom: 1px;
      display: flex;
      padding: 0 0px;
      text-align: center;
      align-items: center;

      h1 {
        width: 100%;
        text-align: center;
      }
    }
    p {
      font-size: 23px;
      width: 100%;
      text-align: center;

      .txt {
        margin-top: 15px;
      }
    }
    .loginBtn {
      margin-top: 20px;
      font-size: 18px;
      background: #4095e5;
      width: 20%;
      color: #fff;
      border: none;
    }
  }
}

.login-footer {
  padding: 0px 0 0px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 10px;
  }
}

a {
  text-decoration: none;
  color: #000000;
}
</style>