const url = "https://api-semfila.api-semfila.online/item/";

import axios from "axios";

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
  async deleteItem({ commit }, itemData) {
    if (itemData !== null)
      try {
        let aux = {
          itemData: itemData,
        };
        await axios.post(url + "deleteItem", itemData).then(function(response) {
          //console.log(response.data.obj)

          commit("setItem", response.data.obj);
          commit("setResponse", response.data.success);
          commit("setResponseMsg", response.data.msg);
        });
      } catch (e) {
        console.log(e);
      }
  },
  async addnewItem({ commit }, itemData) {
    //console.log(itemData)
    if (itemData !== null)
      try {
        let aux = {
          itemData: itemData,
        };
        await axios.post(url + "newItem", itemData).then(function(response) {
          //console.log(response.data.obj)

          commit("setItem", response.data.obj);
          commit("setResponse", response.data.success);
          commit("setResponseMsg", response.data.msg);
        });
      } catch (e) {
        console.log(e);
      }
  },
  async updateItem({ commit }, itemData) {
    //console.log(itemData)
    if (itemData !== null)
      try {
        await axios.post(url + "updateItem", itemData).then(function(response) {
          //console.log(response.data.obj)

          commit("setItem", response.data.obj);
          commit("setResponse", response.data.success);
          commit("setResponseMsg", response.data.msg);
        });
      } catch (e) {
        console.log(e);
      }
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
