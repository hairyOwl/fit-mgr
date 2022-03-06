<!--
 * @Description: 修改血压弹窗模板
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:26
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-04 20:42:41
-->
<!-- 添加血压弹窗模板 -->
<template>
    <div>
        <!-- 对话框是个弹窗 -->
        <a-modal
            :visible = "props.show"
            title="修改血压信息" 
            @ok="submit"
            @cancel = "close"
        >    
            <!-- 表单 -->
            <!-- 总共24份 label-col左边标签占有位置  wrapper-col右边占有位置 -->
            <a-form
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-form-item  label="高压">
                    <a-input-number 
                        v-model:value="editForm.sys"
                        :min="0" :max="300" />
                </a-form-item>

                <a-form-item label="低压">
                    <a-input-number 
                        v-model:value="editForm.dia"
                        :min="0" :max="200" />
                </a-form-item>

                <a-form-item label="心跳">
                    <a-input-number 
                        v-model:value="editForm.pul"
                        :min="0" :max="200" />
                </a-form-item>

                <a-form-item label="日期">
                    <a-date-picker 
                        v-model:value="editForm.recordDate"/>
                </a-form-item>

                <a-form-item  label="时间段">
                    <a-input  v-model:value="editForm.timeTag" placeholder="上午"/>
                </a-form-item>

                <a-form-item  label="备注">
                    <a-textarea v-model:value="editForm.note"  show-count :maxlength="500" :rows="4"/>
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