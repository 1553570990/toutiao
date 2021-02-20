import router from "./router"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


router.beforeEach(function(to,from,next){
    nprogress.start() //开启进度条
    if(to.path.startsWith('/home')){
        const token = window.localStorage.getItem('user-token');
        if(token){
            next()
        }else{
            next('/login');
        }
    }else{
        next();
    }
})

router.afterEach(function(){
    nprogress.done();
})
export default router