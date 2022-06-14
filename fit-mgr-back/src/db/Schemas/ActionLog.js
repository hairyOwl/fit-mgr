/*
 * @Description: Log 日志 Schema
 * @Author: hairyOwl
 * @Date: 2022-03-12 21:12:03
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 11:15:55
 */
const mongoose = require('mongoose');
const {getMeta , preSave} = require('../helpers');

const ActionLogSchema = mongoose.Schema({
    //用户
    user:{ //提供必要的数据省去查询多表
        account : String,
        id :String,
    },
    //进行的操作
    request : {
        status : Number,
        method : String, //http请求使用什么方法
        url : String, 
    },

    startTime : Number,
    endTime : Number,
    
    show : Boolean,
    meta:getMeta(),
});

//保存前执行
ActionLogSchema.pre('save' , preSave);

mongoose.model('ActionLog',ActionLogSchema);