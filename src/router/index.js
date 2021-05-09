import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: 'Spending - Início'
  },
  // O webpackChunkName serve para chamar o componente somente quando necessário pela rota, ele cria o componenente da rota de forma separada
  component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home.vue')
},
{
  path: '/despesas',
  name: 'Despesas',
  meta: {
    title: 'Spending - Despesas'
  },
  component: () => import(/* webpackChunkName: "despesas" */ '../pages/despesas/Despesas.vue')
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: 'Spending - Entrar'
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
  document.title = to.meta.title

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
