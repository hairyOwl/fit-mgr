/*
 * @Description: 权限 schema
 * @Author: hairyOwl
 * @Date: 2022-03-08 10:06:10
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 10:58:22
 */
const mongoose = require('mongoose');
const {getMeta ,preSave } = require('../helpers');

const CharacterSchema = mongoose.Schema({
    name : String, //member admin
    title : String, //成员   管理员
    power : Object, //权限表
    
    meta : getMeta(),
});

//保存前执行
CharacterSchema.pre('save',preSave);
//保存前执行
mongoose.model('Character',CharacterSchema);