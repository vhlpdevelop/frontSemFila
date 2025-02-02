/* eslint-disable spaced-comment */
import store from "../index"

import axios from "axios";
import { io } from "socket.io-client";
//const url = 'https://lobby-contador.herokuapp.com/pagSeguro/'
//{ transports: ['websocket', 'polling', 'flashsocket'] }
//const url = "http://localhost:3000/payment/"

//const url = "http://localhost:3000/payment/"
//const urlSocket="http://localhost:3000"
//const urlSocket = "https://semfila-api.herokuapp.com" //
const urlSocket = "https://api-semfila.api-semfila.online";
const url = "https://api-semfila.api-semfila.online/payment/";
const sessionID = window.localStorage.getItem("sessionID");

const socket = io(urlSocket, { autoConnect: true });
if (sessionID) {
  //this.usernameAlreadySelected = true;
  socket.auth = { sessionID };
  
  socket.connect();
}
socket.on("session", ({ sessionID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  socket.connect();
  
  // store it in the localStorage
  window.localStorage.setItem("sessionID", sessionID);
});


socket.on("qrcodeGet", (qrcode, callback) => {
  
  store.dispatch('callQRCODE', qrcode)
  if (store.getters.getPaymentCheck) {
    callback(true);
  }
});


const state = {
  sessionID: "",
  status: "",
  plan: "",
  frete: "",
  freteCheck: false,
  paymentCheck: false,
  paymentData: "",
};

const getters = {
  getSessionID: (state) => state.sessionID,
  getStatus: (state) => state.status,
  getPlan: (state) => state.plan,
  getFrete: (state) => state.frete,
  getFreteCheck: (state) => state.freteCheck,
  getPaymentCheck: (state) => state.paymentCheck,
  getPaymentData: (state) => state.paymentData,
};

const actions = {
  async callQRCODE({ dispatch, commit }, itemData) {
   
    
    for (let i = 0; i < itemData.dataToSend.length; i++) {
      dispatch("Qrcodes", itemData.dataToSend[i], { root: true });
    }
    commit("SetPaymentCheck", true);
  },
  async changeFrete({ commit }) {
    commit("SetFreteCheck", false);
  },
  async verifyTokenSuccess({ commit }, itemData) {
    if (itemData !== null) {
      //console.log(itemData)
      try {
        await axios
          .get(
            "https://semfila-api.herokuapp.com/payments/successpayment/" +
              `Bearer ${itemData}`
          )
          .then(function (response) {
            commit("SetPaymentCheck", response.data.ok);
            commit("SetPaymentData", response.data.email);
          });
      } catch (e) {
        console.log(e);
        commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
      }
    }
  },
  async fetchFrete({ commit }, itemData) {
    try {
      await axios.post(url + "fetchFrete", itemData).then(
        function (response) {
          commit("SetFrete", response.data.valor);
          commit("SetFreteCheck", response.data.ok);
        },
        (error) => {
          //Caso de erro
          commit("SetFrete", "0");
          commit("SetFreteCheck", false);
        }
      );
    } catch (e) {
      console.log(e.message);
      commit("SetFrete", "0");
    }
  },
  async PaymentCheck({ dispatch, commit }, itemData) {
    let object = {
      itemData: itemData,
      idSocket: window.localStorage.getItem("sessionID"),
    };

    try {
      if (itemData.type === "PIX") {
        await axios.post(url + "payPix", object).then(
          function (response) {
            //console.log(response.data);
            if (response.data.success) {
              commit("SetPlan", response.data.obj);
              commit("SetStatus", true);
            } else {
              commit("SetPlan", "");
              commit("SetStatus", false);
            }
          },
          (error) => {
            //Caso de erro
            //console.log("Flag 2");
            commit("SetPlan", "");
            commit("SetStatus", false);
          }
        );
      } else {
        await axios.post(url + "payCreditCard", object).then(
          function (response) {
            ////console.log("Flag 1")
            //console.log(response.data);
            commit("SetPlan", response.data);
            commit("SetStatus", true);
          },
          (error) => {
            //Caso de erro
            //console.log("Flag 2");
            commit("SetPlan", "");
            commit("SetStatus", false);
          }
        );
      }
    } catch (e) {
      //console.log(e.message);
      commit("SetPlan", "");
      commit("SetStatus", false);
    }
  },
  async checkOutPlan({ commit }, itemData) {
    try {
      await axios.post(url + "fetchProduct", itemData).then(
        function (response) {
          commit("SetPlan", response.data);
          commit("SetStatus", true);
        },
        (error) => {
          //Caso de erro
          commit("SetPlan", "");
          commit("SetStatus", false);
        }
      );
    } catch (e) {
      //console.log(e);
      commit("SetPlan", "");
      commit("SetStatus", false);
    }
  },
  async getPagSession({ commit }) {
    try {
      await axios.post(url + "fetchSession").then(function (response) {
        ////console.log(response.data)
        if (response.data.ok) {
          commit("SetSession", response.data.session_id);
          commit("SetStatus", response.data.ok);
        }
      });
    } catch (err) {
      commit("respostaLogin", false);
      commit("messageLogin", "Erro ao enviar");
      //console.log("erro:", err);
    }
  },
};

const mutations = {
  SetSession: (state, sessionID) => (state.sessionID = sessionID),
  SetPaymentCheck: (state, paymentCheck) => (state.paymentCheck = paymentCheck),
  SetPaymentData: (state, paymentData) => (state.paymentData = paymentData),
  SetStatus: (state, status) => (state.status = status),
  SetPlan: (state, plan) => (state.plan = plan),
  SetFrete: (state, frete) => (state.frete = frete),
  SetFreteCheck: (state, freteCheck) => (state.freteCheck = freteCheck),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
