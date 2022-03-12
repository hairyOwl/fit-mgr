/*
 * @Description: 数据库初始化
 * @Author: hairyOwl
 * @Date: 2022-03-08 14:53:39
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 15:32:47
 */
//连接数据库
const mongoose = require('mongoose');
const { connect } = require('../src/db/index');

//默认权限表
const character = require('../src/helpers/character');
const { defaultCharacters } = character;

//默认权限表同步到数据库中
const Character = mongoose.model('Character');

connect()
    .then(async ()=>{
        console.log('开始初始化角色集合');
        await Character.insertMany(defaultCharacters);
        console.log('角色集合初始化完成');
    });
