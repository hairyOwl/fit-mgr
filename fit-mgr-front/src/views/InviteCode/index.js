/*
 * @Description: 邀请码管理 页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-16 22:04:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-17 11:25:54
 */
import { defineComponent , ref ,reactive,onMounted } from 'vue';
import { result , formatTimestampPlus} from '@/helpers/utils';
import { message } from 'ant-design-vue'
import { inviteCode } from '@/service';

const columns = [
    {
        title : '邀请码',
        dataIndex : 'code',
    },
    {
        title : '是否使用',
        slots : {
            customRender : 'used',
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
        const count = ref(1); //创建邀请码条数
        //列表相关
        const list = ref([]);
        const curPage = ref(1);
        const total = ref(0);
        const pageSize = 20;

        const getList = async ()=>{
            const res = await inviteCode.list(curPage.value , pageSize);

            result(res)
                .success(({data : { total:t , list:l}})=>{
                    list.value = l;
                    total.value = t;
                
                });
        };

        onMounted(()=>{
            getList();
        });
        //分页
        const setPage = (page)=>{
            curPage.value = page;
            getList();
        };

        //是否使用
        const hasUsed = ( {user} )=>{
            return (user === '') ? '×' : '√';
        }

        //添加邀请码
        const addInviteCode = async ()=>{
            const res = await inviteCode.add(count.value);

            result(res)
                .success(()=>{
                    message.success(`成功添加 ${count.value}条邀请码`);
                    getList();
                });
        }

        //删除邀请码
        const removeInviteCode = async ({_id})=>{
            const res = await inviteCode.remove(_id);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    getList();
                });
        }

        return{
            count,
            columns,
            list,
            curPage,
            total,
            pageSize,
            setPage,
            hasUsed,
            addInviteCode,
            removeInviteCode,
        }
    },
});