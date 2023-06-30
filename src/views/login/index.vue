<script setup>
	import { ref } from 'vue'
	import { ElMessage } from 'element-plus'
	import 'element-plus/theme-chalk/el-message.css'
	import { useRouter } from 'vue-router'
	
	import { useUserStore } from '@/stores/user'
	
	const userStore = useUserStore()
	// 表单对象
	const form = ref({
		identity: '',
		account:'',
		password:''
	})
	// 规则对象
	const rules = {
		identity:[
			{
				required: true, 
				message: "请选择身份", 
				trigger: "change",
			}
		],
		account:[
			{
				required: true,
				message:'账号不能为空',
				trigger:"blur",
			}
		],
		password:[
			{
				required: true,
				message:'密码不能为空',
				trigger:"blur",
			},
			{
				min:6,
				max:14,
				message:'密码长度为6-14个字符',
				trigger:'blur'
			}
		]
	}
	// 获取form实例做统一校验
	const formRef = ref(null)
	
	const router = useRouter()
	// 点击登录按钮执行函数
	const doLogin = ()=>{
		// 解构赋值
		// const { identity, account, password } = form.value
		// 测试用
		const { account, password } = form.value
		// 调用实例方法
		formRef.value.validate(async (valid) => {
			console.log(valid)
			if (valid) {
				// 执行登录
				// await userStore.getUserInfo({ identity, account, password })
				// const res = await loginAPI({ identity, account, password })
				//测试用
				await userStore.getUserInfo({ account, password })
				// const res = await loginAPI({ account, password })
				// console.log(res)
				// 1.提示用户
				ElMessage({ type: 'success', message: '登录成功'})
				// 2.跳转首页
				router.replace({ path: '/' })
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
        <RouterLink class="entry" to="/">
          进入开屏页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
			<a>账户登录</a>
        </nav>
		<div class="account-box">
			<div class="form">
				<el-form
					ref="formRef"
					:model="form"
					:rules="rules"
					label-position="right"
					label-width="60px"
					status-icon
					>
				<!-- prop指定rules中项 -->
					<el-form-item prop="identity" label="身份">
						<el-select v-model="form.identity" placeholder="选择身份">
							<el-option label="学生登录" value="student" />
							<el-option label="老师登录" value="teacher" />
						</el-select>
					</el-form-item>
					
					<el-form-item prop="account" label="账号">
						<el-input v-model="form.account" />
					</el-form-item>
					
					<el-form-item prop="password" label="密码">
						<el-input v-model="form.password" />
					</el-form-item>
					
					立即注册<br><br>
					
					<el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
					
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
					background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
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
		background: url("@/assets/images/background3.jpg") no-repeat center 18px / 100% 100%;
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
	}
	
	/* .account-box {
		.form {
			padding: 0 20px 20px 20px;
	
			&-item {
				margin-bottom: 28px;
	
				.input {
					position: relative;
					height: 36px;
	
					>i {
						width: 34px;
						height: 34px;
						background: #cfcdcd;
						color: #fff;
						position: absolute;
						left: 1px;
						top: 1px;
						text-align: center;
						line-height: 34px;
						font-size: 18px;
					}
	
					input {
						padding-left: 44px;
						border: 1px solid #cfcdcd;
						height: 36px;
						line-height: 36px;
						width: 100%;
			
						&.error {
							border-color: #666;
						}
			
						&.active,
						&:focus {
							border-color: #666;
						}
					}
	
					.code {
						position: absolute;
						right: 1px;
						top: 1px;
						text-align: center;
						line-height: 34px;
						font-size: 14px;
						background: #f5f5f5;
						color: #666;
						width: 90px;
						height: 34px;
						cursor: pointer;
					}
				}
	
				>.error {
					position: absolute;
					font-size: 12px;
					line-height: 28px;
					color: #069;
			
					i {
						font-size: 14px;
						margin-right: 2px;
					}
				}
			}
	
			.agree {
				a {
					color: #069;
				}
			}
	
			.btn {
				display: block;
				width: 100%;
				height: 40px;
				color: #fff;
				text-align: center;
				line-height: 40px;
				background: #666;
		
				&.disabled {
					background: #cfcdcd;
				}
			}
		}
	
		.action {
			padding: 20px 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.url {
				a {
					color: #999;
					margin-left: 10px;
				}
			}
		}
	} */
	
	.subBtn {
		background: #4095e5;
		width: 100%;
		color: #fff;
	}
</style>