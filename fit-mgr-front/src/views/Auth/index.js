/*
 * @Description: 认证页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-23 15:41:27
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-25 14:18:39
 */
import {defineComponent , reactive} from 'vue';
import {UserOutlined , KeyOutlined,SmileOutlined} from '@ant-design/icons-vue' //icon 作为组件导入
import {auth} from '@/service'

export default defineComponent({
    //注册组件
    components: {
        UserOutlined,
        KeyOutlined,
        SmileOutlined,
    },
    

    //只在初始化的时候运行
    setup(){
        //数据表单  reactive响应式数据的集合
        const regForm = reactive({
            account : '',
            password : '',
        });

        //注册时的逻辑
        const register = () =>{
            auth.register(regForm.account , regForm.password);
        }

        return{
            regForm,

            register,
        };
    },
});


