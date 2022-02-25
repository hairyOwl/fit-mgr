/*
 * @Description: 路由管理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:13:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-24 16:24:08
 */
const authRouter = require('./auth/index.js');

//接收当前koa的一个实列 app
module.exports = (app) =>{
    app.use(authRouter.routes()); //认证路由注册中间件
};
