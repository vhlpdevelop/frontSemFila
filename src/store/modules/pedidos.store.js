const url = "https://api-semfila.api-semfila.online/pedidos/";

import axios from "axios";

const state = {
    pedidos: [],
    pedidoResponse: false,
};
const getters = {
  getPedidos: (state) => state.pedidos,
  getResponsePedido: (state) => state.pedidoResponse,
  
};

const actions = {
    async fetchPedidos({commit}){
      try{
        await axios
          .get(url + "fetchPedidos")
          .then(function(response) {
              //console.log(response)
            commit("setPedido", response.data.obj)
            commit("setPedidoResponse", response.data.ok)
          });
      }catch(e){
        console.log(e)
      }
    },
  async updatePedido({commit}, itemData){
    if(itemData !== null){
      try {
        await axios
          .post(url + "updatePedido", itemData)
          .then(function(response) {
              //console.log(response)
            commit("updatePedido", itemData)
            commit("setPedidoResponse", response.data.ok)
          });
      } catch (err) {
        commit("setPedido", '');
        commit("setPedidoResponse", false)
        console.log("erro:", err);
      }
    }
  },
  async addPedido({commit}, itemData){
  },
  async DeletePedido({commit}, itemData){
    if(itemData !== null){
      let aux ={
        id: itemData
      }
      console.log(itemData)
      try {
        await axios
          .post(url + "deletePedido", aux)
          .then(function(response) {
              //console.log(response)
            commit("deletePedido", itemData)
            commit("setPedidoResponse", response.data.ok)
          });
      } catch (err) {
        commit("setPedido", '');
        commit("setPedidoResponse", false)
        console.log("erro:", err);
      }
    }
  },
};

const mutations = {
  setPedido: (state, pedido) => (state.pedidos = pedido),
  setPedidoResponse: (state, pedido) => (state.pedidoResponse = pedido),
  addPedido: (state, pedido) => {
    const index = state.pedido.findIndex(
        (itemCart) => itemCart._id === pedido._id
      );
    if(index > -1){
        let aux = pedido
        state.pedidos.splice(index, 1);
        state.pedidos.push(JSON.parse(JSON.stringify(pedidos)))
    }else{
      let aux = pedido
    state.pedidos.push(JSON.parse(JSON.stringify(pedidos)))
    }
  },
  updatePedido: (state, pedido) => {
    state.pedidos = pedido
  },
  deletePedido: (state, pedido) => {
    const index = state.pedidos.findIndex(
      (item) => item._id === pedido.id
    );
    if(index > -1){
      state.pedidos.splice(index, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
