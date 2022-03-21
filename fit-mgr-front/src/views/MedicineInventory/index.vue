<!--
 * @Description: 修改药品信息模板
 * @Author: hairyOwl
 * @Date: 2022-03-04 21:25:49
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 16:52:11
-->
<!-- 药品信息模板 -->
<template>
    <!-- 药品信息 -->
    <div>
        <!-- 药品列表 -->
        <a-card>
            <!-- 标题 -->
            <h2>药品或试剂数据</h2>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 搜索添加数据 弹性盒子 两端对齐 -->
            <space-between>
                <div class="search">
                    <a-input-search
                        placeholder="根据药品名查询"
                        enter-button
                        v-model:value="keyword"
                        @search="onSearch"
                />

                    <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
                </div>
                <a-button 
                    @click="show = true"
                >
                    添加一条
                </a-button>
            </space-between>
            <!-- 分割线 -->
            <a-divider/> 
            <!-- 药品数据表格 columns表头 data-source数据源 pagination自带分页显示-->
            <a-table
                bordered
                :columns="columns" 
                :data-source="list"
                :pagination= "false"
            >
                <!-- 对应用户 -->
                <template v-if="isAdmin" #user = "data">
                        {{ data.record.userAccount }}
                </template>
                <!-- 分类 -->
                <template #MedicineTag = "data">
                        {{getClassifyTitleById(data.record.tag)}}
                </template>
                <!-- 时间戳格式化 -->
                <template #purchaseDate = "data">
                    {{ formatTimestamp(data.record.purchaseDate) }}
                </template>
                <!-- 库存 -->
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
                    @change="setPage"
                />
            </space-between>
        </a-card>

        <!-- 添加药品弹窗 -->
        <add-one
            v-model:show = "show"  
            :classifyList="medicineClassifyList"
            @getList = "getList"
        />

        <!-- 修改药品弹窗 -->
        <update
            v-model:show = "showUpdateModal"
            :medicine = "curEditMedicine"
            @update = "updateCurMedicine"
        />
    </div>
</template>
<!--药品信息逻辑  -->
<script src="./index.jsx" ></script>

<!-- 药品信息样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>