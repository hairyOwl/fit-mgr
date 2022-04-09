/*
 * @Description: 认证相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-25 10:44:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 10:11:58
 */
//export 可直接导出常量变量函数
 //ES6默认导出export default 类/函数 不需要{}
import{ post } from '@/helpers/request';

//注册
export const register = (account , password , inviteCode) =>{
    return post('/auth/register',{
        account,
        password,
        inviteCode,
    });
};
//登录
export const login = (account , password) =>{
    return post('/auth/login',{
        account,
        password,
    });
}
