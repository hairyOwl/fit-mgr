/*
 * @Description: 照顾者详情页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-05 17:07:52
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-29 14:36:13
 */
import { 
    defineComponent,
    onMounted,
    ref,
} from 'vue';
import { useRoute , useRouter } from 'vue-router'; //useRoute当前页面有哪些路由信息对应的params, query
import { user } from '@/service';
import { result , formatTimestampPlus,formatTimestamp, } from '@/helpers/utils';
import { message } from 'ant-design-vue'; //antd提示
import { EditOutlined } from '@ant-design/icons-vue';
import AddOne from './AddOne/index.vue'; //添加弹窗


//操作者表头
const columns = [
    {
        title: '账号',
        dataIndex : 'account',
    },
    {
        title: '创建日期',
        slots : {
            customRender : 'createdAt'
        }
    },
    {
        title: '操作',
        slots : {
            customRender : 'actions'
        }
    }
];

export default defineComponent({
    //注册组件
    components:{
        AddOne,
        EditOutlined,
    },

    setup(){
        const route = useRoute(); //获取路由信息
        const router = useRouter(); //操作路由动作
        const { id } = route.params; //照顾者id
        const userInfo = ref({});
        const minderList = ref([]);
        const showAddModel = ref(false);

        /* 
        详情
        */        
        //获取照顾者列表
        const getUserMinderList = async () =>{
            const res = await user.detail(id);
            result(res)
                .success(( {data :{ user , minderList:m}} )=>{
                    userInfo.value = user;
                    minderList.value = m;
                });
        };

        //重置密码为初始
        const resetPassword = async ( {_id} )=>{
            const res = await user.resetPW(_id);

            result(res)
                .success(( {msg} )=>{
                    message.success(msg);
                })
        };

        //删除用户
        const remove = async ( { _id } )=>{
            const res = await user.deleteUser(_id);

            result(res)
                .success(( {msg} )=>{
                    message.success(msg);
                    getUserMinderList();
                });
        };

        onMounted(()=>{
            getUserMinderList();
        });

        //回到上一级
        const goToPre = async ()=>{
            router.replace('/user'); //回到之前
        };

        return{
            //数据相关
            user : userInfo, //该条数据的用户
            minderList, //该条数据的用户
            columns,

            //操作函数
            goToPre, //回到上一页
            getUserMinderList,
            showAddModel,
            resetPassword,
            remove,

            //工具函数
            formatTimestamp,
            formatTimestampPlus,
        };
    },
});