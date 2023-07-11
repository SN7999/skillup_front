<script setup>
	import { getScoreAPI, getSelfScoreAPI, getSearchScoreExamAPI, getSearchScoreClassAPI, getSearchScoreDateAPI } from '@/apis/studentScoreAPI';
	import { onMounted, ref, computed } from 'vue';
	import { Search } from "@element-plus/icons-vue"
	import { ElMessage } from 'element-plus';
	
	const searchExamName = ref('');
	const searchClassName = ref('');
	const searchDate = ref('');
	const getSearchScore = () => {
		console.log(searchExamName.value+' '+searchClassName.value+' '+searchDate.value)
	};
	//校验
	const checkIsChEnNum = str => {
		//如果值为空，通过校验
		if (str == '') return true;
		var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
		if (pattern.test(str)) return true;
		else return false;
	};
	
	const scoreList = ref([]);
	const getScoreList = async () => {
		
		const result = await getScoreAPI();
		scoreList.value = result.data.data;
		console.log(result)
	};
	const getSelfScore = async () => {
		const arr = ref(['1','1','1','1'])
		const result = await getSelfScoreAPI(arr.value);
		if (result.data.code==200){
			ElMessage({ type: 'success', message: result.data.msg})
			window.open(result.data.data);
		}else{
			ElMessage({ type: 'error', message:result.data.msg})
		}
	};
	
	const getSearchScoreListExam = async examName => {
		const result = await getSearchScoreExamAPI(examName);
		scoreList.value = result.data;
		currentPage.value = 1;
	};
	const getSearchScoreListClass = async className => {
		const result = await getSearchScoreClassAPI(className);
		scoreList.value = result.data;
		currentPage.value = 1;
	};
	const getSearchScoreListDate = async date => {
		const result = await getSearchScoreDateAPI(date);
		scoreList.value = result.data;
		currentPage.value = 1;
	};
	const getSearchScoreExam = () => {
		if (searchExamName.value == '') {
			getScoreList();
		}
		if (searchExamName.value) {
			if (checkIsChEnNum(searchExamName.value)) {
				getSearchScoreListExam(searchExamName.value);
				// console.log('彳亍'+searchExamName.value);
			} else {
				ElMessage.error('请输入数字或中文或字母组成的考试名');
				searchExamName.value = '';
			}
		}
	};
	const getSearchScoreClass = () => {
		if (searchClassName.value == '') {
			getScoreList();
		}
		if (searchClassName.value) {
			if (checkIsChEnNum(searchClassName.value)) {
				getSearchScoreListClass(searchClassName.value);
				// console.log('彳亍'+searchClassName.value);
			} else {
				ElMessage.error('请输入数字或中文或字母组成的课程名');
				searchClassName.value = '';
			}
		}
	};
	const getSearchScoreDate = () => {
		if (searchDate.value == '') {
			getScoreList();
		}
		if (searchDate.value) {
			// getSearchScoreListDate(searchDate.value);
			console.log('彳亍'+searchDate.value);
		}
	};
	
	
	const currentPage = ref(1);
	//每页显示条数
	const pageSize = 20;
	const handlePageChange = (page) => {
		currentPage.value = page;
	}
	const currentPageData = computed(() => {
	  const startIndex = (currentPage.value - 1) * pageSize;
	  const endIndex = startIndex + pageSize;
	  return scoreList.value.slice(startIndex, endIndex);
	});
	
	
	
	onMounted(() => {
		getScoreList();
	});
</script>

<template>
    <div>
		<!-- 搜索导出栏 -->
        <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;">
			<el-input 
				v-model.trim="searchExamName"
				class="w-50 m-2"
				size="large"
				placeholder="请输入考试名称"
				:prefix-icon="Search"
				@keyup.enter="getSearchScoreExam"
				style="width: 25%; margin-right: 10px;"
			/>
			<el-input
				v-model.trim="searchClassName"
				class="w-50 m-2"
				size="large"
				placeholder="请输入课程名称"
				:prefix-icon="Search"
				@keyup.enter="getSearchScoreClass"
				style="width: 25%; margin-right: 10px;"
			/>
			<el-date-picker
				v-model="searchDate"
				type="date"
				placeholder="日期"
				size="large"
				style="width: 25%; margin-right: 10px;"
				@change="getSearchScoreDate"
			/>
			<el-button type="primary" @click="getSelfScore()">导出excel文件</el-button>
		</div>
		
		<el-table :data="currentPageData">
			<el-table-column prop="examname" label="考试名称"></el-table-column>
			<el-table-column label="课程名称-课程编号">
				<template #default="{ row }">
				    {{ row.classname + '-' + row.classid }}
				</template>
			</el-table-column>
			<el-table-column prop="date" label="考试时间">
				<template #default="{ row }">
					{{ row.date }}
				</template>
			</el-table-column>
			<el-table-column prop="grade" label="考试成绩"></el-table-column>
		</el-table>
		<!-- 分页器 -->
		<div class="pagination-container">
			<el-pagination
				@current-change="handlePageChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="scoreList.length"
				layout="prev, pager, next"
			></el-pagination>
		</div>
    </div>
</template>

<style scoped lang="scss">
	.pagination-container {
	  display: flex;
	  justify-content: center;
	  margin-top: 20px;
	}
</style>