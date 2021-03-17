import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path:'/', 
      name: 'login',
      props:true,
      component: () => import('../components/User/login'), 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/Dashboard/dashboard'),
      props:true,
      children: [
        {
          path: '/produto',
          name: 'produto',
          component: () => import('../components/Produto/painelProduto'),
        },
        {
          path: '/editProduct',
          name: 'Editar Produto',
          component: () => import("../components/Produto/editarProduto"),
          props:true
        },
        {
          path: '/addProduct',
          name: 'Novo Produto',
          component: () => import("../components/Produto/addProduto")
        },
        {
          path: '/pedidos',
          name: 'pedidos',
          component: () => import('../components/Pedido/painelPedidos'),
        },
        {
          path: '/editPedido',
          name: 'Editar Pedido',
          component: () => import("../components/Pedido/editarPedido"),
          props:true
        },
        {
          path: '/addPedido',
          name: 'Novo Pedido',
          component: () => import("../components/Pedido/addPedido")
        },
        {
          path: '/visualizarPedido',
          name: 'Visualizar Pedido',
          component: () => import("../components/Pedido/VisualizarPedido"),
          props: true
        },
        {
          path: '/historico',
          name: 'historico',
          component: () => import('../components/Historico/painelHistorico')
        },
        {
          path: '/usuarios',
          name: 'usuarios',
          component: () => import('../components/User/painelUsuario'),
        },
        {
          path: '/financeiro',
          name: 'financeiro',
          component:()=> import('../components/Financeiro/painelFinanceiro')
        }
      ],
    },
  ]
})
