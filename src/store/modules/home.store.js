/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

const url = 'https://api-semfila.api-semfila.online/store/'

const state = {
  search: [],

};

const getters = {
  getSearch: (state) => state.search,
};

const actions = {
  async fetchSearch({ commit }, itemData) {
    let aux={
        query: itemData
    }
    if(itemData.length < 20){
      try {
        await axios
          .get(url + "fetchSearch", { params: aux })
          .then(function(response) {
            console.log(response)
            commit("setSearch", response.data.obj)
          });
      } catch (err) {
        console.log("erro:", err);
      }
    }
      
    
  },
};

const mutations = {
  setSearch: (state, response) => {
    //console.log(response)
    state.search = response;
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
