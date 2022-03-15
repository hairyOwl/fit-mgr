/*
 * @Description: 导航相关配置
 * @Author: hairyOwl
 * @Date: 2022-03-12 14:32:58
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-14 22:45:32
 */
// 导航栏列表
export default[
    {
        // 一级导航
        title: '健康记录',
        url: '/bp',
        onlyAdmin : false,
        // 二级导航
        // children:[
            
        // ],
    },
    {
        title: '用户管理',
        url : '/user',
        onlyAdmin : true,
    },
    {
        title: '操作日志',
        url : '/ActionLog',
        onlyAdmin : true,
    },
];