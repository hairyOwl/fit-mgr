/*
 * @Description: 重置密码申请表
 * @Author: hairyOwl
 * @Date: 2022-03-15 14:18:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 22:03:35
 */
const mongoose = require('mongoose');
const { getMeta , preSave } =require('../helpers');

const ResetPasswordSchema = mongoose.Schema({
    //用户账号
    account : String,
    //处理状态  1待处理 2已重置 3已忽略
    status : Number,
    meta : getMeta(),
});

ResetPasswordSchema.pre('save',preSave);

mongoose.model('ResetPassword',ResetPasswordSchema);