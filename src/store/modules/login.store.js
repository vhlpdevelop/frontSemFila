/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

const url = "https://semfila-api.herokuapp.com/auth/";
//const url = "http://localhost:3000/auth/";
//console.log(session)
const state = {
  session: "",
  authLogin: false,
  messageLogin: "",
  checkToken: false,
  profile: "",
  company: "",
};

const getters = {
  getAuth: (state) => state.authLogin,
  getSession: (state) => state.session,
  getPerfil: (state) => state.profile,
  getMessageLogin: (state) => state.messageLogin,
  getCheckToken: (state) => state.checkToken,
  getCompany_name: (state) => state.company,
};

const actions = {
  async autoLogin({ dispatch, commit }) {
    const session = window.localStorage.getItem("session");
    //console.log(session);
    if (session !== "") {
      //Pode ser uma lacuna na armadura
      axios.defaults.headers.common["Authorization"] = session;
      try {
        await axios.get(url + "autoLogin").then(function (response) {
          console.log(response);
          if (response.data.success) {
            dispatch("getQrCodesAuth", response.data.qrcodes, { root: true });
            commit("setAuthLogin", response.data.success);
            commit(
              "setSession",
              JSON.stringify(`Bearer ${response.data.token}`)
            );
            commit("setProfile", response.data.profile)
            commit("messageLogin", response.data.msg);
          } else {
            commit("setAuthLogin", false);
            commit("setSession", "");
            axios.defaults.headers.common["Authorization"] = "";
            window.localStorage.setItem("session", "");
          }
        });
      } catch (e) {
        console.log(e);
        commit("setAuthLogin", false);
        commit("setSession", "");
        axios.defaults.headers.common["Authorization"] = "";
        window.localStorage.setItem("session", "");
      }
    }
  },
  async FazerLogin({ commit }, itemData) {
    let dataToSend = {
      email: itemData.email,
      pss: itemData.password,
    };
    //console.log(itemData)
    await axios
      .post(url + "login", dataToSend)
      .then(function (response) {
        if (response.data.success === true) {
          axios.defaults.headers.common["Authorization"] = JSON.stringify(
            `Bearer ${response.data.token}`
          );
          commit("setAuthLogin", response.data.success);
          commit("setSession", JSON.stringify(`Bearer ${response.data.token}`));
          commit("messageLogin", response.data.msg);
          window.localStorage.setItem(
            "session",
            JSON.stringify(`Bearer ${response.data.token}`)
          );
          //console.log(JSON.stringify( `Bearer ${response.data.token}`))
        } else {
          commit("messageLogin", response.data.msg);
          commit("setAuthLogin", response.data.success);
        }
      })
      .catch(function (error) {
        console.log(error, error.message);
        commit("messageLogin", error);
      });
  },
  async LogOut({commit}){
    commit("setAuthLogin", false);
    commit("setSession", "");
    window.localStorage.setItem("session", "");
    window.localStorage.setItem("Qrcodes", null);
    window.localStorage.setItem("QrcodesSize", 0)
  }
};

const mutations = {
  setAuthLogin: (state, response) => {
    state.authLogin = response;
  },
  setCheckToken: (state, response) => (state.checkToken = response),
  respostaLogin: (state, respostaLogin) =>
    (state.respostaLogin = respostaLogin),
  messageLogin: (state, messageLogin) => (state.messageLogin = messageLogin),
  setSession: (state, session) => {
    state.session = session;
  },
  setProfile: (state, profile) => (state.profile = profile),
  setCompany: (state, company) => (state.company = company),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
