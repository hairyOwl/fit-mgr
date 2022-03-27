/*
 * @Description: 用户管理逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-06 22:35:45
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 20:26:22
 */
import { defineComponent ,onMounted,ref, reactive } from 'vue';
import { user } from '@/service';
import { result , formatTimestampPlus } from '@/helpers/utils';
import { message } from 'ant-design-vue'; //antd提示
import { EditOutlined } from '@ant-design/icons-vue';
import AddOne from './AddOne/index.vue'; //添加弹窗
import { getCharacterInfoById } from '@/helpers/character';
import { getHeaders } from '@/helpers/request';
import store from '@/store';


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
        title: '角色',
        slots : {
            customRender : 'character'
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
    components : {
        AddOne, //添加弹窗
        EditOutlined, //编辑icon
    },
    setup(){
        //响应式数据
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModel = ref(false);
        const keyword = ref('');//搜索关键字
        const isSearch = ref(false); //搜索flag
        const showEditCharacterModal = ref(false); //编辑角色弹窗flag
        const editFrom = reactive({
            current:{},
            character : '',
        });
        
        //获取用户列表
        const getUserList = async () =>{
            const res = await user.list(curPage.value , 10 , keyword.value);

            result(res)
                .success(( {data : {list:userList , total:userTotal}} )=>{
                    list.value = userList;
                    total.value = userTotal;
                });
        };

        onMounted(()=>{
            getUserList();
        });

        //删除用户
        const remove = async ( { _id } )=>{
            const res = await user.deleteUser(_id);

            result(res)
                .success(( {msg} )=>{
                    message.success(msg);
                    getUserList();
                });
        };

        //分页页面切换
        const setPage = (page)=>{
            curPage.value = page;

            getUserList();
        };

        //重置密码为初始
        const resetPassword = async ( {_id} )=>{
            const res = await user.resetPW(_id);

            result(res)
                .success(( {msg} )=>{
                    message.success(msg);
                })
        };

        //根据账户查询
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

        //点击编辑角色按钮事件
        const onEdit = (record)=>{
            editFrom.current = record;
            editFrom.character = record.character;
            showEditCharacterModal.value = true;
        };
        
        //编辑用户角色
        const editCharacter = async ( ) =>{
            const res = await user.updateCharacter(editFrom.current._id , editFrom.character);
            result(res)
                .success(({msg} )=>{
                    message.success(msg);
                    showEditCharacterModal.value = false;
                    editFrom.current.character = editFrom.character;
                });
        }

        //上传状态发生变化  e : file.response.target就是响应返回内容
        const onUploadChange = ({ file })=>{
            //上传完成后
            if(file.response){
                result(file.response)
                    .success(async ( key)=>{
                        const res = await user.addUserMany(key);
                        
                        result(res)
                            .success(({ data : {addCount} })=>{
                                message.success(`成功添加 ${addCount} 个用户`);

                                getUserList();
                            });
                    });
            }
        };

        return{
            //表头
            columns,
            //分页列表
            list,
            total,
            curPage,
            formatTimestampPlus,
            //列表操作
            remove, //删除用户
            showAddModel, //添加弹窗flag
            getUserList,
            setPage,//分页页面切换
            resetPassword, //重置密码为初始
            //根据账户查询
            keyword,
            isSearch,
            onSearch,
            backAll,
            //角色
            getCharacterInfoById, //通过id获取角色对象
            showEditCharacterModal,
            editFrom,
            onEdit,
            characterInfo : store.state.characterInfo,
            editCharacter,
            //上传
            onUploadChange,
            headers : getHeaders(),
        };
    },
});