/*
 * @Description: 邀请码管理 接口发起
 * @Author: hairyOwl
 * @Date: 2022-03-16 22:10:33
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:15:04
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

//获取邀请码列表
export const list = (page , size)=>{
    return axios.get('http://localhost:3000/invite/list',{
        params:{
            page,
            size,
        }
    });
};

//添加邀请码
export const add = (count)=>{
    return axios.post('http://localhost:3000/invite/add',{
        count
    });
};

//删除邀请码
export const remove = (id)=>{
    return axios.delete(`http://localhost:3000/invite/${id}`);
};