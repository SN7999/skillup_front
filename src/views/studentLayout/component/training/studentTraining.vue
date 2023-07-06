<script setup>
    import { getSelectCurriculumAPI, getSearchAPI } from '@/apis/studentTraingAPI'
    import { onMounted, ref } from 'vue'
    import { Search } from "@element-plus/icons-vue"
    import { ElMessage } from 'element-plus'
    const curriculumList = ref([])
    const getCurriculumList = async () => {
        const result = await getSelectCurriculumAPI()
        curriculumList.value = result.data.data
    }
    onMounted(()=>{
        getCurriculumList()
        console.log(curriculumList.value)
    })
    const searchCurriculumList = ref([])
    const getSearchCurriculumList = async (curriculumName) => {
        const result = await getSearchAPI(curriculumName)
        searchCurriculumList.value = result.data
    }
    const searchCurriculum = ref('')
    const checkIsChEnNum = (str) => {
        //如果值为空，通过校验
        if (str == "")
        return true;
        var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
        if (pattern.test(str))
            return true;
        else
            return false;
    }
    const getSerchCurriculum = () =>{
        if(searchCurriculum.value == ''){
            getCurriculumList()
        }
        if(searchCurriculum.value){
            if(checkIsChEnNum(searchCurriculum.value)){
                getSearchCurriculumList(searchCurriculum.value)
                //console.log(searchCurriculum.value)
            }
            else{
                ElMessage.error('请输入数字或中文或字母组成的课程名')
                searchCurriculum.value = ''
            }
        }
    }
</script>

<template>
    <!-- 我是学生培训界面 -->
    <div>
        <el-input
        v-model.trim="searchCurriculum"
        class="w-50 m-2"
        size="large"
        placeholder="请输入数字或中文或字母组成的课程名"
        :prefix-icon="Search"
        @keyup.enter="getSerchCurriculum"
        />

        <!-- 课程列表 -->
        <div class='curriculum-list' >
            <div  class="curriculum-item" style='background:#f6f6f6;width:32%' v-for="(curriculum,index) in curriculumList" :key="index">
                <RouterLink :to="'/student/training/detail/'+curriculum.classid" class="router-link">
                    <img :src="curriculum.cover">
                    <div style='font-weight: 400;
                    font-size:20px;margin-left:10px;
                    margin-top:10px;
                    margin-bottom:10px'>{{curriculum.classname}}</div>
                </RouterLink>
            </div>
        </div>
        <!--课程列表 end-->
        <RouterView/>
    </div>
</template>

<style lang = "scss">
    .curriculum-item{
    text-align: center;
    float: left;
    margin-top:20px;
    margin-bottom:20px;

    img{
      width: 100%;
      height: 150px;
    }
    }
    .curriculum-list{
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left:20px;
        margin-right:20px;
        display: flex;
    }
	.router-link{
		text-decoration: none;
		color: inherit;
	}
	.router-link:hover {
	    color: #4095e5;
	}
</style>