const gatewayData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveGateway (state, data) {
      // console.log(data)
      state.data = data
    }
  },
  actions: {
    saveGatewayFuc (context, data) {
      context.commit('saveGateway', data)
    }
  }
}

export default gatewayData
