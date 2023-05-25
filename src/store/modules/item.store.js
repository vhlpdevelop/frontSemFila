const state = {
  item: "",
  response: false,
  responseMsg: "",
};
const getters = {
  getItem: (state) => state.item,
  getResponseItem: (state) => state.response,
  getResponseMsgItem: (state) => state.responseMsg,
};

const actions = {
  async MovetoCompra({commit}, itemData){
    if(itemData.qtd ===undefined)
    itemData.qtd = 1
    commit("setItem", itemData)
  },
};

const mutations = {
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setItem: (state, item) => (state.item = item),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
