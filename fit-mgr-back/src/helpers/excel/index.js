/*
 * @Description: excel 文件解析封装
 * @Author: hairyOwl
 * @Date: 2022-03-25 20:03:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-23 10:39:23
 */
const config = require('../../project.config');
const fs = require('fs');
const Blob = require('node:buffer');
const xlsx = require('node-xlsx');

//获取excel文件位置
const loadExcel = (path)=>{
    return xlsx.parse(path,{ 
        cellDates: false 
    }); //{ cellDates: true } 时间解析相关 false不用自带的时间解析有闰年问题
};

//获取第一张表上的数据
const getFirstSheet = (sheets) =>{
    return sheets[0].data;
};

//导出excel 文件名格式 用户名数据类当前时间
const toExcelFile = (fileName,data) =>{
    //后端生成excel成功
    const buffer = xlsx.build([{name: fileName, data: data}]); //生成数据流
    return buffer;
}


module.exports = {
    loadExcel,
    getFirstSheet,
    toExcelFile,
}