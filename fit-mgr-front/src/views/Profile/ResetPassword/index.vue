<!--
 * @Description: 个人设置 修改密码组件 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-21 21:07:17
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 22:43:28
-->
<template>
    <div>
        <a-card title="个人设置 修改密码">
            <a-form
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"             
            >
                <a-form-item label="原始密码">
                    <a-input type="password" v-model:value="resetPasswordFrom.oldPassword" />
                </a-form-item>

                <a-form-item label="新密码">
                    <a-input type="password" v-model:value="resetPasswordFrom.newPassword" />
                </a-form-item>

                <a-form-item label="确认新密码">
                    <a-input type="password" v-model:value="resetPasswordFrom.confirmNewPassword" />
                    
                    <div style="margin-top: 24px;">
                        <a-button type="primary" @click="updateOne">提交</a-button>
                    </div>
                </a-form-item>

            </a-form>
        </a-card>
    </div>
</template>

<script src="./index.js" ></script>