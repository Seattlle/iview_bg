import DialogForm from '../components/form/MyDialogForm'


export default {
    install: function (Vue, options) {
        // 添加实例方法
        Vue.prototype.$dialog = function (_options) {
            const _dialog = Vue.extend(DialogForm)
            const instance = new _dialog()   //创建子实例
            instance.$mount(document.createElement('div'))

            document.body.appendChild(instance.$el);

            instance.show=true;
            instance.options=_options;
        }
    }
}