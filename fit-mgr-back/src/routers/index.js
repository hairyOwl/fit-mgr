/*
 * @Description: 路由管理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:13:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 22:04:25
 */
const authRouter = require('./auth'); //等同 /auth/index.js
const inviteCodeRouter = require('./invite-code');
const bpRouter = require('./blood-pressure');
const inventoryLogRouter = require('./inventory-log');
const userRouter = require('./user');
const characterRouter = require('./character');
const logRouter = require('./action-log');
const resetPasswordRouter = require('./reset-password');

//接收当前koa的一个实列 app
module.exports = (app) =>{
    //路由注册中间件
    app.use(authRouter.routes()); 
    app.use(inviteCodeRouter.routes()); 
    app.use(bpRouter.routes());
    app.use(inventoryLogRouter.routes());
    app.use(userRouter.routes());
    app.use(characterRouter.routes());
    app.use(logRouter.routes());
    app.use(resetPasswordRouter.routes());
    
};
