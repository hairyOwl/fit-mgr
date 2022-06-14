/*
 * @Description: 权限 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-08 16:09:12
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 16:14:29
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');


// const {getBody} = require('../../helpers/utils');

//拿到model
const Character = mongoose.model('Character');

const characterCodeRouter = new Router({
    prefix : '/character',
});

//获取角色列表
characterCodeRouter.get('/list',async (ctx)=>{

    const list = await Character.find().exec();

    ctx.body = {
        code : 1,
        msg : '获取角色列表成功',
        data : list,
    }
});


module.exports = characterCodeRouter;