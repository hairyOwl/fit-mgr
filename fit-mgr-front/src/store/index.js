/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-11 22:24:05
 */
import { createStore } from 'vuex';
import { character , user } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';

export default createStore({
  //状态 放信息
  state: {
    characterInfo : [], //权限表
    userInfo : {}, //当前登录用户信息
    userCharacter : {}, //当前登录用户的角色
  },
  //函数的集合, 修改state
  mutations: {
    //角色
    setCharacterInfo(state,characterInfo){
      state.characterInfo = characterInfo;
    },
    //登录用户
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
    //登录角色
    setUserCharacter(state,userCharacter){
      state.userCharacter = userCharacter;
    },
  },
  //触发修改信息的前置操作 , 例如先异步拿取要修改的数据进行大量的计算
  actions: {
    async getCharacterInfo( store ){
      const res = await character.list();

      result(res)
        .success(( {data} )=>{
          store.commit('setCharacterInfo' , data); //调用mutations
        });
    },
    async getUserInfo(store){
      const res = await user.info();

      result(res)
        .success(( {data} )=>{
          store.commit('setUserInfo' , data);
          store.commit('setUserCharacter' , getCharacterInfoById(data.character) );
          // console.log(store.state);
        });
    },
  },
  //某些数据特定模块 使用与比较大项目
  // modules: {
  // },
});

