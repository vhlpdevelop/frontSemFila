import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path:'/cardapio/:id/',
      name: ':id',
      props:true,
      component: () => import('../components/Cardapio/cardapio.vue'),
      children: [
        {
          path:'/:id/home',
          name: 'homeCardapio',
          props:true,
          component: () => import('../components/Cardapio/Cardapiohome.vue'),
        },
        {
          path:'/:id/destaque',
          name: 'destaques',
          props:true,
          component: () => import('../components/Cardapio/destaques.vue'),
        },
        {
          path:'/:id/promocao',
          name: 'promocoes',
          props:true,
          component: () => import('../components/Cardapio/promocoes.vue'),
        },
        {
          path:'/:id/categoria/:id2/',
          name: 'categoria',
          props:true,
          component: () => import('../components/Cardapio/Categoria/categoria.vue'),
        },
        {
          path:'/:id/compra',
          name: 'compra',
          props:true,
          component: () => import('../components/Payment/compra.vue'),
        },
        {
          path:'/:id/checkout',
          name: 'checkout',
          props:true,
          component: () => import('../components/Payment/checkout.vue'),
        },
        {
          path:'/:id/payment',
          name: 'payment',
          props:true,
          component: () => import('../components/Payment/payment.vue'),
        },
        {
          path: '/:id/QrCodes',
          name: 'qrcodesOnCardapio',
          component: () => import('../components/User/QrCodes.vue'),
        }
      ]
    },
    {
      path:'/entrar', 
      name: 'entrar',
      props:true,
      component: () => import('../components/User/signUp'), 
    },
    
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../components/Dashboard/dashboard'),
      props:true,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import("../components/Dashboard/home"),
          props:true
        },
        {
          path: '/QrCodes',
          name: 'qrcodes',
          component: () => import('../components/User/QrCodes.vue'),
        }
      ],
    },
  ]
})
/*
function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}

router.beforeEach((to, from, next) => {
   if(!hasQueryParams(to) && hasQueryParams(from)){
    next({name: to.name, query: from.query});
  } else {
    next()
  }
})
*/
//router.replace({ path: '*', redirect: '/' })
export default router