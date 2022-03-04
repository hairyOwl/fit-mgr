/*
 * @Description: 血压信息逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:26:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-04 11:12:45
 */
import {
    defineComponent , 
    ref, //响应式变量 
    onMounted, //生命周期的钩子
} from 'vue'; 
import AddOne from './AddOne/index.vue'; //添加信息弹窗
import { bloodPressure } from '@/service'
import { message , Modal ,Input} from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { result , formatTimestamp } from '@/helpers/utils';

export default defineComponent({
    //组件注册
    components : {
        AddOne,
        SearchOutlined,
    },
    
    setup(){
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
                title : '计数',
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
        
        //数据列表
        const show = ref(false); //添加血压窗口点击事件 flag
        const list = ref([]); //默认是空数组
        const curPage = ref(1);
        const total = ref(0);
        const starDay = ref('');
        const endDay = ref('');
        

        //获取血压列表
        const getList = async () =>{
            const res = await bloodPressure.list({
                page : curPage.value,
                starDay : starDay.value,
                endDay : endDay.value,
            });

            result(res)
                .success(({ data })=>{
                    const {list :l , total:listTotal} = data;
                    list.value = l
                    total.value = listTotal
                });
        }


        //当组件被挂载的时候会调用
        //当组件初始化完成放在页面上会做的事情
        onMounted(async () =>{
            getList();
        });

        //分页发生改变
        const setPage = (page)=>{
            curPage.value = page;
            //重新取数据
            getList();
        };

        //日期范围变更
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
            console.log(res);

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
                        <Input class="__bloodP_input_count"/>
                    </div>
                ), 
                //点击确认
                onOk : async()=>{
                    const el = document.querySelector('.__bloodP_input_count');
                    let num = el.value;
                    const res = await bloodPressure.updateCount({
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

        return{
            //列表配置
            columns,
            //弹窗点击事件flag
            show,
            //血压信息列表
            list,
            //当前页数
            curPage,
            formatTimestamp,
            //总条数
            total,
            //修改页数
            setPage,
            //日期范围选择器数据变更
            onChange,
            //删除一条数据
            deleteOne,
            updateCount,
        }
    },
});