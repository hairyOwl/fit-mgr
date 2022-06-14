/*
 * @Description: 操作日志 工具类
 * @Author: hairyOwl
 * @Date: 2022-03-13 22:22:45
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 11:21:12
 */
const { verifyToken , getToken } = require('../token'); //token 获取和解密
const mongoose = require('mongoose');

const ActionLog = mongoose.model('ActionLog');
const ActionLogResponse = mongoose.model('ActionLogResponse');

//中间件 访问接口便记录
const actionLogMiddleware = async (ctx , next) =>{
    /* 
        日志记录内容
    */
    //开始进入接口的时间
    const startTime = Date.now();
    await next();
    //使用者
    let payload = {};
    try {
        payload = await verifyToken(getToken(ctx));
    } catch (error) {
        payload = {
            account : '未知用户',
            id : '',
        }
    }
    //请求信息
    const status = ctx.status;
    const method = ctx.method;
    const url = ctx.url;
    let show = true;
    //隐藏删除日志的记录
    if(url === '/actionLog/delete'){
        show = false;
    }
    //响应体
    let responseBody = '';
    if(typeof (ctx.body) === 'string'){
        responseBody = ctx.body;
    }else{
        try {
            responseBody = JSON.stringify(ctx.body); 
        } catch (error) {
            responseBody = '';
        }
    }
    //离开接口的时间
    const endTime = Date.now();

    // 添加一条日志响应文档
    const actionLog = new ActionLog({
        user: {
            account : payload.account,
            id : payload.id,
        },
        request : {
            status,
            method,
            url,
        },
        startTime,
        endTime,

        show,
    });
    await actionLog.save();

    // 添加一条日志响应文档
    const actionLogRes = new ActionLogResponse({
        actionLogId : actionLog._id,
        data : responseBody,
    });
    await actionLogRes.save();
};

module.exports = {
    actionLogMiddleware , 
}