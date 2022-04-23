/*
 * @Description: 初始化koa,mongo
 * @Author: hairyOwl
 * @Date: 2022-02-19 10:51:48
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-22 23:04:22
 */
//每个文件都是一个模块 
//导入依赖
const Koa = require('koa'); //导入koa
const koaBody = require('koa-body'); //获取页面数据
const { connect } = require('./db'); //导入 db/index.js
const registerRouters = require('./routers'); //等同./routers/index.js
const cors = require('@koa/cors'); //@koa/cors 解决数据跨域
const { middleware: koaJwtMiddleware  , checkUser, catchTokenError} = require('./helpers/token'); //jwt中间件
const { actionLogMiddleware } = require('./helpers/actionLog'); //操作日志 中间件
const staticFiles = require('koa-static'); //静态资源文件
const path = require('path');

//实例化
const app = new Koa(); //实列化一个koa对象

//数据库连接成功后再进行请求处理
connect().then(()=>{
    //执行函数 中间件
    app.use(koaBody({
        multipart : true, //开启支持文件上传
        formidable : { //文件大小阈值
            maxFileSize : 200 * 1024 * 1024, //200M
        }
    })); //body请求头 页面数据
    app.use(cors()); //跨域
    app.use(catchTokenError); //自定义koaJwt报错
    koaJwtMiddleware(app);//校验token合法性
    app.use(checkUser);
    app.use(actionLogMiddleware);//操作日志 中间件
    app.use(staticFiles(path.join(__dirname , '../public/')));
    
    //注册路由
    registerRouters(app);
    //监听3000端口
    app.listen(3000,()=>{
        console.log('启动成功');
    });

});


