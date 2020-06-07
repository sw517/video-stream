import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videoList: [],
  },
  mutations: {
    SET_VIDEO_LIST(state, payload) {
      Object.assign(state, { videoList: payload });
    },
  },
  actions: {
    setVideoList({ commit }, payload) {
      commit('SET_VIDEO_LIST', payload);
    },
  },
  getters: {
    videoList(state) {
      return state.videoList;
    },
  },
  modules: {},
});
