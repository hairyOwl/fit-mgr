/*
 * @Description: 库存 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-06 11:09:10
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 16:10:01
 */
//导入路由依赖
const Router = require('@koa/router');
const mongoose = require('mongoose');
// const {getBody} = require('../../helpers/utils');

//拿到model
const InventoryLog = mongoose.model('InventoryLog');

const InventoryLogRouter = new Router({
    prefix : '/inventory-log',
});

//分页查询用户列表
InventoryLogRouter.get('/list' , async (ctx)=>{
    const{
        dataId,
        type, //增加还是减少
    } = ctx.query;

    let{
        size, //分页相关
        page,
    } = ctx.query
    size = Number(size);
    page = Number(page);

    const list = await InventoryLog
        .find({
            dataId,
            type,
        })
        .sort({
            _id:-1, //以_id为基准倒序排放
        })
        .skip((page -1 )* size)
        .limit(size)
        .exec();

    //指定条件的总条数 
    const total = await InventoryLog
        .find({
            dataId,
            type,
        }).countDocuments().exec();

    ctx.body = {
        code : 1,
        msg : "查询日志列表成功",
        data : {
            total,
            list,
            page,
            size,
        },
    }
    
});


module.exports = InventoryLogRouter;