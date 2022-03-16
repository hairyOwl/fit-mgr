<!--
 * @Description: 重置密码列表页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-15 17:32:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-16 09:29:22
-->
<template>
    <div>
        <a-card title="重置密码申请列表">
            <!-- 表格 -->
            <a-table
                bordered
                :pagination = "false"
                :data-source = "list"
                :columns = "columns"
            >
                <!-- 时间插槽 -->
                <template #createdAt = "{ record }">
                        {{ formatTimestampPlus(record.meta.createdAt) }}
                </template>
                <!-- 操作插槽 -->
                <template #actions = "{ record }">
                    <a-button size="small" @click="changeStatus(record,2)">重置</a-button> &nbsp;
                    <a-button size="small" type="danger" 
                        @click="changeStatus(record,3)"
                        >忽略</a-button>
                </template>
            </a-table>
            <!-- 分页 -->
            <flex-end style="margin-top : 24px;">
                <a-pagination
                    v-model:current="curPage"
                    :total = "total"
                    :pageSize = "pageSize"
                    @change="setPage"
                ></a-pagination>
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js" ></script>