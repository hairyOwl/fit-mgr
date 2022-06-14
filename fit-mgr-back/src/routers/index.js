/*
 * @Description: 路由管理
 * @Author: hairyOwl
 * @Date: 2022-02-24 16:13:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-29 22:09:17
 */
const authRouter = require('./auth'); //等同 /auth/index.js
const inviteCodeRouter = require('./invite-code');
const bpRouter = require('./blood-pressure');
const inventoryLogRouter = require('./inventory-log');
const userRouter = require('./user');
const characterRouter = require('./character');
const logRouter = require('./action-log');
const resetPasswordRouter = require('./reset-password');
const bloodGlucoseRouter = require('./blood-glucose');
const medicineRouter = require('./medicine');
const medicineClassifyRouter = require('./medicine-classify');
const profileRouter = require('./profile');
const dashBoardRouter = require('./dashBoard');
const dashBoardHealthRouter = require('./dashboard-health');
const uploadRouter = require('./upload');

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
    app.use(bloodGlucoseRouter.routes());
    app.use(medicineRouter.routes());
    app.use(medicineClassifyRouter.routes());
    app.use(profileRouter.routes());
    app.use(dashBoardRouter.routes());
    app.use(dashBoardHealthRouter.routes());
    app.use(uploadRouter.routes());
    
};
