<!--
 * @Description: 导航栏模板
 * @Author: hairyOwl
 * @Date: 2022-02-27 20:11:30
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-14 22:27:06
-->
<!--导航栏模板-->
<template>
    <div>
        <a-menu
            style="width: 100%"
            mode="inline"
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            @openChange="onOpenChange"
            v-for = "(item) in menu "
            :key = "item.url"
            v-only-admin = "item.onlyAdmin"
        >
            <!-- 有子菜单渲染 a-sub-menu-->
            <a-sub-menu 
                v-if = "item.children"
                :key="item.title"
            >
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <a-menu-item
                    @click="to(child.url)"
                    v-for="(child) in item.children"
                    :key="child.url"
                    >
                    {{ child.title }}
                </a-menu-item>
            </a-sub-menu>
            <!-- 无子菜单渲染 a-menu-item-->
            <a-menu-item
                :key = "item.url"
                @click="to(item.url)"
                v-else
            >
                {{ item.title }}
            </a-menu-item>
        </a-menu>
    </div>
</template>
<!--导航栏逻辑-->
<script src="./index.js" ></script>
<!--导航栏样式-->
<style lang="scss" scoped>
    @import './index.scss';
</style>