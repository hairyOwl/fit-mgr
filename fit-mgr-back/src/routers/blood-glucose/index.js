/*
 * @Description: 血糖数据 路由处理
 * @Author: hairyOwl
 * @Date: 2022-02-28 10:59:45
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-27 15:28:26
 */
//导入依赖
const Router = require('@koa/router'); //路由
const mongoose = require('mongoose'); 
const { getBody, formatTimestamp,formatExcelDate, findNumFromBGExcel,nowTime,bgNumberToTag} = require('../../helpers/utils');
const config = require('../../project.config'); //默认配置
const { loadExcel , getFirstSheet,toExcelFile  } = require('../../helpers/excel'); //解析excel帮助类

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
        timeTag,
        note,
    } =getBody(ctx);

    let {
        recordDate,
    } = ctx.request.body;
    recordDate = (new Date(formatTimestamp(recordDate))).getTime();
    
    
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

//批量添加
bgRouter.post('/add/many', async (ctx)=>{
    const {
        fileKey = '',
        userAccount,
    } = ctx.request.body;

    //获取硬盘上的路径
    const path = `${config.UPLOAD_DIR}/${fileKey}`;

    //解析excel
    const excel = loadExcel(path);
    const sheet = getFirstSheet(excel);

    //解析到的用户数据重组为数组
    const arr = [];    
    for(let i=1 ; i<sheet.length ; i++){
         //每一行数据 封装为对象 
        const [
            recordDate,
            timeTag,
            glucose,
            note,
        ] = sheet[i]; 
        //把时间字符串转为时间戳
        let rDate;
        if(typeof recordDate === 'string'){
            rDate = new Date(recordDate).getTime();
        }else{
            rDate  = (new Date((formatExcelDate((new Date(recordDate)).getTime())))).getTime();
        }
        

        arr.push({
            userAccount,
            recordDate : rDate,
            timeTag: findNumFromBGExcel(timeTag),
            glucose,
            note,
        });
    }

    //用户字典存入数据库
    await BloodGlucose.insertMany(arr);

    ctx.body = {
        code : 1,
        msg : '成功添加多条血糖信息',
        data : {
            addCount : arr.length,
        }
    }
});

//批量导出
bgRouter.post('/export/list',async (ctx)=>{
    let{
        userAdmin,
        account,
    } = ctx.request.body;
    //数据表格
    let data = [];
    const fileName = `${account}血糖`+ nowTime();
    //判断是否有查询条件
    const query = {};
    //非管理员用户只导出自己的血糖
    if(userAdmin === false){
        query.userAccount = account;
        data[0] = ['日期','时间段','血糖','备注'];
    }else{//管理员表头不同
        data[0] = ['用户','日期','时间段','血糖','备注'];
    }

    //获取导出列表
    const list = await BloodGlucose
        .find(query)
        .sort({
            recordDate : -1,
            timeTag : -1,
        })
        .exec();
    
    //导出列表 按表头添加到列表
    list.forEach((element) =>{
        let arrInner = [];
        if(userAdmin === true){
            arrInner.push(element.userAccount);
        }
        arrInner.push(formatTimestamp(element.recordDate));
        arrInner.push(bgNumberToTag(element.timeTag));
        arrInner.push(element.glucose);
        arrInner.push(element.note);

        data.push(arrInner);
    });
    
    /* 
    响应体设置
    */
     //前端允许Content-Disposition
    ctx.set("Access-Control-Expose-Headers", "Content-Disposition"); 
    //设置文件名
    ctx.attachment(Buffer.from(fileName).toString('base64')); 
    ctx.body = toExcelFile(fileName ,data); //buffer文件流
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
            timeTag : -1,
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


module.exports = bgRouter;



