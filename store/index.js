export const state = () => ({
  lists: [], // Lists data will be saved into this state
  errors: []
})

export const mutations = {
  // This mutation will be used for change he value of state lists
  SET_LISTS_DATA (state, payload) {
    state.lists = payload
  },
  SET_ERRORS (state, payload) {
    state.errors = payload
  }
}

export const actions = {
  // Function to get lists data from API
  getListsData ({ commit }) {
    return new Promise((resolve, reject) => {
      // Request using method GET to /list
      this.$axios.get('/list').then((response) => {
        // And save it into state lists using mutations
        commit('SET_LISTS_DATA', response.data)
        resolve()
      })
    })
  }
}
