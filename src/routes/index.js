import Vue from 'vue'
import Router from 'vue-router'
import VueGtag  from 'vue-gtag'
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
      path: '/:id/autenticar',
      name: 'verifyEmail',
      props:true,
      component: () => import('../components/User/verifyEmail.vue')
    },
    {
      path: '/:id/recuperarSenha',
      name: 'passwordRecovery',
      props:true,
      component: () => import('../components/User/passwordRecovery.vue')
    },
    {
      path:'/recuperarSenha', 
      name: 'forgotPassword',
      props:true,
      component: () => import('../components/User/forgotPassword'), 
    },
    {
      path:'/entrar', 
      name: 'entrar',
      props:true,
      component: () => import('../components/User/login'), 
    },
    
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../components/Dashboard/dashboard'),
      redirect: { name: 'home'},
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
        },
        {
          path:'/privacidade',
          name: 'privacidade',
          component: () => import('../components/User/privacidade.vue'),
        },
        {
          path:'/TermosdeUso',
          name: 'termos',
          component: () => import('../components/User/termos.vue'),
        },
        {
          path:'/comece',
          name: 'comece',
          component: () => import('../components/Dashboard/comece.vue'),
        },
        {
          path:'/carreiras',
          name: 'carreira',
          component: () => import('../components/Dashboard/carreiras.vue'),
        },
        {
          path:'/tornarSemFila',
          name: 'tornar',
          component: () => import('../components/Dashboard/tornar.vue'),
        },
        {
          path:'/ajuda',
          name: 'ajuda',
          component: () => import('../components/User/ajuda.vue'),
        },
        {
          path:'/:id',
        name: 'helperComponent',
        props:true,
        component: () => import('../components/User/Ajuda/helperComponent.vue'),
        },
        {
          path:'/perguntasFrequentes',
          name: 'faq',
          component: () => import('../components/User/Ajuda/faq.vue'),
        },
      ],
    },
  ]
})

Vue.use(VueGtag, {
  config: { id: "G-PR7C6XMHD2" },
  appName: 'SemFila Front',
  pageTrackerScreenviewEnabled: true
}, router);
export default router