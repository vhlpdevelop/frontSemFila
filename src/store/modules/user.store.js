/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS
import axios from "axios";
let Qrcodes = window.localStorage.getItem("Qrcodes");
if(Qrcodes){
  var qrcode = JSON.parse(Qrcodes)
  for(let i =0; i<qrcode.length; i++){
    qrcode[i].overlay=false
  }
  Qrcodes = qrcode
}
let QrcodesSize = window.localStorage.getItem("QrcodesSize");
let firstLoader = window.localStorage.getItem("firstLoader");
const url = "https://api-semfila.api-semfila.online/auth/";
const baseUrl = "https://api-semfila.api-semfila.online/qrcode/";
const state = {
  respostaUser: "",
  messageUser: "",
  users: [],
  verify: "",
  firstLoad: firstLoader ? JSON.parse(firstLoader) : true,
  Qrcodes: Qrcodes ? Qrcodes : [],
  QrcodesSize: QrcodesSize ? parseInt(QrcodesSize) : 0,
  newQrCode: false,
  user: {},
};

const getters = {
  getRespostaUser: (state) => state.respostaUser,
  getMessageUser: (state) => state.messageUser,
  getUsers: (state) => state.users,
  getVerify: (state) => state.verify,
  getUser: (state) => state.user,
  getQrcodes: (state) => state.Qrcodes,
  getQrcodesSize: (state) => state.QrcodesSize,
  getnewQrCode: (state) => state.newQrCode,
  getFirstLoad: (state) => state.firstLoad
};

const actions = {
  async QrcodeUpdate({commit}, itemData){ //Update automático quando usado.
    if(itemData){
      commit("refreshSingleQrCode", itemData);
      commit("updateSizeQrCodes");
      commit("saveQrCodes");
    }
  },
  async fetchQrCode({commit},itemData){
    if(itemData){
      let aux ={
        qrcode:itemData
      }
      try{
        await axios.post(baseUrl + "recoverQrCode", aux).then(function (response) {
          if (response.data.success) {
            //console.log(response.data.obj);
            if(response.data.obj){
              commit("addQrCodes", response.data.obj);
              commit("updateSizeQrCodes");
              commit("saveQrCodes");
              commit("AlertnewQrCode", response.data.success);
            }
          } else {
            if(response.data.error){
              commit("setMessageUser", "Ocorreu um erro ao localizar o QrCode");
              commit("AlertnewQrCode", false);
            }else{
              commit("setMessageUser", "Parece que seu QrCode já foi usado ou reembolsado.");
              commit("AlertnewQrCode", false);
            }
           
          }
        });
      }catch(e){

      }
    }
  },
  async RWithDraw( {commit}, itemData){
    if(itemData){
      let aux = {
        id: itemData._id
      }
      console.log("Aqui")
      try {
        await axios.post(baseUrl + "requestWithdraw", aux).then(function (response) {
          if (response.data.success) {
            //console.log(response.data.obj);
            if(response.data.obj){
              commit("refreshSingleQrCode", response.data.obj);
              commit("updateSizeQrCodes");
              commit("saveQrCodes");
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", response.data.success);
            }else{
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", response.data.success);
            }
           
          } else {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", false);
          }
        });
      } catch (e) {

        if (e.response.status === 429) {
          commit("setRespostaUser", false);
          commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
        } else {
          commit("setMessageUser", "Erro ao enviar.");
        commit("setRespostaUser", false);
        }
      }
    }
  },
  async RSingleQrCode({commit}, itemData){
    if(itemData){
      let aux = {
        id: itemData
      }
      try {
        await axios.post(baseUrl + "refreshSingleQrCode", aux).then(function (response) {
          if (response.data.success) {
            //console.log(response.data.obj);
            if(response.data.obj){
              commit("refreshSingleQrCode", response.data.obj);
              commit("updateSizeQrCodes");
              commit("saveQrCodes");
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", response.data.success);
            }else{
              commit("setMessageUser", response.data.msg);
              commit("setRespostaUser", response.data.success);
            }
           
          } else {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", false);
          }
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
  async getQrCodesAuth({ commit }, itemData) {
    //console.log("Entrou aqui no qrcodes");
    //console.log(itemData)
    itemData.forEach(function (element) {
      element.overlay = false;
    });
    if (itemData.length > 0) {
      commit("addQrCodes", itemData);
      commit("updateSizeQrCodes");
      commit("saveQrCodes");
    }
  },
  async refreshQRCODEUser({ commit }) {
    try {
      await axios.post(baseUrl + "refreshQrCodeUser").then(function (response) {
        if (response.data.success) {
          //console.log(response.data.obj);
          commit("refreshQrCodes", response.data.obj);
          commit("updateSizeQrCodes");
          commit("saveQrCodes");
          commit("setMessageUser", response.data.msg);
          commit("setRespostaUser", response.data.success);
        } else {
          commit("setMessageUser", response.data.msg);
          commit("setRespostaUser", false);
        }
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
  },
  async callSnack({ commit }, item) {
    commit("setMessageUser", item.message);
    commit("setRespostaUser", item.status);
  },
  async newQrCode({ commit }) {
    commit("AlertnewQrCode", true);
  },
  async Qrcodes({ commit }, itemData) {
   
    
    commit("addQrCodes", itemData)
    commit("updateSizeQrCodes");
    commit("saveQrCodes");

   
  },
  async DeleteQrcodes({ commit }, itemData) {
    commit("DeleteItem", itemData);
    commit("updateSizeQrCodes");
    commit("saveQrCodes");
  },
  async autenticarbyEmail({ commit }, itemData) {
    if (itemData !== null && itemData !== "") {
      try {
        await axios
          .get(url + `autenticarByEmail/${itemData}`)
          .then(function (response) {
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
        if (err.response.status === 429) {
          commit("setRespostaUser", false);
          commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
        } else {
          commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
        }
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
          .then(function (response) {
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.success);
          });
      } catch (e) {
        console.log(e.message);
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
  async getProfile({ commit }) {
    const session = window.localStorage.getItem("session");
    //console.log(session);
    if (session !== "") {
      await axios
        .post(url + "getProfile")
        .then(function (response) {
          commit("setUser", response.data.obj);
          commit("setMessageUser", response.data.msg)
          commit("setRespostaUser", response.data.success);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status === 429) {
            commit("setRespostaUser", false);
            commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
          } else {
            commit("setMessageUser", "Erro ao enviar verificação");
          commit("setRespostaUser", false);
          }
        });
    }else{
      commit("setRespostaUser", false);
    }
      
  },
  async verify({ commit }, itemData) {
    if (itemData !== null) {
      //console.log(itemData);
      let aux = {
        token: itemData,
      };
      try {
        await axios
          .post(url + "verifyTokenEmail", aux)
          .then(function (response) {
            commit("setVerify", response.data.obj);
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.success);
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
  async saveProfile({ commit }, itemData) {
    if (itemData !== null) {
      //console.log(itemData);
      let aux = {
        user: itemData,
      };
      try {
        await axios
          .post(url + "saveProfile", aux)
          .then(function (response) {
            if(response.data.success)
              commit("setUser", response.data.obj)
            commit("setMessageUser", response.data.msg);
            commit("setRespostaUser", response.data.success);
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
  async registrarUser({ commit }, itemData) {
    //console.log(itemData)
    if (itemData !== null) {
      let dataToSend = {
        account: {
          pss: itemData.password,
          email: itemData.email,
          cpf: itemData.cpf,
          name: itemData.name
        },
      };
      try {
        await axios
          .post(url + "register", dataToSend)
          .then(function (response) {
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
        if (err.response.status === 429) {
          commit("setRespostaUser", false);
          commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
        } else {
          commit("setMessageUser", "Erro ao enviar verificação");
        commit("setRespostaUser", false);
        }
      }
    }
  },
  async sendRecoveryPssToken({commit}, itemData){
    try{
      await axios
      .post(url + "CommonTokenPasswordReset", itemData)
      .then(function(response) {
        commit("setRespostaUser", response.data.success)
        commit("setMessageUser", response.data.msg)
      }).catch(function(error){
        console.log(error)
        commit("setRespostaUser", false)
        commit("setMessageUser","Desculpe, um erro ocorreu ao enviar a solicitação")
      })
    }catch(e){
      if (e.response.status === 429) {
        commit("setRespostaUser", false);
        commit("setMessageUser", "Muitas tentativas, aguarde 1 minuto.");
      } else {
        commit("setMessageUser", "Erro ao enviar verificação");
      commit("setRespostaUser", false);
      }
    }
  },
  async verifyTokenPassword({commit}, itemData){
    
    try {
      let aux = {
        token: itemData
      }
      await axios
        .post(url + "CommonVerifyTokenPasswordReset", aux)
        .then(function (response) {
          commit("setVerify", response.data.obj);
          commit("setMessageUser", response.data.msg);
          commit("setRespostaUser", response.data.success);
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
  },
  async ChangePassword({commit}, itemData){
    try{
      await axios
        .post(url + "PasswordReset", itemData)
        .then(function (response) {
          commit("setVerify", response.data.obj);
          commit("setMessageUser", response.data.msg);
          commit("setRespostaUser", response.data.success);
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
  },
  async switchFirstLoad({commit}){
    commit("changeFirstLoad", false);
  }
};

const mutations = {
  changeFirstLoad: (state, firstLoad) => {
    state.firstLoad = firstLoad;
    window.localStorage.setItem("firstLoader", firstLoad);
  },
  refreshSingleQrCode: (state, Qrcode) => {
    var index = 0;
      for(let i =0; i< state.Qrcodes.length; i++){
        if(state.Qrcodes[i]._id === Qrcode._id){
          index = i;
          
        }
      }
        state.Qrcodes[index].quantity = Qrcode.quantity
        state.Qrcodes[index].state = Qrcode.state
        state.Qrcodes[index].withdraw = Qrcode.withdraw
        

  },
  refreshQrCodes: (state, Qrcode) => {
    state.Qrcodes = Qrcode;
    for(let i =0; i< Qrcode.length; i++){
      
      state.Qrcodes[i].overlay = false;
    }
  },
  addQrCodes: (state, Qrcodes) => {
    if (state.Qrcodes != null) {
      if (
        typeof Qrcodes === "object" &&
        Qrcodes !== null &&
        !Array.isArray(Qrcodes)
      ) {
        var trigger = false
        for (let i = 0; i < state.Qrcodes.length; i++) {
          if(Qrcodes._id === state.Qrcodes[i]._id){
            trigger = true;
          }
        }
        if(trigger === false){ //Se nao localizar um, insira.
          Qrcodes.overlay=false
          state.Qrcodes.push(Qrcodes);
        }
      } else {
      
        for (let i = 0; i < Qrcodes.length; i++) {
          if(Qrcodes[i].data){
            const index_sec = state.Qrcodes.findIndex(
              (item) => item._id === Qrcodes[i].data._id
            );
            if (index_sec > -1) {
        
              state.Qrcodes.splice(index_sec, 1);
              Qrcodes[i].data.overlay=false
              state.Qrcodes.push(Qrcodes[i].data);
            } else {
              Qrcodes[i].data.overlay=false
              state.Qrcodes.push(Qrcodes[i].data);
            }
          }else{
            const index = state.Qrcodes.findIndex(
              (item) => item._id === Qrcodes[i]._id
            );
            if (index > -1) {
        
              state.Qrcodes.splice(index, 1);
              Qrcodes[i].overlay = false;
              state.Qrcodes.push(Qrcodes[i]);
            } else {
              Qrcodes[i].overlay = false;
              state.Qrcodes.push(Qrcodes[i]);
            }
          }
        
        }
      }
    } else {
      console.log("Flag 2")
      Qrcodes.data.overlay = false;

      state.Qrcodes.push(Qrcodes.data);
    }
  },
  setLogOutQrCodes: (state) => {
    state.Qrcodes = [];
    state.QrcodesSize = 0;
  },
  updateSizeQrCodes: (state) => {
    state.QrcodesSize = state.Qrcodes.length.toString();
  },
  saveQrCodes(state) {
    window.localStorage.setItem("Qrcodes", JSON.stringify(state.Qrcodes));
    window.localStorage.setItem("QrcodesSize", state.QrcodesSize);
  },
  DeleteItem: (state, Qrcode) => { //Arrumado
    
    const index = state.Qrcodes.findIndex(
      (Qrcodes) => Qrcodes._id === Qrcode
    );

    if (index > -1) {
      
      state.Qrcodes.splice(index, 1);
    }
  },
  setRespostaUser: (state, respostaUser) => (state.respostaUser = respostaUser),
  AlertnewQrCode: (state, newQrCode) => (state.newQrCode = newQrCode),
  setVerify: (state, verify) => (state.verify = verify),
  setMessageUser: (state, messageUser) => (state.messageUser = messageUser),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
