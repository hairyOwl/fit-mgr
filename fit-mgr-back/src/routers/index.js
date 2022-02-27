/*
 * @Description: 路由管理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:13:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-27 09:55:52
 */
const authRouter = require('./auth'); //等同 /auth/index.js
const inviteCodeRouter = require('./invite-code');

//接收当前koa的一个实列 app
module.exports = (app) =>{
    app.use(authRouter.routes()); //认证路由注册中间件
    app.use(inviteCodeRouter.routes()); //认证路由注册中间件

};
