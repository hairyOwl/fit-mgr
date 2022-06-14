/*
 * @Description: 用户列表
 * @Author: hairyOwl
 * @Date: 2022-03-07 11:05:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-28 16:53:01
 */
import{
    get,
    post,
    del,
} from '@/helpers/request';

//用户列表
export const list = (page ,size ,keyword)=>{
    return get(
        '/user/list',
        {
            page,
            size,
            keyword,
        });
};

//删除用户
export const deleteUser = (id)=>{
    return del(`/user/${id}`);
};

//添加用户
export const addUser = (account , password ,character,isMinder,minder) =>{
    return post('/user/add',{
        account,
        password,
        character,
        isMinder,
        minder,
    });
};

//添加多个用户
export const addUserMany = (fileKey) =>{
    return post('/user/add/many',{
        fileKey,
    });
};

//重置用户密码
export const resetPW = (id) =>{
    return post('/user/reset/password',{
        id,
    });
};

//编辑角色
export const updateCharacter = (userId , character) =>{
    return post('/user/update/character',{
        userId,
        character,
    });
};

//获取登录Token信息
export const info = () =>{
    return get('/user/info');
};

// 照顾者详情
export const detail = (id)=>{
    return get(`/user/minder/detail/${id}`);
}