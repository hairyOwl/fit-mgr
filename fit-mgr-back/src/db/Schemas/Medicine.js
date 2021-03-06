/*
 * @Description: 药品与试剂
 * @Author: hairyOwl
 * @Date: 2022-03-17 17:08:24
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 15:25:20
 */
const mongoose = require('mongoose');
const { getMeta ,preSave } = require('../helpers');

const MedicineSchema = new mongoose.Schema({
    //用户账户
    userAccount : String, 
    //记录者账户
    recordAccount : String,
    //记录者账户
    recordAccount : String,
    //药品
    name : String,
    //购买日期
    purchaseDate : Number,
    //保质期
    shelfLife : String,
    //库存
    count :Number,
    //降压 降血糖 退烧 消炎 胃病 感冒 鼻炎
    tag : String,
    //备注
    note : String,
    
    meta: getMeta(),
});

//保存前执行
MedicineSchema.pre('save' , preSave);

mongoose.model('Medicine',MedicineSchema);