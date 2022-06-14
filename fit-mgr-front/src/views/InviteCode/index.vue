<!--
 * @Description: 邀请码管理 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-16 22:04:16
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-17 11:26:39
-->
<template>
    <div>
        <a-card title="邀请码管理">
            <!-- 执行 -->
            <space-between>
                <div class="execute">
                    <a-input-number v-model:value="count" :min="1" :max="10000"/> &nbsp;
                    <a-button 
                        type="primary"
                        @click="addInviteCode"
                    >创建邀请码</a-button>
                </div>
                <div></div>
            </space-between>
            <!-- 分割线 -->
            <a-divider />
            <!-- 表格 -->
            <a-table
                bordered
                :data-source = "list"
                :columns = "columns"
                :pagination = "false"
            >   
                <!-- 操作插槽 -->
                <template #used = "{ record }">
                    {{ hasUsed(record) }}
                </template>
                <!-- 操作插槽 -->
                <template #actions = "{record}">
                    <a-button size="small" type="danger" 
                        @click="removeInviteCode(record)"
                        >删除</a-button>
                </template>
            </a-table>
            <flex-end style="margin-top:24px;">
                <a-pagination
                    v-model:current="curPage"
                    :pageSize="pageSize"
                    :total = "total"
                    @change="setPage"
                ></a-pagination>
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
    @import './index.scss';
</style>