/*
 * @Description: 邀请码 路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-26 22:51:41
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-16 16:57:08
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

//获取列表
inviteCodeRouter.get('/list', async(ctx)=>{
    let {
        page,
        size,
    } = ctx.request.query;

    page = Number(page);
    size = Number(size);

    const list = await InviteCode
        .find()
        .sort({
            _id:-1,
        })
        .skip((page-1) * size)
        .limit(size).exec();

    const total = await InviteCode.countDocuments().exec();

    ctx.body = {
        code : 1,
        msg : '成功获取邀请码列表',
        data: {
            list,
            total,
            page,
            size,
        },
    }
});

//生成唯一随机数作为邀请码 UUID
inviteCodeRouter.post('/add',async (ctx)=>{
    const {
        count = 1,
    } = ctx.request.body;

    // 生成多条邀请码
    const arr = [];
    for( let i=0 ; i<count ; i++ ){
        arr.push({
            code : uuidv4(), //生成邀请码
            user : '' , //空用户说明邀请码未被使用
        });
    }
    const res = await InviteCode.insertMany(arr); //插入多条

    ctx.body = {
        code : 1,
        msg : '创建成功',
        data : res,
    }
    
});

//删除邀请码
inviteCodeRouter.delete('/:id', async (ctx)=>{
    const {
        id
    } = ctx.params;

    const res = await InviteCode.deleteOne({
        _id : id,
    });

    ctx.body = {
        code : 1,
        msg : '删除成功',
        data : res,
    }
});

module.exports = inviteCodeRouter;