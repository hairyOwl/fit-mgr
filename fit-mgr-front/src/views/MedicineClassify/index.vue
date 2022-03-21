<!--
 * @Description: 药剂分类 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-20 15:23:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-20 22:41:06
-->
<template>
    <div>
        <a-card title="药剂分类管理">
            <!-- 添加输入框 -->
            <div class="addClassify">
                <a-input 
                    style="width:200px" 
                    placeholder="请输入药剂分类"
                    v-model:value="keyClassify"
                /> &nbsp;
                <a-button type="primary" @click="addOne">添加</a-button>
            </div>

            <!-- 分割线 -->
            <a-divider/>

            <!-- 表格 -->
            <a-table
                bordered
                :data-source = "list"
                :columns = "columns"
                :pagination="false"
            >
                <template #actions="{record}">
                    <a-button size="small"  @click="updateOne(record)">编辑</a-button> &nbsp;
                    <a-button size="small" type="danger" @click="removeOne(record)">删除</a-button>
                </template>

            </a-table>
        </a-card>
    </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss">
    @import './index.scss';
</style>