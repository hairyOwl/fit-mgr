/*
 * @Description: 个人设置 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-21 21:37:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:41:57
 */
import{ post } from '@/helpers/request';

export const resetPassword = (password , oldPassword)=>{
    return post('/profile/update/password',{
        password,
        oldPassword,
    });
}

