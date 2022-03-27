/*
 * @Description: 导航栏权限 工具 类
 * @Author: hairyOwl
 * @Date: 2022-03-13 15:05:21
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 16:41:59
 */
import { isAdmin } from '@/helpers/character';

//注册自定义指令
export const regDirectives = (app) => {
    app.directive('only-admin', { //注册自定义指令
        mounted(el, { value = true }) { //el 聚焦元素
        const res = isAdmin();

        if (!res && value) { //不是管理员
            el.style.display = 'none'; //隐藏
        }
        },
    });

    app.directive('only-member', { //注册自定义指令
        mounted(el, { value = true }) { //el 聚焦元素
        const res = isAdmin();

        if (res && value) { //不是管理员
            el.style.display = 'none'; //隐藏
        }
        },
    });
};
