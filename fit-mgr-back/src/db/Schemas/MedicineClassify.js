/*
 * @Description: 药剂分类
 * @Author: hairyOwl
 * @Date: 2022-03-20 09:46:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-27 15:36:34
 */
const mongoose = require('mongoose');
const { getMeta , preSave } = require('../helpers');

const MedicineClassifySchema = new mongoose.Schema({
    //种类名
    //用户id
    userAccount : String, 
    title : String ,
    meta : getMeta(),
});

MedicineClassifySchema.pre('save',preSave);

mongoose.model('MedicineClassify',MedicineClassifySchema);
