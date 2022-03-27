<!--
 * @Description: 修改血糖信息模板
 * @Author: hairyOwl
 * @Date: 2022-03-04 21:25:49
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 09:56:16
-->
<!-- 血糖信息模板 -->
<template>
    <!-- 血糖信息 -->
    <div>
        <!-- 血糖列表 -->
        <a-card :title="simple ? '最近添加的血糖数据' : ''">
            <div v-if="!simple">
                <!-- 标题 -->
                <h2>血糖数据</h2>
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
                    
                    <!-- 添加按钮 -->
                    <div >
                        <a-button @click="show = true">添加一条</a-button>&nbsp;
                        <!-- 文件上传 -->
                        <a-upload v-only-member
                            @change="onUploadChange"
                            action="http://localhost:3000/upload/file"
                            :headers = "headers"
                        >
                            <a-button type="primary">上传 Excel添加</a-button>
                        </a-upload>
                    </div>
                </space-between>
                <!-- 分割线 -->
                <a-divider/> 
            </div>

            <!-- 血糖数据表格 columns表头 data-source数据源 pagination自带分页显示-->
            <a-table
                bordered
                :columns="columns" 
                :data-source="list"
                :pagination= "false"
                :scroll="{ x:'max-content'}"
            >
                <!-- 对应用户 -->
                <template v-if="isAdmin" #user = "data">
                        {{ data.record.userAccount }}
                </template>
                
                <!-- 时间戳格式化 -->
                <template #recordDate = "data">
                    {{ formatTimestamp(data.record.recordDate) }}
                </template>
                <!-- 操作 -->
                <template #actions = "record" v-if="!simple">
                    <a href="javascript:;" @click="updateOne(record)">编辑</a> &nbsp;
                    <a href="javascript:;" @click="toDetail(record)">详情</a> &nbsp;
                    <a href="javascript:;" @click="deleteOne(record)">删除</a>
                </template>
            </a-table>   
            

            <!-- 分页 -->
            <flex-end v-if="!simple" style="margin-top: 24px;">
                <!-- 空元素占位 -->
                <div/> 
                <a-pagination 
                    v-model:current="curPage" 
                    :total="total"
                    @change="setPage"
                />
            </flex-end>
        </a-card>

        <!-- 添加血糖弹窗 -->
        <add-one
            v-model:show = "show"
            :timeTagList = "TimeTagList"
            @getList = "getList"
        />

        <!-- 修改血糖弹窗 -->
        <update
            v-model:show = "showUpdateModal"
            :timeTagList = "TimeTagList"
            :bloodG = "curEditBG"
            @update = "updateCurBloodG"
        />
    </div>
</template>
<!--血糖信息逻辑  -->
<script src="./index.jsx" ></script>

<!-- 血糖信息样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>