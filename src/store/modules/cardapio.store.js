
const url ="https://api-semfila.api-semfila.online/cardapio/"


import axios from "axios";

const state = {
    categoria: [],
    destaques: [],
    promocoes: [],
    response: false,
    responseMsg: "",
    loaded: false,
    loading: true, //MUDAR DEPOIS PARA FALSE
};
const getters = {
  getDestaques: (state) => state.destaques,
  getCardapio: (state) => state.categoria,
  getPromocoes: (state) => state.promocoes,
  getResponseCardapio: (state)=> state.response,
  getResponseMsgCardapio: (state) => state.responseMsg,
  getLoading: (state)=> state.loading,
  getLoaded: (state) => state.loaded
  
};

const actions = {
  async cardapioLoaded({commit}){
    commit("Loaded", true) //Cardapio carregado
  },
  async LoadStore({commit}, itemData){ //BUSCA CARDAPIO DA LOJA
    if(itemData!==""){
      try{
        
        await axios
          .get(`https://api-semfila.api-semfila.online/store/getStore/${itemData}`)
          .then(function(response) {
            //Organizar categorias, items, destaques e Promoções
            //1- Destaques
            if(response.data.success){
              console.log(response.data.obj)
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
            commit("setResponseMsg", "teste")
            commit("setCardapio", response.data.obj)
            
          });
      }catch(e){
        //console.log(e)
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
  setDestaques: (state, destaque) => (state.destaques = destaque),
  setPromocoes: (state, promocao) => (state.promocoes = promocao),
  Loaded: (state, loading) => (state.loading = loading),
  setLoaded:  (state, response) => (state.loaded = response),
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setCardapio: (state, categoria) => (state.categoria = categoria),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
