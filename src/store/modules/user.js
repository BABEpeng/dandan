
export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    token: JSON.parse(sessionStorage.getItem('token'))
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      console.log(name)
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login (context, data) {
      context.commit('SET_TOKEN', data)
    }
  }
}
