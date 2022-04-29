/*
 * @Description: 药品路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-18 14:40:42
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 16:28:37
 */
//导入依赖
const Router = require('@koa/router'); //路由
const mongoose = require('mongoose'); 
const { getBody,getUserAccount,formatExcelDate, formatTimestamp ,nowTime } = require('../../helpers/utils');
const config = require('../../project.config'); //默认配置
const { loadExcel , getFirstSheet , toExcelFile  } = require('../../helpers/excel'); //解析excel帮助类


//常量
const MEDICINE_CONST = {
    ADD: 'ADD_COUNT',
    SUB : 'SUB_COUNT',
};

//拿到model
const Medicine = mongoose.model('Medicine');
const MedicineClassify = mongoose.model('MedicineClassify');
const InventoryLog = mongoose.model('InventoryLog'); 

//抽取通过id找单条文档的方法
const findMedicineOne = async (id) =>{
    const one = await Medicine.findOne({
        _id : id,
    }).exec();

    return one;
}

//路由前缀
const medicineRouter = new Router({
    prefix : '/medicine',
}); 

//添加药品接口
medicineRouter.post('/add',async (ctx)=>{
    //拿取添加页面上的信息
    const {
        userAccount,
        name,
        tag,
        purchaseDate,
        shelfLife,
        count,
        note,
    } =getBody(ctx);

    const uAccount = await getUserAccount(userAccount);
    
    const medicine = new Medicine({
        userAccount : uAccount,
        recordAccount : userAccount,
        name,
        tag,
        purchaseDate,
        shelfLife,
        count,
        note,
    });

    const res = await medicine.save();

    ctx.body = {
        code : 1,
        msg : '添加药品信息成功',
        data : res,
    };
});

//批量添加
medicineRouter.post('/add/many', async (ctx)=>{
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
    const uAccount = await getUserAccount(userAccount);
    const arr = [];    
    for(let i=1 ; i<sheet.length ; i++){
         //每一行数据 封装为对象 
        const [
            name,
            tag,
            purchaseDate,
            shelfLife,
            count,
            note,
        ] = sheet[i]; 
        
        //把时间字符串转为时间戳
        let pDate;
        if(typeof purchaseDate === 'string'){
            pDate = new Date(purchaseDate).getTime();
        }else{
            pDate  = (new Date((formatExcelDate((new Date(purchaseDate)).getTime())))).getTime();
        }

        //因为excel中药品种类是名字数据库需要种类id
        let tangId = tag;
        const one = await MedicineClassify.findOne({
            title : tag,
        }).exec();
        if(one){
            tangId =  one._id;
        }

        arr.push({
            userAccount : uAccount,
            recordAccount : userAccount,
            name,
            tag : tangId,
            purchaseDate : pDate,
            shelfLife,
            count,
            note,
        });
    }

    //用户字典存入数据库
    await Medicine.insertMany(arr);

    ctx.body = {
        code : 1,
        msg : '成功添加多条药剂信息',
        data : {
            addCount : arr.length,
        }
    }
});

//批量导出
medicineRouter.post('/export/list',async (ctx)=>{
    let{
        userAdmin,
        account,
    } = ctx.request.body;
    //数据表格
    let data = [];
    const fileName = `${account}药`+ nowTime();
    //判断是否有查询条件
    const query = {};
    //非管理员用户只导出自己的血压
    const uAccount = await getUserAccount(account);
    if(userAdmin === false){
        //照顾者查看主用户的信息
        if(account !== uAccount){
            query.userAccount = uAccount;
        }else{
            //主用户看自己的信息
            query.userAccount = account;
        }
        data[0] = ['记录者','药品/试剂','种类','购买日期','保质期','数量','备注'];
    }else{//管理员表头不同
        data[0] = ['用户','记录者','药品/试剂','种类','购买日期','保质期','数量','备注'];
    }

    //获取导出列表
    const list = await Medicine.find(query).exec();
    const classifyList = await MedicineClassify.find().exec();
    
    
    //导出列表 按表头添加到列表
    list.forEach(async (element) =>{
        let arrInner = [];
        if(userAdmin === true){
            arrInner.push(element.userAccount);
        }
        //获取分类名字 返回的是一个分类对象
        const classify = classifyList.find((value)=>{
            if((value._id).toString() === element.tag){
                return value.title;
            }
        });
        arrInner.push(element.recordAccount);
        arrInner.push(element.name);'记录者',
        arrInner.push(classify.title);
        arrInner.push(formatTimestamp(element.purchaseDate));
        arrInner.push(element.shelfLife);
        arrInner.push(element.count);
        arrInner.push(element.note);

        data.push(arrInner);
        
    });
        
    /* 
    响应体设置
    */
    // request.headers['content-disposition'] = `attachment; filename=${fileName}`; //设置文件名
    //前端允许Content-Disposition
    ctx.set("Access-Control-Expose-Headers", "Content-Disposition"); 
    //设置文件名
    ctx.attachment(Buffer.from(fileName).toString('base64')); 
    ctx.body = toExcelFile(fileName ,data); //buffer文件流
});

//获取列表接口 分页列表
medicineRouter.get('/list',async (ctx) =>{
    let{
        userAdmin,
        account,
        page, //当前页数 默认为1
        size,  //一页多少条
        keyword,
    } = ctx.query;

    page = Number(page);
    size = Number(size);
    const uAccount = await getUserAccount(account);

    //判断是否有查询条件
    const query = {};
    //非管理员用户只能看自己的药品
    if(userAdmin === 'false'){
        //照顾者查看主用户的信息
        if(account !== uAccount){
            query.userAccount = uAccount;
        }else{
            //主用户看自己的信息
            query.userAccount = account;
        }
    }
    if(keyword !=''){
        query.name =keyword;
    }

    //分页查询
    const list = await Medicine
        .find(query)
        .sort({
            purchaseDate:-1, //倒序排放
        })
        .skip((page - 1) * size) //跳过目标页之前的的文档
        .limit(size) //查几条
        .exec();
    //获取总条数
    const total = await Medicine.countDocuments(query);
    
    ctx.body = {
        code : 1,
        msg : '获取药品列表内容成功',
        data: {
            list,
            total,
            page,
            size,
        }
    }
});

//删除药品接口 http delete接口
medicineRouter.delete('/:id',async(ctx)=>{
    //medicine/12344
    const{
        id,
    } = ctx.params;

    const delMsg = await Medicine.deleteOne({
        _id: id,
    });

    ctx.body = {
        code : 1,
        msg : '删除成功',
        data : delMsg,
    };
});

//修改计数 添加记录日志
medicineRouter.post('/update/count' ,async (ctx) =>{
    const{
        id,
        type, //增加还是减少
    } = ctx.request.body;

    let{
        num, //要修改的数量
    }= ctx.request.body;
    num = Number(num);

    //找到要修改的文档
    const medicine = await findMedicineOne(id);

    if(!medicine){
        ctx.body = {
            code : 0,
            msg : '没有找到要修改的数据',
            data : null,
        }
        return;
    }
    //找到了文档
    if( type === MEDICINE_CONST.ADD ){ //加
        num = Math.abs(num); //绝对值
    }else{ //出库
        num = -Math.abs(num);
    }

    medicine.count = medicine.count + num ;
    if( medicine.count < 0 ){
        ctx.body = {
            code : 0,
            msg : '减少的数大于现存',
            data : null,
        };
        return;
    }

    const res= await medicine.save(); //更新数据

    // 添加日志记录
    const log = new InventoryLog({
        dataId : medicine._id,
        type,
        num: Math.abs(num),
    });
    log.save(); //异步  event-loop
    
    ctx.body = {
        code : 1,
        msg : '更新计数成功',
        data : res,
    };
});

//编辑
medicineRouter.post('/update' , async(ctx)=>{
    const{
        id,
        ...others //扩展运算符 要修改的属性合并
    } = ctx.request.body;

    const one = await findMedicineOne(id);

    //没有找到
    if(!one){
        ctx.body = {
            code : 0,
            msg : '没有找到相关药品信息',
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
        msg : '信息修改成功',
        data : res,
    };
});

//详情
medicineRouter.get('/detail/:id',async (ctx)=>{
    const{
        id,
    } = ctx.params;

    const one = await findMedicineOne(id);

    if(!one){
        ctx.body = {
            code:0,
            msg:'没有找对该条药品数据',
        }
        return;
    }

    ctx.body = {
        code:1,
        msg : '查询成功',
        data : one,
    }
});

module.exports = medicineRouter;