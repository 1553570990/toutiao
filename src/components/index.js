// 处理子组件挂载
import layoutHeader from './home/layout-header.vue'
import layoutAside from './home/layout-aside.vue'
import breadCrumb from './common/bread-crumb.vue'



export default{
    install:function(Vue){
        Vue.component('layout-header',layoutHeader);
        Vue.component('layout-aside',layoutAside);
        Vue.component('bread-crumb',breadCrumb);
      
    }
}