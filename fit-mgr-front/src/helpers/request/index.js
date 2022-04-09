/*
 * @Description: 统一为请求 增加Token
 * @Author: hairyOwl
 * @Date: 2022-03-27 20:23:54
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:36:32
 */
import axios from 'axios';
import { getToken } from '@/helpers/token';

//默认请求域名
const domain = 'http://localhost:3000';
//拼接默认请求网站
const getURL = (path) =>{
    return `${domain}${path}`;
};

//默认头信息
export const getHeaders = () =>{ 
    return {
        Authorization :  `Bearer ${getToken()}`, //认证信息
    };
};

/* 
    为请求方法添加默认的头信息
*/
export const get = (url , data={}) =>{ //data无参数时空对象 防止undefine
    return axios.get(getURL(url) , {
        params : data,
        headers : getHeaders(),
    }); 
};

export const post = (url , data={}) =>{
    return axios.post(getURL(url) , data , {
        headers : getHeaders(),
    }); 
};

export const del = (url) =>{
    return axios.delete(getURL(url) , {
        headers : getHeaders(),
    }); 
};