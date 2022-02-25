/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 15:39:21
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-24 15:30:16
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

//注册 ant-design-vue
createApp(App)
    .use(store)
    .use(router)
    .use(Antd) 
    .mount('#app');
