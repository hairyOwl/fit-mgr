/*
 * @Description: 血压信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-03 22:15:48
 */
import axios from "axios"; //axios 请求库可以帮助简化请求

//添加血压
export const add = (addForm) =>{
    return axios.post(
        'http://localhost:3000/bp/add',
        addForm,
        );
}; 

//血压数据列表
export const list = (data) =>{
    return axios.get(
        'http://localhost:3000/bp/list',
        {
            params : data,
        }
    );
};

//删除一条血压数据
export const deleteOne = (id) =>{
    return axios.delete(
        `http://localhost:3000/bp/${id}`,
    );
};

//删除一条血压数据
export const updateCount = (data = {}) =>{
    return axios.post(
        `http://localhost:3000/bp/update/count`,
        data,
    );
};