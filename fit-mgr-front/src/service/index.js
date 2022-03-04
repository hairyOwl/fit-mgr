/*
 * @Description: 所有请求相关 统一向外暴露模块的相关的内容
 * @Author: hairyOwl
 * @Date: 2022-02-25 10:25:12
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-01 14:03:52
 */
//导入依赖
//import {register} from './auth'  //相当于./auth/index.js 导入的是一个大对象 register是其中一个属性
export * as auth from './auth'; //相当于./auth/index.js 导出的所有内容聚合到一个对象 auth
export * as bloodPressure from './bloodPressure'; 



