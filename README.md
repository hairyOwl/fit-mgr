<!--
 * @Description: 项目说明
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:22
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-10 10:35:44
-->
# fit-mgr
居家健康指标记录平台，用于记录血压，血糖。可视化指标变化
# Collection
| 集合名        | 说明       |
| ------------- | ---------- |
| users         | 用户信息   |
| inviteCodes   | 邀请码信息 |
| BloodPressure | 血压数据   | 
| InventoryLog  | 库存操作   |
| character     | 角色权限   |


# 进度
- [x] 认证
    - [x] 认证前端
    - [x] 登录，用邀请码注册
    - [x] 数据校验
- [ ] 主体列表
    - [x] 基础布局
    - [ ] 导航栏
- [x] 血压界面
    - [x] 列表
    - [x] 添加 修改
    - [x] 计数
- [x] 数据详情
    - [X] 基本信息
        - [x] 编辑
        - [x] 删除
    - [x] 日志
        - [x] 列表
        - [x] 条件查询
- [x] 用户管理
    -[x] 列表
    -[x] 增删
    -[x] 重置密码
    -[x] 角色



# 更新日志
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

