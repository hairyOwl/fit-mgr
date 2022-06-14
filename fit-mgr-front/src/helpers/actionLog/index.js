/*
 * @Description: 操作日志工具类
 * @Author: hairyOwl
 * @Date: 2022-03-14 15:55:08
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-17 21:39:56
 */
const LOG_MAP = [
    ['/character/list', '获取角色列表'],
    ['/user/info', '获取用户信息表'],
    ['/actionLog/list', '获取操作日志'],
    ['/user/list', '获取用户信息列表'],
    ['/blood-pressure/list', '获取血压列表'],
    ['/user/reset/password', '重置用户密码'],
    ['/user/update/character', '编辑用户角色'],
    ['/blood-pressure/detail/', '血压详情'],
    ['/inventory-log/list', '血压详情列表'],
    

];

export const getLogInfoByPath = ( path ) =>{
    let title = '';

    LOG_MAP.forEach((item)=>{
        if( path.includes(item[0]) ){ //item[0] 原path关键字
            title = path.replace(item[0] , item[1]);
        }
    });

    return title || path;
}