/*
 * @Description: 初始化koa,mong
 * @Author: hairyOwl
 * @Date: 2022-02-19 10:51:48
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-22 14:56:16
 */

/*
每个文件都是一个模块 
 */

//导入依赖
const Koa = require('koa'); //导入koa
//实例化一个koa对象
const app = new Koa();
//通过app.use 注册中间件 。中间件本质上是一个函数
//每次请求进来中间件就会执行。
app.use(async(context , next) => {
    const {request:req} = context;
    const {url} = req;

    if(url === '/'){
        context.body = '<h1>主页</h1>';
        return;
    }
    ///user/list 路由
    if(url === '/user/list'){
        context.body = '<h1>用户列表</h1>';
        return;
    }

    context.body = '404';
    console.log(1);
    await next();
    console.log(3);
    context.status = 404;
});

app.use(async (context) =>{
    console.log(2);
    context.body = '找不到资源';
});
//开启一个http服务，接收http请求 并作处理 处理完后响应  https默认端口是443，http默认端口是80
//监听函数 listen(端口,ip)
app.listen(3000,()=>{
    console.log('启动成功'); //默认在本地
});