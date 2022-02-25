/*
 * @Description: 初始化koa,mongo
 * @Author: hairyOwl
 * @Date: 2022-02-19 10:51:48
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-25 16:12:00
 */
//每个文件都是一个模块 
//导入依赖
const Koa = require('koa'); //导入koa
const koaBody = require('koa-body'); //获取页面数据
const { connect } = require('./db'); //导入 db/index.js
const registerRouters = require('./routers'); //等同./routers/index.js
const cors = require('@koa/cors'); //@koa/cors 解决数据跨域

//实例化
const app = new Koa(); //实列化一个koa对象

//数据库连接成功后再进行请求处理
connect().then(()=>{
    //执行函数
    app.use(koaBody()); //body请求头 页面数据
    app.use(cors()); //跨域

    //注册路由
    registerRouters(app);
    //监听3000端口
    app.listen(3000,()=>{
        console.log('启动成功');
    });

});


