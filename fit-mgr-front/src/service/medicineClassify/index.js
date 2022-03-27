/*
 * @Description: 药剂管理 接口
 * @Author: hairyOwl
 * @Date: 2022-03-20 15:48:37
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:15:13
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`
//列表查询
export const list = ()=>{
    return axios.get('http://localhost:3000/medicine-classify/list');
};
//添加药剂分类
export const add = (title)=>{
    return axios.post(
        'http://localhost:3000/medicine-classify/add',{
            title,
        }
    );
};
//删除药剂分类
export const remove = (id)=>{
    return axios.delete(`http://localhost:3000/medicine-classify/${id}`);
};
//编辑药剂分类
export const update = (id , title)=>{
    return axios.post('http://localhost:3000/medicine-classify/update/title',{
        id,
        title,
    });
};