/*
 * @Description: 健康数据仪表盘 接口处理
 * @Author: hairyOwl
 * @Date: 2022-03-29 18:10:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-30 21:36:05
 */
import{ get } from '@/helpers/request';
//获取基础数据
export const healthInfo = () =>{
    return get('/dashboard/health/info');
};

export const bloodInfo = () =>{
    return get('/dashboard/health/blood-info');
};