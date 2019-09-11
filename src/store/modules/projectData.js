const projectData = {
  state: {
    data: [],
    item: ''
  },
  // getters: {
  //   data (state) {
  //     return state.data
  //   }
  // },
  mutations: {
    saveProject (state, data) {
      state.data = data
    },
    saveProjectItem (state, item) {
      state.item = item
    }
  },
  actions: {
    saveProjectFuc (context, data) {
      context.commit('saveProject', data)
    },
    saveProjectItemFuc (context, item) {
      context.commit('saveProjectItem', item)
    }
  }
}

export default projectData
