/*
 * @Description: 基础布局逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 18:32:37
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-28 22:07:36
 */
import {defineComponent} from 'vue';
import Nav from './Nav/index.vue'; //导入导航栏逻辑
import store from '@/store';
import { useRouter } from 'vue-router'; //操作路由的方法 前进一页后退一页跳转某一页


export default defineComponent({
    components:{ //组件组成
        AppNav : Nav,
    },
    setup(){
        const router = new useRouter();

        //跳转登录页
        const logout = () =>{
            localStorage.removeItem('_fit'); //清除当前用户token 但Authorization不会变化
            // localStorage.clear(); //清除所有值
            router.push('/auth');
        }

        return{
            userInfo: store.state.userInfo,
            logout,
        }
    },
    
});