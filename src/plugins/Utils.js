export default {
    install: function (Vue, options) {
        /*
        * 格式化时间函数
        * */
        Vue.formatTime =function (time, format) {
            let digit = function (num, length) {
                let str = '';
                num = String(num);
                length = length || 2;
                for (let i = num.length; i < length; i++) {
                    str += '0';
                }
                return num < Math.pow(10, length) ? str + (num | 0) : num;
            }
            let date = new Date(parseInt(time) || new Date())
                , ymd = [
                digit(date.getFullYear(), 4)
                , digit(date.getMonth() + 1)
                , digit(date.getDate())
            ]
                , hms = [
                digit(date.getHours())
                , digit(date.getMinutes())
                , digit(date.getSeconds())
            ];

            format = format || 'yyyy-MM-dd HH:mm:ss';

            return format.replace(/yyyy/g, ymd[0])
                .replace(/MM/g, ymd[1])
                .replace(/dd/g, ymd[2])
                .replace(/HH/g, hms[0])
                .replace(/mm/g, hms[1])
                .replace(/ss/g, hms[2]);
        }

        /*
        * 将data整理成json格式
        * data需包含
        *   value--值
        *   field--名称
        * */
        Vue.transDataToJson=function (data) {
            let condition={};
            for(let i in data){
                let _value=data[i]['value'];

                if(data[i]['type']==='date'){
                    _value=this.formatTime(_value,data[i]['format']);
                }else if(data[i]['type']==='select'){
                    if(_value==="empty"){
                        _value="";
                    }
                }
                condition[data[i]['field']]=_value;
            }
            return condition;
        }
    }
}