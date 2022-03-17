/*
 * @Description: 重置密码列表页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-15 17:33:09
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-16 22:44:00
 */

import { defineComponent ,ref, onMounted } from 'vue';
import { resetPassword } from '@/service';
import { result ,formatTimestampPlus } from '@/helpers/utils';
import { message } from 'ant-design-vue';


const columns = [
    {
        title : '账户',
        dataIndex : 'account',
    },
    {
        title : '时间',
        slots : {
            customRender : 'createdAt',
        }
    },
    {
        title : '操作',
        slots : {
            customRender : 'actions',
        }
    },
];
export default defineComponent({
    setup(){
        const list = ref([]); 
        const curPage = ref(1);
        const total = ref(0);
        const pageSize = 20;

        // 获取列表
        const getList = async ()=>{
            const res = await resetPassword.list(curPage.value , pageSize);

            result(res)
                .success(({ data:{ list : l , total:t} })=>{
                    list.value = l;
                    total.value = t;
                    
                });
        };

        onMounted(()=>{
            getList();
        });

        //切换页面
        const setPage = (page)=>{
            curPage.value = page;
            getList();
        };

        //修改状态
        const changeStatus = async ({_id },status) =>{
            const res = await resetPassword.updateStatus(_id , status);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    getList();
                });
        };

        return{
            //列表
            list,
            curPage,
            total,
            pageSize,
            columns,
            formatTimestampPlus,
            setPage,
            changeStatus,
        }
    },
});