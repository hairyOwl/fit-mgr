<!--
 * @Description: 添加用户弹窗模板
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:26
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-09 22:16:36
-->
<!-- 添加血压弹窗模板 -->
<template>
    <div>
        <!-- 对话框是个弹窗 -->
        <a-modal
            :visible = "props.show"
            title="添加一个用户" 
            @ok="submit"
            @cancel = "close"
        >    
            <!-- 表单 -->
            <!-- 总共24份 label-col左边标签占有位置  wrapper-col右边占有位置 -->
            <a-form
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-form-item  label="账户">
                    <a-input 
                        v-model:value="addForm.account"
                        :min="0" :max="300" />
                </a-form-item>

                <a-form-item label="密码">
                    <a-input
                        v-model:value="addForm.password"
                        :min="0" :max="200" />
                </a-form-item>

                <a-form-item label="角色">
                    <a-select
                        v-model:value="addForm.character"
                        >
                        <a-select-option
                            v-for="item in characterInfo"
                            :key = "item._id"
                            :value = "item._id"
                        >
                            {{ item.title }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

            </a-form>
        </a-modal>
    </div>
</template>
<!-- 添加血压弹窗逻辑 -->
<script src='./index.js' ></script>
<!-- 添加血压弹窗样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>