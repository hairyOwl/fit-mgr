/*
 * @Description: 血糖数据 blood-glucose
 * @Author: hairyOwl
 * @Date: 2022-03-17 17:07:19
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 15:07:58
 */
const mongoose = require('mongoose');
const { getMeta ,preSave } = require('../helpers');

const BGSchema = new mongoose.Schema({
    //用户id
    userAccount : String, 
    //记录者账户
    recordAccount : String,
    //血糖
    glucose : Number,
    //日期
    recordDate : Number,
    //时间段 早餐前 早餐后 早餐前 早餐后 晚餐前 晚餐后 晚饭 
    timeTag : String,
    //备注
    note : String,

    meta: getMeta(),
});

//保存前执行
BGSchema.pre('save' , preSave);

mongoose.model('BloodGlucose',BGSchema);