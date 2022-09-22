/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";
let Qrcodes = window.localStorage.getItem('Qrcodes');
let QrcodesSize = window.localStorage.getItem('QrcodesSize');
//const url = 'http://localhost:3000/auth/'
//const url = 'http://10.1.1.23:3000/auth/'
const url = "https://semfila-api.herokuapp.com/auth/";

//window.localStorage.clear('Qrcodes')
//window.localStorage.clear('QrcodesSize')

const state = {
  respostaUser: "",
  messageUser: "",
  users: [],
  Qrcodes: Qrcodes ? JSON.parse(Qrcodes) : [],
  QrcodesSize: QrcodesSize ? parseInt(QrcodesSize) : 0,
  newQrCode: false,
  user: {},
};

const getters = {
  getRespostaUser: (state) => state.respostaUser,
  getMessageUser: (state) => state.messageUser,
  getUsers: (state) => state.users,
  getUser: (state) => state.user,
  getQrcodes: (state) => state.Qrcodes,
  getQrcodesSize: (state) => state.QrcodesSize,
  getnewQrCode: (state) => state.newQrCode
};

const actions = {
  async getQrCodesAuth({commit}, itemData){
    //console.log("Entrou aqui no qrcodes");
    //console.log(itemData)
    if(itemData.length > 0){
      commit("addQrCodes", itemData);
      commit("updateSizeQrCodes");
      commit("saveQrCodes");
    }
  },
  async callSnack({commit}, item){
    commit("setMessageUser", item.message)
    commit("setRespostaUser", item.status)
    
  },
  async newQrCode({commit}){
    commit("AlertnewQrCode", true);
  },
  async Qrcodes({ commit }, itemData) {
    //console.log(itemData)
    commit("addQrCodes", itemData);
    commit("updateSizeQrCodes");
    commit("saveQrCodes");
  },
  async DeleteQrcodes({ commit }, itemData) {
    commit("DeleteItem", itemData);
    commit("updateSize");
    commit("saveCart");
  },
  async autenticarbyEmail({ commit }, itemData) {
    if (itemData !== null && itemData !== "") {
      try {
        await axios
          .get(url + `autenticarByEmail/${itemData}`)
          .then(function(response) {
            if (response.data.ok) {
              response.data.token = `Bearer ${response.data.token}`;
              axios.defaults.headers.common["Authorization"] =
                response.data.token;
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", true);
              commit("setUser", response.data.object);
            } else if (response.data.reason == 101) {
              response.data.token = `Bearer ${response.data.token}`;
              axios.defaults.headers.common["Authorization"] =
                response.data.token;
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", response.data.object);
            } else {
              commit("setMessageUser", response.data.msg);

              commit("setRespostaUser", false);
            }
          });
      } catch (err) {
        commit("setRespostaUser", false);
        commit("setMessageUser", "Erro ao enviar token");
        console.log("erro:", err);
      }
    } else {
      commit("setRespostaUser", false);
      commit("setMessageUser", "Ops... você não devia estar aqui");
    }
  },
  async sendVerification({ commit }, itemData) {
    if (itemData !== null) {
      console.log(itemData);
      let object_send = {
        token: itemData,
      };
      try {
        await axios
          .post(url + "verifyEmail", object_send)
          .then(function(response) {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.ok);
          });
      } catch (e) {
        console.log(e.message);
        commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
      }
    }
  },
  async getProfile({ commit, state }) {
    if(Object.keys(state.user).length !== 0)
    //IMPORTANTE
    await axios
      .post(url + "getProfile")
      .then(function(response) {
        commit("setUser", response.data.user);
        commit("setRespostaUser", response.data.ok);
      })
      .catch(function(error) {
        console.log(error);
        commit("setCheckToken", false);
      });
  },
  async verify({ commit }, itemData) {
    if (itemData !== null) {
      //console.log(itemData)
      let aux = {
        token: itemData,
      };
      try {
        await axios.post(url + "verifyEmail", aux).then(function(response) {
          commit("setMessageUser", response.data.msg);
          commit("setRespostaUser", response.data.ok);
        });
      } catch (e) {
        console.log(e);
        commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
      }
    }
  },
  async registrarUser({ commit }, itemData) {
    //console.log(itemData)
    if (itemData !== null) {
      let dataToSend = {
        account: {
          pss: itemData.password,
          email: itemData.email,
        }
      };
      try {
        await axios.post(url + "register", dataToSend).then(function(response) {
          //console.log(response.data)
          if (response.data.ok) {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.success);
          } else {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.success);
          }
        });
      } catch (err) {
        commit("setMessageUser", "Erro crítico");
        commit("setRespostaUser", false);
      }
    }
  },
};

const mutations = {
  addQrCodes: (state, Qrcodes) => {
    for(let i=0; i<Qrcodes.length;i++){
      const index = state.Qrcodes.findIndex(
        (item) => item._id === Qrcodes[i]._id
      );
    if(index > -1){
        state.Qrcodes.splice(index, 1);
        state.Qrcodes.push(Qrcodes[i]);
    }else{
      state.Qrcodes.push(Qrcodes[i]);
    }
    }
    
  },
  updateSizeQrCodes: (state) => {
    
    state.QrcodesSize = state.Qrcodes.length.toString();
    
  },
  saveQrCodes(state) {
    window.localStorage.setItem("Qrcodes", JSON.stringify(state.Qrcodes));
    window.localStorage.setItem("QrcodesSize", state.QrcodesSize);
  },
  DeleteItem: (state, Qrcodes) => {
    const index = state.Qrcodes.findIndex((Qrcodes) => Qrcodes._id === Qrcodes._id);

    if (index !== -1) {
      state.Qrcodes.splice(index, 1);
    }
  },
  setRespostaUser: (state, respostaUser) => (state.respostaUser = respostaUser),
  AlertnewQrCode: (state, newQrCode) => (state.newQrCode = newQrCode),
  setMessageUser: (state, messageUser) => (state.messageUser = messageUser),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
