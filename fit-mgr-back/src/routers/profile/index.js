/*
 * @Description: 个人设置路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-21 20:43:56
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 21:59:10
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4:uuidv4 } =require('uuid');
const config = require('../../project.config');
const { verifyToken , getToken } = require('../../helpers/token');


const User = mongoose.model('User');

const profileRouter = new Router({
    prefix: '/profile',
});

profileRouter.post('/update/password', async(ctx)=>{
    const{
        password,
        oldPassword, //旧密码做校验
    } = ctx.request.body;

    //通过Token获取当前用户信息
    const id= verifyToken(getToken(ctx))._id;

    const one = await User.findOne({
        id,
    }).exec();
    console.log(one);
    //用户不存在
    if(!one){
        ctx.body = {
            code : 0,
            msg : '用户不存在',
        }
        return;
    }
    //输入的旧密码和数据库中不同
    if(one.password !== oldPassword){
        ctx.body = {
            code : 0,
            msg : '密码校验失败',
        }
        return;
    }

    one.password = password;

    await one.save();
    
    ctx.body = {
        code : 1,
        msg : '修改成功',
    };
});

module.exports = profileRouter;