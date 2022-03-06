<!--
 * @Description: 修改血压信息模板
 * @Author: hairyOwl
 * @Date: 2022-03-04 21:25:49
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-05 21:54:11
-->
<!-- 血压信息模板 -->
<template>
    <!-- 血压信息 -->
    <div>
        <!-- 血压列表 -->
        <a-card>
            <!-- 标题 -->
            <h2>血压数据</h2>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 搜索添加数据 弹性盒子 两端对齐 -->
            <space-between>
                <div class="search">
                    <!-- <a-input-search placeholder= "根据日期查询" enter-button /> -->
                    <a-range-picker 
                        @change="onChange"
                    >
                        <template #suffixIcon>
                            <search-outlined />>
                        </template>
                    </a-range-picker>
                </div>
                <a-button @click="show = true">添加一条</a-button>
            </space-between>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 血压数据表格 columns表头 data-source数据源 pagination自带分页显示-->
            <a-table
                bordered
                :columns="columns" 
                :data-source="list"
                :pagination= "false"
            >
                <!-- 时间戳格式化 -->
                <template #recordDate = "data">
                    {{ formatTimestamp(data.record.recordDate) }}
                </template>
                <!-- 计数 -->
                <template #count = "data">
                    <a class="count" href="javascript:;" @click="updateCount('SUB_COUNT' , data.record)">-</a>
                    {{ data.record.count }}
                    <a class="count" href="javascript:;" @click="updateCount('ADD_COUNT' , data.record)">+</a>
                </template>
                <!-- 操作 -->
                <template #actions = "record">
                    <a href="javascript:;" @click="updateOne(record)">编辑</a> &nbsp;
                    <a href="javascript:;" @click="toDetail(record)">详情</a> &nbsp;
                    <a href="javascript:;" @click="deleteOne(record)">删除</a>
                </template>
            </a-table>    
            <!-- 分页 -->
            <space-between style="margin-top: 24px;">
                <!-- 空元素占位 -->
                <div/> 
                <a-pagination 
                    v-model:current="curPage" 
                    :total="total"
                    :page-size = "5"
                    @change="setPage"
                />
            </space-between>
        </a-card>

        <!-- 添加血压弹窗 -->
        <add-one
            v-model:show = "show"  
        />

        <!-- 修改血压弹窗 -->
        <update
            v-model:show = "showUpdateModal"
            :bloodP = "curEditBP"
            @update = "updateCurBloodP"
        />
    </div>
</template>
<!--血压信息逻辑  -->
<script src="./index.jsx" ></script>

<!-- 血压信息样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>