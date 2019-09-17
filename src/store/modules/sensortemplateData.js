const sensortemplateData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveSensorTemplate (state, data) {
      state.data = data
    }
  },
  actions: {
    sensorTemplateFuc (context, data) {
      context.commit('saveSensorTemplate', data)
    }
  }
}

export default sensortemplateData
