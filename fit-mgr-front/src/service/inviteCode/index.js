/*
 * @Description: 邀请码管理 接口发起
 * @Author: hairyOwl
 * @Date: 2022-03-16 22:10:33
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:40:51
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//获取邀请码列表
export const list = (page , size)=>{
    return get('/invite/list',
    {
        page,
        size,
    });
};

//添加邀请码
export const add = (count)=>{
    return post('/invite/add',{
        count
    });
};

//删除邀请码
export const remove = (id)=>{
    return del(`/invite/${id}`);
};