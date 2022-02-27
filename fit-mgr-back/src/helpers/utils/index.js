/*
 * @Description: 工具类
 * @Author: hairyOwl
 * @Date: 2022-02-21 16:11:04
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-26 10:02:51
 */
//
const getBody = (ctx) =>{
    return ctx.request.body || {}; //返回返回体body 或空
}

//导出方法工文件外调用
module.exports = {
    getBody,
};