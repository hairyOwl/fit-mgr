/*
 * @Description: excel 文件解析封装
 * @Author: hairyOwl
 * @Date: 2022-03-25 20:03:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 20:15:21
 */
const xlsx = require('node-xlsx');

//获取excel文件位置
const loadExcel = (path)=>{
    return xlsx.parse(path);
};

//获取第一张表上的数据
const getFirstSheet = (sheets) =>{
    return sheets[0].data;
};

module.exports = {
    loadExcel,
    getFirstSheet,
}