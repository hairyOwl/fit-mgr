<!--
 * @Description: 修改药品弹窗模板
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:26
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-19 22:10:07
-->
<!-- 添加药品弹窗模板 -->
<template>
    <div>
        <!-- 对话框是个弹窗 -->
        <a-modal
            :visible = "props.show"
            title="修改药品/试剂信息" 
            @ok="submit"
            @cancel = "close"
        >    
            <!-- 表单 -->
            <!-- 总共24份 label-col左边标签占有位置  wrapper-col右边占有位置 -->
            <a-form
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-form-item  label="药品/试剂名称">
                    <a-input v-model:value="editForm.name"/>
                </a-form-item>

                <a-form-item  label="用途">
                    <a-input  v-model:value="editForm.tag" placeholder="降压"/>
                </a-form-item>

                <a-form-item label="购买日期">
                    <a-date-picker 
                        v-model:value="editForm.purchaseDate"/>
                </a-form-item>

                <a-form-item label="保质期">
                    <a-input  v-model:value="editForm.shelfLife" placeholder="12个月"/>
                </a-form-item>

                <a-form-item label="库存">
                    <a-input-number 
                        v-model:value="editForm.count"
                        :min="0" :max="1000" />
                </a-form-item>
                
                <a-form-item  label="备注">
                    <a-textarea v-model:value="editForm.note"  show-count :maxlength="500" :rows="4"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<!-- 添加药品弹窗逻辑 -->
<script src='./index.js' ></script>
<!-- 添加药品弹窗样式 -->
<style lang="scss" scoped>
    @import './index.scss';
</style>