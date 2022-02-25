/*
 * @Description: 公共字段 schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:58:41
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-24 22:01:13
 */
//元数据
const getMate = () =>{
    return{
        createdAt :{ //创建时间
            type : Number,
            default : (new Date()).getTime(),
        },
        updateAt :{ //修改时间
            type : Number,
            default : (new Date()).getTime(),
        },
    };
};

//导出方法
module.exports = {
    getMate,
};

