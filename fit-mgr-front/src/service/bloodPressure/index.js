/*
 * @Description: 血压信息相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-28 17:41:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-29 18:08:20
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//添加血压
export const add = (addForm) =>{
    return post(
        '/bp/add',
        addForm,
        );
}; 


//批量添加血压
export const addMany = (fileKey , userAccount) =>{
    return post(
        '/bp/add/many',{
            fileKey,
            userAccount,
        });
}; 

//血压数据列表
export const list = (userAdmin, account, page ,size , starDay ,endDay) =>{
    return get(
        '/bp/list',
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

//删除一条血压数据
export const deleteOne = (id) =>{
    return del(
        `/bp/${id}`,
    );
};

//更新一条血压数据
export const updateCount = (data = {}) =>{
    return post(
        `/bp/update/count`,
        data,
    );
};

//修改一条血压数据
export const update = (data = {}) =>{
    return post(
        `/bp/update`,
        data,
    );
};

