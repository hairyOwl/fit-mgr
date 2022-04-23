/*
 * @Description: 血压数据schema
 * @Author: hairyOwl
 * @Date: 2022-02-28 09:27:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-10 23:37:45
 */
const mongoose = require('mongoose');
const { getMeta ,preSave } = require('../helpers');

const BPSchema = new mongoose.Schema({
    //用户id
    userAccount : String, 
    //高压
    sys : Number,
    //低压
    dia : Number,
    //心跳
    pul : Number,
    //日期
    recordDate : Number,
    //时间段 早 中 下 
    timeTag : String,
    //备注
    note : String,

    meta: getMeta(),
});

//保存前执行
BPSchema.pre('save' , preSave);

mongoose.model('BloodPressure',BPSchema);


