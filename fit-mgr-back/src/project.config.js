/*
 * @Description: 后端配置项 例如常量，端口
 * @Author: hairyOwl
 * @Date: 2022-03-07 22:14:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-22 17:04:01
 */
const path = require('path'); //处理路径

module.exports = {
    DEFAULT_PASSWORD : '111222', //默认密码
    JWT_SECRET : 'fit-mgr', 
    DOMAIN : 'http://localhost:3000', //顶级域名
    UPLOAD_DIR : path.resolve(__dirname,'../public/upload'),
    EXPORT_EXCEL_DIR : path.resolve(__dirname,'../public/exportExcel'),

};