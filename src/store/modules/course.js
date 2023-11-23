const state = {
  cid: 1,
  cname: '',
  tid: '',
  content: 'ssss',
  homeworkid: "",
  homeworkname: "",
  exchangeid: "",
}
const mutations = {
  SET_ID: (state, cid) => {
    state.cid = cid
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
  SET_HID: (state, content) => {
    state.homeworkid = content
  },
  SET_EID: (state, content) => {
    state.exchangeid = content
  },
  SET_HNAME: (state, content) => {
    state.homeworkname = content
  },
}
const actions = {
  async setchangeid ({ commit, dispatch }, id) {
    console.log(id)
    commit('SET_ID', id)
    console.log(state.id)
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
  async setchangehomeworkid ({ commit, dispatch }, id) {
    commit('SET_HID', id)
  },
  async setchangeexchangeid ({ commit, dispatch }, id) {
    commit('SET_EID', id)
  },
  async setchangehomeworkname ({ commit, dispatch }, id) {
    commit('SET_HNAME', id)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}