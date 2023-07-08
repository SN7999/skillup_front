<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import {
  getStudentInfoAPI,
  getExamCountAPI,
  getClassCountAPI,
  getPasswordResetAPI,
  getEmailResetAPI,
  getVercodeAPI,
  getCancelAPI,
  getSaveInfoAPI
} from '@/apis/studentDetialAPI'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore().userInfo
console.log(userStore.userInfo)
//获取学生信息
//最终使用
const infoList = ref(null)
const getStudentInfo = async () => {
  const result = await getStudentInfoAPI()
  infoList.value = result.data.data
  console.log(infoList.value)
}

//获取学生已考试数
const examCount = ref([])
//最终使用
const getExamCount = async () => {
  const result = await getExamCountAPI()
  examCount.value = result.data.data
}

//获取学生已选课数
const classCount = ref([])
//最终使用
const getClassCount = async () => {
  const result = await getClassCountAPI()
  classCount.value = result.data.data
}

//修改密码
const showChangePwd = ref(false)
const oldPassword = ref('')
const newPassword1 = ref('')
const newPassword2 = ref('')
//最终使用 待argue 感觉应该把旧密码一起传给后台校验 因为密码进行过加密，前端无法对密码进行比对
const getPasswordReset = async (oldPassword, newPassword1, newPassword2) => {
  const rstPwdMsg = ref(null)
  console.log(oldPassword)
  console.log(newPassword1)
  const result = await getPasswordResetAPI(oldPassword, newPassword1)
  rstPwdMsg.value = result.data
  if (rstPwdMsg.value.code == 200) {
    ElMessage.success('修改密码成功')
  } else {
    ElMessage.error('修改密码失败')
  }
  rstPwdMsg.value = null
  showChangePwd.value = false
  oldPassword.value = ''
  newPassword1.value = ''
  newPassword2.value = ''
}

//测试使用 还需要对两个新的密码进行验证
// const getPasswordReset = async () => {
//     const rstPwdMsg = ref(null)
//     const result = await getPasswordResetAPI()
//     rstPwdMsg.value = result.data
//     if(rstPwdMsg.value.code == 200 && rstPwdMsg.value.msg=="重置密码成功"){
//         ElMessage.success('修改密码成功')
//     }
//     else{
//     ElMessage.error('修改密码失败')
//     }
//     rstPwdMsg.value = null
//     showChangePwd.value = false
//     oldPassword.value = '';
//     newPassword1.value = '';
//     newPassword2.value = '';
// }

//修改邮箱
const showChangeEmail = ref(false)
const newEmail = ref('')
const emailCode = ref('')
//最终使用
const getEmailReset = async (newEmail, verCode) => {
  const rstEmailMsg = ref(null)
  const result = await getEmailResetAPI(newEmail, verCode)
  rstEmailMsg.value = result.data
  if (rstEmailMsg.value.code == 200) {
    ElMessage.success('修改邮箱成功')
  } else {
    ElMessage.error('修改邮箱失败')
  }
  rstEmailMsg.value = null
  showChangeEmail.value = false
  newEmail.value = ''
  emailCode.value = ''
  getStudentInfo()
}
//测试使用
// const getEmailReset = async () => {
//     const rstEmailMsg = ref(null)
//     const result = await getEmailResetAPI()
//     rstEmailMsg.value = result.data
//     if(rstEmailMsg.value.code == 200 && rstEmailMsg.value.msg=="修改成功！"){
//         ElMessage.success('修改邮箱成功')
//     }
//     else{
//         ElMessage.error('修改邮箱失败')
//     }
//     rstEmailMsg.value = null
//     showChangeEmail.value = false
//     newEmail.value = ''
//     emailCode.value = ''
//     getStudentInfo()
// }

//获取验证码
//最终使用
const getVercode = async (email) => {
  const getCodeMsg = ref(null)
  const result = await getVercodeAPI(email)
  getCodeMsg.value = result.data
  if (getCodeMsg.value.code == 200) {
    ElMessage.success(getCodeMsg.value.msg)
  } else {
    ElMessage.error('获取验证码失败')
  }
  getCodeMsg.value = null
}
//测试使用 还需要写邮箱的格式验证
// const getVercode = async () => {
//     const getCodeMsg = ref(null)
//     const result = await getVercodeAPI()
//     getCodeMsg.value = result.data
//     if(getCodeMsg.value.code == 200){
//         ElMessage.success(getCodeMsg.value.msg)
//     }
//     else{
//         ElMessage.error('获取验证码失败')
//     }
//     getCodeMsg.value = null
// }

//注销账号
const showCancel = ref(false)
const cancelEmail = ref('')
const cancelCode = ref('')
const showFile = ref(false)
//最终使用
const getCancel = async (email, verCode) => {
  const cancelMsg = ref(null)
  const result = await getCancelAPI(email, verCode)
  cancelMsg.value = result.data
  if (cancelMsg.value.code == 200) {
    ElMessage.success('注销成功')
  } else {
    ElMessage.error('注销失败')
  }
  cancelMsg.value = null
  showCancel.value = false
  cancelEmail.value = ''
  cancelCode.value = ''
  showFile.value = false
}
//测试使用
// const getCancel = async () => {
//     const cancelMsg = ref(null)
//     const result = await getCancelAPI()
//     cancelMsg.value = result.data
//     if(cancelMsg.value.code == 200){
//         ElMessage.success('注销成功')
//     }
//     else{
//         ElMessage.error('获取验证码失败')
//     }
//     cancelMsg.value = null
//     showCancel.value = false
//     cancelEmail.value = ''
//     cancelCode.value = ''
//     showFile.value = false
// }

//这里应该还要验证，验证码是否正确 后台需要传数据给前端验证，看是否是获取验证码时就传过来，还是再调一个方法验证
const gotoFile = () => {
  showCancel.value = false
  showFile.value = true
}

const cancelback = () => {
  showCancel.value = false
  cancelEmail.value = ''
  cancelCode.value = ''
  showFile.value = false
}
//更新个人信息
//最终使用
const getSaveInfo = async (
  name,
  contact,
  gender,
  academy,
  selfintroduction,
  age
) => {
  const saveMsg = ref(null)
  const result = await getSaveInfoAPI(
    name,
    contact,
    gender,
    academy,
    selfintroduction,
    age
  )
  saveMsg.value = result.data
  if (saveMsg.value.code == 200) {
    ElMessage.success('更新个人信息成功')
  } else {
    ElMessage.error('更新个人信息失败')
  }
  saveMsg.value = null
}
//测试使用
// const getSaveInfo = async () => {
//     const saveMsg = ref(null)
//     const result = await getSaveInfoAPI()
//     saveMsg.value = result.data
//     if(saveMsg.value.code == 200){
//         ElMessage.success('更新个人信息成功')
//     }
//     else{
//         ElMessage.error('更新个人信息失败')
//     }
//     saveMsg.value = null
// }

onMounted(() => {
  getStudentInfo()
  console.log(infoList.value)
  getExamCount()
  console.log(examCount)
  getClassCount()
  console.log(classCount)
})

const uploadUrl = '/api3' + '/student/uploadImage'

const onUploadSuccess = (response) => {
  console.log(response)
  ElMessage.success('上传头像成功')
  console.log(response.data.imageurl)
  userStore.data.imageurl = response.data.imageurl
  getStudentInfo()
}
</script>

<template>
  <div>
    <div class="top-section">
      <div class="user-info">
        <div>
          <!-- 用户头像 -->
          <el-avatar class="avatar" v-if="infoList" :src="infoList.imageurl" size="large"></el-avatar>
          <el-upload class="upload" :action="uploadUrl" :show-file-list="false" :on-success="onUploadSuccess">
            <el-button>上传头像</el-button>
          </el-upload>
          <el-dialog title="调整图片尺寸" v-model:visible="previewDialogVisible" :close-on-click-modal="false">
            <div class="preview-container">
              <img :src="previewImageUrl" alt="Preview" ref="previewImg" />
              <div class="resize-box" ref="resizeBox"></div>
            </div>
            <div class="dialog-footer">
              <el-button @click="cancelPreview">取消</el-button>
              <el-button type="primary" @click="confirmPreview">确认</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="info" style="margin-left: 20px">
          <div class="name" style="font-size: 120%;" v-if="infoList">{{ infoList.name }}</div>
          <div class="role" style="font-size: 80%;">学生</div>
        </div>
      </div>
      <div class="stats">
        <el-statistic v-if="infoList" :value="infoList.score" title="我的积分"></el-statistic>
        <el-statistic :value="classCount.length" title="课程数"></el-statistic>
        <el-statistic :value="examCount.length" title="考试数"></el-statistic>
      </div>
    </div>
    <div class="profile-section">
      <el-row>
        <el-col :span="13">
          <el-form-item label="用户ID：">
            <span class="value" v-if="infoList">{{ infoList.id }}</span>
            <span class="actions">
              <el-link type="primary" @click="showChangePwd = true">修改密码</el-link>
              <el-link type="primary" style="margin-left: 10px;" @click="showCancel = true">注销账号</el-link>
            </span>
          </el-form-item>
          <el-form-item label="邮箱：">
            <span class="value" v-if="infoList">{{ infoList.email }}</span>
            <el-link type="primary" style="margin-left: 20px;" @click="showChangeEmail = true">修改邮箱</el-link>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-if="infoList" v-model="infoList.contact"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-if="infoList" v-model="infoList.gender">
              <!-- 待解决初始值不显示 -->
              <el-radio label=true>男</el-radio>
              <el-radio label=false>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-select v-if="infoList" v-model="infoList.age" placeholder="请选择">
              <el-option v-for="n in 95" :key="n" :value="n">{{ n+5 }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院系：">
            <el-select v-if="infoList" v-model="infoList.academy" placeholder="请选择专业">
              <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
              <el-option label="电子信息工程" value="电子信息工程"></el-option>
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input type="textarea" v-if="infoList" v-model="infoList.selfintroduction"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical" class="custom-divider"></el-divider>
        </el-col>
        <el-col :span="10">
          <div class="modal-container" v-if="showChangePwd">
            <div style="font-size: 150%;margin-top: 50px;">修改密码</div>
            <div style="margin-top: 20px;width: 80%">
              <el-input style="width: 100%" type="password" placeholder="请输入旧密码" v-model="oldPassword"></el-input>
            </div>
            <div style="margin-top: 20px;width: 80%">
              <el-input style="width: 100%" type="password" placeholder="请输入新密码" v-model="newPassword1"></el-input>
            </div>
            <div style="margin-top: 20px;width: 80%">
              <el-input style="width: 100%" type="password" placeholder="请再次确认新密码" v-model="newPassword2"></el-input>
            </div>
            <el-button style="margin-top: 20px;width: 25%" type="primary" @click="getPasswordReset(oldPassword,newPassword1,newPassword2)">提交</el-button>
          </div>
          <div class="modal-container" v-if="showCancel">
            <div style="font-size: 150%;margin-top: 50px;">注销账号</div>
            <div style="font-size: 80%;margin-top: 10px;color: red;">为了确保是您本人操作，请输入您的注册邮箱，并填写验证码！</div>
            <div style="margin-top: 20px;width: 80%">
              <el-input style="width: 100%" placeholder="请输入您的注册邮箱" v-model="cancelEmail"></el-input>
            </div>
            <el-row style="margin-top: 20px;width: 80%">
              <el-col :span="18">
                <el-input style="width: 100%" placeholder="请输入验证码" v-model="cancelCode"></el-input>
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="5">
                <el-button style="width: 100%" type="primary" @click="getVercode(cancelEmail)">获取验证码</el-button>
              </el-col>
            </el-row>
            <el-button style="margin-top: 20px;width: 25%" type="primary" @click="gotoFile()">提交</el-button>
          </div>
          <div class="modal-container" v-if="showFile">
            <div style="font-size: 150%;margin-top: 50px;">SkillUp注销协议</div>
            <div style="margin-top: 10px;">我们很遗憾您作出注销SkillUp账户的决定，为了保障您的权益，请在注销前详细阅读本须知的所有内容，特别是加粗部分。当您点击“确定，我要注销”按钮时，您的行为表示您同意本须知的约定。</div>
            <div style="margin-top: 10px;">1、注销SkillUp账户是不可逆操作，操作之前，请确认与SkillUp相关的所有服务均已妥善处理。</div>
            <div style="margin-top: 10px;">2、注销SkillUp账户，除法律法规另有规定外，将视为您自行放弃该账户及相关权益，您将无法再登录、使用此账户或找回此账户内的任何信息及权益，包括但不限于个人身份信息、账户信息等。</div>
            <div style="margin-top: 10px;">3、您承诺您的SkillUp账户注销申请一经提交，您不会以任何理由要求SkillUp予以撤销。</div>
            <div style="margin-top: 10px;">4、如您对注销账号有任何意见和询问，可联系客服邮箱：wangyy07@foxmail.com。</div>
            <el-row>
              <el-col :span="11">
                <el-button style="width: 100%;font-size: 504;" v-if="infoList" type="danger" @click="getCancel(cancelEmail,cancelCode)">确认，我要注销</el-button>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-button style="width: 100%;font-size: 40%;" type="primary" @click="cancelback()">取消</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="modal-container" v-if="showChangeEmail">
            <div style="font-size: 150%;margin-top: 50px;">修改邮箱</div>
            <div style="margin-top: 20px;width: 80%">
              <el-input style="width: 100%" placeholder="请输入新的邮箱" v-model="newEmail"></el-input>
            </div>
            <el-row style="margin-top: 20px;width: 80%">
              <el-col :span="18">
                <el-input style="width: 100%" placeholder="请输入验证码" v-model="emailCode"></el-input>
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="5">
                <el-button style="width: 100%" type="primary" @click="getVercode(newEmail)">获取验证码</el-button>
              </el-col>
            </el-row>
            <el-button v-if="infoList" style="margin-top: 20px;width: 25%" type="primary" @click="getEmailReset(newEmail,emailCode)">提交</el-button>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-button v-if="infoList" type="primary" @click="getSaveInfo(infoList.name,infoList.contact,infoList.gender,infoList.academy,infoList.selfintroduction,infoList.age)">
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  /* width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc; */
  background-size: cover;
  background-position: center;
}

.stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f1f1f1;
}

.profile-section {
  padding: 20px;
}

.profile-item {
  margin-bottom: 20px;
}

.value {
  margin-left: 10px;
}

.actions {
  margin-left: 20px;
}

.academy-list {
  overflow-y: auto;
  max-height: 200px;
}

.custom-divider {
  height: 100%;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.preview-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
}

.resize-box {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border: 2px dashed #999;
  pointer-events: none;
}
</style>