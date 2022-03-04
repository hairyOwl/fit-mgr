/*
 * @Description: 血压数据schema
 * @Author: hairyOwl
 * @Date: 2022-02-28 09:27:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-03 20:22:29
 */
const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const BPSchema = new mongoose.Schema({
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
    //计数
    count :Number,

    meta: getMate(),
});

mongoose.model('BloodPressure',BPSchema);


