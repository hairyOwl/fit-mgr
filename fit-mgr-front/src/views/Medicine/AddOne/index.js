/*
 * @Description: 添加药品弹窗逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-28 15:48:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 16:22:06
 */
import { defineComponent ,reactive} from 'vue';
import { medicine } from '@/service';
import { message } from 'ant-design-vue';
import { result ,clone } from '@/helpers/utils';
import store from '@/store';

//空药品数据表单
const defaultFormData = {
    name : '',
    tag : '',
    purchaseDate : '',
    shelfLife : '',
    count : 0,
    note : '',
};

export default defineComponent({
    //父组件传递的自定义属性名(str)
    props: {
        show : Boolean,
    },
    
    //初始化时执行一次 ，生命周期的钩子
    setup(props , context){
        const user = store.state.userInfo; //获取当前用户 添加药品信息时带入
        const classifyList = store.state.medClassify;
        const addForm = reactive(clone(defaultFormData)); //防止reactive直接操作defaultFormData
        
        if(classifyList.length){ //当无药剂分类,没有默认项
            addForm.tag = classifyList[0]._id;
        }
        //点击提交按钮事件
        const submit = async () =>{
            const form = clone(addForm); //深拷贝
            form.purchaseDate = addForm.purchaseDate.valueOf(); //moment对象转化为时间戳
            form.userAccount = user.account;
            const res = await medicine.add(form);

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
            context.emit('getList'); 
            
        }

        return{
            //添加药品
            addForm,
            //提交表单事件
            submit,
            //获得父类自定义属性
            props,
            //触发自定义事件
            close,
            classifyList,
        };
    },
});