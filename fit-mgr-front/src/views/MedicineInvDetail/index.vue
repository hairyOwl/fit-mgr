<!--
 * @Description: 药品详情页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-05 17:07:44
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-30 11:20:45
-->
<template>
    <div>
        <!-- 详情 -->
        <a-card>
            <!-- 数据头 -->
            <space-between>
                <h2>{{ d.name }}</h2>
                <div>
                    <a-button size="small" @click="showUpdateModal=true">编辑</a-button>&nbsp;
                    <a-button size="small" type="danger" @click="deleteCur">删除</a-button>&emsp;
                    <a-button size="small" @click="goToPre">返回</a-button>
                </div>
            </space-between>
            <!-- 分割线 -->
            <a-divider />
            <!-- 两行三列数据 -->
            <div class="base-info">
                <!-- 第一行 -->
                <div class="items">
                    <div class="item">
                        <div class="title">购买日期</div>
                        <div class="">{{formatTimestamp(d.purchaseDate)}}</div>
                    </div>
                    <div class="item">
                        <div class="title">保质期</div>
                        <div class="content">{{d.shelfLife}}</div>
                    </div>
                </div>
                <!-- 第二行 -->
                <div class="items">
                    <div class="item">
                        <div class="title">种类</div>
                        <div class="content">{{ getClassifyTitleById(d.tag) }}</div>
                    </div>
                    <div class="item">
                        <div class="title">备注</div>
                        <div class="content">{{ d.note }}</div>
                    </div>
                </div>
            </div>
        </a-card>
        <!-- 药品数量日志 -->
        <div class="log">
            <a-card title="药品数量日志">
                <!-- 筛选按钮 -->
                <template #extra>
                    <span>
                        <a href="javascript:;" @click="logFilter('ADD_COUNT')">
                            <check-outlined v-if="curLogType === 'ADD_COUNT' " />
                            增加日志
                        </a>
                    </span>
                    <span style="margin-left: 10px;">
                        <a href="javascript:;" @click="logFilter('SUB_COUNT')">
                            <check-outlined v-if="curLogType === 'SUB_COUNT'" />
                            减少日志
                        </a>
                    </span>
                </template>
                <!-- 记录列表 -->
                <div>
                    <!-- bordered 表格有线框 -->
                    <a-table 
                        bordered
                        :data-source="logList"
                        :columns = "logColumns"
                        :pagination = "false"
                    >
                        <template #createdAt="{record}">
                            {{ formatTimestampPlus(record.meta.createdAt) }}
                        </template>
                    </a-table>
                </div>
                <!--自定义分页  -->
                <space-between style="margin-top: 24px;">
                    <div />
                    <a-pagination
                        v-model:current="logCurPage" 
                        :total="logTotal"
                        :page-size = "5"
                        @change="setLogPage"
                    >
                    </a-pagination>
                </space-between>
            </a-card>
        </div>
        <!-- 编辑组件 -->
        <update
            v-model:show = "showUpdateModal"
            :medicine = "d"
            @update = "updateDetail"
        />
    </div>

</template>

<script src = "./index.js" ></script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>