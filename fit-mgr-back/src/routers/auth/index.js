/*
 * @Description: 认证相关的路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:09:47
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-11 17:53:49
 */
//导入路由依赖
const Router = require('@koa/router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {getBody} = require('../../helpers/utils');
const config = require('../../project.config');

//拿到model
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const authRouter = new Router({
    prefix: '/auth', //前缀
});

//被koa处理后作为中间件进行注册 所以可以拿到 context 。
//context是在 router处理完后 匹配到路由作为调用传回
/* 
注册
*/
authRouter.post('/register', async (ctx) =>{
    //取得输入框数据
    const{
        account,
        password,
        inviteCode,
    } = getBody(ctx);

    //表单校验
    if(account === '' || password==='' || inviteCode===''){
        ctx.body = {
            code : 0, //请求成功
            msg: '字段不能为空',
        }

        return ;
    }

    //邀请码是否可以使用
    const findCode = await InviteCode.findOne({
        code : inviteCode,
    }).exec();
    if((!findCode) || findCode.user){ //无邀请码或邀请码已被使用
        ctx.body = {
            code : 0, //请求成功
            msg: '邀请码不正确',
        }
        return; //终止
    }


    //确保账号唯一性 异步为了后续逻辑await
    const findUser = await User.findOne({
        account, // 在users 的 account 查询 是否已存在
    }).exec();
    if(findUser){
        ctx.body = {
            code : 0, //请求成功
            msg: '账号已存在',
        }
        return; //终止
    }
    
    //生成一条user文档 并保存到数据库
    const user = new User({
        account, //等同于 account : account
        password, //password : password
    });
    const res = await user.save(); //把创建的用户同步到mongodb
    findCode.user = res._id; //邀请码关联用户
    findCode.meta = new Date().getTime();
    await findCode.save(); //更新邀请码文档

    //返回信息
    ctx.body = {
        code : 1, //请求成功
        msg: '注册成功',
        data : res,
    }
    return;
});

/* 
登录
*/
authRouter.post('/login', async (ctx) =>{
    //拿取输入框信息
    const{
        account,
        password,
    } = ctx.request.body;

    //数据校验
    if(account === '' || password===''){
        ctx.body = {
            code : 0, //请求成功
            msg: '字段不能为空',
        }

        return ;
    }

    //查询是否存在
    const one = await User.findOne({
        account,
    }).exec();

    //不存在
    if(!one){
        //查不到用户
        ctx.body = {
            code: 0,
            msg : '用户名或密码错误',
        };
        return;
    }

    //存在 判断密码
    //返回的user 剔除敏感信息
    const oneUser = {
        account : one.account,
        character : one.character,
        _id : one._id,
    };
    if(one.password === password){
        ctx.body = {
            code: 1,
            msg : '登入成功',
            data : {
                user : oneUser, //返回用户
                token: jwt.sign(oneUser,config.JWT_SECRET), 
            },
        };
        return;
    }

    //密码错误
    ctx.body = {
        code: 0,
        msg : '用户名或密码错误',
    };
    return;
});

module.exports = authRouter;
