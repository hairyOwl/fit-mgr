/*
 * @Description: 文件上传帮助类
 * @Author: hairyOwl
 * @Date: 2022-03-25 21:19:40
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 23:01:40
 */
const fs = require('fs');

//文件存入硬盘
const saveFileToDisk = (ctx , filepath) =>{
    return new Promise((resolve , reject) => {
        //拿取文件
        const file = ctx.request.files.file;
        //为文件创建读取流
        const reader = fs.createReadStream(file.path); //上传文件的路径
        //写入流
        const writeStream = fs.createWriteStream(filepath); //filename完整的路径
        
        //reader获取到的数据就交给writeStream处理
        reader.pipe(writeStream);
        //写入完成后关闭
        reader.on('end' , ()=>{
            resolve(filepath);
        });
        //错误信息处理
        reader.on('error' , (err)=>{
            reject(err);
        });
    });
};

//获取文件后缀
const getUploadFileExt = (ctx) =>{
    const { name = '' } = ctx.request.files.file; //没有时为空
    return name.split('.').pop(); //返回后缀 通过.分割两部分pop后一部分
}

module.exports = {
    saveFileToDisk,
    getUploadFileExt,
};