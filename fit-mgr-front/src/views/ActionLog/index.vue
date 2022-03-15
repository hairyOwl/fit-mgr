<!--
 * @Description: 日志页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-12 22:17:58
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-14 21:10:10
-->
<template>
    <div>
        <!-- 加载器 -->
        <a-spin :spinning= "loading">
            <!-- 卡片 -->
            <a-card>
                <!-- 标题 -->
                <h2>操作日志</h2>
                <!-- 分割线 -->
                <a-divider />
                <!-- 操作表格 -->
                <div>
                    <a-table
                        bordered
                        :columns = "columns"
                        :data-source = "list"
                        :pagination="false"
                    >
                    <!-- 时间插槽 -->
                    <template #createdAt = "{ record }">
                        {{ formatTimestampPlus(record.meta.createdAt) }}
                    </template>
                    <!-- 操作插槽 -->
                    <template #actions = "{ record }">
                        <a href="javascript:;" @click="deleteActionLog(record)">删除</a>
                    </template>
                    </a-table>
                </div>
                <!-- 分页 -->
                <div>
                    <flex-end>
                        <a-pagination style="margin-top:24px;"
                            v-model:current="curPage"
                            :pageSize = "pageSize"
                            :total = "total"
                            @change="setPage"
                        >
                            
                        </a-pagination>
                    </flex-end>
                </div>
            </a-card>
        </a-spin>
    </div>
</template>

<script src = "./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>