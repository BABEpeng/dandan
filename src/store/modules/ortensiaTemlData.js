const ortensiaTemlData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveOrtensiaTeml (state, data) {
      state.data = data
    }
  },
  actions: {
    saveOrtensiaTemlFuc (context, data) {
      context.commit('saveGateway', data)
    }
  }
}

export default ortensiaTemlData
