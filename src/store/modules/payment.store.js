/* eslint-disable spaced-comment */
import store from "../index"
import axios from "axios";
import { io } from "socket.io-client";
const urlSocket = "https://api-semfila.api-semfila.online";
const url = "https://api-semfila.api-semfila.online/payment/";
const sessionID = window.localStorage.getItem("sessionID");
var second_session = "";
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

socket.on("updateQrCode", (qrcode, callback) => {
  store.dispatch('callUpdate', qrcode)
});

function connect() {
  return new Promise(function (resolve, reject) {

    const socket_two = io(urlSocket, { autoConnect: true });
    socket_two.on("session", async ({ sessionID }) => {
      // attach the session ID to the next reconnection attempts

      socket_two.auth = { sessionID };
      socket_two.connect();
      second_session = sessionID;
      // store it in the localStorage
      window.localStorage.setItem("sessionID", sessionID);
      resolve(second_session)
    });
  })
}

const state = {
  sessionID: "",
  status: "",
  emailSave: "",
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
  getEmailSave:(state)=>state.emailSave,
  getSessionID: (state) => state.sessionID,
  getTotalCart: (state) => state.totalCart,
  getPaymentMsg: (state) => state.msg,
  getPedidoID: (state) => state.pedidoID,
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

      console.log(itemData)
      dispatch("Qrcodes", itemData.dataToSend[i], { root: true });
    }
    commit("SetPaymentCheck", true);
  },
  async callUpdate({ dispatch }, itemData) {
    dispatch("QrcodeUpdate", itemData, { root: true });
  },
  async fetchEmailSaved({commit}){
    commit("SetEmailSave", window.localStorage.getItem("emailSaved"))
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
  async fetchTotal({ commit }, itemData) {
    //Calcular o carrinho.
    console.log(itemData)
    if (itemData) {
      var total = 0;
      var desconto = 0;
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].qtd >= 1) {
          total += itemData[i].price * itemData[i].qtd;
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
  async fetchConfirmPagamento({commit}, itemData){
    let aux = {
      pedido_id: itemData.pedido_id,
      secret: itemData.secret,
      paymentMethodID: itemData.paymentMethodID
    }
    try {
      await axios.post("https://api-semfila.api-semfila.online/payment/confirmPayment", aux).then(
        function (response) {
          console.log(response.data);
          if (response.data.success) {

            let aux_save = {
              dataToSend: response.data.obj
            }
            store.dispatch('callQRCODE', aux_save)
            commit("SetStatus", true)
            commit("SetPaymentMsg", response.data.msg)
          } else {
            commit("SetStatus", false)
            commit("SetPaymentMsg", response.data.msg)
          }
        });
    } catch (e) {
      console.log(e)
      commit("SetStatus", false);
      commit("SetPaymentMsg", "Ocorreu um erro.")
    }
  },
  async fetchPedidoPagamento({ commit }, itemData) { //Caso nao envie pelo websocket e o usuário nao tenha paciencia de ver email, entao utilizar este fallback
    let aux = {
      pedido_id: itemData
    }
    try {
      await axios.post("https://api-semfila.api-semfila.online/frontService/fetchPedido", aux).then(
        function (response) {
          //console.log(response.data);
          if (response.data.success) {

            let aux_save = {
              dataToSend: response.data.obj
            }
            store.dispatch('callQRCODE', aux_save)
            commit("SetStatus", true)
            commit("SetPaymentMsg", response.data.msg)
          } else {
            commit("SetStatus", false)
            commit("SetPaymentMsg", response.data.msg)
          }
        });
    } catch (e) {
      console.log(e)
      commit("SetStatus", false);
      commit("SetPaymentMsg", "Ocorreu um erro.")
    }
  },
  async PaymentCheck({ dispatch, commit }, itemData) { //CALL PAYMETHOD E RETURN
    window.localStorage.setItem("emailSaved", itemData.phone)
    commit("SetEmailSave", itemData.phone)
    if (!window.localStorage.getItem("sessionID")) {
      try {
        let session = await connect()
        let object = {
          itemData: itemData,
          idSocket: session,
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
                  if (response.data.obj) { //Caso um item fique sem estoque, chamar o dispatch e retirar do cardapio.
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
                commit("SetPedidoID", response.data.obj_pedido);
                commit("SetPlan", response.data)
                commit("SetStatus", response.data.success);
                commit("SetPaymentMsg", response.data.msg);
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

      } catch (error) {
        console.log("ooops ", error)
      }

      //Caso não tenha um SessionID gerar novamente.


    } else {
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
                if (response.data.obj) { //Caso um item fique sem estoque, chamar o dispatch e retirar do cardapio.
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
              console.log(response.data);
              commit("SetPedidoID", response.data.obj_pedido);
              commit("SetPlan", response.data)
              commit("SetStatus", response.data.success);
              commit("SetPaymentMsg", response.data.msg);
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
    }

  },
};

const mutations = {
  SetEmailSave:(state, emailSave)=>(state.emailSave = emailSave),
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
