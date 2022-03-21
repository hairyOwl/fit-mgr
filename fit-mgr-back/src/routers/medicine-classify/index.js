/*
 * @Description: 药剂分类 路由处理
 * @Author: hairyOwl
 * @Date: 2022-03-20 10:00:58
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-20 22:51:59
 */
const mongoose = require('mongoose');
const Router = require('@koa/router');
const { on } = require('koa');

const MedicineClassify = mongoose.model('MedicineClassify');

const medicineClassifyRouter = new Router({
    prefix:'/medicine-classify',
});

//通过id查询数据库
const findMedicineClassifyById = async ( id )=>{
    return await MedicineClassify.findOne({
        _id:id,
    }).exec();
};

//获取列表 不分页
medicineClassifyRouter.get('/list' , async (ctx)=>{
    const list = await MedicineClassify
        .find()
        .sort({
        _id:-1,
        }).exec();

    ctx.body = {
        code : 1,
        msg : '获取药剂分类列表成功',
        data : list,
    }
});

//添加分类
medicineClassifyRouter.post('/add' , async (ctx)=>{
    const {
        title,
    } = ctx.request.body;

    //判断标题是否唯一
    const one = await MedicineClassify.findOne({
        title,
    }).exec();
    if(one){
        ctx.body = {
            code : 0,
            msg : '该分类已存在',
        }
        return;
    }

    const medicineClassify = new MedicineClassify({
        title,
    });

    const res = await medicineClassify.save();
    ctx.body = {
        code : 1,
        msg : '成功添加分类',
        data : res,
    }
});

//删除分类
medicineClassifyRouter.delete('/:id' , async (ctx)=>{
    const {
        id
    } = ctx.params;

    const res = await MedicineClassify.deleteOne({
        _id:id,
    }).exec();

    ctx.body = {
        code : 1,
        msg : '成功删除',
        data : res,
    }
});

//编辑分类
medicineClassifyRouter.post('/update/title' , async (ctx)=>{
    const{
        id,
        title,
    } = ctx.request.body;

    const one = await findMedicineClassifyById(id);
    if(!one){
        ctx.body = {
            code : 0,
            msg : '资源不存在',
        }
        return;
    }
    one.title = title;

    const res = await one.save();
    ctx.body = {
        code : 1,
        msg : '修改成功',
        data : res,
    }
});

module.exports = medicineClassifyRouter;