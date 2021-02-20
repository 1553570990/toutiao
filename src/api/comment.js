// 跟评论相关的方法
import axios from '../utils/axios.config'
import api from '../views/constant/api.js'
export function openOrClose_Comment (params,data){
    return axios({
        url:api.API_COMMENT_STATUS,
        method:'put',
        params,data
    })
}