/*
 * @Description: 后端配置项 例如常量，端口
 * @Author: hairyOwl
 * @Date: 2022-03-07 22:14:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 21:43:53
 */
const path = require('path'); //处理路径

module.exports = {
    DEFAULT_PASSWORD : '111222',
    JWT_SECRET : 'fit-mgr',
    UPLOAD_DIR : path.resolve(__dirname,'../upload'),
};