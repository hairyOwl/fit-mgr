/*
 * @Description: 血糖数据 路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-28 10:59:45
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-20 13:55:43
 */
//导入依赖
const Router = require('@koa/router'); //路由
const mongoose = require('mongoose'); 
const { getBody,formatTimestamp } = require('../../helpers/utils');

//拿到model
const BloodGlucose = mongoose.model('BloodGlucose');

//抽取通过id找单条文档的方法
const findBloodGOne = async (id) =>{
    const one = await BloodGlucose.findOne({
        _id : id,
    }).exec();

    return one;
}

//路由前缀
const bgRouter = new Router({
    prefix : '/bg',
}); 

//添加血糖接口
bgRouter.post('/add',async (ctx)=>{
    //拿取添加页面上的信息
    const {
        userAccount,
        glucose,
        recordDate,
        timeTag,
        note,
    } =getBody(ctx);

    
    const bloodGlucose = new BloodGlucose({
        userAccount,
        glucose,
        recordDate,
        timeTag,
        note,
    });

    const res = await bloodGlucose.save();

    ctx.body = {
        code : 1,
        msg : '添加血糖信息成功',
        data : res,
    };
});

//获取列表接口 分页列表
bgRouter.get('/list',async (ctx) =>{

    let{
        userAdmin,
        account,
        page, //当前页数 默认为1
        size,  //一页多少条
        starDay = '', //开始日期
        endDay = '', //结束日期
    } = ctx.query;

    page = Number(page);
    size = Number(size);

    //判断是否有查询条件
    const query = {};
    //非管理员用户只能看自己的血糖
    if(userAdmin === 'false'){
        query.userAccount = account;
    }

    //有日期查询
    if (starDay!='' && endDay!=''){
        //开始日期从0点
        starDay =new Date(new Date(Number(starDay)).toLocaleDateString()).getTime()
        //结束日期到23:59点
        endDay = new Date(new Date(Number(endDay)).toLocaleDateString()).getTime()+24 * 60 * 60 * 1000 -1;// 当天23:59
        query.recordDate = { 
            $gt: starDay,
            $lt: endDay,
        };
    }

    //分页查询
    const list = await BloodGlucose
        .find(query)
        .sort({
            recordDate:-1, //倒序排放
        })
        .skip((page - 1) * size) //跳过目标页之前的的文档
        .limit(size) //查几条
        .exec();
    //获取总条数
    const total = await BloodGlucose.countDocuments(query);
    
    ctx.body = {
        code : 1,
        msg : '获取血糖列表内容成功',
        data: {
            list,
            total,
            page,
            size,
        }
    }
});

//删除血糖接口 http delete接口
bgRouter.delete('/:id',async(ctx)=>{
    //bloodGlucose/12344
    const{
        id,
    } = ctx.params;

    const delMsg = await BloodGlucose.deleteOne({
        _id: id,
    });

    ctx.body = {
        code : 1,
        msg : '删除成功',
        data : delMsg,
    };
});

//编辑
bgRouter.post('/update' , async(ctx)=>{
    const{
        id,
        ...others //扩展运算符 要修改的属性合并
    } = ctx.request.body;

    const one = await BloodGlucose.findOne({
        _id : id,
    }).exec();

    //没有找到
    if(!one){
        ctx.body = {
            code : 0,
            msg : '没有找到相关血糖信息',
            data : null,
        };

        return;
    }

    //找到数据修改
    const newQuery = {};
    Object.entries(others).forEach(([key,value]) =>{
        if(value){ //如果这个参数修改
            newQuery[key] = value;
        }
    });
    //修改和原数据合并
    Object.assign(one , newQuery); //合并信息需要考虑安全

    const res =  await one.save();
    ctx.body = {
        code : 1,
        msg : '血糖信息修改成功',
        data : res,
    };
});

//详情
bgRouter.get('/detail/:id',async (ctx)=>{
    const{
        id,
    } = ctx.params;

    const one = await findBloodGOne(id);

    if(!one){
        ctx.body = {
            code:0,
            msg:'没有找对该条血糖数据',
        }
        return;
    }

    ctx.body = {
        code:1,
        msg : '查询成功',
        data : one,
    }
});

module.exports = bgRouter;



