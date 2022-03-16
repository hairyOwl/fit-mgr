/*
 * @Description: 日志页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-12 22:18:05
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 21:33:10
 */
import { defineComponent , ref ,onMounted } from 'vue';
import { actionLog } from '@/service';
import { result , formatTimestampPlus} from '@/helpers/utils';
import { getLogInfoByPath } from '@/helpers/actionLog';
import { message } from 'ant-design-vue';

const columns = [
    {
        title:'用户名',
        dataIndex :'user.account',
    },
    {
        title:'访问地址',
        dataIndex :'action',
    },
    {
        title:'访问方法',
        dataIndex :'request.method',
    },
    {
        title:'时间',
        slots : {
            customRender : 'createdAt',
        },
    },
    {
        title:'操作',
        slots : {
            customRender : 'actions',
        },
    },

];

export default defineComponent({
    setup(){
        const pageSize = 20; //页面大小
        const curPage = ref(1); //当前页
        const total = ref(0); //所有
        const list = ref([]); //列表
        const loading = ref(true); //加载flag

        // 获取日志列表
        const getList = async ()=>{
            loading.value = true;
            const res = await actionLog.list(curPage.value , pageSize);
            loading.value = false;

            result(res)
                .success(( {data : {list:actionLogList , total:actionLogTotal}} )=>{
                    actionLogList.forEach(( item )=>{
                        item.action =  getLogInfoByPath(item.request.url);
                    });

                    //路由转为文字
                    list.value = actionLogList;
                    total.value = actionLogTotal;
                });
            
        };

        onMounted(()=>{
            getList();
        });

        //分页
        const setPage = ( page) =>{
            curPage.value = page;
            getList();
        }

        //删除日志
        const deleteActionLog = async ({ _id})=>{
            const res = await actionLog.remove(_id);
            
            result(res)
                .success(({ msg })=>{
                    message.success(msg);
                    getList();
                });
        }

        return{
            //数据列表
            columns,
            pageSize,
            curPage,
            total,
            list,
            setPage,
            //列表优化
            loading, //刷新flag
            formatTimestampPlus, 
            deleteActionLog, //删除日志
        }
    },
});