/*
 * @Description: 健康数据仪表盘 页面模板
 * @Author: hairyOwl
 * @Date: 2022-03-29 18:10:18
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-08 23:54:24
 */
import { defineComponent , ref, onMounted } from 'vue';
import { dashboardHealth } from '@/service';
import { result } from '@/helpers/utils'
import bloodPChart from './bloodPChart/index.vue';
import bloodGChart from './bloodGChart/index.vue';

export default defineComponent({
    components:{
        bloodPChart,
        bloodGChart,
    },
    setup(){
        const loading = ref(true); 
        //可视化数据
        const bPList = ref([]);

        //基础信息列表
        const healthInfoList = ref({
            total:{
                bloodGTotal:0,
                bloodPTotal:0,
                medicineTotal:0,
            },
        });

        onMounted(()=>{
            getHealthInfo();
            getBloodInfo();
        });

        //获取血压、血糖、药剂数据条数
        const getHealthInfo = async () =>{
            loading.value = true;
            const res = await dashboardHealth.healthInfo();
            loading.value = false;

            result(res)
                .success(( {data} )=>{
                    healthInfoList.value = data;
                });
        }

        //血压血糖可视化数据获取
        const getBloodInfo = async () =>{
            loading.value = true;
            const res = await dashboardHealth.bloodInfo();
            loading.value = false;

            result(res)
                .success(( {data} )=>{
                    const { total } = data;
                    bPList.value = total.bloodPList;
                });
        }

        
        return{
            healthInfoList,
            loading,
            bPList ,
        };
    },
});