/*
 * @Author: Mildred
 * @Date: 2023-06-29 10:14:19
 * @LastEditors: AuthorName
 * @LastEditTime: 2023-07-04 09:30:40
 * @Description: 退出登录函数
 */

//import { useRouter } from "vue-router"  // 引入userRouter
//不能使用userouter的原因是其只能在setup中使用，不能进函数，否则会报push undefined
import Vrouter from "@/router"
import { defineStore } from 'pinia'
import { removeSessionCookie } from '@/cookie.js';

export const useEndoutStore = defineStore('endout', () => {
    const endOut = () => {
        // localStorage.clear()清除上次登录用户名密码，若此时在地址栏输入项目网址相关页面，仍可以进入项目页面中，故加了下一行
        localStorage.clear()
        //加入该行后会清除缓存，当点击退出按钮后，会清除登录信息缓存
        window.sessionStorage.clear()
        // 用户点击注销按钮，移除 session ID
        removeSessionCookie();
        //this.$router.push()在vue3中无法使用，会报router undefined
        //const router = useRouter()
        const router = Vrouter
        router.push({
            path:'/'
        })
        // 退出后禁止返回上一页 待测试 好像没有起作用
        const back = () => {
            history.pushState(null, null, document.URL)
        }
        window.addEventListener(
            "popstate",
            back(),
            false
        );
    }
    return { endOut }
})