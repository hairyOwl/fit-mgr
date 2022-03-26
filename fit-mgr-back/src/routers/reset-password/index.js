/*
 * @Description: 重置密码 路由操作
 * @Author: hairyOwl
 * @Date: 2022-03-15 14:32:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 21:14:18
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

const ResetPassword = mongoose.model('ResetPassword');
const User = mongoose.model('User');

const forgetPasswordRouter = new Router({
    prefix: '/reset-password',
});
// 获取用户列表
forgetPasswordRouter.get('/list', async (ctx)=>{
    let {
        page,
        size,
    } = ctx.query; 
    page = Number(page);
    size = Number(size);
    
    const list = await ResetPassword
        .find({
            status : 1,
        })
        .sort({
            _id : -1,
        })
        .skip((page-1)*size)
        .limit(size)
        .exec();

    const total = await ResetPassword
        .countDocuments({
            status:1,
        }).exec();

    ctx.body = {
        code : 1,
        msg : '获取重置密码列表成功',
        data : {
            list,
            total,
            page,
            size,
        },
    }
});

// 添加一条申请
forgetPasswordRouter.post('/add', async (ctx)=>{
    const {
        account,
    } = ctx.request.body;

    // 1.账号存在 
    const user = await User.findOne({
        account,
    }).exec();
    if(!user){
        ctx.body={
            code : 1,
            msg : '申请成功',
        }
        return;
    }
    // 2.ForgetPassword集合中没有对应account status=1的文档
    const one = await ResetPassword.findOne({
        account,
        status : 1,
    }).exec();
    if(one){
        ctx.body={
            code : 1,
            msg : '申请成功',
        }
        return;
    }

    //满足2个条件记录
    const forgetPw = new ResetPassword({
        account,
        status : 1,
    });

    await forgetPw.save();
    ctx.body={
        code : 1,
        msg : '申请成功',
    }
    
});

//更新状态
forgetPasswordRouter.post('/update/status', async (ctx)=>{
    const {
        id,
        status,
    } = ctx.request.body;

    const one = await ResetPassword.findOne({
        _id : id,
    }).exec();
    if(!one){
        ctx.body={
            code : 0,
            msg : '申请不存在',
        };
        return;
    }

    one.status = status;
    //重置密码
    if(status === 2){
        const user = await User.findOne({
            account : one.account,
        }).exec();

        if(!user){
            ctx.body={
                code : 0,
                msg : '申请不存在',
            };
            return;
        }
        user.password = config.DEFAULT_PASSWORD;

        await user.save();
    }

    await one.save();
    ctx.body={
        code : 1,
        msg : '成功执行操作',
    };
});

module.exports = forgetPasswordRouter;