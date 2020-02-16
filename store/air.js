// 保存搜索航班的历史
export const state = ()=>{
    return {
        searchHistoryList : []
    }
}

// 修改搜索航班历史的
export const mutations = {
    searchHistory(state,data){
        state.searchHistoryList.unshift(data)
        if(state.searchHistoryList.length > 5) {
            state.searchHistoryList.length = 5
        }
    }
}

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