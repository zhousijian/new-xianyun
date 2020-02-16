// 这文件名不是固定axios，只是文件时axios拦截器

import { Message } from 'element-ui'

// 网页启动时候执行该文件，data参数时插件里面本来就有的
export default (data)=>{
    // console.log('有没有经过这部？axios插件');
    // console.log(data);
    // 拦截请求的错误
    data.$axios.onError(err=>{
        // console.log(err.response);
        const { statusCode,message} = err.response.data
        // 判断状态是否为400，展示错误信息
        if(statusCode == 400){
            // 使用element-ui组件提示错误
            Message.error(message)
        }

        if(statusCode == 401 || statusCode == 403){
            // console.log(data);
            data.redirect(200,'/user/login',{
                returnUrl : data.route.fullPath
            })
            
        }
        
    })
}