/*
 * @Description: 数据库连接
 * @Author: hairyOwl
 * @Date: 2022-02-20 22:28:12
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 14:23:56
 */
//注册模型
require('./Schemas/User') //执行User.js
require('./Schemas/InviteCode') //执行InviteCode.js
require('./Schemas/BloodPressure') //执行 BloodPressure.js
require('./Schemas/InventoryLog') //执行 InventoryLog.js
require('./Schemas/Character') //执行 Character.js
require('./Schemas/ActionLog') //执行 ActionLog.js
require('./Schemas/ActionLogResponse') //执行 ActionLogResponse.js
require('./Schemas/ForgetPassword') //执行 ForgetPassword.js

//导入mongoose
const mongoose = require('mongoose');
//连接数据库
const connect = ()=>{
    // promise 对象 保证数据库连接成功后再进行后续操作
    return new Promise((resolve)=>{
        //连接数据库
        mongoose.connect('mongodb://localhost:27017/fit-mgr'); 
        //监听open。当数据库被打开的时候做一些事情
        mongoose.connection.on('open',()=>{
            console.log('数据库连接成功');
            resolve();
        });
    });
}
//暴露函数
module.exports = {
    connect,
};                                             