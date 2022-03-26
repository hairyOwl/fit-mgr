/*
 * @Description: 文件上传 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-25 21:11:11
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 22:57:14
 */
const mongoose = require('mongoose');
const Router = require('@koa/router');
const { v4:uuidv4 } = require('uuid');
const { saveFileToDisk , getUploadFileExt } = require('../../helpers/upload'); //文件存入硬盘
const path = require('path'); //处理路径
const config= require('../../project.config'); //根目录/upload文件夹常量


const uploadRouter = new Router({
    prefix :'/upload',
});

//文件上传
uploadRouter.post('/file',async (ctx)=>{
    const ext = getUploadFileExt(ctx); //获取后缀 
    //文件名 作为key
    const filename = `${uuidv4()}.${ext}`
    //文件存入路径   /upload/uuid121212.xlsx
    const filepath = path.resolve(config.UPLOAD_DIR,filename);   
    await saveFileToDisk(ctx , filepath);

    ctx.body = {
        code : 1,
        msg : '文件存入硬盘',
        data : filename,
    }
});

module.exports = uploadRouter;