/*
 * @Description: 个人设置 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-21 21:37:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:15:19
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`
export const resetPassword = (password , oldPassword)=>{
    return axios.post('http://localhost:3000/profile/update/password',{
        password,
        oldPassword,
    });
}

