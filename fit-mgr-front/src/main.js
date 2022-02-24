/*
 * @Description: 
 * @Author: hairyOwl
<<<<<<< HEAD
 * @Date: 2022-02-23 15:39:21
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-24 13:57:54
=======
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-23 15:20:29
>>>>>>> ce21e963440073db22c305ec964c1c290a1af226
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
<<<<<<< HEAD
import 'ant-design-vue/dist/antd.less';

//注册 ant-design-vue
createApp(App)
    .use(store)
    .use(router)
    .use(Antd) 
=======
//导入样式ant-design-vue
import 'ant-design-vue/dist/antd.css';
createApp(App)
    .use(store)
    .use(router)
    .use(Antd) //注册ant-design-vue
>>>>>>> ce21e963440073db22c305ec964c1c290a1af226
    .mount('#app');
