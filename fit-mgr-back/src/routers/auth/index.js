/*
 * @Description: 认证相关的路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:09:47
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-25 16:21:08
 */
//导入路由依赖
const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const authRouter = new Router({
    prefix: '/auth', //前缀
});

//被koa处理后作为中间件进行注册 所以可以拿到 context 。
//context是在 router处理完后 匹配到路由作为调用传回
//注册
authRouter.post('/register', async (ctx) =>{
    //取得输入框数据
    const{
        account,
        password,
    } = ctx.request.body

    //确保账号唯一性 异步为了后续逻辑await
    const onlyOne = await User.findOne({
        account, // 在users 的 account 查询 是否已存在
    }).exec();

    if(onlyOne){
        ctx.body = {
            code : 1, //请求成功
            msg: '账号已存在',
            data : null,
        }
        return; //终止
    }
    
    //生成一条user文档 并保存到数据库
    const user = new User({
        account, //等同于 account : account
        password, //password : password
    });
    const res = await user.save();

    //返回信息
    ctx.body = {
        code : 1, //请求成功
        msg: '注册成功',
        data : res,
    }
});
//登录
authRouter.post('/login', async (ctx) =>{
    
});

module.exports = authRouter;
