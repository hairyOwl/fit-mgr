/*
 * @Description: 工具类
 * @Author: hairyOwl
 * @Date: 2022-02-21 16:11:04
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-21 16:49:21
 */
//通过时间戳获取 年  ts是时间戳
const getYearByTimeStamp = (ts) =>{
    const date = new Date(ts);
    return date.getFullYear();
}

const getDataByTimeStamp = (ts)=>{
    const date = new Date(); 
    return date.getDate();
}

//导出方法工文件外调用
module.exports = {
    getYearByTimeStamp,
    getDataByTimeStamp,
};