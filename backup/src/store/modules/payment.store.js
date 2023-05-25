/* eslint-disable spaced-comment */
import store from "../index"
import axios from "axios";
import { io } from "socket.io-client";
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
  msg: "",
  plan: "",
  frete: "",
  freteCheck: false,
  paymentCheck: false,
  totalCart: 0,
  pedidoID: "",
  paymentData: "",
};

const getters = {
  getSessionID: (state) => state.sessionID,
  getTotalCart: (state)=> state.totalCart,
  getPaymentMsg: (state) => state.msg,
  getPedidoID:(state) => state.pedidoID,
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
        
        if (e.response.status === 429) {
          commit("setRespostaUser", false);
          commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
        } else {
          commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
        }
      }
    }
  },
  async fetchTotal({commit}, itemData){
    //Calcular o carrinho.
    console.log(itemData)
    if(itemData){
      var total = 0;
      var desconto =0;
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].qtd >= 1) {
          total += itemData[i].price *itemData[i].qtd;
          if (itemData[i].discount_status) {
            desconto =
              (
                parseFloat(itemData[i].discount_value)) *
                itemData[i].qtd;
                desconto = desconto.toFixed(2);
                total = parseFloat(total) - parseFloat(desconto);
          }
          
        }
        
      }
      commit("SetTotalCart", total)
    }
    
  },
  async PaymentCheck({ dispatch, commit }, itemData) { //CALL PAYMETHOD E RETURN
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
              commit("SetPedidoID", response.data.obj_pedido);
              commit("SetPlan", response.data.obj);
              commit("SetStatus", true);
              commit("SetPaymentMsg", response.data.msg);
            } else {
              console.log(response.data.obj)
              commit("SetPaymentMsg", response.data.msg);
              if(response.data.obj){ //Caso um item fique sem estoque, chamar o dispatch e retirar do cardapio.
                console.log("Aqui")
                dispatch("shutdownItem", response.data.obj, { root: true });
              }
              console.log(response.data.msg)
              
              commit("SetPlan", "");
              commit("SetStatus", false);
            }
          },
          (error) => {
            console.log(error.message)
            commit("SetPaymentMsg", error.message);
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
      console.log(e.message);
      commit("SetPlan", "");
      commit("SetStatus", false);
    }
  },
};

const mutations = {
  SetTotalCart: (state, totalCart) => (state.totalCart = totalCart),
  SetPedidoID: (state, pedidoID) => (state.pedidoID = pedidoID),
  SetSession: (state, sessionID) => (state.sessionID = sessionID),
  SetPaymentCheck: (state, paymentCheck) => (state.paymentCheck = paymentCheck),
  SetPaymentData: (state, paymentData) => (state.paymentData = paymentData),
  SetStatus: (state, status) => (state.status = status),
  SetPlan: (state, plan) => (state.plan = plan),
  SetFrete: (state, frete) => (state.frete = frete),
  SetFreteCheck: (state, freteCheck) => (state.freteCheck = freteCheck),
  SetPaymentMsg: (state, msg) => (state.msg = msg),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
