/*
 * @Description: 操作日志 response schema
 * @Author: hairyOwl
 * @Date: 2022-03-15 11:05:08
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 11:22:43
 */
const mongoose = require('mongoose');
const { getMeta , preSave } = require('../helpers');

const ActionLogResponseSchema = mongoose.Schema({
    //对应LogId
    actionLogId : String,
    //响应体内容
    data : String,    
    meta : getMeta(),
});

ActionLogResponseSchema.pre('save' , preSave);

mongoose.model('ActionLogResponse',ActionLogResponseSchema);