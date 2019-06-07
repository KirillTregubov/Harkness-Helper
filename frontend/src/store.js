import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classKey: '',
    harknessKey: ''
  },
  getters: {
    getClassKey: state => {
      return state.classKey
    },
    getHarknessKey: state => {
      return state.harknessKey
    }
  },
  mutations: {
    setClassKey: (state, payload) => {
      state.classKey = payload
    },
    setHarknessKey: (state, payload) => {
      state.harknessKey = payload
    }
  },
  actions: {
    setClassKey: ( { commit }, payload) => {
      commit('setClassKey', payload)
    },
    setHarknessKey: ( { commit }, payload) => {
      commit('setHarknessKey', payload)
    }
  },
  plugins: [createPersistedState()]
})
