/*
 * @Description: 统一为请求 增加Token
 * @Author: hairyOwl
 * @Date: 2022-03-27 20:23:54
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-27 15:04:50
 */
import axios from 'axios';
import { getToken } from '@/helpers/token';
import { Buffer } from 'buffer'

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
//get
export const get = (url , data={}) =>{ //data无参数时空对象 防止undefine
    return axios.get(getURL(url) , {
        params : data,
        headers : getHeaders(),
    }); 
};

//post
export const post = (url , data={}) =>{
    return axios.post(getURL(url) , data , {
        headers : getHeaders(),
    }); 
};

//删除接口
export const del = (url) =>{
    return axios.delete(getURL(url) , {
        headers : getHeaders(),
    }); 
};

//导出文件请求
export const downloadExcel = (url,data) =>{
    //请求数据流
    return axios.post(getURL(url) , data , {
        headers : getHeaders(),
        responseType: 'arraybuffer',
    }).then((res)=>{
    //处理数据流并下载
        // console.log(res);
        //arraybuffer 转为Blob
        let blob = new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        //文件名获取它的类型是buffer(为了传输中文)
        const fileName =  res.headers['content-disposition'].split(';')[1].split('filename=')[1]
        //a标签模拟点击
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);//创建url对象
        link.download = Buffer.from(fileName,'base64').toString(); //文件名buffer转string
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);//销毁url对象
    });
};