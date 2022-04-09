/*
 * @Description: 总览 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-22 22:53:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:20:25
 */
import{ get } from '@/helpers/request';
//获取基础数据
export const baseInfo = () =>{
    return get('/dashboard/base-info');
};