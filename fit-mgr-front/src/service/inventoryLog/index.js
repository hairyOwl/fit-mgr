/*
 * @Description: 日志接口
 * @Author: hairyOwl
 * @Date: 2022-03-06 16:57:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:14:57
 */
import axios from 'axios';
import {getToken} from '@/helpers/token';

//统一为请求添加headers
axios.defaults.headers['Authorization'] = `Bearer ${getToken() }`

export const list = (dataId, type = 'ADD_COUNT' , page ,size=5)=>{
    return axios.get(
        'http://localhost:3000/inventory-log/list',
        {
            params : {
                dataId,
                type,
                page,
                size,
            },
        },
    );
};