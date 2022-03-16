/*
 * @Description: 血压信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 22:11:45
 */
import axios from "axios"; //axios 请求库可以帮助简化请求
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

//添加血压
export const add = (addForm) =>{
    return axios.post(
        'http://localhost:3000/bp/add',
        addForm,
        );
}; 

//血压数据列表
export const list = (page ,size , starDay ,endDay) =>{
    return axios.get(
        'http://localhost:3000/bp/list',
        {
            params : {
                page,
                size,
                starDay,
                endDay,
            },
        }
    );
};

//删除一条血压数据
export const deleteOne = (id) =>{
    return axios.delete(
        `http://localhost:3000/bp/${id}`,
    );
};

//更新一条血压数据
export const updateCount = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/bp/update/count`,
        data,
    );
};

//修改一条血压数据
export const update = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/bp/update`,
        data,
    );
};

// 血压详情
export const detail = (id)=>{
    return axios.get(
        `http://localhost:3000/bp/detail/${id}`,
        );
}