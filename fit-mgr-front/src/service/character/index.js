/*
 * @Description: 角色接口
 * @Author: hairyOwl
 * @Date: 2022-03-08 17:32:24
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-08 17:33:57
 */
import axios from 'axios';

export const list = ()=>{
    return axios.get('http://localhost:3000/character/list');
};