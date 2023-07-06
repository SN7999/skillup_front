<script setup>
	import { onMounted, ref } from 'vue';
	import { Search } from "@element-plus/icons-vue"
	import { ElMessage } from 'element-plus';
	const searchScore = ref('');
</script>

<template>
    <div>
        <div class="searchBox">
			<el-input v-model.trim="searchScore" class="w-50 m-2" size="large" placeholder="请输入数字或中文或字母组成的课程名" :prefix-icon="Search" @keyup.enter="getSerchScore" />
		</div>
    </div>
</template>

<style scoped lang="scss">
	
</style>