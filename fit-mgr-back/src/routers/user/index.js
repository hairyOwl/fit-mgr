/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-03-07 10:02:28
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-07 23:13:14
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4:uuidv4 } =require('uuid');
const config = require('../../project.config');

const User = mongoose.model('User');

const userRouter = new Router({
    prefix : '/user',
});

//用户列表
userRouter.get('/list',async (ctx)=>{
    let{
        page,
        size,
        keyword,
    }=ctx.query
    page = Number(page);
    size = Number(size);

    //查询条件
    const query = {};
    if(keyword !=''){
        query.account =keyword;
    }

    //分页查询
    const list = await User
        .find(query)
        .sort({
            _id : -1,
        })
        .skip((page-1)* size)
        .limit(size)
        .exec();
    if(!list){
        ctx.body = {
            code : 0,
            msg : '无法获取用户列表',
        }
    }
    //获取总数
    const total = await User.countDocuments().exec();

    ctx.body = {
        code : 1,
        msg : '成功获取用户列表',
        data : {
            list,
            page,
            size,
            total,
        },
    }

});

//删除用户
userRouter.delete('/:id',async (ctx)=>{
    const{
        id,
    }=ctx.params;

    const delMsg = await User.deleteOne({
        _id : id,
    });

    ctx.body = {
        code : 1,
        msg : "成功删除用户",
        data : delMsg,
    };
});

//添加用户
userRouter.post('/add',async(ctx)=>{
    const {
        account,
        password,
    } = ctx.request.body;

    const user = new User({
        account,
        password : password || config.DEFAULT_PASSWORD,
    });

    const res = await user.save();
    if(!res){
        ctx.body={
            code : 0,
            msg : '添加用户失败',
        };

        return;
    }

    ctx.body={
        code : 1,
        msg : '添加用户成功',
        data: res,
    };

});

//重置为默认密码
userRouter.post('/reset/password', async (ctx)=>{
    const{
        id,
        // password,
    } = ctx.request.body;
    // 查询要更改的用户
    const one = await User.findOne({
        _id : id,
    }).exec();
    if(!one){
        ctx.body={
            code:0,
            msg : '无法找到用户',
        }

        return;
    }

    one.password = config.DEFAULT_PASSWORD;

    const res = await one.save();
    ctx.body = {
        code : 1,
        msg : '成功重置密码',
        data : {
            _id : res._id,
            account :res.account,
        },
    }
});

module.exports = userRouter;