const projectData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveProject (state, data) {
      state.data = data
    }
  },
  actions: {
    saveProjectFuc (context, data) {
      context.commit('saveProject', data)
    }
  }
}

export default projectData
