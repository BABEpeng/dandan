const gatewayData = {
  state: {
    data: [],
    gatewayId: ''
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveGateway (state, data) {
      state.data = data
    },
    addGatewayId (state, data) {
      state.gatewayId = data
    }
  },
  actions: {
    saveGatewayFuc (context, data) {
      context.commit('saveGateway', data)
    },
    addGatewayIdFuc (context, data) {
      context.commit('addGatewayId', data)
    }
  }
}

export default gatewayData
