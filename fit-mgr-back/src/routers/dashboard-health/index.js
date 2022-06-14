/*
 * @Description: 健康数据仪表盘 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-29 18:10:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 15:54:14
 */
const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getToken ,verifyToken } = require('../../helpers/token');
const { formatTimestamp, bpNumberToTag , getUserAccount } = require('../../helpers/utils');


const BloodPressure  = mongoose.model('BloodPressure');
const BloodGlucose  = mongoose.model('BloodGlucose');
const Medicine  = mongoose.model('Medicine');

const dashBoardHealthRouter = new Router({
    prefix : '/dashboard/health',
});
//获取基础数据
dashBoardHealthRouter.get('/info', async (ctx)=>{
    //获取当前用户account
    let { account } = await verifyToken(getToken(ctx));    

    //照顾者看主用户的信息
    account = await getUserAccount(account);

    const bloodPTotal = await BloodPressure.countDocuments( {userAccount : account} ).exec();
    const bloodGTotal = await BloodGlucose.countDocuments( {userAccount : account} ).exec();
    const medicineTotal = await Medicine.countDocuments( {userAccount : account} ).exec();

    ctx.body = {
        code : 1,
        msg : '获取基础信息成功',
        data : {
            total : {
                bloodPTotal,
                bloodGTotal,
                medicineTotal,
            },
        },
    };
});

//获取血压血糖数据用于可视化
dashBoardHealthRouter.get('/blood-info', async (ctx)=>{
    //获取当前用户account
    const { account } = await verifyToken(getToken(ctx));    
    //时间时间戳
    const now = (new Date(new Date().toLocaleDateString())).getTime()+(3600*1000*24-1); //当天 23:59
    const before3Day = (now - 3600 * 1000 * 24 * 3); //前3天00:00

    //血压信息的可视化数据
    const bloodPList = await bpLineChartData(account,before3Day , now);

    const bloodGList = await BloodGlucose.find( {userAccount : account} ).exec(); 

    // if(bloodGList.length === 0){
    //     ctx.body = {
    //         code : 1,
    //         msg : '获取血压血糖信息成功',
    //     };
    //     return;
    // }

    ctx.body = {
        code : 1,
        msg : '获取可视化信息成功',
        data : {
            total : {
                bloodPList,
                bloodGList,
            },
        },
    };
});

//血压图标数据处理
const bpLineChartData = async ( account, before3Day , now ) =>{
    /* 
        获取血压数据
    */
    //查询近3天的血压数据
    const bloodPList = await BloodPressure
        .find( {
            userAccount : account ,
            recordDate : { 
                $gte: before3Day,
                $lt: now,
            }
        })
        .sort({
            recordDate : -1,
            timeTag : 1,
        }).exec();
    
    //血压无最近三天的数据就不数据处理
    if(bloodPList.length === 0){
        return;
    }
    /* 
        对血压数据处理
    */
    //竖轴数据
    const bpSeriesSys = [];
    const bpSeriesDia = [];
    const bpSeriesPul = [];
    bpSeriesSys.push(bloodPList[0].sys);
    bpSeriesDia.push(bloodPList[0].dia);
    bpSeriesPul.push(bloodPList[0].pul);
    // 横轴数据
    const bpXAxisData = [];
    let date = bloodPList[0].recordDate;
    bpXAxisData.push(`${formatTimestamp(date)} \n ${bpNumberToTag(bloodPList[0].timeTag)}`);
    for(let i=1 ; i< bloodPList.length ; i++){
        //横轴数据
        //日期变更 添加日期头
        if(date != bloodPList[i].recordDate){
            date = bloodPList[i].recordDate
            bpXAxisData.push(`${formatTimestamp(bloodPList[i].recordDate)} \n ${bpNumberToTag(bloodPList[i].timeTag)}`)
        }else{
            bpXAxisData.push(`${bpNumberToTag(bloodPList[i].timeTag)}`)
        }
        // 竖轴数据
        bpSeriesSys.push(bloodPList[i].sys);
        bpSeriesDia.push(bloodPList[i].dia);
        bpSeriesPul.push(bloodPList[i].pul);
    }

    return {
        bpXAxisData, //横轴数据
        bpSeriesSys, //竖轴 高压
        bpSeriesDia, //竖轴 低压
        bpSeriesPul, //竖轴 心跳
    };
}

module.exports = dashBoardHealthRouter;