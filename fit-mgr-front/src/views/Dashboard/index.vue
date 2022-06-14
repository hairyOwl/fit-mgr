<!--
 * @Description: 总览 页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-22 22:44:48
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 11:15:56
-->
<template>
    <div>
        <!-- 数据信息 -->
        <a-spin :spinning="loading">
            <a-card>
                <!-- 第一行 健康数据 -->
                <div class="list">
                    <!-- 血压 -->
                    <div class="item">
                        <div class="count">共 {{baseInfoList.total.bloodPTotal }} 条</div>
                        <div class="title">血压记录</div>
                    </div>
                    <!-- 血糖 -->
                    <div class="item">
                        <div class="count">共 {{baseInfoList.total.bloodGTotal }} 条</div>
                        <div class="title">血糖记录</div>
                    </div>
                    <!-- 药剂 -->
                    <div class="item">
                        <div class="count">共 {{baseInfoList.total.medicineTotal }} 条</div>
                        <div class="title">药剂记录</div>
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="list" style="margin-top : 24px">
                    <!-- 用户数据 -->
                    <div class="item">
                        <div class="count">共 {{baseInfoList.total.userTotal }} 位</div>
                        <div class="title">用户</div>
                    </div>
                    <!-- 日志数据 -->
                    <div class="item">
                        <div class="count">共 {{baseInfoList.total.actionLogTotal }} 条</div>
                        <div class="title">日志</div>
                    </div>
                    <!-- 占位空数据 -->
                    <div class="item"></div>
                </div>
            </a-card>
        </a-spin>

        <!-- 操作表格 -->
        <div class="tableList">
            <div class="left">
                <div class="item">
                    <bloodP simple/>
                </div>
                <div class="item">
                    <bloodG simple/>
                </div>
                <div class="item">
                    <medicine simple/>
                </div>
            </div>
            <div class="right">
                <actionLog simple />
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
    @import './index.scss';
</style>