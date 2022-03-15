/*
 * @Description: 认证相关 工具类
 * @Author: hairyOwl
 * @Date: 2022-03-11 17:46:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-13 22:36:44
 */
const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');

//获取token
//Authorization : Bearer de^*huwihduiedds123123  需要去掉'Bearer '
const getToken =(ctx)=>{
    let { authorization }  = ctx.header;
    return authorization.replace('Bearer ','').replace('bearer ',''); //去掉'Bearer '    
}

//token解密
const verifyToken = (token) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,config.JWT_SECRET,(err, payload)=>{
            //错误处理
            if(err){
                reject(err);
                return;
            }
            resolve(payload);
        });
    });
};

//校验token合法性 app koa实列
const middleware = (app) =>{
    app.use(koaJwt({
        secret : config.JWT_SECRET,
    }).unless({
        //不需要校验的路径
        path : [
            /^\/auth\/login/, //登录接口
            /^\/auth\/register/, //注册接口
        ],
    }));
};

//抓取koaJwt 错误
const catchTokenError = async(ctx , next)=>{
    return next().catch((error)=>{
        //401 错误码 无token 无认证错误
        if(error.status === 401){
            ctx.status = 401;

            ctx.body = {
                code : 0,
                msg : 'token error',
            };
        } else {
            throw error;
        }
    });
};

module.exports = {
    getToken,
    verifyToken,
    middleware,
    catchTokenError,
};