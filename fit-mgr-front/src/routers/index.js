/*
 * @Description:  前端路由注册
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-16 22:09:47
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
      //日志管理
      {
        path: 'action-log',
        name: 'ActionLog ',
        component: () => import(/* webpackChunkName: "ActionLog" */ '../views/ActionLog/index.vue'),
      },
      // 重置密码列表
      {
        path: 'reset/password',
        name: 'ResetPassword ',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      // 邀请码管理
      {
        path: 'invite-code',
        name: 'InviteCode ',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
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
  //请求数组
  // const reqArr = []; // promise数据store.dispatch返回一个promise

  //获取权限列表
  if(!store.state.characterInfo.length){
    await store.dispatch('getCharacterInfo'); //触发action
  }
  //获取登录用户信息
  if(!store.state.userInfo.account){
    await store.dispatch('getUserInfo');
  }
  
  // await Promise.all(reqArr); //获取上述信息成功后执行next
  next();
});

export default router;
