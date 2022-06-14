/*
 * @Description: 药剂分类 工具类
 * @Author: hairyOwl
 * @Date: 2022-03-21 16:27:10
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 16:42:34
 */
import store from '@/store';

export const getClassifyTitleById = (id)=>{
    const one = store.state.medClassify.find((item) => (item._id === id));
    
    return one && one.title || "未知分类";
}