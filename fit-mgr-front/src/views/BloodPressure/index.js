/*
 * @Description: 血压信息逻辑
 * @Author: hairyOwl
 * @Date: 2022-02-27 21:26:00
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-27 23:04:05
 */
import {defineComponent} from 'vue';

export default defineComponent({
    setup(){
        //列表配置项
        const columns = [
            {
                title : '名字',
                dataIndex : 'name',
            },
            {
                title : '年龄',
                dataIndex : 'age',
            },
        ];
        const dataSource = [
            {
                name : '小红',
                age : 2,
            },
            
        ];

        return{
            columns,
            dataSource,
        }
    },
});