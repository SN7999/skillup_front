<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import { getVercodeAPI, getVercodeAPIT } from '@/apis/loginVercodeAPI'
import { getVercodeFogAPI, getVercodeFogAPIT } from '@/apis/resetVercodeAPI'
import { registerAPI, registerAPIT } from '@/apis/registerAPI'
import { resetAPI, resetAPIT } from '@/apis/resetAPI'
import { useUserStore } from '@/stores/user'
//控制显示内容切换
const testStatus = ref(0)
console.log(testStatus.value)
const setTestStatusLog = () => {
  //脚本区域修改ref产生的响应式对象数据 必须通过.value属性
  testStatus.value = 0
  // console.log(testStatus.value)
}
const setTestStatusReg = () => {
  //脚本区域修改ref产生的响应式对象数据 必须通过.value属性
  testStatus.value = 1
  // console.log(testStatus.value)
}
const setTestStatusFog = () => {
  //脚本区域修改ref产生的响应式对象数据 必须通过.value属性
  testStatus.value = 2
  // console.log(testStatus.value)
}

const userStore = useUserStore()

// 表单对象-登录
const formLog = ref({
  identity: 'student',
  email: '804@163.com',
  password: '123456'
})
// 规则对象-登录
const rulesLog = {
  identity: [
    {
      required: true,
      message: '请选择身份',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 14,
      message: '密码长度为6-14个字符',
      trigger: 'blur'
    }
  ]
}
// 获取formReg实例做统一校验
const formRefLog = ref(null)
const formRefReg = ref(null)
const formRefFog = ref(null)

// 表单对象-注册
const formReg = ref({
  identity: 'student',
  email: '2394713985@qq.com',
  password: '123456',
  passwordCK: '123456',
  verCode: ''
})
//验证两次输入密码相同
const equalToPassword = (rule, value, callback) => {
  // console.log(formReg.value.password+value)
  if (formReg.value.password != value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
const equalToPasswordF = (rule, value, callback) => {
  // console.log(formReg.value.password+value)
  if (formFog.value.password != value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 规则对象-注册
const rulesReg = {
  identity: [
    {
      required: true,
      message: '请选择身份',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 14,
      message: '密码长度为6-14个字符',
      trigger: 'blur'
    }
  ],
  passwordCK: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      required: true,
      validator: equalToPassword,
      trigger: 'blur'
    }
  ],
  verCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}

// 表单对象-忘记密码
const formFog = ref({
  identity: 'student',
  email: '2394713985@qq.com',
  password: '666666',
  passwordCK: '666666',
  verCode: ''
})

const rulesFog = {
  identity: [
    {
      required: true,
      message: '请选择身份',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 14,
      message: '密码长度为6-14个字符',
      trigger: 'blur'
    }
  ],
  passwordCK: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      required: true,
      validator: equalToPasswordF,
      trigger: 'blur'
    }
  ],
  verCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
//获取验证码-主策
const getVercode = async (identity, email) => {
  console.log('获取验证码函数被调用')
  const getCodeMsg = ref(null)
  const result = ref(null)
  console.log(email)
  if (identity == 'student') {
    result.value = await getVercodeAPI(email)
    // result.value = '学生'
  } else if (identity == 'teacher') {
    result.value = await getVercodeAPIT(email)
    // result.value = '老师'
  } else {
    ElMessage.error('身份错误')
  }

  getCodeMsg.value = result.value.data
  if (getCodeMsg.value.code == 200) {
    ElMessage.success(getCodeMsg.value.msg)
  } else {
    ElMessage.error('获取验证码失败')
  }
  getCodeMsg.value = null
}

//获取验证码-忘记密码
const getVercodeF = async (identity, email) => {
  console.log('获取验证码函数被调用')
  const getCodeMsg = ref(null)
  const result = ref(null)
  console.log(email)
  if (identity == 'student') {
    result.value = await getVercodeFogAPI(email)
    // result.value = '学生'
  } else if (identity == 'teacher') {
    result.value = await getVercodeFogAPIT(email)
    // result.value = '老师'
  } else {
    ElMessage.error('身份错误')
  }

  getCodeMsg.value = result.value.data
  if (getCodeMsg.value.code == 200) {
    ElMessage.success(getCodeMsg.value.msg)
  } else {
    ElMessage.error('获取验证码失败')
  }
  getCodeMsg.value = null
}

const router = useRouter()
// 测试函数
const test = () => {
  console.log('测试函数被调用')
}
// 点击登录按钮执行函数
const doLogin = () => {
  // 解构赋值
  // const { identity, account, password } = form.value
  // 测试用
  const { identity, email, password } = formLog.value
  // 调用实例方法
  formRefLog.value.validate(async (valid) => {
    console.log(valid + '登录表单合法')
    if (valid) {
      // 执行登录
      // await userStore.getUserInfo({ identity, account, password })
      // const res = await loginAPI({ identity, account, password })
      //测试用
      if (identity == 'student') {
        console.log('身份是学生 ' + email + ' ' + password)
        await userStore.getUserInfo({ identity, email, password })
      } else if (identity == 'teacher') {
        console.log('身份是老师 ' + email + ' ' + password)
        await userStore.getUserInfo({ identity, email, password })
      }
    }
  })
}
// 注册提交
const doRegister = () => {
  const { identity, email, password, verCode } = formReg.value
  // 调用实例方法
  formRefReg.value.validate(async (valid) => {
    console.log(valid + '注册表单合法')
    if (valid) {
      const res = ref(null)
      if (identity == 'student') {
        res.value = await registerAPI({ email, password, verCode })
      } else if (identity == 'teacher') {
        res.value = await registerAPIT({ email, password, verCode })
      } else {
        ElMessage.error('提交失败')
      }

      if (res.value != null) {
        console.log('res.data.code ' + res.value.data.code)
        if (res.value.data.code == 200) {
          ElMessage({ type: 'success', message: res.value.data.msg })
          testStatus.value = 0
        } else {
          ElMessage({ type: 'error', message: 'res.value.data.msg' })
        }
      }
    }
  })
}
//重置密码提交
const doReset = () => {
  const { identity, email, password, verCode } = formFog.value
  // 调用实例方法
  formRefFog.value.validate(async (valid) => {
    console.log(valid + '重置密码表单合法')
    if (valid) {
      const res = ref(null)
      if (identity == 'student') {
        res.value = await resetAPI({ email, password, verCode })
      } else if (identity == 'teacher') {
        res.value = await resetAPIT({ email, password, verCode })
      } else {
        ElMessage.error('提交失败')
      }

      if (res.value != null) {
        console.log('res.data.code ' + res.value.data.code)
        if (res.value.data.code == 200) {
          ElMessage({ type: 'success', message: res.value.data.msg })
          testStatus.value = 0
        } else {
          ElMessage({ type: 'error', message: '修改失败' })
        }
      }
    }
  })
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">Skillup</RouterLink>
        </h1>
        <a class="entry" href="/">
          进入开屏页
        </a>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a v-if='testStatus==0'>账户登录</a>
          <a v-if='testStatus==1'>账户注册</a>
          <a v-if='testStatus==2'>忘记密码</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!-- ————————————————————登录模块———————测试完毕————————— -->
            <el-form v-if='testStatus==0' ref="formRefLog" :model="formLog" :rules="rulesLog" label-position="right" label-width="60px" status-icon>
              <!-- prop指定rules中项 -->
              <el-form-item prop="identity" label="身份">
                <el-select v-model="formLog.identity" placeholder="选择身份">
                  <el-option label="学生登录" value="student" />
                  <el-option label="老师登录" value="teacher" />
                </el-select>
              </el-form-item>

              <el-form-item prop="email" label="账号">
                <el-input type="text" v-model="formLog.email" />
              </el-form-item>

              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="formLog.password" />
              </el-form-item>

              <div class="txtBox">
                <div class="leftTxt" @click="setTestStatusReg"><a href="javascript:void(0);">前往注册</a></div>
                <div class="rightTxt" @click="setTestStatusFog"><a href="javascript:void(0);">忘记密码?</a></div>
              </div>
              <br><br>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>

            </el-form>

            <!-- ————————————————————注册模块———————————————— -->
            <el-form v-if='testStatus==1' ref="formRefReg" :model="formReg" :rules="rulesReg" label-position="right" label-width="80px" status-icon>
              <!-- prop指定rules中项 -->
              <el-form-item prop="identity" label="身份">
                <el-select v-model="formReg.identity" placeholder="选择身份">
                  <el-option label="学生注册" value="student" />
                  <el-option label="老师注册" value="teacher" />
                </el-select>
              </el-form-item>

              <el-form-item prop="email" label="注册邮箱">
                <el-input type="text" v-model="formReg.email" />
              </el-form-item>

              <el-form-item prop="password" label="输入密码">
                <el-input type="password" v-model="formReg.password" />
              </el-form-item>

              <el-form-item prop="passwordCK" label="确认密码">
                <el-input type="password" v-model="formReg.passwordCK" />
              </el-form-item>

              <div class="formBox">
                <div class="leftBox">
                  <el-form-item prop="verCode" label="验证码">
                    <el-input type="text" v-model="formReg.verCode" />
                  </el-form-item>
                </div>
                <div class="rightBox">
                  <el-button size="middle" class="subBtn" @click="getVercode(formReg.identity,formReg.email)">获取验证码</el-button>
                </div>
              </div>
              <br><br>

              <div class="txtBox">
                <div class="leftTxt" @click="setTestStatusLog"><a href="javascript:void(0);">前往登录</a></div>
                <div class="rightTxt" @click="setTestStatusFog"><a href="javascript:void(0);">忘记密码?</a></div>
              </div>
              <br><br>
              <el-button size="large" class="subBtn" @click="doRegister">确认注册</el-button>

            </el-form>

            <!-- ————————————————————忘记密码模块———————————————— -->
            <el-form v-if='testStatus==2' ref="formRefFog" :model="formFog" :rules="rulesFog" label-position="right" label-width="80px" status-icon>

              <el-form-item prop="identity" label="身份">
                <el-select v-model="formFog.identity" placeholder="选择身份">
                  <el-option label="学生" value="student" />
                  <el-option label="老师" value="teacher" />
                </el-select>
              </el-form-item>

              <el-form-item prop="email" label="邮箱">
                <el-input type="text" v-model="formFog.email" />
              </el-form-item>

              <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="formFog.password" />
              </el-form-item>

              <el-form-item prop="passwordCK" label="确认密码">
                <el-input type="password" v-model="formFog.passwordCK" />
              </el-form-item>

              <div class="formBox">
                <div class="leftBox">
                  <el-form-item prop="verCode" label="验证码">
                    <el-input type="text" v-model="formFog.verCode" />
                  </el-form-item>
                </div>
                <div class="rightBox">
                  <el-button size="middle" class="subBtn" @click="getVercodeF(formFog.identity,formFog.email)">获取验证码</el-button>
                </div>
              </div>
              <br><br>
              <div class="txtBox">
                <div class="leftTxt" @click="setTestStatusLog"><a href="javascript:void(0);">前往登录</a></div>
                <div class="rightTxt" @click="setTestStatusReg"><a href="javascript:void(0);">前往注册</a></div>
              </div>
              <br><br>
              <el-button size="large" class="subBtn" @click="doReset">修改密码</el-button>

            </el-form>

          </div>
        </div>
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
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
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

.account-box {
  .form {
    padding: 0 10px 10px 10px;
  }
  .formBox {
    .leftBox {
      width: 60%;
      margin-left: 0px;
      float: left;
    }
    .rightBox {
      width: 35%;
      margin-right: 0px;
      float: right;
    }
  }
  .txtBox {
    .leftTxt {
		width: 40%;
		margin-left: 10px;
		float: left;
    }
    .rightTxt {
		width: 40%;
		margin-right: 10px;
		float: right;
    }
  }
}

a {
  text-decoration: none;
  color: #000000;
}

.subBtn {
  background: #4095e5;
  width: 100%;
  color: #fff;
}
</style>