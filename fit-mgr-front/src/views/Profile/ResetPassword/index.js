/*
 * @Description: 个人设置 修改密码组件 页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-21 21:06:44
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 22:43:30
 */
import { defineComponent , reactive  } from 'vue';
import { message } from 'ant-design-vue';
import { profile } from '@/service';
import { result } from '@/helpers/utils'

export default defineComponent({
    setup(){

        const resetPasswordFrom = reactive({
            oldPassword : '',
            newPassword : '',
            confirmNewPassword : '',
        });

        //提交按钮触发 修改密码
        const updateOne = async ()=>{
            const{
                oldPassword,
                newPassword,
                confirmNewPassword,
            } = resetPasswordFrom;

            if(newPassword !== confirmNewPassword){
                message.error('两次输入密码不相同');
                return;
            }
            const res = await profile.resetPassword(newPassword, oldPassword,);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    // 表单项置空
                    resetPasswordFrom.oldPassword = '';
                    resetPasswordFrom.newPassword = '';
                    resetPasswordFrom.confirmNewPassword = '';
                });
        }

        return{
            resetPasswordFrom,
            updateOne,
        };
    },
});