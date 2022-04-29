/*
 * @Description:  前端路由注册
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 14:31:34
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '../store';
import { message } from 'ant-design-vue';
import { isAdmin } from '@/helpers/character';


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
    redirect : '/auth', //重定向到auth
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    //孩子路由
    children : [
      //总览信息
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
      //健康数据总览
      {
        path: 'dashboard-health',
        name: 'DashboardHealth',
        component: () => import(/* webpackChunkName: "DashboardHealth" */ '../views/DashboardHealth/index.vue'),
      },
      //血压信息
      {
        path: 'blood-pressure',
        name: 'BloodPressure ',
        component: () => import(/* webpackChunkName: "BloodPressure" */ '../views/BloodPressure/index.vue'),
      },
      //血糖信息
      {
        path: 'blood-glucose',
        name: 'BloodGlucose ',
        component: () => import(/* webpackChunkName: "BloodGlucose" */ '../views/BloodGlucose/index.vue'),
      },
      //药品信息
      {
        path: 'medicine',
        name: 'Medicine',
        component: () => import(/* webpackChunkName: "Medicine" */ '../views/Medicine/index.vue'),
      },
      //药品详情
      {
        path: 'medicine/:id',
        name: 'MedicineInvDetail ',
        component: () => import(/* webpackChunkName: "MedicineInvDetail" */ '../views/MedicineInvDetail/index.vue'),
      },
      //角色管理
      {
        path: 'user',
        name: 'User ',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/index.vue'),
      },
      //角色管理-照顾者列表
      {
        path: 'minder/detail/:id',
        name: 'UserMinderInfo ',
        component: () => import(/* webpackChunkName: "UserMinderInfo" */ '../views/UserMinderInfo/index.vue'),
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
      // 药剂分类管理
      {
        path: 'medicine-classify',
        name: 'MedicineClassify ',
        component: () => import(/* webpackChunkName: "MedicineClassify" */ '../views/MedicineClassify/index.vue'),
      },
      // 个人设置
      {
        path: 'profile',
        name: 'Profile ',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
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
  /* 
    认证登录相关
    未登录状态(如清除localStorage) 提示并跳转到登录页面
  */
  //捕捉错误
  let res = {};
  try {
    res = await user.info();
  } catch (error) {
    if(error.message.includes('code 401')){
      res.code = 401;
    }
  }
  const { code } = res;

  if(code === 401){
    //跳转到认证登录页面时不需要权限列表等信息
    if(to.path === '/auth'){
      next();
      return;
    }

    //非认证页路由 且未登录 需要跳转到登录页
    message.error('认证失败，请重新登入');
    next('/auth');
    return;
  }


  /* 
    全局信息相关
  */
  //请求数组
  const reqArr = []; // promise数据store.dispatch返回一个promise

  //获取权限列表
  if(!store.state.characterInfo.length){
    await store.dispatch('getCharacterInfo'); //触发action
  }
  //获取登录用户信息
  if(!store.state.userInfo.account){
    reqArr.push(store.dispatch('getUserInfo'));
  }
  if(!store.state.medClassify.length){
    reqArr.push(store.dispatch('getMedicineClassify'));
  }
  await Promise.all(reqArr); //获取上述信息成功后执行next


  /* 
    认证优化
  */
  //已经登录就不能跳转登录页路由 
  if (to.path === '/auth') {
    if(isAdmin()){
      next('/dashboard');
      return;
    }else{
      next('/dashboard-health');
      return;
    }
  }

  next();
});

export default router;
