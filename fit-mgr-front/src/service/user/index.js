/*
 * @Description: 用户列表
 * @Author: hairyOwl
 * @Date: 2022-03-07 11:05:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-07 23:08:00
 */
import axios from 'axios';

//用户列表
export const list = (page ,size ,keyword)=>{
    return axios.get(
        'http://localhost:3000/user/list',
        {
            params : {
                page,
                size,
                keyword,
            },
        },
    );
};

//删除用户
export const deleteUser = (id)=>{
    return axios.delete(`http://localhost:3000/user/${id}`);
};

//添加用户
export const addUser = (account , password) =>{
    return axios.post('http://localhost:3000/user/add',{
        account,
        password,
    });
};

//重置用户密码
export const resetPW = (id) =>{
    return axios.post('http://localhost:3000/user/reset/password',{
        id,
    });
};