<template>
	<el-form ref="form" :model="formData" label-width="80px">
		<div v-for="(question, index) in questions" :key="question.id">
			<div>{{ question.question }}</div>
			<el-form-item :prop="'question' + question.id">
				<template v-if="question.options">
					<el-radio-group v-model="formData['question' + question.id]">
						<el-radio v-for="(option, optionIndex) in question.options" :key="option.id" :label="option.id">{{ option.text }}</el-radio>
					</el-radio-group>
				</template>
				<template v-else>
					<el-input type="textarea" v-model="formData['question' + question.id]"></el-input>
				</template>
			</el-form-item>
		</div>

		<el-form-item><el-button type="primary" @click="submitForm">提交</el-button></el-form-item>
	</el-form>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const formData = ref({});
const questions = [
	{
		id: 1,
		status: 1,
		question: '选择题1的题目',
		options: [{ id: 1, text: 'A' }, { id: 2, text: '选项B' }, { id: 3, text: '选项C' }, { id: 4, text: '选项D' }],
		completed: false
	},
	{
		id: 2,
		status: 2,
		question: '简答题2的题目',
		answer: ''
	},
	{
		id: 3,
		status: 1,
		question: '选择题3的题目',
		options: [{ id: 1, text: '选项A' }, { id: 2, text: '选项B' }, { id: 3, text: '选项C' }],
		completed: false
	}
];

const submitForm = () => {
	for (const question of questions) {
		let answer;
		if (question.options) {
			const selectedOption = question.options.find(option => option.id === formData['question' + question.id]);
			answer = selectedOption ? selectedOption.text : '未选择';
		} else {
			answer = formData['question' + question.id] || '未填写';
		}
		console.log(`题号: ${question.id}，答案: ${answer}`);
	}
	ElMessage.success('表单提交成功！');
};
</script>

<style scoped lang="scss"></style>
