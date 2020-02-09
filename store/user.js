// 固定的属性，必须要export暴露出去
export const state = ()=>{
    return {
        // 用户信息，来自于登录之后返回保存的数据
        userInfo : {
            // user : {}
        }
    }
}

// 固定的属性，同步修改state中的值
export const mutations = {
    // 函数名自定义
    // 第一个参数必须是state，第二个参数调用时候传入的参数
    setUserInfo(state,data){
        state.userInfo = data
    }
} 

// 固定的属性，异步修改state中的值的方法，一般存放接口的请求
export const actions = {
    // 函数名自定义
    //第一个参数必须是store，第二个参数调用时候传入的参数
    // 登录请求
    login(store,data){
        return this.$axios({
            method : 'post',
            url : '/accounts/login',
            data
        }).then(res=>{
            // console.log(res);
            store.commit('setUserInfo',res.data)
        })
    },
    // 发送验证码请求
    captchas(store,data){
        return this.$axios({
            method : 'post',
            url : '/captchas',
            data
        }).then(res=>{
            return res
        })
    }
}