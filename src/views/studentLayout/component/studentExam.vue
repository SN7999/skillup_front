<script setup>
import { getExamAPI, getSearchAPI } from '@/apis/studentExamAPI';
import { onMounted, ref } from 'vue';
import { Search } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus';

const examList = ref([]);
const getExamList = async () => {
	const result = await getExamAPI();
	examList.value = result.data.data;
};
onMounted(() => {
	getExamList()
	console.log(examList.value);
});

const searchExam = ref('');

const checkIsChEnNum = str => {
	//如果值为空，通过校验
	if (str == '') return true;
	var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
	if (pattern.test(str)) return true;
	else return false;
};

const getSearchExamList = async examName => {
	const result = await getSearchAPI(examName);
	searchExamList.value = result.data;
};

const getSerchExam = () => {
	if (searchExam.value == '') {
		getExamList();
	}
	if (searchExam.value) {
		if (checkIsChEnNum(searchExam.value)) {
			getSearchExamList(searchExam.value);
			//console.log(searchExam.value)
		} else {
			ElMessage.error('请输入数字或中文或字母组成的课程名');
			searchExam.value = '';
		}
	}
};
</script>

<template>
	<div>
		<el-input v-model.trim="searchExam" class="w-50 m-2" size="large" placeholder="请输入数字或中文或字母组成的课程名" :prefix-icon="Search" @keyup.enter="getSerchExam" />

		<!-- 课程列表 -->
		<div class="exam-list">
			<div class="exam-item" style="background:#f6f6f6;width:32%" v-for="(exam, index) in examList" :key="index">
				<RouterLink :to="'/student/exam/detail'" class="router-link">
					<img :src="exam.cover" />
					<div
						style="font-weight: 400;
                    font-size:20px;margin-left:10px;
                    margin-top:10px;
                    margin-bottom:10px"
					>
						{{ exam.classname }}
					</div>
				</RouterLink>
			</div>
		</div>
		<!--课程列表 end-->
		<RouterView />
	</div>
</template>

<style scoped lang="scss">
	.exam-item{
	text-align: center;
	float: left;
	margin-top:20px;
	margin-bottom:20px;
	
		img{
		  width: 100%;
		  height: 150px;
		}
	}
	.router-link{
		text-decoration: none;
		color: inherit;
	}
	.router-link:hover {
	    color: #4095e5;
	}
	.exam-list{
	    flex-wrap: wrap;
	    justify-content: space-between;
	    margin-left:20px;
	    margin-right:20px;
	    display: flex;
	}
</style>
