/*
 * @Description: 用户列表
 * @Author: hairyOwl
 * @Date: 2022-03-07 11:05:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-26 20:51:40
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
export const addUser = (account , password ,character) =>{
    return axios.post('http://localhost:3000/user/add',{
        account,
        password,
        character,
    });
};

//添加多个用户
export const addUserMany = (fileKey) =>{
    return axios.post('http://localhost:3000/user/add/many',{
        fileKey,
    });
};

//重置用户密码
export const resetPW = (id) =>{
    return axios.post('http://localhost:3000/user/reset/password',{
        id,
    });
};

//编辑角色
export const updateCharacter = (userId , character) =>{
    return axios.post('http://localhost:3000/user/update/character',{
        userId,
        character,
    });
};

//获取登录Token信息
export const info = () =>{
    return axios.get('http://localhost:3000/user/info');
};