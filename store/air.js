
export const state = () => {
    return {
        // 保存搜索航班的历史
        searchHistoryList: [],
        // 保存订单的详情信息
        orderDetailInfo : {
            seat_infos : {},
            insurances : []
        },
        // 保存订单的总金额
        price : ''
    }
}


export const mutations = {
    // 修改搜索航班历史的
    searchHistory(state, data) {
        state.searchHistoryList.unshift(data)
        if (state.searchHistoryList.length > 5) {
            state.searchHistoryList.length = 5
        }
    },
    // 修改订单的详情信息
    orderDetail(state,data){
        state.orderDetailInfo = data
    },
    // 修改订单的总金额
    totalPrice(state,data){
        state.price = data
    }
}

export const actions = {
    // 输入搜索城市名字请求
    searchCity(store, params) {
        return this.$axios({
            url: '/airs/city',
            params
        }).then(res => {
            res.data.data = res.data.data.map(value => {
                value.value = value.name.replace('市', '')
                return value
            })
            return res.data.data
        })
    }
}