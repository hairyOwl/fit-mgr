<!--
 * @Description: 添加血糖弹窗模板
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:26
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 15:29:55
-->
<!-- 添加血糖弹窗模板 -->
<template>
    <div>
        <!-- 对话框是个弹窗 -->
        <a-modal
            :visible = "props.show"
            title="添加血糖信息" 
            @ok="submit"
            @cancel = "close"
        >    
            <!-- 表单 -->
            <!-- 总共24份 label-col左边标签占有位置  wrapper-col右边占有位置 -->
            <a-form
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-form-item  label="血糖">
                    <a-input-number 
                        v-model:value="addForm.glucose"
                        :min="0" :max="300" />
                </a-form-item>
                <a-form-item label="日期">
                    <a-date-picker 
                        v-model:value="addForm.recordDate"/>
                </a-form-item>

                <a-form-item  label="时间段">
                    <a-select
                        v-model:value="addForm.timeTag"
                        style="width: 120px"
                    >
                        <a-select-option 
                            v-for="item in timeTagList"
                            :value = "item.timeTag"
                            :key = "item.timeTag"
                        >
                            {{ item.timeTag }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item  label="备注">
                    <a-textarea v-model:value="addForm.note"  show-count :maxlength="500" :rows="4"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<!-- 添加血糖弹窗逻辑 -->
<script src='./index.js' ></script>
<!-- 添加血糖弹窗样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>