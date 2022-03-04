/*
 * @Description: 工具类
 * @Author: hairyOwl
 * @Date: 2022-02-21 16:11:04
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-02 08:47:59
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

    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    return `${YYYY}-${MM}-${DD}`;
};


//导出方法工文件外调用
module.exports = {
    getBody,
    formatTimestamp,
};

