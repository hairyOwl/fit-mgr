/*
 * @Description:  前端路由注册
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-11 22:02:37
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';
//路由配置顺序从上到下，如果已匹配就不会向下走
const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    //孩子路由
    children : [
      //血压信息
      {
        path: 'bp',
        name: 'BloodPressure ',
        component: () => import(/* webpackChunkName: "BloodPressure" */ '../views/BloodPressure/index.vue'),
      },
      //血压详情
      {
        path: 'bp/:id',
        name: 'BloodPreDetail ',
        component: () => import(/* webpackChunkName: "BloodPreDetail" */ '../views/BloodPreDetail/index.vue'),
      },
      //角色管理
      {
        path: 'user',
        name: 'User ',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/index.vue'),
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//在遍历路由前执行
//to目标页 from发起页是对象。next是函数
router.beforeEach(async (to,from,next)=>{
  //获取权限列表
  if(!store.state.characterInfo.length){
    store.dispatch('getCharacterInfo'); //触发action
  }
  store.dispatch('getUserInfo');
  next();
});

export default router;
