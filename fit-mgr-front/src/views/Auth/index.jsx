/*
 * @Description: 认证页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-23 15:41:27
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-15 22:43:15
 */
import { defineComponent , reactive } from 'vue';
import { message , Modal , Input} from 'ant-design-vue'; //提示toast 弹窗
import { UserOutlined , KeyOutlined,SmileOutlined } from '@ant-design/icons-vue' //icon 作为组件导入
import { auth , resetPassword} from '@/service'
import { result } from '@/helpers/utils'
import { setToken,getToken } from '@/helpers/token'
import { getCharacterInfoById } from '@/helpers/character'
import store from '@/store'; //vuex
import { useRouter } from 'vue-router'; 

export default defineComponent({
    //注册组件
    components: {
        // icon
        UserOutlined,
        KeyOutlined,
        SmileOutlined,
    },
    

    //只在初始化的时候运行
    setup(){
        const router = useRouter(); //获取路由操作
        /* 
        注册
        */
        //注册表单  reactive响应式数据的集合
        const regForm = reactive({
            account : '',
            password : '',
            inviteCode : '',
        });
        //注册时的逻辑
        const register = async () =>{
            //表单校验
            if(regForm.account === ''){
                message.info('请输入账户');
                return;
            }
            if(regForm.password === ''){
                message.info('请输入密码');
                return;
            }
            if(regForm.inviteCode === ''){
                message.info('请输入邀请码');
                return;
            }
            
            //注册情况提醒
            const res = await auth.register(
                regForm.account , 
                regForm.password , 
                regForm.inviteCode
            ); //返回的是一个Promise
            result(res)
                .success((data) =>{
                    message.success(data.msg);
                });
        }

        /* 
        登录
        */
        //登录表单
        const loginForm = reactive({
            account : '',
            password : '',
        });
        //登录逻辑
        const login = async ()=>{
            //表单校验
            if(loginForm.account === ''){
                message.info('请输入账户');
                return;
            }
            if(loginForm.password === ''){
                message.info('请输入密码');
                return;
            }
            // 登录情况提醒
            const res = await auth.login(loginForm.account,loginForm.password);
            result(res)
                .success(( { msg ,data :{ user,token }} ) =>{
                    message.success(msg);
                    //将登录用户信息存入全局
                    store.commit('setUserInfo',user);
                    console.log(user);
                    store.commit('setUserCharacter',getCharacterInfoById(user.character));
                    
                    //token 存入localStorage
                    setToken(token);
                    //登录成功后跳转到首页
                    router.replace('/bp'); //进入下一页后不能通过回退按钮回到上页
                });

        }
        //忘记密码
        const resetPw = ()=>{
            Modal.confirm({
                title : `输入账号向管理员，申请重置密码`,
                //虚拟dom树上的虚拟节点
                content : ( //vue中插件把jsx中的这段代码编译成 createVNode的格式
                    <div>
                        <Input class="__reset_pw_account" />
                    </div>
                ), 
                //点击确认
                onOk : async()=>{
                    const el = document.querySelector('.__reset_pw_account');
                    let account = el.value;
                    const res = await resetPassword.add(account);

                    result(res)
                        .success(({ msg})=>{
                            message.success(msg);
                        });
                },
            });
        }

        /* 
        返回数据 函数
        */
        return{
            //注册相关数据
            regForm,
            register,
            //登入相关数据
            loginForm,
            login,
            resetPw, //忘记密码
        };
    },
});


