const equipmentData = {
  state: {
    data: []
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveEquipmentway (state, data) {
      state.data = data
    }
  },
  actions: {
    saveEquipmentFuc (context, data) {
      context.commit('saveEquipmentway', data)
    }
  }
}

export default equipmentData
