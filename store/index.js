import _ from 'lodash'
export const state = () => ({
  lists: [], // Lists data will be saved into this state
  areas: [],
  sizes: [],
  errors: []
})

export const mutations = {
  // This mutation will be used for change he value of state lists
  SET_LISTS_DATA (state, payload) {
    state.lists = payload
  },
  SET_AREAS_DATA (state, payload) {
    state.areas = payload
  },
  SET_SIZES_DATA (state, payload) {
    state.sizes = payload
  },
  SET_ERRORS (state, payload) {
    state.errors = payload
  }
}

export const actions = {
  // Function to get lists data from API
  getListsData ({ commit, payload }) {
    return new Promise((resolve, reject) => {
      // Request using GET method to /list
      this.$axios.get('/list').then((response) => {
        // And save it into state lists using mutations
        commit('SET_LISTS_DATA', response.data)
        resolve()
      })
    })
  },
  getAreasData ({ commit }) {
    return new Promise((resolve, reject) => {
      // Request using GET method to /option_area
      this.$axios.get('/option_area').then((response) => {
        // And save it into state areas using mutations
        const areas = _.chain(response.data).groupBy('province').map(function (key, value) {
          return {
            province: value,
            city: _.map(key, 'city')
          }
        }).value()
        commit('SET_AREAS_DATA', areas)
        resolve()
      })
    })
  },
  // Function to get area data from API
  getSizesData ({ commit }) {
    return new Promise((resolve, reject) => {
      // Request using GET method to /option_size
      this.$axios.get('/option_size').then((response) => {
        // And save it into state sizes using mutations
        commit('SET_SIZES_DATA', response.data)
        resolve()
      })
    })
  },
  // Function to post new data to API
  storeListsData ({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      // Send request with POST method and data from payload
      this.$axios.post('/list', payload)
        .then(() => {
          // If success, then load new data
          dispatch('getListsData')
          resolve()
        })
        .catch((error) => {
          // If error, set state to data error validation
          commit('SET_ERRORS', error.response.data)
        })
    })
  }
}
