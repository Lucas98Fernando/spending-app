<template>
  <div id="app">
    <router-view />
    <base-spinner />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner.vue'
export default {
  name: 'App',
  components: { BaseSpinner },
  mounted () {
    // Quando for logar ou deslogar, esse método será chamado
    this.$firebase.auth().onAuthStateChanged((user) => {
      window.uid = user ? user.uid : null

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
  background-color: var(--dark-medium);
  color: var(--light);
}
</style>
