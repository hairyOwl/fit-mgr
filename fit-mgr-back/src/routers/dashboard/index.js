/*
 * @Description: 总览 仪表盘 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-21 23:00:44
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-24 18:35:39
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');

const User  = mongoose.model('User');
const BloodPressure  = mongoose.model('BloodPressure');
const BloodGlucose  = mongoose.model('BloodGlucose');
const Medicine  = mongoose.model('Medicine');
const ActionLog  = mongoose.model('ActionLog');


const dashBoardRouter = new Router({
    prefix : '/dashboard',
});
//获取基础数据
dashBoardRouter.get('/base-info', async (ctx)=>{
    const userTotal = await User.countDocuments();
    const bloodPTotal = await BloodPressure.countDocuments();
    const bloodGTotal = await BloodGlucose.countDocuments();
    const medicineTotal = await Medicine.countDocuments();
    const actionLogTotal = await ActionLog.countDocuments({show : true});

    ctx.body = {
        code : 1,
        msg : '获取基础信息成功',
        data : {
            total : {
                userTotal,
                bloodPTotal,
                bloodGTotal,
                medicineTotal,
                actionLogTotal,
            },
        },
    };
});

module.exports = dashBoardRouter;