<!--
 * @Description: 健康数据仪表盘 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-29 18:10:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-08 23:38:44
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
                        <div class="count">共 {{healthInfoList.total.bloodPTotal }} 条</div>
                        <div class="title">血压记录</div>
                    </div>
                    <!-- 血糖 -->
                    <div class="item">
                        <div class="count">共 {{healthInfoList.total.bloodGTotal }} 条</div>
                        <div class="title">血糖记录</div>
                    </div>
                    <!-- 药剂 -->
                    <div class="item">
                        <div class="count">共 {{healthInfoList.total.medicineTotal }} 条</div>
                        <div class="title">药剂记录</div>
                    </div>
                </div>
            </a-card>
        </a-spin>

        <!-- 操作表格 -->
        <div>
            <div style="margin-top:24px;">
                <bloodPChart 
                    :bloodPList = "bPList"
                />
            </div>

            <div style="margin-top:24px;">
                <bloodGChart />
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
    @import './index.scss';
</style>