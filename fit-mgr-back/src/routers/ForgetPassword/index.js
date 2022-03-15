/*
 * @Description: 重置密码 路由操作
 * @Author: hairyOwl
 * @Date: 2022-03-15 14:32:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 14:38:21
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');

const ForgetPassword = mongoose.model('ForgetPassword');

const forgetPasswordRouter = new Router({
    prefix: '/forgetPassword',
});

forgetPasswordRouter.get('/list', async (ctx)=>{

});

module.exports = forgetPasswordRouter;