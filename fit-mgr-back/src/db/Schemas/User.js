/*
 * @Description: User schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:43:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 17:37:57
 */
//导入依赖
const mongoose = require('mongoose');
const {getMeta ,preSave } = require('../helpers');

//User schema字段
const UserSchema = new mongoose.Schema({ 
    account : String,
    password : String,
    character : String, //character._id

    //元数据
    meta : getMeta(),
});

//保存前执行
UserSchema.pre('save' , preSave);

//保存前执行
mongoose.model('User',UserSchema);