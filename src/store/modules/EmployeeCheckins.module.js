import axios from "../../shared/axios";
const state = {
  checkinsList: undefined
};

const getters = {};

const actions = {
  async fetchemployeeCheckins({ commit },employeeId) {
    const url = `/employee/${employeeId}/checkin`;
    try {
      const { data } = await axios.get(url);
      commit("fetchemployeeCheckins", data);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  fetchemployeeCheckins: (state, data) => {
    state.checkinsList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
