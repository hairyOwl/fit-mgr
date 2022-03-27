/*
 * @Description: 角色接口
 * @Author: hairyOwl
 * @Date: 2022-03-08 17:32:24
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:14:37
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

export const list = ()=>{
    return axios.get('http://localhost:3000/character/list');
};