/*
 * @Description: 添加用户弹窗逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 14:00:17
 */
import { defineComponent ,reactive} from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result ,clone } from '@/helpers/utils';
import store from '@/store'; //拿到权限表渲染数据

//空血压数据表单
const defaultFormData = {
    account : '',
    password :  '',
    character : '',
};

export default defineComponent({
    //父组件传递的自定义属性名(str)
    props: {
        show : Boolean,
        father : Object,
    },
    
    //初始化时执行一次 ，生命周期的钩子
    setup(props , context){
        const { characterInfo } = store.state;

        const addForm = reactive(clone(defaultFormData)); //防止reactive直接操作defaultFormData
        const minderCharacter = characterInfo[1]._id; //默认角色是成员
        

        //点击提交按钮事件
        const submit = async () =>{
            const form = clone(addForm); //深拷贝
            
            const res = await user.addUser(
                form.account , 
                form.password , 
                minderCharacter,
                true,
                props.father.account,
            );

            result(res)
                .success((data) =>{ //添加数据成功后清空表单
                    Object.assign(addForm ,defaultFormData); //合并数组
                    message.success(data.msg);
                    close();
                    context.emit('getUserMinderList');
                });
        };

        //点击弹窗关闭按钮
        const close = () =>{
            //触发自定义事件
            context.emit('update:show' , false); //修改双向绑定的show
        }

        return{
            //添加血压
            addForm,
            //提交表单事件
            submit,
            //获得父类自定义属性
            props,
            //触发自定义事件
            close,
            characterInfo, //全局数据权限表
        };
    },
});