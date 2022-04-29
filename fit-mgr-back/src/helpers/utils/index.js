/*
 * @Description: 工具类
 * @Author: hairyOwl
 * @Date: 2022-02-21 16:11:04
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-27 17:23:54
 */
//
const getBody = (ctx) =>{
    return ctx.request.body || {}; //返回返回体body 或空
}

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

//血压时间戳 批量上传时 文字转数字
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

//血糖时间戳 批量上传时 文字转数字
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

//血压 数组对应文字
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

//血压 数组对应文字
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

//导出方法工文件外调用
module.exports = {
    getBody,
    formatTimestamp,
    nowTime,
    findNumFromBPExcel,
    findNumFromBGExcel,
    bpNumberToTag,
    bgNumberToTag,
    formatExcelDate,
};

