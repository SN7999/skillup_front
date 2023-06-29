/*
 * @Author: Mildred
 * @Date: 2023-06-29 10:23:32
 * @LastEditors: Mildred
 * @LastEditTime: 2023-06-29 10:34:48
 * @Description: 获取logo图片（因为vue3中使用require报错）
 */


import { defineStore } from 'pinia'

export const useLogoStore = defineStore('getlogo', () => {
    const logoUrl = new URL(`@/assets/images/logo.png`,import.meta.url).href
    return { logoUrl }
})
