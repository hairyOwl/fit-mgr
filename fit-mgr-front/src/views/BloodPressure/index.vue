<!--
 * @Description: 血压信息模板
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:25:49
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-27 23:04:49
-->
<!-- 血压信息模板 -->
<template>
    <!-- 血压信息 -->
    <div>
        <a-card>
            <!-- 标题 -->
            <h2>血压数据</h2>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 搜索添加数据 弹性盒子 两端对齐 -->
            <space-between>
                <div class="search">
                    <a-input-search placeholder= "根据日期查询" enter-button />
                </div>
                <a-button>添加一条</a-button>
            </space-between>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 血压数据表格 columns表头 data-source数据源 -->
            <a-table :columns="columns" :data-source="dataSource">
            </a-table>    
        </a-card>
    </div>
</template>
<!--血压信息逻辑  -->
<script src="./index.js" ></script>

<!-- 血压信息样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>