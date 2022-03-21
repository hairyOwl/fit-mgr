/*
 * @Description: 个人设置 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-21 21:37:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 21:42:11
 */
import axios from 'axios';

export const resetPassword = (password , oldPassword)=>{
    return axios.post('http://localhost:3000/profile/update/password',{
        password,
        oldPassword,
    });
}

