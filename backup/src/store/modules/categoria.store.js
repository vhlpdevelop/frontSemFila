const url = "https://api-semfila.api-semfila.online/categoria/";

import axios from "axios";

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
  async updateCategoria({commit},itemData){
    if(itemData !== ""){
      try{
        let aux ={
          itemData:itemData
        }
        await axios
      .post(url + "updateCategoria", aux)
      .then(function(response) {
        commit("setResponse", response.data.success)
        commit("setResponseMsg", response.data.msg)
        
      });
      }catch(e){
        console.log(e)
      }
    }
  },
  async deleteCategoria({commit},itemData){
    if(itemData !== ""){
      try{
        let aux ={
          _id:itemData
        }
        await axios
      .post(url + "deleteCategoria", aux)
      .then(function(response) {
          //console.log(response)
        commit("setResponse", response.data.success)
        commit("setResponseMsg", response.data.msg)
        
      });
      }catch(e){
        console.log(e)
      }
    }
  },
  async newCategoria({commit}, itemData){
    console.log(itemData)
    let datatoSend = {
        category_name: itemData
    }
  try{
    await axios
      .post(url + "newCategoria", datatoSend) //Função simples para o cardapio.
      .then(function(response) {
        commit("setCategoria", response.data.obj)
        commit("setResponse", response.data.success)
        commit("setResponseMsg", response.data.msg)
        
      });
  }catch(e){
    console.log(e)
  }
}
};

const mutations = {
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setCategoria: (state, newcategoria) => (state.newcategoria = newcategoria),
  updateNewCategoria: (state, categoria) => {
    let index = state.newcategoria.map(e=>e._id).indexOf(categoria._id);
    state.newcategoria[index] = categoria
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
