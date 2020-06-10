const state = {
  videoList: [],
};

const mutations = {
  SET_VIDEO_LIST(state, payload) {
    Object.assign(state, { videoList: payload });
  },
};

const actions = {
  setVideoList({ commit }, payload) {
    commit('SET_VIDEO_LIST', payload);
  },
};

const getters = {
  videoList(state) {
    return state.videoList;
  },
  videoByTitle: state => title => {
    return state.videoList.filter(video => {
      return video.title === title;
    })[0];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
