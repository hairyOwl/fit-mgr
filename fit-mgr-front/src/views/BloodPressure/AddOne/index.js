/*
 * @Description: 添加血压弹窗逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-05 09:58:27
 */
import { defineComponent ,reactive} from 'vue';
import { bloodPressure } from '@/service';
import { message } from 'ant-design-vue';
import { result ,clone } from '@/helpers/utils';

//空血压数据表单
const defaultFormData = {
    sys : 0,
    dia :  0,
    pul : 0,
    count : 0,
    recordDate : '',
    timeTag : '',
    note : '',
};

export default defineComponent({
    //父组件传递的自定义属性名(str)
    props: {
        show : Boolean,
    },
    
    //初始化时执行一次 ，生命周期的钩子
    setup(props , context){
        

        const addForm = reactive(clone(defaultFormData)); //防止reactive直接操作defaultFormData

        //点击提交按钮事件
        const submit = async () =>{
            const form = clone(addForm); //深拷贝
            form.recordDate = addForm.recordDate.valueOf(); //moment对象转化为时间戳
            const res = await bloodPressure.add(form);

            result(res)
                .success((data) =>{ //添加数据成功后清空表单
                    Object.assign(addForm ,defaultFormData); //合并数组
                    message.success(data.msg);
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
        };
    },
});