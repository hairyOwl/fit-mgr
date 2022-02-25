/*
 * @Description: User schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:43:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-25 10:02:22
 */
//导入依赖
const mongoose = require('mongoose');
const {getMate} = require('../helpers');

//User schema字段
const UserSchema = new mongoose.Schema({ 
    account : String,
    password : String,

    //元数据
    meta : getMate(),
});

//注册为模型
mongoose.model('User',UserSchema);