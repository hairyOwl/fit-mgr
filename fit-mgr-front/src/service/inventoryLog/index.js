/*
 * @Description: 药剂库存接口
 * @Author: hairyOwl
 * @Date: 2022-03-06 16:57:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:40:08
 */
import{ get } from '@/helpers/request';

export const list = (dataId, type = 'ADD_COUNT' , page ,size=5)=>{
    return get(
        '/inventory-log/list',
        {
            dataId,
            type,
            page,
            size,
        }
    );
};