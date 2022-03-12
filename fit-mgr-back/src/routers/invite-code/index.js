/*
 * @Description: 邀请码 路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-26 22:51:41
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 16:10:09
 */
//导入路由依赖
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); //UUID

// const {getBody} = require('../../helpers/utils');

//拿到model
const InviteCode = mongoose.model('InviteCode');

const inviteCodeRouter = new Router({
    prefix : '/invite',
});

//生成唯一随机数作为邀请码 UUID
inviteCodeRouter.post('/add',async (ctx)=>{
    const code = new InviteCode({
        code : uuidv4(), //生成邀请码
        user : '' , //空用户说明邀请码未被使用
    });

    const saved = await code.save();

    ctx.body = {
        code : 1,
        msg : '创建成功',
        data : saved,
    }
    
});


module.exports = inviteCodeRouter;