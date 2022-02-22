/*
 * @Description: async-await
 * @Author: hairyOwl
 * @Date: 2022-02-21 17:55:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-22 14:55:11
 */

/* 
async-await函数 返回的是一个Promise函数
*/
// const request = (arg,isReject) =>{
//     //resolve成功时做的事情  reject失败时做的事情
//     return new Promise((resolve,reject)=>{
//         //一个Promise实列立即会执行下列方法
//         setTimeout(()=>{
//             if(isReject){
//                 reject('发生错误');
//                 return;
//             }

//             console.log(arg);
//             resolve(arg+1);
//         },300);
//     });
// };

// const fn = async() =>{
//     const res1 = await request(1);
//     const res2 = await request(res1);
//     const res3 = await request(res2);
//     const res4 = await request(res3);
//     const res5 = await request(res4);

//     console.log(res5);
// };

// fn();

// const fn = () =>{
// 	return new Promise((resolve,reject)=>{
// 		resolve(1);
// 	});
// };

// fn().then((res)=>{
//     console.log(res);
// });

// const fn = async function(){

// };

/* 
回调函数
*/
//假设一个函数，拿到数据前有5个前置接口
// const request = (arg,cb) =>{
//     setTimeout(()=>{
//         console.log(arg);
//         cb(arg +1);
//     },500);
// };

// request(1,function(res){
//     console.log('res',res);
// });

// request(1,function(res1){
//     request(res1, function(res2){
//         request(res2, function(res3){
//             request(res3, function(res4){
//                 request(res4, function(res5){
//                     //回调地狱
//                     console.log('res5',res5);
//                 });
//             });
//         });
//     });
// });

/* 
promise
*/
// const request = (arg,isReject) =>{
//     //resolve成功时做的事情  reject失败时做的事情
//     return new Promise((resolve,reject)=>{
//         //一个Promise实列立即会执行下列方法
//         setTimeout(()=>{
//             if(isReject){
//                 reject('发生错误');
//                 return;
//             }

//             console.log(arg);
//             resolve(arg+1);
//         },300);
//     });
// };

// request(1)
//     //resolve执行.then  reject执行.catch
//     .then((res1)=>{
//         return request(res1,true);
//     })
//     .then((res2)=>{
//         return request(res2);
//     })
//     .then((res3)=>{
//         return request(res3);
//     })
//     .then((res4)=>{
//         return request(res4);
//     })
//     .then((res5)=>{
//         console.log('res5',res5);
//     });