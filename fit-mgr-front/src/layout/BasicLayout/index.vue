<!--
 * @Description: 基础布局模板
 * @Author: hairyOwl
 * @Date: 2022-02-27 18:32:47
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-17 21:34:24
-->
<!-- 基础布局模板 -->
<template>
    <div class="basic-layout">
        <!-- 上部分 信息头-->
        <div class="app-header">
            <!-- 上部分左 网站信息 -->
            <div class="left">
                <img src="http://101.35.50.238:9999/2022/02/23/9c5245018cf15.png" alt="">
                <div class="title">
                    居家健康指标记录平台
                </div>
            </div>
            <!-- 上部分右 用户信息 -->
            <div class="right">
                <div class="hello-msg">
                    你好，{{userInfo.account}}
                </div>
                <div class="logout" @click="toAuth">退出</div>
            </div>
            <!-- 占位符 -->
        </div>
        <div class="app-header-placeholder"></div>
        <!-- 下部分 左右结构-->
        <div class="app-content">
            <!-- 下部分左 导航栏 -->
            <div class="left">
                <app-nav />
            </div>
            <!-- 下部分右 列表 -->
            <div class="right">
                <!-- 路由容器 可变内容 -->
                <router-view/> 
            </div>
        </div>
    </div>
</template>

<!-- 基础布局逻辑 -->
<script src="./index.js" ></script>

<!-- 基础布局样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>