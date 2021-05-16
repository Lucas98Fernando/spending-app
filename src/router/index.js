import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: 'Início',
    description: 'Estatísticas das despesas'
  },
  // O webpackChunkName serve para chamar o componente somente quando necessário pela rota, ele cria o componenente da rota de forma separada
  component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home.vue')
},
{
  path: '/despesas',
  name: 'Despesas',
  meta: {
    title: 'Lista de Despesas',
    description: 'Lista das despesas'
  },
  component: () => import(/* webpackChunkName: "despesas" */ '../pages/spendings/SpendingsList.vue')
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: 'Entre na sua conta'
  },
  component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// É executado a cada mudança de rota
router.beforeEach((to, from, next) => {
  // Configurando o título das rotas de forma dinâmica
  document.title = `Spendings - ${to.meta.title}`

  // Se não existe uid e o nome da rota é diferente de login, o usuário é redirecionado para login
  if (!window.uid && to.name !== 'Login') {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
