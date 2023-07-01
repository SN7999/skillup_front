<script setup>
    import { onMounted, ref } from 'vue'
    import { getCurriculumDetailAPI , getAttendAPI , getDropAPI } from '@/apis/studentAPI'
    import { ElMessage } from 'element-plus'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router';
    const route = useRoute()
    const curriculumName = route.params.id
   
    //根据课程名称获取课程信息
    //最终使用
    const detialList = ref([])
    // const getDetailList = async (curriculumName) => {
    //     const  result  = await getCurriculumDetailAPI(curriculumName)
    //     detialList.value = result.data
    // }

    //测试使用
    const getDetailList = async () => {
        const  result  = await getCurriculumDetailAPI()
        detialList.value = result.data
    }

    //const attendMsg = ref(null)
    //选课
    //最终使用
    // const getAttend = async (course) => {
    //   const classid = course.classid
    //   const studentid = course.studentid
    //   const attendMsg = ref(null)
    //   const  result  = await getAttendAPI({classid,studentid})
    //   attendMsg.value = result.data
    //   if(attendMsg.value.code == 200 && attendMsg.value.msg=="success"){
    //     ElMessage.success('选课成功')
    //     selectedCourse.value = course;
    //     deselecting.value = true;
    //   }
    //   else{
    //     ElMessage.error('选课失败')
    //   }
    //   attendMsg.value = null
    // }
    //测试使用
    const getAttend = async (course) => {
      const attendMsg = ref(null)
      const  result  = await getAttendAPI()
      attendMsg.value = result.data
      if(attendMsg.value.code == 200 && attendMsg.value.msg=="success"){
        ElMessage.success('选课成功')
        selectedCourse.value = course;
        deselecting.value = true;
      }
      else{
        ElMessage.error('选课失败')
      }
      attendMsg.value = null
    }

    //const dropMsg = ref('')
    //退课
    //最终使用
    // const getDrop = async (course) => {
    //   const classid = course.classid
    //   const studentid = course.studentid
    //   const dropMsg = ref(null)
    //   const  result  = await getDropAPI({classid,studentid})
    //   dropMsg.value = result.data
    //   if(dropMsg.value.code == 200 && dropMsg.value.msg=="success"){
    //     ElMessage.success('退课成功')
    //     selectedCourse.value = null;
    //     deselecting.value = false;
    //   }
    //   else{
    //     ElMessage.error('退课失败')
    //   }
    //   dropMsg.value = null
    // }
    //测试使用
    const getDrop = async (course) => {
      const dropMsg = ref(null)
      const  result  = await getDropAPI()
      dropMsg.value = result.data
      if(dropMsg.value.code == 200 && dropMsg.value.msg=="success"){
        ElMessage.success('退课成功')
        selectedCourse.value = null;
        deselecting.value = false;
      }
      else{
        ElMessage.error('退课失败')
      }
      dropMsg.value = null
    }

    onMounted(()=>{
        //最终使用
        //getDetailList(curriculumName)
        //测试使用
        getDetailList()
    })

    //回退到上一页
    const router = useRouter()
    const gotoPrevious = () => {
        router.push('/student');
    }

    //是否选课
    const selectedCourse = ref(null);
    //按钮是否可用
    const deselecting = ref(false);
    //是否展示课程详情
    const showCourse = ref(null)

    const showCourseDetail = (course) => {
      showCourse.value = course;
    }
</script>

<template>
  <div>
    <el-button @click="gotoPrevious()">
      返回
    </el-button>
    {{ curriculumName }}
  </div>
  <div class="container">
    <el-row>
      <el-col :span="11">
        <el-table :data="detialList" border>
          <el-table-column prop="teacher" label="任课教师"></el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <template v-if="selectedCourse == row">
                <el-button @click="getDrop(row)" size="mini">
                  退选
                </el-button>
              </template>
              <template v-else>
                <el-button @click="getAttend(row)" :disabled="deselecting" size="mini">
                  选课
                </el-button>
              </template>
              <el-button @click="showCourseDetail(row)">课程详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <el-divider direction="vertical" class="custom-divider"></el-divider>
      </el-col>
      <el-col :span="11">
        <el-form>
          <el-form-item>
            <div v-if="showCourse" class="curriculum-cover">
            <img :src="showCourse.cover">
            </div>
          </el-form-item>
          <el-form-item>
            <p v-if="showCourse">
              课程ID：{{showCourse.classid}}
            </p>
          </el-form-item>
          <el-form-item>
            <p v-if="showCourse">
              授课教师：{{showCourse.teacher}}
            </p>
          </el-form-item>
          <el-form-item>
            <p v-if="showCourse">
              课程介绍:{{showCourse.introduction}}
            </p>
          </el-form-item>
          <el-form-item>
            <p v-if = "showCourse&&showCourse.starttime">
              课程时间：{{ showCourse.starttime }} ~ {{ showCourse ? showCourse.endtime : '' }}
            </p>
            <p v-if = "showCourse&&!showCourse.starttime">
              课程时间：到{{ showCourse ? showCourse.endtime : '' }}截止
            </p>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.container {
  padding: 20px;
}

.custom-divider {
  height: 100%;
}

.el-table .cell {
  display: flex;
  align-items: center;
}

.curriculum-cover{
    text-align: center;
    float: left;
    margin-top:20px;
    margin-bottom:20px;

    img{
      width: 100%;
      height: 200px;
    }
}
</style>

