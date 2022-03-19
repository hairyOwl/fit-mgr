/*
 * @Description: 药品信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-19 10:34:42
 */
import axios from "axios"; //axios 请求库可以帮助简化请求
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

//添加药品
export const add = (addForm) =>{
    return axios.post(
        'http://localhost:3000/medicine/add',
        addForm,
        );
}; 

//药品数据列表
export const list = (userAdmin, account, page ,size , keyword) =>{
    return axios.get(
        'http://localhost:3000/medicine/list',
        {
            params : {
                userAdmin,
                account,
                page,
                size,
                keyword,
            },
        }
    );
};

//删除一条药品数据
export const deleteOne = (id) =>{
    return axios.delete(
        `http://localhost:3000/medicine/${id}`,
    );
};

//更新一条药品数据
export const updateCount = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/medicine/update/count`,
        data,
    );
};

//修改一条药品数据
export const update = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/medicine/update`,
        data,
    );
};

// 药品详情
export const detail = (id)=>{
    return axios.get(`http://localhost:3000/medicine/detail/${id}`);
}