/*
 * @Description: 药剂管理 接口
 * @Author: hairyOwl
 * @Date: 2022-03-20 15:48:37
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:22:31
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//列表查询
export const list = ()=>{
    return get('/medicine-classify/list');
};
//添加药剂分类
export const add = (title)=>{
    return post(
        '/medicine-classify/add',{
            title,
        }
    );
};
//删除药剂分类
export const remove = (id)=>{
    return del(`/medicine-classify/${id}`);
};
//编辑药剂分类
export const update = (id , title)=>{
    return post('/medicine-classify/update/title',{
        id,
        title,
    });
};