/*
 * @Description: 请求处理
 * @Author: hairyOwl
 * @Date: 2022-03-27 20:23:54
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:25:54
 */
import {getToken} from '@/helpers/token';

export const getHeaders = () =>{
    return {
        Authorization :  `Bearer ${getToken() }`,
    };
};