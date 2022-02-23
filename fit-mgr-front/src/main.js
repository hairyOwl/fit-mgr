/*
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-23 15:20:29
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
//导入样式ant-design-vue
import 'ant-design-vue/dist/antd.css';
createApp(App)
    .use(store)
    .use(router)
    .use(Antd) //注册ant-design-vue
    .mount('#app');
