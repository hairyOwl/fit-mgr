/*
 * @Description: token存取 储存在localStorage
 * @Author: hairyOwl
 * @Date: 2022-03-11 21:16:44
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-11 21:29:53
 */
const TOKEN_STORAGE_KEY = '_fit';
//拿
export const getToken = ()=>{
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};
//存入
export const setToken = (token)=>{
    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    return token;
};