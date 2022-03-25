/*
 * @Description: 血糖信息逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:26:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 11:00:55
 */
import {
    defineComponent , 
    ref, //响应式变量 
    onMounted, //生命周期的钩子
} from 'vue'; 
import { useRouter } from 'vue-router'; //操作路由的方法 前进一页后退一页跳转某一页
import AddOne from './AddOne/index.vue'; //添加信息弹窗
import Update from './Update/index.vue'; //修改信息弹窗
import { bloodGlucose } from '@/service'
import { message , Modal ,Input} from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { result , formatTimestamp } from '@/helpers/utils';
import { isAdmin } from '@/helpers/character';
import store from '@/store'; //vuex

//列表配置项
const columns = [
    {
        title : '日期',
        // dataIndex : 'recordDate',
        slots :{
            customRender:'recordDate',
        }
    },
    {
        title : '时间段',
        dataIndex : 'timeTag',
    },
    {
        title : '血糖',
        dataIndex : 'glucose',
    },
    {
        title : '备注',
        dataIndex : 'note',
    },
];
//当用户是管理员的适合添加用户列
if(isAdmin()){
    columns.splice(0,0,
    {
        title : '用户',
        onlyAdmin : true,
        fixed : true,
        slots :{
            customRender:'user',
        }
    },);
};
//时间段列表
const TimeTagList = [
    {
        timeTag : "早餐前",
    },
    {
        timeTag : "早餐后",
    },
    {
        timeTag : "中餐前",
    },
    {
        timeTag : "中餐后",
    },
    {
        timeTag : "晚餐前",
    },
    {
        timeTag : "晚餐后",
    },
    {
        timeTag : "睡前",
    },
];
export default defineComponent({
    //组件注册
    components : {
        AddOne, //添加弹窗
        Update, //修改弹窗
        SearchOutlined, //搜索图标
    },
    props:{
        simple: Boolean,
    },
    
    setup(props){
        const router = useRouter();
        //数据列表
        const show = ref(false); //添加血糖窗口点击事件 flag
        const showUpdateModal = ref(false); //修改血糖窗口点击事件 flag
        const list = ref([]); //默认是空数组
        const curPage = ref(1);
        const total = ref(0);
        const starDay = ref('');
        const endDay = ref('');
        const curEditBG = ref({});
        const {account} = store.state.userInfo;
        const userAdmin = isAdmin();

        if(!props.simple){
            columns.push(    {
                title : '操作',
                slots :{
                    customRender:'actions',
                }
            },);
        }

        //获取血糖列表
        const getList = async () =>{
            const res = await bloodGlucose.list(
                userAdmin,
                account,
                curPage.value,
                10,
                starDay.value,
                endDay.value,
            );
            result(res)
                .success(({ data })=>{
                    const {list :l , total:listTotal} = data;
                    list.value = l
                    total.value = listTotal
                });
        }

        //当组件被挂载的时候会调用 ,当组件初始化完成放在页面上时会做的事情
        onMounted(async () =>{
            getList();
        });

        //分页发生改变
        const setPage = (page)=>{
            curPage.value = page;
            //重新取数据
            getList();
        };

        //搜索日期范围变更
        const onChange = (dates) =>{
            
            if(Array.isArray(dates) && dates.length === 0){
                starDay.value =  '';
                endDay.value =  '';
            }else{
                starDay.value =  dates[0]._d.getTime();
                endDay.value =  dates[1]._d.getTime();
            }

            getList();
        };

        //删除数据
        const deleteOne = async ({ record }) =>{
            const { _id } = record ;
            //service 的 接口
            const res = await bloodGlucose.deleteOne(_id);

            result(res)
                .success((data)=>{
                    message.success(data.msg);
                    getList();
                });
        };

        //修改血糖信息
        const updateOne = ({ record }) =>{
            showUpdateModal.value = true;
            curEditBG.value = record;
            
        };

        //更新一条数据
        const updateCurBloodG = (newData) =>{
            Object.assign(curEditBG.value , newData);
        };
        //跳转详情页面
        const toDetail = ({record}) =>{
            router.push(`/blood-glucose/${record._id}`);
        }

        return{
            //弹窗点击事件flag
            show, //添加
            showUpdateModal, //修改
            //血糖信息列表
            list,
            columns,//列表配置
            TimeTagList,//
            curPage,//当前页数
            formatTimestamp,    
            total,//总条数
            getList,

            setPage,//修改页数
            //日期范围选择器数据变更
            onChange,
            //数据修改
            deleteOne, //删除
            updateOne, //修改
            curEditBG, //要修改的那条
            updateCurBloodG,
            toDetail, //跳转详情页面
            isAdmin,
            simple : props.simple, //控制在总览显示
        }
    },
});