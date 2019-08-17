
const bannerStore = {
  state: {
    authorInfo: {
      avatar: ''
    },
    recommendList: [],
    recommendShow: false
  },
  mutations: {
    recommendSwitch (state) {
      state.recommendShow = !state.recommendShow
    }
  },
  actions: {
    bannerServer (state, data) {
      console.log(data)
      state.authorInfo = data
      state.recommendList = data
    }
  }
}

export default bannerStore
