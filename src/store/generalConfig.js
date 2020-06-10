const state = {
  config: {
    windowWidth: 0,
    windowHeight: 0,
    breakpoints: {
      xs: {
        min: 0,
        max: 599,
      },
      sm: {
        min: 600,
        max: 979,
      },
      md: {
        min: 980,
        max: 1199,
      },
      lg: {
        min: 1200,
        max: 1599,
      },
      xl: {
        min: 1600,
        max: 9999,
      },
    },
  },
};

const mutations = {
  SET_WINDOW_WIDTH(state, width) {
    const windowWidth = { windowWidth: width };
    Object.assign(state.config, windowWidth);
  },
};

const actions = {
  setWindowWidth({ commit }, width) {
    commit('SET_WINDOW_WIDTH', width);
  },
};

const getters = {
  currentBreakpoint(state) {
    return Object.keys(state.config.breakpoints).find(curr => {
      const { windowWidth, breakpoints } = state.config;
      return windowWidth >= breakpoints[curr].min && windowWidth <= breakpoints[curr].max;
    });
  },
  currentWindowWidth(state) {
    return state.config.windowWidth;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
