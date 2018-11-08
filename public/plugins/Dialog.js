Dialog.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {}
    })

    // 3. 注入组件
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    })

    // 4. 添加实例方法
    Vue.prototype.$dialog = function (methodOptions) {
        this.$Modal.confirm({
            render: (h) => {
                return h('Input', {
                    props: {
                        value: '',
                        autofocus: true,
                        placeholder: 'Please enter your name...'
                    }
                })
            }
        })
    }
}