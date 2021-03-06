/*
 * @Description: 导航相关配置
 * @Author: hairyOwl
 * @Date: 2022-03-12 14:32:58
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-04-10 18:57:47
 */
// 导航栏列表
export default[
    {
        title: '总览',
        url : '/dashboard',
        onlyAdmin : true,
        onlyMember : false,
    },
    {
        title: '健康数据总览',
        url : '/dashboard-health',
        onlyAdmin : false,
        onlyMember : true,
    },
    {
        // 一级导航
        title: '健康记录',
        onlyAdmin : false,
        onlyMember : false,
        children : [
            {
                title: '血压数据管理',
                url: '/blood-pressure',
                onlyAdmin : false,
                onlyMember : false,
            },
            {
                title: '血糖数据管理',
                url : '/blood-glucose',
                onlyAdmin : false,
                onlyMember : false,
            },
            {
                title: '药品与试剂存量管理',
                url : '/medicine',
                onlyAdmin : false,
                onlyMember : false,
            },
        ],
    },
    {
        title: '用户管理',
        url : '/user',
        onlyAdmin : true,
        onlyMember : false,
    },
    {
        title: '操作日志',
        url : '/action-log',
        onlyAdmin : true,
        onlyMember : false,
    },
    {
        title : '杂项',
        onlyAdmin : true,
        onlyMember : false,
        children : [
            {
                title: '重置密码列表',
                url : '/reset/password',
                onlyAdmin : true,
                onlyMember : false,
            },
            {
                title: '邀请码管理',
                url : '/invite-code',
                onlyAdmin : true,
                onlyMember : false,
            },
        ],
    },
    {
        title: '药剂分类管理',
        url : '/medicine-classify',
        onlyAdmin : false,
        onlyMember : true,
    },
    {
        title: '个人设置',
        url : '/profile',
        onlyAdmin : false,
        onlyMember : false,
    },
];