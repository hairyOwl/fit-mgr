/*
 * @Description: 药剂信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:41:25
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//添加药剂
export const add = (addForm) =>{
    return post(
        '/medicine/add',
        addForm,
        );
}; 

//批量添加药剂
export const addMany = (fileKey , userAccount) =>{
    return post(
        '/medicine/add/many',{
            fileKey,
            userAccount,
        });
}; 

//药剂数据列表
export const list = (userAdmin, account, page ,size , keyword) =>{
    return get(
        '/medicine/list',
        {
            userAdmin,
            account,
            page,
            size,
            keyword,
        });
};

//删除一条药剂数据
export const deleteOne = (id) =>{
    return del(
        `/medicine/${id}`,
    );
};

//更新一条药剂数据
export const updateCount = (data = {}) =>{
    return post(
        `/medicine/update/count`,
        data,
    );
};

//修改一条药剂数据
export const update = (data = {}) =>{
    return post(
        `/medicine/update`,
        data,
    );
};

// 药剂详情
export const detail = (id)=>{
    return get(`/medicine/detail/${id}`);
}