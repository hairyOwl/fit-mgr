/*
 * @Description: 认证相关的所有接口
 * @Author: hairyOwl
 * @Date: 2022-02-25 10:44:51
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-25 13:50:35
 */
//export 可直接导出常量变量函数
 //ES6默认导出export default 类/函数 不需要{}
import axios from 'axios' //axios 请求库可以帮助简化请求

//注册
export const register = (account , password) =>{
    axios.post('http://localhost:3000/auth/register',{
        account,
        password,
    });
};

//登录
export const login = () =>{

};