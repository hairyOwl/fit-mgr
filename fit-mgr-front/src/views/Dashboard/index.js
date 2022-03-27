/*
 * @Description: 总览 页面逻辑
 * @Author: hairyOwl
 * @Date: 2022-03-22 22:44:02
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-27 16:03:28
 */
import { defineComponent , ref, onMounted } from 'vue';
import { dashboard } from '@/service';
import { result } from '@/helpers/utils'
import bloodP from '@/views/BloodPressure/index.vue'
import bloodG from '@/views/BloodGlucose/index.vue'
import medicine from '@/views/Medicine/index.vue'
import actionLog from '@/views/ActionLog/index.vue'

export default defineComponent({
    components :{
        bloodP,
        bloodG,
        medicine,
        actionLog,
    },
    setup(){
        const loading = ref(true); 
        //基础信息列表
        const baseInfoList = ref({
            total:{
                bloodGTotal:0,
                bloodPTotal:0,
                actionLogTotal:0,
                medicineTotal:0,
                userTotal:0,
            },
        });

        const getBaseInfo = async () =>{
            loading.value = true;
            const res = await dashboard.baseInfo();
            loading.value = false;

            result(res)
                .success(( {data} )=>{
                    baseInfoList.value = data;
                });
        }

        onMounted(()=>{
            getBaseInfo();
        });

        return{
            baseInfoList,
            loading,
        };
    },
});