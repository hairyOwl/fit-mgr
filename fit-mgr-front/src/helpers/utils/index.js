/*
 * @Description: 公共方法
 * @Author: hairyOwl
 * @Date: 2022-02-26 21:56:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 20:06:21
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

const timestampPadStart = (str)=>{
    str = String(str); //转换格式
    return str.padStart(2,'0'); //不足两位向前填充0
};

//格式化时间戳年月日
export const formatTimestamp = (timestamp)=>{
    const date = new Date(Number(timestamp));

    //获得年月日并拼接
    const YYYY = date.getFullYear();
    const MM = timestampPadStart(date.getMonth() +1) ; //月从9开始
    const DD = timestampPadStart(date.getDate());
    return `${YYYY}-${MM}-${DD}`;
};

//格式化时间戳
export const formatTimestampPlus = (timestamp)=>{
    const date = new Date(Number(timestamp));

    //获得年月日并拼接
    const YYYY = date.getFullYear();
    const MM = timestampPadStart(date.getMonth() +1) ; //月从9开始
    const DD = timestampPadStart(date.getDate());

    const hh = timestampPadStart(date.getHours());
    const mm = timestampPadStart(date.getMinutes());
    const ss = timestampPadStart(date.getSeconds());

    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss} `;
};

