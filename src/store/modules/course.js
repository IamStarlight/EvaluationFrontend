const state = {
  cid: 1,
  cname: '',
  tid: '',
  content: 'ssss'
}
const mutations = {
  SET_ID: (state, cid) => {
    state.id = cid
  },
  SET_NAME: (state, cname) => {
    state.cname = cname
  },
  SET_TEACHER: (state, tid) => {
    state.teacher = tid
  },
  SET_INTRODUCTION: (state, content) => {
    state.cintroduction = content
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