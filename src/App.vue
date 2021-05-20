<template>
  <div id="app">
    <base-spinner />
    <layout-notification />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 sidebar" v-if="isOpen">
          <div class="text-center my-4">
            <img class="logo-sidebar" src="./assets/images/spending.png" />
            <h2>Sp&euro;ndings</h2>
          </div>
          <layout-navigation />
          <i class="fas fa-times-circle close-sidebar" @click="$root.$emit('Sidebar::toggle')"></i>
        </div>
        <div class="col content-right py-2 px-4">
          <layout-app-bar />
          <router-view />
        </div>
      </div>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNotification from './components/layout/LayoutNotification'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutAppBar from './components/layout/LayoutAppBar'
export default {
  name: 'App',
  components: {
    BaseSpinner,
    LayoutNotification,
    LayoutNavigation,
    LayoutAppBar
  },
  data () {
    return {
      isLogged: false,
      isOpen: true
    }
  },
  created () {
    this.$root.$on('Sidebar::toggle', () => {
      this.isOpen = !this.isOpen
    })
  },
  mounted () {
    // Quando for logar ou deslogar, esse método será chamado
    this.$firebase.auth().onAuthStateChanged((user) => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      // console.log(user)

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
@import "assets/scss/responsive.scss";
#app {
  min-height: 100vh;
  background-color: var(--dark-medium);
  color: var(--light);

  .sidebar {
    background-color: var(--dark-medium);

    .logo-sidebar {
      width: 70px;
    }

    @include responsive(sm) {
      position: fixed;
      width: 250px;
      height: 100vh;
      z-index: 1000;
    }

    .close-sidebar {
      display: none;

      @include responsive (sm) {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.5rem;
      }
    }
  }

  .content-right {
    background: var(--darker);
    border-radius: 40px;
    margin: 0.7rem 0.7rem 0.7rem 0;
    border: 1px solid var(--featured-dark);

    @include responsive (sm) {
      margin: 0.5rem;
    }
  }
}
</style>
