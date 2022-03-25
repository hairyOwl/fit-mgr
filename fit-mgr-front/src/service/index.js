/*
 * @Description: 所有请求相关 统一向外暴露模块的相关的内容
 * @Author: hairyOwl
 * @Date: 2022-02-25 10:25:12
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-23 09:50:57
 */
//import {register} from './auth'  //相当于./auth/index.js 导入的是一个大对象 register是其中一个属性
export * as auth from './auth'; //相当于./auth/index.js 导出的所有内容聚合到一个对象 auth
export * as bloodPressure from './bloodPressure';  //血压
export * as bloodGlucose from './bloodGlucose';  //血糖
export * as medicine from './medicine';  //药剂
export * as inventoryLog from './inventoryLog';  //库存日志
export * as user from './user';  //用户
export * as character from './character';  //角色
export * as actionLog from './actionLog';  //操作日志
export * as resetPassword from './resetPassword';  //重置密码申请
export * as inviteCode from './inviteCode';  //邀请码
export * as medicineClassify from './medicineClassify';  //药剂分类
export * as profile from './profile';  //个人设置修改密码
export * as dashboard from './dashboard';  //总览



