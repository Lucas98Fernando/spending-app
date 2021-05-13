<template>
  <nav id="sidenav" class="nav flex-column justify-content-between">
    <div>
      <router-link
        :key="link.id"
        v-for="link in links"
        :to="link.to"
        class="nav-link"
      >
        <i :class="link.icon"></i>
        {{ link.name }}
      </router-link>

      <hr>

      <btn-nova-despesa />
    </div>
    <logout />
    <!-- <router-link class="nav-link" aria-current="page" to="/">
      <i class="fas fa-home"></i>
      Início
    </router-link>
    <router-link class="nav-link" to="/despesas">
      <i class="fas fa-hand-holding-usd"></i>
      Despesas
    </router-link> -->
  </nav>
</template>

<script>
import BtnNovaDespesa from './LayoutNovaDespesa'
import Logout from './LayoutLogout'

export default {
  name: 'LayoutNavigation',
  components: { BtnNovaDespesa, Logout },
  data () {
    return {
      links: [
        {
          id: 0,
          name: 'Início',
          icon: 'fas fa-home',
          to: '/'
        },
        {
          id: 1,
          name: 'Despesas',
          icon: 'fas fa-hand-holding-usd',
          to: '/despesas'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#sidenav {
  height: calc(100vh - 158px);
  margin: 0 -0.7rem;

  .nav-link {
    color: var(--light);
    /* border-top-right-radius: 30px;
    border-bottom-right-radius: 30px; */
    transition: 0.5s ease-in-out;

    &.router-link-exact-active {
      color: var(--light);
      background-color: var(--featured-dark);

      &:hover {
        background-color: var(--featured-dark);
      }
    }

    &:hover {
      background-color: var(--dark-low);
      color: var(--lighter);
      transition: 0.5s ease-in-out;
    }
  }

  .fas {
    margin-right: 0.5rem;
  }
}
</style>
