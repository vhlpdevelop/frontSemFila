/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from 'axios'

//const url = 'https://lobby-contador.herokuapp.com/'
const url = 'http://localhost:3000/auth/'

const state = {
    respostaUser: '',
    messageUser: '',
    users: [],
    user: {}
}

const getters = {
    getRespostaUser: state => state.respostaUser,
    getMessageUser: state => state.messageUser,
    getUsers: state => state.users,
    getUser: state => state.user
}

const actions = {
  async autenticarbyEmail({commit}, itemData){
    if(itemData !== null && itemData !== ''){
      try{
        await axios.get(url+`autenticarByEmail/${itemData}`).then(function (response) {
          if(response.data.ok){
          response.data.token = `Bearer ${response.data.token}`;
          axios.defaults.headers.common['Authorization'] = response.data.token;
          commit('setMessageUser', response.data.msg);
          commit('setRespostaUser', true);
          commit('setUser', response.data.object)
          }else if(response.data.reason == 101){
            response.data.token = `Bearer ${response.data.token}`;
            axios.defaults.headers.common['Authorization'] = response.data.token;
            commit('setMessageUser', response.data.msg);
            commit('setRespostaUser', response.data.object)
            
          }else{
          commit('setMessageUser', response.data.msg);
          
          commit('setRespostaUser', false);
          }
        })
      }
      catch(err){
        commit('setRespostaUser', false);
        commit('setMessageUser', 'Erro ao enviar token')
        console.log('erro:', err);
      }
    }else{
      commit('setRespostaUser', false);
      commit('setMessageUser', 'Ops... você não devia estar aqui');
    }
  },
  async sendVerification({commit}, itemData){
    if(itemData !== null){
      console.log(itemData)
      let object_send = {
        token: itemData
      }
      try{
        await axios.post(url + "verifyEmail", object_send).then(function (response) {
          commit('setMessageUser', response.data.msg);
          commit('setRespostaUser', response.data.ok)
        })
      }catch(e){
        console.log(e.message)
        commit('setMessageUser', "Erro ao enviar verificação");
        commit('setRespostaUser', false)
      }
    }
  },
  async getProfile({commit}){ //IMPORTANTE
    await axios
      .post(url + "getProfile")
      .then(function(response) {
        
        commit("setUser", response.data.user)
        commit("setRespostaUser", response.data.ok)
      }).catch(function(error){
        console.log(error)
        commit("setCheckToken", false)
      })
        
  },
  async verify({commit}, itemData){
    if(itemData !== null){
      //console.log(itemData)
      let aux = {
        token: itemData
      }
      try{
        await axios.post(url + 'verifyEmail', aux).then(function (response) {
          commit('setMessageUser', response.data.msg);
          commit('setRespostaUser', response.data.ok)
        })
      }catch(e){
        console.log(e)
        commit('setMessageUser', "Erro ao enviar verificação");
        commit('setRespostaUser', false)
      }
    }

  },
  async registrarUser({commit}, itemData){
    //console.log(itemData)
    if(itemData !== null){
        let dataToSend = {
            pss: itemData.password,
            email: itemData.email,
            endereco: itemData.endereco,
            firstName: itemData.firstName,
            lastName: itemData.lastName,
            telefone: itemData.telefone
        }
        try{
          await axios.post(url + 'register', dataToSend).then(function (response) {
            //console.log(response.data)
            if(response.data.ok){
              commit('setMessageUser', response.data.msg);
              commit('setRespostaUser', response.data.ok)
            
            }else{
              commit('setMessageUser', response.data.msg);
              commit('setRespostaUser', response.data.ok)
            
            }
          })
        }
        catch(err){
          commit('setMessageUser', 'Erro crítico');
            commit('setRespostaUser', false)
         
        }
      }
  }
}

const mutations = {
    setRespostaUser: (state, respostaUser) => (state.respostaUser = respostaUser),
    setMessageUser:   (state, messageUser) => (state.messageUser = messageUser),
    setUser: (state, user)=> (state.user = user),

}

export default {
    state,
    getters,
    actions,
    mutations
  }
