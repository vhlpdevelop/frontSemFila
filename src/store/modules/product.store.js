/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

const url = 'https://lobby-contador.herokuapp.com/auth/'
//const url = "http://localhost:3000/product/";
//console.log(products)
const state = {
  products: "",
  respostaProduct: false,
};

const getters = {
  getRespostaProduct: (state) => state.respostaProduct,
  getProduct: (state) => state.products,
};

const actions = {
  async fetchProdutos({ commit }) {
   
      try {
        await axios
          .get(url + "fetchProduct")
          .then(function(response) {
              //console.log(response)
            commit("setProducts", response.data.obj)
            commit("setRespostaProduct", response.data.ok)
          });
      } catch (err) {
        commit("setProducts", '');
        commit("setRespostaProduct", false)
        console.log("erro:", err);
      }
    
  },
  async addProduto({commit}, itemData){
    if(itemData !== null){
      try {
        await axios
          .post(url + "addProduct", itemData)
          .then(function(response) {
              //console.log(response)
            commit("setNewProduct", response.data.obj)
            commit("setRespostaProduct", response.data.ok)
          });
      } catch (err) {
        commit("setProducts", '');
        commit("setRespostaProduct", false)
        console.log("erro:", err);
      }
    }
  },
  async DeleteProduto({commit}, itemData){
    if(itemData !== null){
      let aux ={
        id: itemData
      }
      try {
        await axios
          .post(url + "deleteProduct", aux)
          .then(function(response) {
              //console.log(response)
            commit("deleteProduct", itemData)
            commit("setRespostaProduct", response.data.ok)
          });
      } catch (err) {
        commit("setProducts", '');
        commit("setRespostaProduct", false)
        console.log("erro:", err);
      }
    }
  },
  async editarProduto({commit}, itemData){
    if(itemData !== null){
      try {
        await axios
          .post(url + "updateProduct", itemData)
          .then(function(response) {
              //console.log(response)
            commit("updateProduct", itemData)
            commit("setRespostaProduct", response.data.ok)
          });
      } catch (err) {
        commit("setProducts", '');
        commit("setRespostaProduct", false)
        console.log("erro:", err);
      }
    }
  }
};

const mutations = {
  setProducts: (state, response) => {
    //console.log(response)
    state.products = response;
  },
  setRespostaProduct: (state, response) => (state.respostaProduct = response),
  updateProduct: (state, product) => {
    const index = state.products.findIndex(
      (item) => item._id === product._id
    );
    if(index > -1){
      state.products.splice(index, 1);
        state.products.push(JSON.parse(JSON.stringify(product)))
    }
  },
  setNewProduct: (state, product) => {
    state.products.push(JSON.parse(JSON.stringify(product)))
  },
  deleteProduct: (state, product) => {
    const index = state.products.findIndex(
      (item) => item._id === product
    );
    if(index > -1){
      state.products.splice(index, 1);
    }
  }
};


export default {
  state,
  getters,
  actions,
  mutations,
};
