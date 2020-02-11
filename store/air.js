export const actions = {
    // 输入搜索城市名字请求
    searchCity(store, params) {
        return this.$axios({
            url: '/airs/city',
            params
        }).then(res => {
            res.data.data = res.data.data.map(value=>{
                value.value = value.name.replace('市','')
                return value
            })
            return res.data.data
        })
    }
}