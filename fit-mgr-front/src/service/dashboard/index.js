/*
 * @Description: 总览 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-22 22:53:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-24 10:13:25
 */
import axios from 'axios';
//获取基础数据
export const baseInfo = () =>{
    return axios.get('http://localhost:3000/dashboard/base-info');
};