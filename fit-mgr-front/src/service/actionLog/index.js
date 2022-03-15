/*
 * @Description: 操作日志相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-03-13 09:51:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-14 21:39:19
 */
import axios from 'axios';
// 获取列表
export const list = (page ,size)=>{
    return axios.get('http://localhost:3000/actionLog/list',{
        params:{
            page,
            size,
        }
    });
};
// 删除
export const remove = (id)=>{
    return axios.post(`http://localhost:3000/actionLog/delete`,{
        id,
    });
};