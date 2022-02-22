import axios from "../../shared/axios";
const state = {
  employeeList: undefined
};

const getters = {};

const actions = {
  async fetchemployeeList({ commit },{page,searchText,sortBy,orderBy}) {
    let url = `/employee?search=${searchText}&page=${page}&limit=10`;
    if(sortBy!=''){
        url = `/employee?search=${searchText}&sortBy=${sortBy}&order=${orderBy}&page=${page}&limit=10`;
    }
    try {
      const { data } = await axios.get(url);
      commit("fetchemployeeList", data);
    } catch (error) {
      console.error(error);
    }
  }
};

const mutations = {
  fetchemployeeList: (state, data) => {
    state.employeeList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
