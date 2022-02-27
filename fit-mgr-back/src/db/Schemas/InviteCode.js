/*
 * @Description: 邀请码的schema
 * @Author: hairyOwl
 * @Date: 2022-02-26 22:42:06
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-26 22:46:52
 */
//导入依赖
const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
    code : String, //邀请码
    user : String, //邀请码对应用户

    mate : getMate(),
});

mongoose.model('InviteCode',InviteCodeSchema);