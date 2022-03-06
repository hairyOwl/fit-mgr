/*
 * @Description: 日志接口
 * @Author: hairyOwl
 * @Date: 2022-03-06 16:57:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 20:12:42
 */
import axios from 'axios';

export const list = (dataId, type = 'ADD_COUNT' , page ,size=5)=>{
    return axios.get(
        'http://localhost:3000/inventory-log/list',
        {
            params : {
                dataId,
                type,
                page,
                size,
            },
        },
    );
};