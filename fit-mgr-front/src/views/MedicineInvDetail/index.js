/*
 * @Description: 药品详情页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-05 17:07:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-19 22:20:18
 */
import { 
    defineComponent,
    onMounted,
    ref,
} from 'vue';
import { useRoute , useRouter } from 'vue-router'; //useRoute当前页面有哪些路由信息对应的params, query
import { medicine , inventoryLog} from '@/service';
import { result , formatTimestamp ,formatTimestampPlus} from '@/helpers/utils';
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import Update from '@/views/MedicineInventory/Update/index.vue'; //编辑模块

//日志表头
const logColumns = [
    {
        title : '数量',
        dataIndex : 'num',
    },
    {
        title : '时间',
        slots :{
            customRender : 'createdAt',
        },
    },
];

export default defineComponent({
    //注册组件
    components:{
        Update, //编辑
        CheckOutlined, //选择icon
    },

    setup(){
        const route = useRoute(); //获取路由信息
        const router = useRouter(); //操作路由动作
        const showUpdateModal = ref(false); //弹窗显示flag
        //target/params/value/id
        const { id } = route.params 
        const detailInfo = ref({});
        const logList = ref([]); //日志列表
        const logTotal = ref(0); //日志总数
        const logCurPage = ref(1); //当前页数
        const curLogType = ref('ADD_COUNT'); //日志数据种类

        /* 
        详情
        */
        // 获得该条文档所有数据
        const getDetail = async ()=>{
            const res = await medicine.detail(id);
            result(res)
                .success(( {data} )=>{
                    detailInfo.value = data;
                });
        }
        //删除该条文档
        const deleteCur = async ()=>{
            const res = await medicine.deleteOne(id);

            result(res)
                .success(({msg})=>{
                    message.success(msg);
                    router.replace('/medicine-inventory'); //回到之前
                });
        };
        const goToPre = async ()=>{
            router.replace('/medicine-inventory'); //回到之前
        };
        //编辑方法
        const updateDetail = async(medicine)=>{
            Object.assign(detailInfo.value , medicine);
        };

        /* 
        日志
        */
        //获取出入库日志
        const getInventoryLog = async () =>{
            const res = await inventoryLog.list(
                id, 
                curLogType.value, 
                logCurPage.value, 
                5,
            );
            
            result(res)
                .success(({data:{ list ,total ,page}})=>{
                    logList.value = list;
                    logTotal.value = total;
                    logCurPage.value = page;
                });
        };
        //日志分页
        const setLogPage = (page) =>{
            logCurPage.value = page

            getInventoryLog(); //刷新列表
        };
        //日志过滤器
        const logFilter = (type) =>{
            curLogType.value = type;
            getInventoryLog();
        }


        //页面元素加载完成后
        onMounted(()=>{
            getDetail(); //获取详情
            getInventoryLog(); //获取日志
        });

        return{
            showUpdateModal,//弹窗显示flag
            d: detailInfo, //该条数据
            formatTimestamp,
            formatTimestampPlus,
            deleteCur, //删除
            updateDetail, //编辑
            goToPre, //回到上一页
            //日志分页
            logList, //日志列表
            logColumns,//表头
            logTotal, //总条数
            logCurPage, //当前页
            curLogType, //日志种类
            setLogPage, //切页函数
            logFilter,
        };
    },
});