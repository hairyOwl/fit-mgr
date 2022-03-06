/*
 * @Description: 路由管理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:13:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 11:19:48
 */
const authRouter = require('./auth'); //等同 /auth/index.js
const inviteCodeRouter = require('./invite-code');
const bpRouter = require('./blood-pressure');
const inventoryLogRouter = require('./inventory-log');


//接收当前koa的一个实列 app
module.exports = (app) =>{
    //路由注册中间件
    app.use(authRouter.routes()); 
    app.use(inviteCodeRouter.routes()); 
    app.use(bpRouter.routes());
    app.use(inventoryLogRouter.routes());
};
