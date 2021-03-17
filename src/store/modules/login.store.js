/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

//const url = 'https://lobby-contador.herokuapp.com/auth/'
const url = "http://localhost:3000/auth/";
//console.log(session)
const state = {
  session: "",
  authLogin: false,
  messageLogin: "",
  checkToken: false,
  profile: '',
};

const getters = {
  getAuth: (state) => state.authLogin,
  getSession: (state) => state.session,
  getPerfil: (state) => state.profile,
  getMessageLogin: (state) => state.messageLogin,
  getCheckToken: (state) => state.checkToken
};

const actions = {
  async FazerLogin({ commit }, itemData) {
    let dataToSend = {
      user: itemData.user,
      pss: itemData.pss,
    };
    //console.log(itemData)
    await axios
      .post(url + "login/Admin", dataToSend)
      .then(function(response) {
        //console.log(response);
        if (response.data.success === true) {
          axios.defaults.headers.common["Authorization"] = JSON.stringify( `Bearer ${response.data.token}`);
          commit("setAuthLogin", response.data.success);
          commit("setSession", JSON.stringify(`Bearer ${response.data.token}`));
          commit("messageLogin", response.data.msg);
          commit("setProfile", response.data.profile)
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
      .catch(function(error) {
        console.log(error, error.message);
        commit("messageLogin", error);
      });
  }, 
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
  setProfile: (state, profile) => (state.profile = profile)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
