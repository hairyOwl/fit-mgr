/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-23 14:58:31
 */
import { createRouter, createWebHashHistory } from 'vue-router';
<<<<<<< HEAD
=======

>>>>>>> ce21e963440073db22c305ec964c1c290a1af226

const routes = [
  {
    path: '/auth',
    name: 'Auth',
<<<<<<< HEAD
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/index.vue'),
=======
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
>>>>>>> ce21e963440073db22c305ec964c1c290a1af226
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
