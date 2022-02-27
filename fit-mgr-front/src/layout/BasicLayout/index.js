/*
 * @Description: 基础布局逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 18:32:37
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-27 20:58:13
 */
import {defineComponent} from 'vue';
import Nav from './Nav/index.vue'; //导入导航栏逻辑

export default defineComponent({
    components:{ //组件组成
        AppNav : Nav,
    }
});