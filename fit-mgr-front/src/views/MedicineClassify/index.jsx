/*
 * @Description: 药剂分类 页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-20 15:23:20
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-20 22:54:36
 */
import { defineComponent , ref , onMounted } from 'vue';
import { result } from '@/helpers/utils';
import { medicineClassify } from '@/service';
import { message , Modal ,Input} from 'ant-design-vue';

const columns =[
    {
        title : '分类名称',
        dataIndex : 'title',
    },
    {
        title : '操作',
        slots:{
            customRender : 'actions',
        },
    },
];

export default defineComponent({
    setup(){

        //获取药剂分类列表
        const list = ref([]);
        const keyClassify = ref('');

        const getList = async () =>{
            const res = await medicineClassify.list();

            result(res)
                .success(({data})=>{
                    list.value = data;
                });
        }
        //挂载
        onMounted(()=>{
            getList();
        });
         //添加药剂分类
        const addOne = async ()=>{
            
            const res = await medicineClassify.add(keyClassify.value);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    keyClassify.value = '';
                    getList();
                });
        }
         //删除药剂分类
        const removeOne = async ({_id})=>{
            
            const res = await medicineClassify.remove(_id);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    getList();
                });
        }
        //编辑药剂分类
        const updateOne = async ({_id , title})=>{
            // 弹窗
            Modal.confirm({
                title : '编辑药剂分类',
                // 弹窗dom
                content : (
                    <div>
                        <Input class="__medicine_classify_new_title" />
                    </div>
                ),
                onOk: async () =>{
                    const title = document.querySelector('.__medicine_classify_new_title').value;
                    // 调用编辑逻辑
                    const res = await medicineClassify.update(_id , title);
                    result(res)
                        .success(({msg})=>{
                            message.success(msg);
                            // 更新前端列表
                            list.value.forEach((item)=>{
                                if(item._id === _id){
                                    item.title = title;
                                }
                            });
                        });
                },
            });      
        }


        return{
            //列表
            columns,
            list,
            //操作
            keyClassify,
            addOne,
            removeOne,
            updateOne,
        }
    },
});