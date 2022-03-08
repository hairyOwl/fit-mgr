/*
 * @Description: User schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:43:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-07 21:23:03
 */
//导入依赖
const mongoose = require('mongoose');
const {getMeta ,preSave } = require('../helpers');

//User schema字段
const UserSchema = new mongoose.Schema({ 
    account : String,
    password : String,

    //元数据
    meta : getMeta(),
});

//保存前执行
UserSchema.pre('save' , preSave);

//注册为模型
mongoose.model('User',UserSchema);