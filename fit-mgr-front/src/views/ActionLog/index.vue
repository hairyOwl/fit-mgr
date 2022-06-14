<!--
 * @Description: 日志页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-12 22:17:58
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 11:17:53
-->
<template>
    <div>
        <!-- 加载器 -->
        <a-spin :spinning= "loading">
            <!-- 卡片 -->
            <a-card :title="simple ? '最近添加的日志' : ''">
                <div v-if="!simple">
                    <!-- 标题 -->
                    <h2>操作日志</h2>
                    <!-- 分割线 -->
                    <a-divider />
                </div>

                <!-- 日志表格 -->
                <div>
                    <a-table
                        bordered 
                        :columns = "columns"
                        :data-source = "list"
                        :pagination="false"
                        :scroll="{ x:'100%'}"
                    >
                    <!-- 时间插槽 -->
                    <template #createdAt = "{ record }">
                        {{ formatTimestampPlus(record.meta.createdAt) }}
                    </template>
                    <!-- 操作插槽 -->
                    <template v-if="!simple" #actions = "{ record }">
                        <a href="javascript:;" @click="deleteActionLog(record)">删除</a>
                    </template>
                    </a-table>
                </div>
                <!-- 分页 -->
                <div>
                    <flex-end v-if="!simple">
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