<!--
 * @Description: 血压可视化 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-30 11:26:24
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-08 22:52:08
-->
<template>
    <div class="charts">
        <a-card title="近3天血压数据">
            <div ref="chart" style="width: 100%;height:400px;"> </div>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
    @import './index.scss';
</style>