/*
 * @Description: 公共方法
 * @Author: hairyOwl
 * @Date: 2022-02-26 21:56:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-03 22:22:55
 */
import { message } from 'ant-design-vue'; //提示框

//处理请求结果的数据
export const result = (response , authShowErrorMsg = true ) =>{ //authShowErrorMsg参数默认是true

    const {data} = response;

    if((data.code === 0) && authShowErrorMsg){ //错误码
        message.error(data.msg);
    }

    return{
        success(callback){ //成功会执行
            if(data.code != 0){
                callback(data,response);
            }
            return this; //链式调用
        },
        fail(callback){ //失败会执行
            if(data.code === 0){
                callback(data,response);
            }
            return this; //链式调用
        },
        finally(callback){ //成功失败都执行
            callback(data,response);
            return this; //链式调用
        }
    };    
};

//深拷贝
export const clone = (obj) =>{
    return JSON.parse(JSON.stringify(obj));
};

//格式化时间戳
export const formatTimestamp = (timestamp)=>{
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

