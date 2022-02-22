/*
 * @Description: 数据库连接
 * @Author: hairyOwl
 * @Date: 2022-02-20 22:28:12
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-21 14:14:10
 */
//导入mongoose
const mongoose = require('mongoose');

/* 
数据库数据创建
*/
//schema 传入对象，对象描述每个文档信息
const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number,
});
//创建Model
const UserModal = mongoose.model('User',UserSchema); //是个类

/* 
对目标集合进行操作
*/
//连接数据库
const connect = ()=>{
    //连接数据库
    mongoose.connect('mongodb://localhost:27017/fit-mgr'); 
    //监听open。当数据库被打开的时候做一些事情
    mongoose.connection.on('open',()=>{
        console.log('连接成功');
        //创建一条文档
        const user = new UserModal({
            nickname:'小白',
            password:'123123',
            age:12,
        });
        //保存、同步到mongodb
        user.age = 22
        user.save() 
    });
}
//调用函数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
connect();