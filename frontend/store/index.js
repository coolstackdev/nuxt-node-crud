import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = () => ({
  error: null,
})

const mutations = {
  setError(state, payload) {
    state.error = payload
  },
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
