<!--
 * @Description: 项目说明
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:22
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 14:24:33
-->
# fit-mgr
居家健康指标记录平台，用于记录血压，血糖。可视化指标变化
# Collection
| 集合名             | 说明           |
| ------------------ | -------------- |
| users              | 用户信息       |
| inviteCodes        | 邀请码信息     |
| bloodPressure      | 血压数据       |
| bloodGlucoses      | 血糖数据       |
| medicine           | 药品数据       |
| inventoryLog       | 药剂库存       |
| character          | 角色权限       |
| actionLog          | 操作日志       |
| actionlogresponses | 单条操作响应   |
| ForgetPassword     | 重置密码申请表 |
| MedicineClassify   | 药剂分类列表   |


# 进度
## 全局功能
- [x] 认证
    - [x] 认证前端
    - [x] 登录，用邀请码注册
    - [x] 权限 数据校验
- [x] 主体列表
    - [x] 基础布局
    - [x] 导航栏
        - [x] 根据角色动态导航
- [x] 权限
    - [x] 权限表
    - [x] 权限校验

## 导航与功能
- [x] 总览
- [x] 健康记录
    - [x] 血压模块
        - [ ] 数据可视化
    - [x] 血糖模块
        - [ ] 数据可视化
    - [x] 药剂模块
        - [x] 数据详情
            - [X] 基本信息 编辑 删除
            - [x] 库存日志 列表 条件查询
- [x] 用户管理
    - [x] 增删 重置密码
    - [x] 角色
- [x] 操作日志
    - [x] 中间件记录路由
    - [x] 日志软删除
- [x] 杂项
    - [x] 重置密码申请
    - [x] 邀请码管理
    - [x] 药剂分类管理
- [x] 个人设置



# 更新日志
2022年3月25日
- Added : 
    1. 总览页面
- Changed : 无
- Removed : 无
- Security : 无

2022年3月21日
- Added : 
    1. 药剂分类管理
    2. 血压,血糖 时间段选择项
    3. 个人设置修改密码
- Changed : 无
- Removed : 无
- Security : 无

2022年3月19日
- Added : 
    1. 血糖模块
    2. 药剂模块
- Changed : 无
- Removed : 无
- Security : 无

2022年3月17日
- Added : 
    1. 重置密码申请
    2. 邀请码管理
- Changed : 无
- Removed : 无
- Security : 无

2022年3月14日
- Added : 
    1. 操作日志
    2. 导航根据权限动态显示
- Changed : 无
- Removed : 无
- Security : 导航根据权限动态显示

2022年3月12日
- Added : 
    1. 权限功能 导航栏简易实现
- Changed : 无
- Removed : 无
- Security : 无

2022年3月7日
- Added : 
    1. 用户列表和增删改查
- Changed : 无
- Removed : 无
- Security : 无

2022年3月6日
- Added : 
    1. 血压详情页面 详情日志的实现
- Changed : 无
- Removed : 无
- Security : 无

2022年3月3日 
- Added : 
    1. 血压列表 完成列表、添加、计数
- Changed : 无
- Removed : 无
- Security : 无

2022年2月27日 
- Added : 
    1. 认证逻辑V1.1 完成注册(包含邀请码)，登录 。 无token记录到客服端，无忘记密码。
    2. 完成基础布局
- Changed : 无
- Removed : 无
- Security : 增加了表单校验

