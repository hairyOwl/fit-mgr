<!--
 * @Description: 用户管理页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-06 22:35:33
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-26 20:42:38
-->
<template>
    <div>
        <a-card v-only-admin>
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

                <div>
                    <a-button @click="showAddModel=true">添加用户</a-button>&nbsp;
                    <!-- 文件上传 -->
                    <a-upload
                        @change="onUploadChange"
                        action="http://localhost:3000/upload/file"
                    >
                        <a-button @click="upload" type="primary">上传 Excel添加</a-button>
                    </a-upload>
                </div>
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
                    <!-- 角色插槽 -->
                    <template #character=" {record} ">
                        <a href="javascript:;" @click="onEdit(record)"><edit-outlined /></a>&nbsp;
                        {{getCharacterInfoById( record.character).title }}
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

        <!-- 修改角色的弹窗 -->
        <a-modal
            v-model:visible="showEditCharacterModal"
            title="修改角色"
            @ok="editCharacter"
        >
            <a-select
                style="width: 200px"
                v-model:value="editFrom.character"
            >
                <a-select-option
                    v-for="item in characterInfo"
                    :key = "item._id"
                    :value = "item._id"
                >
                    {{ item.title }}
                </a-select-option>
            </a-select>
        </a-modal>
    </div>
</template>

<script src="./index.js" ></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>