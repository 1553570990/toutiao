import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Main from './views/home/main.vue'
import NotFound from './views/404.vue'
Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'*', //所有找不到的页
            component:NotFound
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },{
            path:'/home',
            component:Home,
            children:[
                {
                    path:'',
                    component:Main
                },{
                    path:'comment',
                    // 返回Promise函数
                    // ()=>import('./views/comment')
                    component:()=>import('./views/comment')
                },{
                    path:'material',
                    component:()=>import('./views/material')
                },{
                    path:'account',
                    component:()=>import('./views/account')
                },{
                    path:'fansdata',
                    component:()=>import('./views/fans')
                }
            ]
        },{
            path:'/',
            redirect:'/home'
        }
    ]
})