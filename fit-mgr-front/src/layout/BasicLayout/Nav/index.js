/*
 * @Description: 导航栏逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 20:11:43
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 22:36:34
 */
import {defineComponent , ref , onMounted} from 'vue';
import { useRouter ,useRoute } from 'vue-router';
import menu from '@/config/menu';


export default defineComponent({
    setup(){
        //路由
        const route = useRoute() //路由信息
        const router = useRouter(); //路由操作
        //菜单
        const selectedKeys = ref([]); //当前选中的菜单项 key 数组
        const openKeys = ref([]); //当前展开的 SubMenu 菜单项 key 数组

        
        //菜单跳转
        const to = (url)=>{
            router.push(url);
        };

        //挂载完成
        onMounted(()=>{
            //刷新后保持高亮
            selectedKeys.value = [route.path];

            menu.forEach((item)=>{
                (item.children || []).forEach((child)=>{
                    if(child.url === route.path){ //说明被选中
                        openKeys.value.push(item.title); //保持改二级菜单展开
                    }
                });
            });
        });

        return{
            //导航栏
            openKeys, //一级选中
            selectedKeys, //二级选中
            menu, //菜单配置
            to, //菜单跳转
        }
    },
});