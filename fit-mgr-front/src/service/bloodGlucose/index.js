/*
 * @Description: 血糖信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 21:46:18
 */
import axios from "axios"; //axios 请求库可以帮助简化请求
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

//添加血糖
export const add = (addForm) =>{
    return axios.post(
        'http://localhost:3000/bg/add',
        addForm,
        );
}; 

//批量添加血糖
export const addMany = (fileKey , userAccount) =>{
    return axios.post(
        'http://localhost:3000/bg/add/many',{
            fileKey,
            userAccount,
        });
}; 

//血糖数据列表
export const list = (userAdmin, account, page ,size , starDay ,endDay) =>{
    return axios.get(
        'http://localhost:3000/bg/list',
        {
            params : {
                userAdmin,
                account,
                page,
                size,
                starDay,
                endDay,
            },
        }
    );
};

//删除一条血糖数据
export const deleteOne = (id) =>{
    return axios.delete(
        `http://localhost:3000/bg/${id}`,
    );
};

//修改一条血糖数据
export const update = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/bg/update`,
        data,
    );
};

// 血糖详情
export const detail = (id)=>{
    return axios.get(
        `http://localhost:3000/bg/detail/${id}`,
        );
}