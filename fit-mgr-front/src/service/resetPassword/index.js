/*
 * @Description: 重置密码申请列表 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-15 21:14:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:42:14
 */
import{
    get,
    post,
} from '@/helpers/request';

// 获取列表
export const list = (page ,size)=>{
    return get('/reset-password/list',
    {
        page,
        size,
    });
};

//添加   // 登录的忘记密码按钮触发
export const add = (account) =>{
    return post('/reset-password/add',{
        account,
    });
};

//修改状态
export const updateStatus = (id , status) =>{
    return post('/reset-password/update/status',{
        id,
        status,
    });
};