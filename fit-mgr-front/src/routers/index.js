/*
 * @Description:  前端路由注册
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 22:38:55
 */
import { createRouter, createWebHashHistory } from 'vue-router';

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
      {
        path: 'bp/:id',
        name: 'BloodPreDetail ',
        component: () => import(/* webpackChunkName: "BloodPreDetail" */ '../views/BloodPreDetail/index.vue'),
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
