import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
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
  // Se não existe uid e o nome da rota é diferente de login, o usuário é redirecionado para login
  if (!window.uid && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
