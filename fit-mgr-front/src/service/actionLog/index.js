/*
 * @Description: 操作日志相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-03-13 09:51:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:38:06
 */
import{
    get,
    post,
} from '@/helpers/request';

// 获取列表
export const list = (page ,size)=>{
    return get('/actionLog/list', {
        page,
        size,
    });
};

// 软删除 
export const remove = (id)=>{
    return post(`/actionLog/delete`,{
        id,
    });
};