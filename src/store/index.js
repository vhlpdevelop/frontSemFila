import Vue from 'vue'
import Vuex from 'vuex'
import storeLogin from './modules/login.store'
import storeUser from './modules/user.store'
import storeCart from './modules/cart.store'
import storeCardapio from './modules/cardapio.store'
import storeCategoria from './modules/categoria.store'
import storeItem from "./modules/item.store"
import storePay from './modules/payment.store'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // store/modules files
        storeLogin,
        storeUser,
        storeCardapio,
        storeCategoria,
        storeItem,
        storeCart,
        storePay
    }

})
