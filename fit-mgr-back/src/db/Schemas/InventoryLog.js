/*
 * @Description: 库存日志schema
 * @Author: hairyOwl
 * @Date: 2022-03-06 10:58:16
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 21:02:02
 */
const mongoose = require('mongoose');
const {getMeta , preSave} = require('../helpers');

const LogSchema = mongoose.Schema({
    //标记是那条数据的日志
    dataId : String,
    //增加还是减少
    type: String ,
    //变化数量
    num : Number,
    //谁操作的
    user : String,
    
    meta:getMeta(),
});

//保存前执行
LogSchema.pre('save' , preSave);

mongoose.model('InventoryLog',LogSchema);