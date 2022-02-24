<!--
 * @Description: 认证页面模板
 * @Author: hairyOwl
 * @Date: 2022-02-23 15:41:19
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-24 15:20:51
-->
<template>
    <div class="auth">
        <!-- 背景类 -->
        <div class="bg"></div>
        <!-- 标题部分 -->
        <div class="title-info">
            <img src="http://101.35.50.238:9999/2022/02/23/9c5245018cf15.png" alt="">
            <h2 class="title">居家健康指标记录平台</h2>
        </div>
        <!-- 表单部分 -->
        <div class="form">
            <a-tabs>
                <!-- 表单: 登录 -->
                <a-tab-pane key="1" tab="登录">
                    <div class="item">
                        <a-input size="large"  placeholder="账号">
                            <template #prefix>
                                <user-outlined/>
                            </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large"  placeholder="密码"> 
                            <template #prefix>
                                <key-outlined />
                            </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a href="">忘记密码</a>
                    </div>
                    <div class="item">
                        <a-button size="large" type = "primary">
                            登录
                        </a-button>
                    </div>
                </a-tab-pane>
                <!-- 表单: 注册 -->
                <a-tab-pane key="2" tab="注册">
                    <div class="item">
                        <a-input size="large" placeholder="账户">
                            <template #prefix>
                                <user-outlined/>
                            </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large" placeholder="密码">
                            <template #prefix>
                                <key-outlined />
                            </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large" placeholder="邀请码">
                            <template #prefix>
                                <smile-outlined />
                            </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-button size="large" type="primary">注册</a-button>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>


<!-- 认证页面逻辑 -->
<script src = "./index.js" ></script>

<!-- 认证页面样式 -->
<style lang="scss">
    @import './index.scss';
</style>

