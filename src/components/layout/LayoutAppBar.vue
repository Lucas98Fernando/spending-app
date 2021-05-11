<template>
  <div class="app-bar row">
    <ul class="nav justify-content-end align-items-center">
      <li class="nav-item">
        <span id="welcome" class="lead"></span>
      </li>
      <li class="nav-item">
        <img src="../../assets/images/user.png" alt="User" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LayoutAppBar',
  mounted () {
    this.$firebase.auth().onAuthStateChanged((user) => {
      // console.log(user)

      document.querySelector('#welcome').innerHTML = `Olá, ${user.email}`
    })
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  .nav-item {
    margin-left: 1rem;
  }
}
</style>
