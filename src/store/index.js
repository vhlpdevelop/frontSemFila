import Vue from 'vue'
import Vuex from 'vuex'
import storeLogin from './modules/login.store'
import storeUser from './modules/user.store'
import storeProduct from './modules/product.store'
import storeHistorico from './modules/historico.store'
import storePayment from './modules/payment.store'
import storePedidos from './modules/pedidos.store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // store/modules files
        storeLogin,
        storeProduct,
        storeUser,
        storePedidos,
        storePayment,
        storeHistorico
    }

})
