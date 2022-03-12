<!--
 * @Description: 导航栏模板
 * @Author: hairyOwl
 * @Date: 2022-02-27 20:11:30
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-12 15:12:02
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
        >
            <!-- 有子菜单渲染 a-sub-menu-->
            <a-sub-menu 
                v-if = "item.children"
            >
                <template #title>{{ item.children.title }}</template>
            </a-sub-menu>
            <!-- 无子菜单渲染 a-menu-item-->
            <a-menu-item v-else
                :key = "item.url"
                @click="to(item.url)"
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