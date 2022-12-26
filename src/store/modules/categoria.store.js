const url = "https://api-semfila.api-semfila.online/categoria/";

const state = {
    newcategoria: "",
    response: false,
    responseMsg: ""
};
const getters = {
  getCategoria: (state) => state.newcategoria,
  getResponseCategoria: (state)=> state.response,
  getResponseMsgCategoria: (state) => state.responseMsg
  
};

const actions = {
  async routeToCategoria({commit}, itemData){
    commit("setCategoria", itemData);
  },
};

const mutations = {
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setCategoria: (state, newcategoria) => (state.newcategoria = newcategoria),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
