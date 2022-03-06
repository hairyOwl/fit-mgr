/*
 * @Description: 修改血压弹窗逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-04 15:48:35
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-04 23:09:27
 */
import { 
    defineComponent,
    reactive,
    watch, //监听响应式数据是否发生变化
} from 'vue';
import { bloodPressure } from '@/service';
import { message } from 'ant-design-vue';
import { result ,clone } from '@/helpers/utils';
import moment from 'moment';

export default defineComponent({
    //父组件传递的自定义属性名(str)
    props: {
        show : Boolean,
        bloodP: Object,
    },
    
    //初始化时执行一次 ，生命周期的钩子
    setup(props , context){
        const editForm = reactive({
            sys : 0,
            dia :  0,
            pul : 0,
            recordDate : '',
            timeTag : '',
            note : '',
        }); 
        //将选择数据填充到修改列表上
        watch(()=> props.bloodP , (current)=>{
            Object.assign(editForm , current);
            editForm.recordDate = moment(Number(editForm.recordDate)); //moment转时间
        });

        //点击提交按钮事件
        const submit = async () =>{
            
            const res = await bloodPressure.update({
                id : props.bloodP._id,
                sys : editForm.sys,
                dia : editForm.dia,
                pul : editForm.pul,
                recordDate : editForm.recordDate.valueOf(),//moment转时间戳 数据库是时间戳
                timeTag : editForm.timeTag,
                note : editForm.note,
            });
            result(res)
                .success(({data , msg})=>{
                    context.emit('update', data);
                    message.success(msg);
                    close();
                });
        };

        //点击弹窗关闭按钮
        const close = () =>{
            //触发自定义事件
            context.emit('update:show' , false); //修改双向绑定的show
        }

        return{
            //添加血压
            editForm,
            //提交表单事件
            submit,
            //获得父类自定义属性
            props,
            //触发自定义事件
            close,
        };
    },
});