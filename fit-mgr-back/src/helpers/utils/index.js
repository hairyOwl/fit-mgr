/*
 * @Description: 工具类
 * @Author: hairyOwl
 * @Date: 2022-02-21 16:11:04
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 15:40:35
 */
const mongoose = require('mongoose');

const User = mongoose.model('User');

/* 
    响应处理相关
*/
//获取响应体Body
const getBody = (ctx) =>{
    return ctx.request.body || {}; //返回返回体body 或空
}

//判断记录者
const getUserAccount = async(userAccount) =>{
    const one = await User.findOne({
        account : userAccount,
    }).exec();
    //如果是照顾者 记录者是照顾者反之是用户本身
    if(one.isMinder){
        return one.minder;
    }else{
        return userAccount;
    }
}

/* 
    时间戳预处理
*/
//格式化时间戳
const formatTimestamp = (timestamp)=>{
    const date = new Date(Number(timestamp));

    //获得年月日并拼接
    const YYYY = date.getFullYear();
    const MM = date.getMonth() +1 ; //月从9开始
    const DD = date.getDate();

    return `${YYYY}/${MM}/${DD}`;
};

//获取当前时间精确到秒
const nowTime = () =>{
    const date = new Date();
    //获得年月日并拼接
    const YYYY = date.getFullYear();
    const MM = date.getMonth() +1 ; //月从9开始
    const DD = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    

    return `${YYYY}-${MM}-${DD} ${hh}h${mm}m${ss}s`;
}

//批量添加时处理日期少一天的问题 因为闰年
function formatExcelDate(num) {
    const old = num - 1;
    const t = Math.round((old - Math.floor(old)) * 24 * 60 * 60);
    const time = new Date(1900, 0, old, 0, 0, t);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate()

    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (date < 10 ? '0' + date : date)
}

/* 
    导入导出字段转换
*/
//血压时间段 批量上传时 文字转数字
const findNumFromBPExcel = (timeTag) =>{
    if(timeTag === '早上'){
        return '0';
    }else if(timeTag === '中午'){
        return '1';
    }else if(timeTag === '下午'){
        return '2';
    }else if(timeTag === '晚上'){
        return '3';
    }
}

//血糖时间段 批量上传时 文字转数字
const findNumFromBGExcel = (timeTag) =>{
    if(timeTag === '早餐前'){
        return '0';
    }else if(timeTag === '早餐后'){
        return '1';
    }else if(timeTag === '中餐前'){
        return '2';
    }else if(timeTag === '中餐后'){
        return '3';
    }else if(timeTag === '晚餐前'){
        return '1';
    }else if(timeTag === '晚餐后'){
        return '2';
    }else if(timeTag === '睡前'){
        return '3';
    }
}

//血压时间段 数组对应文字
const bpNumberToTag = (num) =>{
    if(num === '0'){
        return "早上"
    }else if(num === '1'){
        return "中午"
    }else if(num === '2'){
        return "下午"
    }else if(num === '3'){
        return "晚上"
    }
};

//血糖时间段 数组对应文字
const bgNumberToTag = (num) =>{
    if(num === '0'){
        return "早餐前"
    }else if(num === '1'){
        return "早餐后"
    }else if(num === '2'){
        return "中餐前"
    }else if(num === '3'){
        return "中餐后"
    }else if(num === '4'){
        return "晚餐前"
    }else if(num === '5'){
        return "晚餐后"
    }else if(num === '6'){
        return "睡前"
    }
};



//导出方法工文件外调用
module.exports = {
    getBody,
    getUserAccount,

    formatTimestamp,
    nowTime,
    formatExcelDate,

    findNumFromBPExcel,
    findNumFromBGExcel,
    bpNumberToTag,
    bgNumberToTag,
};

