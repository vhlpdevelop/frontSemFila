//const url = "http://localhost:3000/cardapio/";
const url ="https://api-semfila.api-semfila.online/cardapio/"
//https://semfila-api.herokuapp.com/store/getStore/"
//const url = "https://semfila-api.herokuapp.com"

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
      }
    }
  },
  async deleteItemFromCategoria({commit},itemData){
    if(itemData!==""){
      commit("deleteItemCategoria", itemData);
      commit("setResponse", true)
      commit("setResponseMsg", "Item deletado com sucesso")
    }
  },
  async nameUpdateCategoria({commit}, itemData){
    if(itemData !== null)
      if(itemData !== ""){
        
        commit("updateCategoria", itemData)
        commit("setResponse", true)
        commit("setResponseMsg", "Nome da Categoria foi Atualizada")
      }
        
  },
  async deleteCategoriaFromCardapio({commit}, itemData){
    if(itemData !== null)
      if(itemData !== ""){
        commit("deleteCategoriaCardapio", itemData)
        commit("setResponse", true)
        commit("setResponseMsg", "Removendo")
      }
  },
  async updateNewCategoria({commit},itemData){
    if(itemData !== null)
      if(itemData !== ""){
        itemData.items = []
        commit("addCategoria", itemData)
      }
        
  },
  async updateNewItem({commit},itemData){
    ////console.log(itemData)
    if(itemData !== null)
      if(itemData !== ""){
        //console.log("flag")
        commit("addItemtoCategoria", itemData)
      }
        
  },

    updateItemFromCategoria({commit}, itemData){
      if(itemData !== null)
      if(itemData !== ""){
        //console.log("flag")
        commit("updateItemfromCategoria", itemData)
      }
    },
    async updateItemStatus({commit}, itemData){
      //console.log(itemData)
      if (itemData.objSend.status) {
        itemData.objSend.status = false;
      } else {
        itemData.objSend.status = true;
      }
    try{
      await axios
        .post(url + "updateItemStatus", itemData) //Função simples para o cardapio.
        .then(function(response) {
            ////console.log(response)
          
          commit("updateItem", response.data.obj)
          commit("setResponse", response.data.success)
          commit("setResponseMsg", response.data.msg)
          
        });
    }catch(e){
      //console.log(e)
    }
  },
  async updateCategoryStatus({commit}, itemData){
    
    if (itemData.status) {
      itemData.status = false;
    } else {
      itemData.status = true;
    }
  try{
    await axios
      .post(url + "updateCategoryStatus", itemData) //Função simples para o cardapio.
      .then(function(response) {
        commit("updateCategoria", response.data.obj)
        commit("setResponse", response.data.success)
        commit("setResponseMsg", response.data.msg)
        
      });
  }catch(e){
    //console.log(e)
  }
}
};

const mutations = {
  setDestaques: (state, destaque) => (state.destaques = destaque),
  setPromocoes: (state, promocao) => (state.promocoes = promocao),
  Loaded: (state, loading) => (state.loading = loading),
  setLoaded:  (state, response) => (state.loaded = response),
  setResponse: (state, response) => (state.response = response),
  setResponseMsg: (state, responseMsg) => (state.responseMsg = responseMsg),
  setCardapio: (state, categoria) => (state.categoria = categoria),
  addCategoria: (state, categoria) => {
    let aux = categoria.listData
    aux.push(categoria.itemData)
    state.categoria = aux
  },
  updateItem: (state, categoria) => {
    
    state.categoria[categoria.index] = categoria.item

  },
  updateItemfromCategoria: (state, categoria)=>{
    //console.log(categoria)
    const index = state.categoria.findIndex(
      (category) => category._id === categoria.category_id
    );
    if(index > -1){
      state.categoria[index].items[categoria.index] = categoria
    }
  },
  updateCategoria: (state, categoria) => {
    
    let index = state.categoria.map(e=>e._id).indexOf(categoria._id);
    state.categoria[index] = categoria
  },
  deleteCategoriaCardapio: (state, categoria)=>{
    const index = state.categoria.findIndex(
      (category) => category._id === categoria
    );
    if(index > -1){

      state.categoria.splice(index, 1)

    }
  },
  deleteItemCategoria: (state, categoria)=>{
    const index = state.categoria.findIndex(
      (category) => category._id === categoria.itemData.category_id
    );
    if(index > -1){
      state.categoria[index].items.splice(categoria.index, 1)
    }
  },
  addItemtoCategoria: (state, categoria)=>{
    //console.log(categoria)
    const index = state.categoria.findIndex(
      (category) => category._id === categoria.category_id
    );
    //console.log(index)
    if(index > -1){
      //console.log(state.categoria[index].items)
      state.categoria[index].items.push(categoria)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
