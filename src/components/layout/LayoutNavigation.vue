<template>
  <nav class="nav flex-column">
    <router-link class="nav-link" aria-current="page" to="/">
      <i class="fas fa-home"></i>
      Início
    </router-link>
    <router-link class="nav-link" to="/despesas">
      <i class="fas fa-hand-holding-usd"></i>
      Despesas
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Layout Navigation'
}
</script>

<style lang="scss">
.nav {
  height: calc(100vh - 118px);
  margin: 0 -0.7rem;

  .nav-link {
    color: var(--light);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    transition: .5s ease-in-out;

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
      transition: .5s ease-in-out
    }
  }

  .fas {
    margin-right: 0.5rem;
  }
}
</style>
