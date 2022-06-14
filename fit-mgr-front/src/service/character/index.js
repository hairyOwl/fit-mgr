/*
 * @Description: 角色接口
 * @Author: hairyOwl
 * @Date: 2022-03-08 17:32:24
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:19:28
 */
import{ get } from '@/helpers/request';

export const list = ()=>{
    return get('/character/list');
};