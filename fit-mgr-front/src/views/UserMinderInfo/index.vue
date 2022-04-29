<!--
 * @Description: 照顾者详情页面模板
 * @Author: hairyOwl
 * @Date: 2022-04-28 11:02:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 14:33:49
-->
<template>
    <div>
        <a-card v-only-admin>
            <space-between>
                <!-- 标题 -->
                <h2>{{user.account}}的照顾者</h2>
                <div>
                    <a-button @click="showAddModel=true" style="margin-right : 10px;">添加照顾者</a-button>
                    <a-button @click="goToPre()" type="primary">返回</a-button>
                </div>
            </space-between>
            <!-- 分割线 -->
            <a-divider />
            <!-- 照顾者表格 -->
            <a-table
                bordered
                :pagination = false
                :columns = "columns"
                :data-source = "minderList"
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
        </a-card>

        <!-- 添加用户弹窗 -->
        <add-one
            v-model:show="showAddModel"
            v-model:father="user"
            @getUserMinderList = "getUserMinderList"
        />
    </div>

</template>

<script src = "./index.js" ></script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>