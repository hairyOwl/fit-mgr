/*
 * @Description: 公共字段 schema
 * @Author: hairyOwl
 * @Date: 2022-02-24 21:58:41
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 21:00:13
 */
//元数据
const getMeta = () =>{
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
//解决时间记录的是服务启动的时间
//保存前
const preSave = function(next){
    if(this.isNew){ //创建
        const ts = Date.now(); //时间戳
        this['meta'].createdAt = ts;
        this['meta'].updateAt = ts;
    }else{ //修改
        const ts = Date.now(); //时间戳
        this['meta'].updateAt = ts;
    }
    next(); //通知mongoose继续后面
}

//导出方法
module.exports = {
    getMeta,
    preSave,
};

