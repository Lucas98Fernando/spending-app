<template>
  <div id="app">
    <base-spinner />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 sidebar">
          <div class="text-center my-4">
            <img class="logo-sidebar" src="./assets/logo.png" />
          </div>
          <layout-navigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner.vue'
import LayoutNavigation from './components/layout/LayoutNavigation.vue'
export default {
  name: 'App',
  components: { BaseSpinner, LayoutNavigation },
  data () {
    return {
      isLogged: false
    }
  },
  mounted () {
    // Quando for logar ou deslogar, esse método será chamado
    this.$firebase.auth().onAuthStateChanged((user) => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      // Se o usuário tiver uid, é direcionado para home, se não... é redirecionado para login
      this.$router.push({ name: window.uid ? 'Home' : 'Login' })

      // Timeout pra não exibir o formulário quando a rota é alternada através da URL
      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 100)
    })
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--darker);
  color: var(--light);

  .sidebar {
    background-color: var(--dark-medium);
    .logo-sidebar {
      width: 70px;
    }
  }
}
</style>
