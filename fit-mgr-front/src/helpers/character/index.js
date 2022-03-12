/*
 * @Description: 角色权限 工具类
 * @Author: hairyOwl
 * @Date: 2022-03-10 10:53:03
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-10 10:59:08
 */
import store from '@/store'

//通过id获取对应权限
export const getCharacterInfoById = (id) =>{
    const { characterInfo } = store.state;
    //查询对应的角色
    const one = characterInfo.find((item)=>{
        return item._id === id;
    });

    return one || { title : '未知角色',} ;
}