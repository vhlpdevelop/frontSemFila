const url = "http://localhost:3000/historico/";
import axios from "axios";
const state = {
  historico: [],
  historicoRender: false,
  correio: "",
  correioRender: false,
};
const getters = {
  getHistorico: (state) => state.historico,
  getCorreio: (state) => state.correio,
  getCorreioRender: (state) => state.correioRender,
  getHistoricoRender: (state) => state.historicoRender,
};

const actions = {
  async fetchHistorico({ commit }) {
    try {
      await axios
        .get(url + "fetchHistorico")
        .then(function(response) {
          //console.log(response);
          commit("setHistorico", response.data.obj);
          commit("setHistoricoRender", response.data.ok);
        })
        .catch(function(error) {
          console.log(error);
          commit("setCheckToken", false);
        });
    } catch (e) {
      console.log(e);
    }
  },
  async fetchCorreio({ commit }, itemData) {
    console.log(itemData)
    let id_rastreamento = {
      id_rastreamento: itemData,
    };
    try {
      await axios
        .post(url + "trackingProduct", id_rastreamento)
        .then(function(response) {
          //console.log(response);
          commit("setCorreio", response.data.obj);
          commit("setCorreioRender", response.data.ok);
        })
        .catch(function(error) {
          console.log(error);
          commit("setCheckToken", false);
        });
    } catch (e) {
      console.log(e);
    }
  },
};

const mutations = {
  setHistorico: (state, historico) => {
    state.historico = historico;
  },
  setHistoricoRender: (state, historico) => {
    state.historicoRender = historico;
  },
  setCorreio: (state, correio) => {
    state.correio = correio;
  },
  setCorreioRender: (state, correio) => {
    state.correioRender = correio;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
