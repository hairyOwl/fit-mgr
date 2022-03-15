/*
 * @Description: 重置密码申请表
 * @Author: hairyOwl
 * @Date: 2022-03-15 14:18:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 14:31:47
 */
const mongoose = require('mongoose');
const { getMeta , preSave } =require('../helpers');

const ForgetPasswordSchema = mongoose.Schema({
    //用户id
    userId : Number,
    //用户账号
    account : String,
    //处理状态  1待处理 2已重置 3已忽略
    status : Number,
    meta : getMeta(),
});

ForgetPasswordSchema.pre('save',preSave);

mongoose.model('ForgetPassword',ForgetPasswordSchema);