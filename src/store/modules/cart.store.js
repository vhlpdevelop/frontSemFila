//const url = "http://localhost:3000/cart/";
const url = "https://semfila-api.herokuapp.com/cart/"

let cart = window.localStorage.getItem('cart');
let cartSize = window.localStorage.getItem('cartSize');

const state = {
  cart: cart ? JSON.parse(cart) : [],
  cartSize: cartSize ? parseInt(cartSize) : 0,
};
const getters = {
  getCart: (state) => state.cart,
  getCartSize: (state) => state.cartSize,
  
};

const actions = {
  async addCart({commit}, itemData){
    commit('addCart', itemData)
    commit('updateSize')
    commit('saveCart');
  },
  async DeleteItem({commit}, itemData){
    commit('DeleteItem', itemData)
    commit('updateSize')
    commit('saveCart');
  },
  async clearCart({commit}){
    commit('setClearCart');
  },
};

const mutations = {
  addCart: (state, cart) => {
    const index = state.cart.findIndex(
        (itemCart) => itemCart._id === cart._id
      );
    if(index > -1){
        let aux = cart
        state.cart.splice(index, 1);
        state.cart.push(JSON.parse(JSON.stringify(aux)))
    }else{
      let aux = cart
      //console.log(aux)
    state.cart.push(JSON.parse(JSON.stringify(aux)))
    }
  },
  setClearCart: (state)=>{
    state.cart = []
    state.cartSize = 0
    window.localStorage.setItem('cart', []);
    window.localStorage.setItem('cartSize', 0);
  },
  updateSize: (state) => {
    state.cartSize = state.cart.length.toString()
  },
  saveCart(state) {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
    window.localStorage.setItem('cartSize', state.cartSize);
  },
  DeleteItem: (state, item) => {
    const index = state.cart.findIndex(
      (itemCart) => itemCart._id === item._id
    );
      
    if (index !== -1) {
      state.cart.splice(index, 1);
      
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};