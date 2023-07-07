<script setup>
import { getStudentAPI, getSearchStudentListByClassAPI, getSearchStudentListByStudentAPI, searchStudentInfoAPI } from '@/apis/teacherStudentAPI';
import { onMounted, ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const drawer = ref(false);
const searchByClassName = ref('');
const searchByStudent = ref('');
const getSearchStudent = () => {
	console.log(searchByClassName.value + ' ' + searchByStudent.value);
};
//校验
const checkIsChEnNum = str => {
	//如果值为空，通过校验
	if (str == '') return true;
	var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
	if (pattern.test(str)) return true;
	else return false;
};

const studentList = ref([]);
const getStudentList = async () => {
	const result = await getStudentAPI();
	studentList.value = result.data.data;
};

const getSearchStudentListByClass = async className => {
	const result = await getSearchStudentListByClassAPI(className);
	studentList.value = result.data;
	currentPage.value = 1;
};
const getSearchStudentListByStudent = async student => {
	const result = await getSearchStudentListByStudentAPI(student);
	studentList.value = result.data;
	currentPage.value = 1;
};
const getSearchByClassName = async () => {
	if (searchByClassName.value == '') {
		getStudentList();
	}
	if (searchByClassName.value) {
		if (checkIsChEnNum(searchByClassName.value)) {
			const result = await getSearchStudentListByClass(searchByClassName.value);
			studentList.value = result.data;
			// console.log('彳亍'+searchByClassName.value);
		} else {
			ElMessage.error('请输入数字或中文或字母组成的考试名');
			searchByClassName.value = '';
		}
	}
};
const getSearchByStudent = async () => {
	if (searchByStudent.value == '') {
		getStudentList();
	}
	if (searchByStudent.value) {
		if (checkIsChEnNum(searchByStudent.value)) {
			const result = await getSearchStudentListByStudent(searchByStudent.value);
			studentList.value = result.data;
			// console.log('彳亍'+searchByStudent.value);
		} else {
			ElMessage.error('请输入数字或中文或组成的课程名');
			searchByStudent.value = '';
		}
	}
};

const currentPage = ref(1);
//每页显示条数
const pageSize = 20;
const handlePageChange = page => {
	currentPage.value = page;
};
const currentPageData = computed(() => {
	const startIndex = (currentPage.value - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return studentList.value.slice(startIndex, endIndex);
});

onMounted(() => {
	getStudentList();
});
const searchInfo = ref([]);
//查询学生信息方法，未改
const searchStudentInfo = async (data) => {
	const result = await searchStudentInfoAPI(data);
	searchInfo.value = result.data;
	// await Promise.resolve();
	drawer.value = true;
	// console.log('点击了按钮', data);
	// 在这里可以执行按钮点击后的逻辑操作
};
const test = () => {
	console.log(searchInfo.value)
}
</script>

<template>
	<div>
		<!-- 搜索导出栏 -->
		<div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;">
			<el-input
				v-model.trim="searchByClassName"
				class="w-50 m-2"
				size="large"
				placeholder="请输入课程名称"
				:prefix-icon="Search"
				@keyup.enter="getSearchByClassName"
				style="width: 30%; margin-right: 10px;"
			/>
			<el-input
				v-model.trim="searchByStudent"
				class="w-50 m-2"
				size="large"
				placeholder="请输入学生姓名"
				:prefix-icon="Search"
				@keyup.enter="getSearchByStudent"
				style="width: 30%; margin-right: 10px;"
			/>
			<el-button type="primary" @click="getSearchStudent">导出excel文件</el-button>
		</div>

		<el-table :data="currentPageData">
			<el-table-column label="学生id-学生姓名">
				<template #default="{ row }">
					{{ row.studentid + '-' + row.studentname }}
				</template>
			</el-table-column>
			<el-table-column label="课程名称-课程编号">
				<template #default="{ row }">
					{{ row.classname + '-' + row.classid }}
				</template>
			</el-table-column>
			<el-table-column prop="date" label="开课时间">
				<template #default="{ row }">
					{{ row.date[0] + '-' + row.date[1] + '-' + row.date[2] }}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" size="small" @click="searchStudentInfo(scope.row.studentid)">查看学生信息</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页器 -->
		<div class="pagination-container">
			<el-pagination
				@current-change="handlePageChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="studentList.length"
				layout="prev, pager, next"
			></el-pagination>
		</div>
		<!-- 展示学生个人信息的部分 -->
		<el-drawer v-model="drawer" title="学生信息" :direction="direction">
			<div class="profile">
				<div class="profile-picture"><img class="avatar" :src="searchInfo.data.imageurl" alt="头像" /></div>
				<div class="profile-details">
					<p>
						<span class="detail-label">姓名:</span>
						<span class="detail-value">{{searchInfo.data.name}}</span>
					</p>
					<p>
						<span class="detail-label">ID:</span>
						<span class="detail-value">{{searchInfo.data.id}}</span>
					</p>
					<p>
						<span class="detail-label">性别:</span>
						<span class="detail-value">{{searchInfo.data.gender}}</span>
					</p>
					<p>
						<span class="detail-label">年龄:</span>
						<span class="detail-value">{{searchInfo.data.age}}</span>
					</p>
					<p>
						<span class="detail-label">院系:</span>
						<span class="detail-value">{{searchInfo.data.academy}}</span>
					</p>
					<p>
						<span class="detail-label">联系方式:</span>
						<span class="detail-value">{{searchInfo.data.contact}}</span>
					</p>
					<p>
						<span class="detail-label">个人简介:</span>
						<span class="detail-value">{{searchInfo.data.selfintroduction}}</span>
					</p>
					<!-- <el-button type="primary" size="small" @click="test">查看学生信息</el-button> -->
					<!-- 其他个人资料展示 -->
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<style scoped lang="scss">
.pagination-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.profile-picture {
	width: height;
	height: 100%;
	border-radius: 50%;
	background-color: lightgray;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
}

.avatar {
	width: 120px;
	height: 120px;
	border-radius: 50%;
}

.profile-details {
	font-size:20px;
	text-align: left;
}
.detail-label {
	font-weight: bold;
}

.detail-value {
	margin-left: 5px;
}
</style>
