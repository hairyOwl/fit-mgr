/*
 * @Description: 日志 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-12 21:27:15
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 21:13:58
 */
const mongoose = require('mongoose');
const Router = require('@koa/router');

const ActionLog = mongoose.model('ActionLog');

const logRouter = new Router({
    prefix :'/actionLog',
});

const findLog = async (id)=>{
    const one =  await ActionLog.findOne({
        _id : id,
    }).exec();

    return one;
};

// 获取列表
logRouter.get('/list', async (ctx)=>{
    let {
        page,
        size,
    } = ctx.query;

    page = Number(page);
    size = Number(size);

    const list = await ActionLog
        .find({
            show : true,
        })
        .sort({
            _id: -1,
        })
        .skip((page-1) * size)
        .limit(size)
        .exec();

    const total = await ActionLog.countDocuments({
        show:true,
    }).exec();

    ctx.body = {
        code : 1,
        msg : '获取日志列表成功',
        data : {
            list,
            page,
            size,
            total,
        },
    }
});

// 隐藏一条日志
logRouter.post('/delete',async (ctx)=>{
    const {
        id,
    } = ctx.request.body;

    const one = await findLog(id);
    if(!one){
        ctx.body = {
            code : 0,
            msg : '成功删除',
        }
        return;
    }

    one.show = false;

    await one.save();

    ctx.body = {
        code : 1,
        msg : '成功删除该条日志',
    }

});

module.exports = logRouter;