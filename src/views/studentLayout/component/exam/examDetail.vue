<script setup>
import { onMounted, ref } from 'vue';
import { getExamDetailAPI } from '@/apis/studentExamAPI';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const selected = 'unFinished';
const route = useRoute();
const classid = route.params.id;

const detialInfo = ref(null);

const getDetailInfo = async () => {
	const result = await getExamDetailAPI();
	detialInfo.value = result.data.data;
};

const examList = ref([]);
const getExamList = async () => {
	const result = await getExamAPI();
	examList.value = result.data.data;
};
onMounted(() => {
	getExamList()
	console.log(examList.value);
});

onMounted(() => {
	getDetailInfo();
});
const router = useRouter();
const gotoPrevious = () => {
	router.push('/student/exam');
};



//测试数据
const handleButtonClick = (data) => {
	console.log('点击了按钮', data);
	// 在这里可以执行按钮点击后的逻辑操作
}
const services = [
      { date: '2023-6-15', name: '母猪的产后护理', totalTime: '100' },
      { date: '2023-6-18', name: '霸道GPT爱上我', totalTime: '60' },
      { date: '2023-7-5', name: '怀民亦未寝', totalTime: '120' },
	  { date: '2023-7-6', name: '转生成大学老师只要卡绩就能天下无敌', totalTime: '666' },
      // ...其他数据
    ];
</script>

<template>
	<div v-if="detialInfo">
		<el-button @click="gotoPrevious()">返回</el-button>
		{{ detialInfo.classes.classname }} - {{ classid }}
	</div>
	<nav class="navbar">
		<ul>
			<li :class="{ active: selected === 'unFinished' }" @click="selected = 'unFinished'">
				<a href="#">未考试卷</a>
				<div class="underline" v-if="selected === 'unFinished'"></div>
			</li>
			<li :class="{ active: selected === 'pass' }" @click="selected = 'pass'">
				<a href="#">及格试卷</a>
				<div class="underline" v-if="selected === 'pass'"></div>
			</li>
			<li :class="{ active: selected === 'fail' }" @click="selected = 'fail'">
				<a href="#">不及格试卷</a>
				<div class="underline" v-if="selected === 'fail'"></div>
			</li>
		</ul>

		<div class="content">
			<div v-if="selected === 'unFinished'">
				<el-table :data="services">
					<el-table-column prop="date" label="考试时间">
						<template #default="{ row }">
							<el-icon><Clock /></el-icon>
							{{ row.date }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="考试项目"></el-table-column>
					<el-table-column prop="totalTime" label="考试时长(min)"></el-table-column>
					<el-table-column label="操作">
						<template #default="scope">
							<el-button type="primary" size="small" @click="handleButtonClick(scope.row)">进入考试</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div v-if="selected === 'pass'">
				及格试卷
			</div>
			<div v-if="selected === 'fail'">
				不及格试卷
			</div>
		</div>
	</nav>
</template>

<style scoped lang="scss">
.navbar {
	// background-color: #f2f2f2;
	padding: 10px;
}

.navbar ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
}

.navbar li {
	position: relative;
	margin-right: 10px;
}

.navbar li:last-child {
	margin-right: 0;
}

.navbar a {
	text-decoration: none;
	color: #333;
	padding: 5px;
}

.navbar .underline {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2px;
}

.navbar li.active .underline {
	background-color: #4095e5;
	height: 1px;
	bottom: -4px;
	margin-top: 100px;
}

.navbar a:hover {
	color: #4095e5;
}

.content {
	padding: 20px;
}
</style>
