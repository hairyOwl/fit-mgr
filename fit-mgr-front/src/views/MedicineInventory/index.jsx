/*
 * @Description: 药品信息逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:26:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-21 16:49:28
 */
import {
    defineComponent , 
    ref, //响应式变量 
    onMounted, //生命周期的钩子
} from 'vue'; 
import { useRouter } from 'vue-router'; //操作路由的方法 前进一页后退一页跳转某一页
import AddOne from './AddOne/index.vue'; //添加信息弹窗
import Update from './Update/index.vue'; //修改信息弹窗
import { medicine , medicineClassify} from '@/service'
import { message , Modal ,Input} from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { result , formatTimestamp } from '@/helpers/utils';
import { isAdmin } from '@/helpers/character';
import { getClassifyTitleById } from '@/helpers/medicine-classify';
import store from '@/store'; //vuex

//列表配置项
const columns = [
    {
        title : '药品/试剂',
        dataIndex : 'name',
    },
    {
        title : '种类',
        slots :{
            customRender:'MedicineTag',
        }
    },
    {
        title : '购买日期',
        slots :{
            customRender:'purchaseDate',
        }
    },
    {
        title : '保质期',
        dataIndex : 'shelfLife',
    },
    {
        title : '数量',
        slots : {
            customRender : 'count',
        },
    },
    {
        title : '备注',
        dataIndex : 'note',
        ellipsis: true,//单元格内容根据宽度自动省略。
    },
    {
        title : '操作',
        slots :{
            customRender:'actions',
        }
    },
];
//当用户是管理员的适合添加用户列
if(isAdmin()){
    columns.splice(0,0,
    {
        title : '用户',
        onlyAdmin : true,
        slots :{
            customRender:'user',
        }
    },);
};

export default defineComponent({
    //组件注册
    components : {
        AddOne, //添加弹窗
        Update, //修改弹窗
        SearchOutlined, //搜索图标
    },
    
    setup(){
        const router = useRouter();
        //数据列表
        const show = ref(false); //添加药品窗口点击事件 flag
        const showUpdateModal = ref(false); //修改药品窗口点击事件 flag
        const keyword = ref('');//搜索关键字
        const isSearch = ref(false); //搜索flag
        const list = ref([]); //默认是空数组
        const curPage = ref(1);
        const total = ref(0);
        const curEditMedicine = ref({});
        const {account} = store.state.userInfo; //当前登录用户的账户
        const userAdmin = isAdmin(); //当前登录用户是否是管理员
        
        //获取药品列表
        const getList = async () =>{
            const res = await medicine.list(
                userAdmin,
                account,
                curPage.value,
                10,
                keyword.value,
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

        //根据药品关键词查询
        const onSearch = async ()=>{
            isSearch.value = !!keyword.value; //根据关键词的有无作为是否在搜索的判断
            getUserList();
        };

        //查询结束返回
        const backAll = async ()=>{
            isSearch.value = false;
            keyword.value = '';
            getUserList();
        };

        //删除数据
        const deleteOne = async ({ record }) =>{
            const { _id } = record ;
            //service 的 接口
            const res = await medicine.deleteOne(_id);

            result(res)
                .success((data)=>{
                    message.success(data.msg);
                    getList();
                });
        };

        //计数变更数量弹窗
        const updateCount = (type ,record) =>{
            let word = '减少';
            if(type === 'ADD_COUNT'){
                word = '增加';
            }
            
            Modal.confirm({ //确认框
                title : `要${word}多少`,
                //虚拟dom树上的虚拟节点
                content : ( //vue中插件把jsx中的这段代码编译成 createVNode的格式
                    <div>
                        <Input class="__medicine_input_count"/>
                    </div>
                ), 
                //点击确认
                onOk : async()=>{
                    const el = document.querySelector('.__medicine_input_count');
                    let num = el.value;
                    const res = await medicine.updateCount({
                        id : record._id,
                        type,
                        num,
                    });
                    result(res)
                        .success((data)=>{
                            //找到了文档
                            if( type === 'ADD_COUNT' ){ //加
                                num = Math.abs(num); //绝对值
                            }else{ //出库
                                num = -Math.abs(num);
                            }
                            const one = list.value.find((item)=>{ //find返回数据，findIndex返回下标
                                return item._id === record._id;
                            });
                            
                            if(one){
                                one.count = one.count + num;
                                message.success(`成功${word} ${Math.abs(num)}`);
                            }

                            
                        })
                },
            });
        };

        //修改药品信息
        const updateOne = ({ record }) =>{
            showUpdateModal.value = true;
            curEditMedicine.value = record;
            
        };

        //更新一条数据
        const updateCurMedicine = (newData) =>{
            Object.assign(curEditMedicine.value , newData);
        };

        //跳转详情页面
        const toDetail = ({record}) =>{
            router.push(`/medicine-inventory/${record._id}`);
        }

        return{
            //弹窗点击事件flag
            show, //添加
            showUpdateModal, //修改
            //搜索事件
            keyword,
            isSearch,
            onSearch,
            backAll,

            //药品信息列表
            list,
            columns,//列表配置
            curPage,//当前页数
            formatTimestamp,    
            total,//总条数
            getList,

            setPage,//修改页数
            //数据修改
            deleteOne, //删除
            updateCount, //修改计数
            updateOne, //修改
            curEditMedicine, //要修改的那条
            updateCurMedicine,
            toDetail, //跳转详情页面
            isAdmin,
            getClassifyTitleById,
        }
    },
});