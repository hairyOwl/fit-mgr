<!--
 * @Description: 用户管理页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-06 22:35:33
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-07 23:14:58
-->
<template>
    <div>
        <a-card>
            <!-- 标题 -->
            <h2>用户管理</h2>
            <!-- 分割线 -->
            <a-divider />
            <space-between>
                <div class="search">
                    <a-input-search
                        placeholder="根据账户查询"
                        enter-button
                        v-model:value="keyword"
                        @search="onSearch"
                    />

                    <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
                </div>

                <a-button @click="showAddModel=true">添加用户</a-button>
            </space-between>
            <!-- 分割线 -->
            <a-divider />
            <!-- 用户表格 -->
            <div>
                <a-table 
                    bordered
                    :pagination = false
                    :columns = "columns"
                    :data-source = "list"
                >
                    <!-- 时间插槽 -->
                    <template #createdAt=" {record} ">
                        {{ formatTimestampPlus(record.meta.createdAt) }}
                    </template>
                    <!-- 操作插槽 -->
                    <template #actions=" {record} ">
                        <a href="javascript:;" @click="resetPassword(record)" >重置密码</a>&nbsp;
                        <a href="javascript:;" @click="remove(record)">删除</a>
                    </template>
                </a-table>
            </div>
            <!-- 分页 -->
            <flex-end style="margin-top: 24px;">
                <a-pagination
                    v-if="!isSearch"
                    v-model:current="curPage"
                    :total = "total"
                    @change= "setPage"
                ></a-pagination>
            </flex-end>
        </a-card>

        <!-- 添加用户弹窗 -->
        <add-one
            v-model:show="showAddModel"
            @getList = "getUserList"
        />
    </div>
</template>

<script src="./index.js" ></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>