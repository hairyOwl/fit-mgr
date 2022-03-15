/*
 * @Description: character工具类
 * @Author: hairyOwl
 * @Date: 2022-03-08 14:33:09
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-13 15:07:51
 */
// -1无任何权限 0管理员权限，1增加权限 2删除权限 3查找权限 4修改权限

const defaultCharacters = [
    {
        title : '管理员',
        name : 'admin',
        power :{
            book : [0],
            user : [0],
        },
    },
    {
        title : '成员',
        name : 'member',
        power :{
            book : [3],
            user : [-1],
        },
    },
];

module.exports = {
    defaultCharacters,
}