/*
 * @Description: 总览 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-22 22:53:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:14:43
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`
//获取基础数据
export const baseInfo = () =>{
    return axios.get('http://localhost:3000/dashboard/base-info');
};