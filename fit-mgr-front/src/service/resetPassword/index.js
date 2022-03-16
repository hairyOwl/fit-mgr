/*
 * @Description: 重置密码申请列表 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-15 21:14:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-16 09:25:55
 */
import axios from 'axios';

// 获取列表
export const list = (page ,size)=>{
    return axios.get('http://localhost:3000/reset-password/list',{
        params:{
            page,
            size,
        }
    });
};

//添加   // 登录的忘记密码按钮触发
export const add = (account) =>{
    return axios.post('http://localhost:3000/reset-password/add',{
        account,
    });
};

//修改状态
export const updateStatus = (id , status) =>{
    return axios.post('http://localhost:3000/reset-password/update/status',{
        id,
        status,
    });
};