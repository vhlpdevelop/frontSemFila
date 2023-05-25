
const url ="https://api-semfila.api-semfila.online/cardapio/"
var rated = window.localStorage.getItem('rated');

import axios from "axios";

const state = {
    categoria: [],
    destaques: [],
    rated: false,
    ratingValue: 0,
    promocoes: [],
    response: false,
    responseMsg: "",
    loaded: false,
    report: false,
    loading: true, //MUDAR DEPOIS PARA FALSE
};
const getters = {
  getDestaques: (state) => state.destaques,
  getRated:(state) => { //teste
    var aux = JSON.parse(rated)
    if(aux!==null)
    for(let i =0; i<aux.length; i++){
     
      if(aux[i].store_name == state.categoria.store.name){
        
        return true
        
      }
    }
  },
  getRating: (state) => state.ratingValue,
  getCardapio: (state) => state.categoria,
  getPromocoes: (state) => state.promocoes,
  getResponseCardapio: (state)=> state.response,
  getResponseReport: (state)=> state.report,
  getResponseMsgCardapio: (state) => state.responseMsg,
  getLoading: (state)=> state.loading,
  getLoaded: (state) => state.loaded
  
};

const actions = {
  async shutdownItem({commit}, itemData){
    console.log("Entrou aqui")
    commit("shutDown", itemData)
  },
  async switchLoaded({commit}){
    commit("setLoaded", false);
  },
  async report({commit}, itemData){
    try{
      if(itemData!==""){
        await axios
          .post(`https://api-semfila.api-semfila.online/frontService/reportCardapio`, itemData)
          .then(function(response) {
            commit("setReport", response.data.success)
          })
      }
    }catch(e){
      console.log(e)
    }
  },
  async cardapioLoaded({commit}){
    commit("Loaded", true) //Cardapio carregado
  },
  async rateCardapio({commit}, itemData){
    try{
      if(itemData!==""){
        await axios
          .post('https://api-semfila.api-semfila.online/frontService/menuRating', itemData)
          .then(function(response) {
            if(response.data.success){
              let aux = {
                status:true,
                store_name: itemData.store_name,
              }
              commit("setResponse", true)
              commit("setResponseMsg", response.data.message)
              commit("setRated", aux)
              //console.log(response.data)
            }else{
              commit("setResponse", false)
              commit("setResponseMsg", response.data.message)
            }
            
          })
      }
    }catch(e){
      console.log(e)
      commit("setResponse", false)
      commit("setResponseMsg", 'Ocorreu um erro.')
    }
  },
  async LoadStore({commit}, itemData){ //BUSCA CARDAPIO DA LOJA
    if(itemData!==""){
      try{
        
        await axios
          .get(`https://api-semfila.api-semfila.online/frontService/getStore/${itemData}`)
          .then(function(response) {
            //Organizar categorias, items, destaques e Promoções
            //1- Destaques
            if(response.data.success){
              //console.log(response.data.obj)
              //console.log(response.data.obj.cardapio.length)
              //console.log(response.data.obj.cardapio[0].items.length)
              let destaques = [];
              let promocoes = [];
              for(let i=0; i<response.data.obj.cardapio.length;i++){//navegando entre as categorias
                for(let y=0; y<response.data.obj.cardapio[i].items.length;y++){
                  if(response.data.obj.cardapio[i].items[y].status){ //Se o item está disponível
                    if(response.data.obj.cardapio[i].items[y].destaques){
                      destaques.push(response.data.obj.cardapio[i].items[y])
                      //console.log("Entrou")
                    }
                    if(response.data.obj.cardapio[i].items[y].promotion){
                      promocoes.push(response.data.obj.cardapio[i].items[y])
                    }
                  }
                }
              }
              //console.log(promocoes)
              commit("setPromocoes", promocoes)
              commit("setDestaques", destaques)

            }

            //console.log(response.data.success)
            commit("setLoaded", response.data.success)
            commit("setResponseMsg", response.data.msg)
            commit("setCardapio", response.data.obj)
            if(response.data.rating)
            commit("setRating",  parseFloat(response.data.rating.toFixed(1)))
            //console.log(response.data)
          });
      }catch(e){
        console.log(e)
        commit("setLoaded", false)
        commit("setResponseMsg", "Um erro ocorreu")
        if (e.response.status === 429) {
          commit("setLoaded", false);
          commit("setResponseMsg", "Muitas tentativas, aguarde 1 minuto.");
        } else {
          commit("setResponseMsg", "Erro ao procurar Cardapio.");
        commit("setLoaded", false);
        }
      }
    }
  },
};

const mutations = {
  shutDown: (state, itemData) => { //Função para remover um item que zerou o estoque.

    for(let i =0; i<state.categoria.cardapio.length; i++){
      for(let y=0; y<state.categoria.cardapio[i].items.length; y++){
        if(itemData === state.categoria.cardapio[i].items[y]._id){

          state.categoria.cardapio[i].items.splice(y, 1);
        }
      }
    }
    for(let y=0; y<state.destaques.length; y++){
      if(itemData === state.destaques[y]._id){

        state.destaques.splice(y, 1);
      }
    }
    for(let y=0; y<state.promocoes.length; y++){
      if(itemData === state.promocoes[y]._id){

        state.promocoes.splice(y, 1);
      }
    }

  },
  setDestaques: (state, destaque) => (state.destaques = destaque),
  setPromocoes: (state, promocao) => (state.promocoes = promocao),
  Loaded: (state, loading) => (state.loading = loading),
  setLoaded:  (state, response) => (state.loaded = response),
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setReport: (state, report) => (state.report = report),
  setRating: (state, rating) => (state.ratingValue = rating),
  setCardapio: (state, categoria) => (state.categoria = categoria),
  setRated: (state, rated) => {
    if(rated.status){ //atualiza Rated
      var ratings = JSON.parse(JSON.stringify(window.localStorage.getItem('rated')))
      if(ratings!==null){
        ratings.push({store_name: rated.store_name})
      window.localStorage.setItem('rated', JSON.stringify(ratings))
      state.rated = true;
      }else{
        ratings= []
        ratings.push({store_name: rated.store_name})
        window.localStorage.setItem('rated', JSON.stringify(ratings))
        state.rated = true;
      }
      
    }else{
      state.rated = false
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
