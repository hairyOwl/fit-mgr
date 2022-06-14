/*
 * @Description: jsonwebtoken 了解用法
 * @Author: hairyOwl
 * @Date: 2022-02-25 22:54:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-26 09:50:51
 */
//令牌创建
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

console.log(token);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NDU4MDExNjh9.D5Oup0KJ_dnslFoCYH2jho4dat2wd8hAIr6kEbO7j2s
//3个点把tocken分成3个部分
/* 
1. header
	1. 加密的算法  sha256
	2. 表示当前是什么 会标记JWT
2. payload
	1. 需要加密的东西
3. signature 密钥
*/
//解密
jwt.verify(token,'shhhhh',(err,payload)=>{
    console.log(err,payload);
});

//{ foo: 'bar', iat: 1645840139 }  //iat 签发的时间