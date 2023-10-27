const state = {
  id: 1,
  name: '',
  teacher: '',
  introduction: 'ssss'
}
const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.cname = name
  },
  SET_TEACHER: (state, teacher) => {
    state.teacher = teacher
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.cintroduction = introduction
  },
}
const actions = {
  async setchangeid ({ commit, dispatch }, id) {
    commit('SET_ID', id)
  },
  async setchangecname ({ commit, dispatch }, id) {
    commit('SET_NAME', id)
  },
  async setchangeteacher ({ commit, dispatch }, id) {
    commit('SET_TEACHER', id)
  },
  async setchangeintro ({ commit, dispatch }, id) {
    commit('SET_INTRODUCTION', id)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}