/*
 * @Description: 基础布局逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 18:32:37
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-12 23:03:20
 */
import {defineComponent} from 'vue';
import Nav from './Nav/index.vue'; //导入导航栏逻辑
import store from '@/store';

export default defineComponent({
    components:{ //组件组成
        AppNav : Nav,
    },
    setup(){

        return{
            userInfo: store.state.userInfo,
        }
    },
    
});