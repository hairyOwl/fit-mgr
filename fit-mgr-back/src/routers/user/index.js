/*
 * @Description: 用户路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-07 10:02:28
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 18:45:41
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config'); //默认配置
const { verifyToken , getToken } = require('../../helpers/token'); //jwt解析
const { loadExcel , getFirstSheet  } = require('../../helpers/excel'); //解析excel帮助类

const User = mongoose.model('User');
const Character = mongoose.model('Character'); //权限表

const userRouter = new Router({
    prefix : '/user',
});

//用户列表
userRouter.get('/list',async (ctx)=>{
    let{
        page,
        size,
        keyword,
    }=ctx.query
    page = Number(page);
    size = Number(size);

    //查询条件
    const query = {};
    if(keyword !=''){
        query.account =keyword;
    }

    //分页查询
    const list = await User
        .find(query)
        .sort({
            _id : -1,
        })
        .skip((page-1)* size)
        .limit(size)
        .exec();
    if(!list){
        ctx.body = {
            code : 0,
            msg : '无法获取用户列表',
        }
    }
    //获取总数
    const total = await User.countDocuments().exec();

    ctx.body = {
        code : 1,
        msg : '成功获取用户列表',
        data : {
            list,
            page,
            size,
            total,
        },
    }

});

//删除用户
userRouter.delete('/:id',async (ctx)=>{
    const{
        id,
    }=ctx.params;

    const delMsg = await User.deleteOne({
        _id : id,
    });

    ctx.body = {
        code : 1,
        msg : "成功删除用户",
        data : delMsg,
    };
});

//添加用户
userRouter.post('/add',async (ctx)=>{
    const {
        account,
        password,
        character,
    } = ctx.request.body;

    //判断角色是否存在
    if(character ===""){
        ctx.body ={
            code : 0,
            msg : '添加用户失败',
        }
        return;
    }
    const role = await Character.findOne({
        _id : character,
    }).exec();
    if(!role){
        ctx.body ={
            code : 0,
            msg : '添加用户失败',
        }
        return;
    }

    //确保账户唯一
    const oneUser = await User.findOne({
        account,
    }).exec();

    if(oneUser){
        ctx.body ={
            code : 0,
            msg : '添加用户失败',
        }
        return;
    }

    const user = new User({
        account,
        password : password || config.DEFAULT_PASSWORD,
        character,
    });

    const res = await user.save();
    if(!res){
        ctx.body={
            code : 0,
            msg : '添加用户失败!',
        };

        return;
    }

    ctx.body={
        code : 1,
        msg : '添加用户成功',
        data: res,
    };

});

//批量添加
userRouter.post('/add/many', async (ctx)=>{
    const {
        fileKey = '',
    } = ctx.request.body;
    
    //获取硬盘上的路径
    const path = `${config.UPLOAD_DIR}/${fileKey}`;

    //解析excel
    const excel = loadExcel(path);
    const sheet = getFirstSheet(excel);

    //获取角色表中的成员
    const character = await Character.find().exec();
    const member = character.find((item) => item.name === 'member');
    
    //解析到的用户数据重组为数组
    const arr = [];
    for(let i=1 ; i<sheet.length ; i++){
         //每一行数据 第一列是账户 第二列是密码没有时设置默认密码
        const [account , password = config.DEFAULT_PASSWORD] = sheet[i]; 
        
        //判断无重复用户名
        const one = await User.findOne({
            account,
        });
        if(one){
            continue; //重复跳入下一次循环
        };
        arr.push({
            account,
            password,
            character: member._id,
        });
    }

    //用户字典存入数据库
    await User.insertMany(arr);

    ctx.body = {
        code : 1,
        msg : '成功添加多条用户信息',
        data : {
            addCount : arr.length,
        }
    }
});

//重置为默认密码
userRouter.post('/reset/password', async (ctx)=>{
    const{
        id,
        // password,
    } = ctx.request.body;
    // 查询要更改的用户
    const one = await User.findOne({
        _id : id,
    }).exec();
    if(!one){
        ctx.body={
            code:0,
            msg : '无法找到用户',
        }

        return;
    }

    one.password = config.DEFAULT_PASSWORD;

    const res = await one.save();
    ctx.body = {
        code : 1,
        msg : '成功重置密码',
        data : {
            _id : res._id,
            account :res.account,
        },
    }
});

//修改角色
userRouter.post('/update/character' , async (ctx)=>{
    const{
        userId,
        character,
    } = ctx.request.body;

    if(character ===""){
        ctx.body ={
            code : 0,
            msg : '修改失败',
        }
        return;
    }
    const role = await Character.findOne({
        _id : character,
    }).exec();
    if(!role){
        ctx.body ={
            code : 0,
            msg : '出错啦',
        }
        return;
    }

    const user = await User.findOne({
        _id : userId,
    }).exec();
    if(!user){
        ctx.body ={
            code : 0,
            msg : '出错啦',
        }
        return;
    }

    user.character = character;

    const res = await user.save();
    ctx.body = {
        code : 1,
        msg : '成功修改',
        data : res,
    };
});

//通过token换取用户信息
userRouter.get('/info',async (ctx)=>{
    //Authorization : Bearer de^*huwihduiedds123123  需要去掉'Bearer '
    ctx.body={
        code : 1,
        msg : '登录获取成功',
        data : await verifyToken(getToken(ctx)),
    };
});


module.exports = userRouter;