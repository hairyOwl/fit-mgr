/*
 * @Description: 血压信息逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:26:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-22 23:56:45
 */
import {
    defineComponent , 
    ref, //响应式变量 
    onMounted, //生命周期的钩子
} from 'vue'; 
import { useRouter } from 'vue-router'; //操作路由的方法 前进一页后退一页跳转某一页
import AddOne from './AddOne/index.vue'; //添加信息弹窗
import Update from './Update/index.vue'; //修改信息弹窗
import { bloodPressure } from '@/service'
import { message} from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { result , formatTimestamp ,bpNumberToTag , downloadExcel} from '@/helpers/utils';
import { isAdmin } from '@/helpers/character';
import { getHeaders } from '@/helpers/request';
import store from '@/store'; //vuex

//列表配置项
const columns = [
    {
        title : '日期',
        slots :{
            customRender:'recordDate',
        }
    },
    {
        title : '时间段',
        slots :{
            customRender:'timeTag',
        }
    },
    {
        title : '高压',
        dataIndex : 'sys',
    },
    {
        title : '低压',
        dataIndex : 'dia',
    },
    {
        title : '心跳',
        dataIndex : 'pul',
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
//时间段列表 0早上 1中午 2下午 3晚上 
const TimeTagList = [
    {
        timeTag : '0',
    },
    {
        timeTag : '1',
    },
    {
        timeTag : '2',
    },
    {
        timeTag : '3',
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
        simple : Boolean,
    },
    setup(props){
        const router = useRouter();
        //数据列表
        const show = ref(false); //添加血压窗口点击事件 flag
        const showUpdateModal = ref(false); //修改血压窗口点击事件 flag
        const list = ref([]); //默认是空数组
        const curPage = ref(1);
        const total = ref(0);
        const starDay = ref('');
        const endDay = ref('');
        const curEditBP = ref({});
        const {account} = store.state.userInfo;
        const userAdmin = isAdmin();

        //总览不显示操作列
        if(!props.simple){
            columns.splice(7,8,{
                title : '操作',
                slots :{
                    customRender:'actions',
                }
            },);
        }
        //获取血压列表
        const getList = async () =>{
            const res = await bloodPressure.list(
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
        };

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
            const res = await bloodPressure.deleteOne(_id);

            result(res)
                .success((data)=>{
                    message.success(data.msg);

                    // //mongo已无这条数据 然后删除在本地list对应的_id 避免多次网络请求
                    // //找到本地id要删除的
                    // const idx = list.value.findIndex((item) =>{
                    //     return item._id === _id;
                    // });
                    // list.value.splice(idx , 1); //删除

                    getList();
                });
        };

        //修改血压信息
        const updateOne = ({ record }) =>{
            showUpdateModal.value = true;
            curEditBP.value = record;
            
        };

        //更新一条数据
        const updateCurBloodP = (newData) =>{
            Object.assign(curEditBP.value , newData);
        };

        //excel 添加血压信息
        //上传状态发生变化  e : file.response.target就是响应返回内容
        const onUploadChange = ({ file })=>{
            //上传完成后
            if(file.response){
                result(file.response)
                    .success(async ( key)=>{
                        const res = await bloodPressure.addMany(key , account);
                        result(res)
                            .success(({ data : {addCount} })=>{
                                message.success(`成功添加 ${addCount} 个血糖信息`);

                                getList();
                            });
                    });
            }
        };

        //批量导出 下载路径简单的为浏览器默认下载路径 
        const toExportList = async () =>{
            await bloodPressure.exportList(userAdmin,account);
            
        }

        return{
            //弹窗点击事件flag
            show, //添加
            showUpdateModal, //修改
            //血压信息列表
            list,
            columns,//列表配置
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
            curEditBP, //要修改的那条
            updateCurBloodP,
            toExportList, //数据导出

            isAdmin,
            TimeTagList,
            simple : props.simple, //组件显示部分设置
            onUploadChange,
            headers : getHeaders(),
            bpNumberToTag,//时间段数字转文字

        }
    },
});