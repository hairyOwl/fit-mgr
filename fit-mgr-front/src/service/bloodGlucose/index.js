/*
 * @Description: 血糖信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-29 18:08:10
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//添加血糖
export const add = (addForm) =>{
    return post(
        '/bg/add',
        addForm,
        );
}; 

//批量添加血糖
export const addMany = (fileKey , userAccount) =>{
    return post(
        '/bg/add/many',{
            fileKey,
            userAccount,
        });
}; 

//血糖数据列表
export const list = (userAdmin, account, page ,size , starDay ,endDay) =>{
    return get(
        '/bg/list',
        {
            userAdmin,
            account,
            page,
            size,
            starDay,
            endDay,
        }
    );
};

//删除一条血糖数据
export const deleteOne = (id) =>{
    return del(
        `/bg/${id}`,
    );
};

//修改一条血糖数据
export const update = (data = {}) =>{
    return post(
        `/bg/update`,
        data,
    );
};

