/*
 * @Description: 血压数据 逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-28 10:59:45
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-03 23:00:22
 */
//导入依赖
const Router = require('@koa/router'); //路由
const mongoose = require('mongoose'); 
const { getBody,formatTimestamp } = require('../../helpers/utils');

//常量
const BP_CONST = {
    ADD: 'ADD_COUNT',
    SUB : 'SUB_COUNT',
};

//拿到model
const BloodPressure = mongoose.model('BloodPressure');

//路由前缀
const bpRouter = new Router({
    prefix : '/bp',
}); 

//添加血压接口
bpRouter.post('/add',async (ctx)=>{
    //拿取添加页面上的信息
    const {
        sys,
        dia,
        pul,
        count,
        recordDate,
        timeTag,
        note,
    } =getBody(ctx);

    
    const bloodPressure = new BloodPressure({
        sys,
        dia,
        pul,
        count,
        recordDate,
        timeTag,
        note,
    });

    const res = await bloodPressure.save();

    ctx.body = {
        code : 1,
        msg : '添加血压信息成功',
        data : res,
    };
});

//获取列表接口 分页列表
bpRouter.get('/list',async (ctx) =>{
    // https://www.xxxx.com/table?page=5&size=20&starDay=开始日期&endDay=结束日期&#sahdoasdhod //?page=5&size=20 query部分
    const {
        page = 1, //当前页数 默认为1
        size = 5,  //一页多少条
    } = ctx.query;

    let{
        starDay = '', //开始日期
        endDay = '', //结束日期
    } = ctx.query;

    //判断是否有查询条件
    const query = {};
    if (starDay!='' && endDay!=''){
        console.log( );
        //开始日期从0点
        starDay =new Date(new Date(Number(starDay)).toLocaleDateString()).getTime()
        //结束日期到23:59点
        endDay = new Date(new Date(Number(endDay)).toLocaleDateString()).getTime()+24 * 60 * 60 * 1000 -1;// 当天23:59
        console.log(starDay+' '+endDay);
        query.recordDate = { 
            $gt: starDay,
            $lt: endDay,
        };
    }

    //分页查询
    const list = await BloodPressure
        .find(query)
        .skip((page - 1) * size) //跳过目标页之前的的文档
        .limit(size) //查几条
        .exec();
    //获取总条数
    const total = await BloodPressure.countDocuments();
    
    ctx.body = {
        code : 1,
        msg : '获取血压列表内容成功',
        data: {
            list,
            total,
            page,
            size,
        }
    }
});

//删除血压接口 http delete接口
bpRouter.delete('/:id',async(ctx)=>{
    //bloodPressure/12344
    const{
        id,
    } = ctx.params;

    const delMsg = await BloodPressure.deleteOne({
        _id: id,
    });

    ctx.body = {
        code : 1,
        msg : '删除成功',
        data : delMsg,
    };
});

//修改计数
bpRouter.post('/update/count' ,async (ctx) =>{
    const{
        id,
        type, //增加还是减少
    } = ctx.request.body;

    let{
        num, //要修改的数量
    }= ctx.request.body;
    num = Number(num);


    //找到要修改的文档
    const bloodP = await BloodPressure.findOne({
        _id : id,
    }).exec();

    if(!bloodP){
        ctx.body = {
            code : 0,
            msg : '没有找到要修改的数据',
            data : null,
        }
        return;
    }
    //找到了文档
    if( type === BP_CONST.ADD ){ //加
        num = Math.abs(num); //绝对值
    }else{ //出库
        num = -Math.abs(num);
    }

    bloodP.count = bloodP.count + num ;
    if( bloodP.count < 0 ){
        ctx.body = {
            code : 0,
            msg : '减少的数大于现存',
            data : null,
        };
        return;
    }

    const res= await bloodP.save(); //更新数据
    ctx.body = {
        code : 1,
        msg : '更新计数成功',
        data : res,
    };
});


module.exports = bpRouter;



