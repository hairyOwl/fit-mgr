/*
 * @Description: 公共方法
 * @Author: hairyOwl
 * @Date: 2022-02-26 21:56:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-26 22:23:43
 */
import { message } from 'ant-design-vue'; //提示框

//处理请求结果的数据
export const result = (response , authShowErrorMsg = true ) =>{ //authShowErrorMsg参数默认是true

    const {data} = response;

    if((data.code === 0) && authShowErrorMsg){ //注册登录的错误码
        console.log('1111');
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