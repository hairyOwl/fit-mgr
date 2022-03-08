/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 15:39:21
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 23:05:13
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import Antd from 'ant-design-vue';
import SpaceBetween from './components/SpaceBetween/index.vue';
import FlexEnd from './components/FlexEnd/index.vue';

import 'ant-design-vue/dist/antd.less';

//注册 ant-design-vue
createApp(App)
    .use(store)
    .use(router)
    .use(Antd) 
    .component('space-between' , SpaceBetween)
    .component('flex-end' , FlexEnd)
    .mount('#app');
