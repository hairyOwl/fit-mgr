/*
 * @Description: 邀请码的schema
 * @Author: hairyOwl
 * @Date: 2022-02-26 22:42:06
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-07 21:23:11
 */
//导入依赖
const mongoose = require('mongoose');
const { getMeta ,preSave} = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
    code : String, //邀请码
    user : String, //邀请码对应用户

    mate : getMeta(),
});

//保存前执行
InviteCodeSchema.pre('save' , preSave);

mongoose.model('InviteCode',InviteCodeSchema);