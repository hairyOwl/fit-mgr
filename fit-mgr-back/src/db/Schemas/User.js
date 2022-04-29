/*
 * @Description: User schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:43:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-28 16:51:47
 */
//导入依赖
const mongoose = require('mongoose');
const {getMeta ,preSave } = require('../helpers');

//User schema字段
const UserSchema = new mongoose.Schema({ 
    account : String,
    password : String,
    character : String, //character._id
    isMinder : Boolean, //是否是照顾者
    minder : String, //被照顾者id

    //元数据
    meta : getMeta(),
});

//保存前执行
UserSchema.pre('save' , preSave);

//保存前执行
mongoose.model('User',UserSchema);