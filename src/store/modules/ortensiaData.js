const ortensiaData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveOrtensia (state, data) {
      state.data = data
    }
  },
  actions: {
    saveOrtensiaFuc (context, data) {
      context.commit('saveGateway', data)
    }
  }
}

export default ortensiaData
