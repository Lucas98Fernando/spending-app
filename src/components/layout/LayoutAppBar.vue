<template>
  <div class="app-bar row">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <i class="fas fa-bars" @click="$root.$emit('Sidebar::toggle')"></i>
          <span class="title-nav">{{ $route.meta.description }}</span>
        </div>
        <ul class="nav justify-content-end align-items-center">
          <li class="nav-item">
            <span id="welcome" class="lead"></span>
          </li>
          <li class="nav-item">
            <img src="../../assets/images/user.png" alt="User" />
          </li>
        </ul>
      </div>
    </nav>
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
@import "../../assets/scss/responsive.scss";
.app-bar {
  .fas {
    cursor: pointer;
    font-size: 20px;
    transition: .3s ease-in-out;

    &:hover {
      color: var(--featured);
    }
  }

  .container-fluid {
    @include responsive (sm) {
      padding: 0.5rem;
    }
  }

  .nav {
    .nav-item {
      margin-left: 1rem;

      &:nth-child(1) {
        @include responsive (sm) {
          display: none;
        }
      }

      &:nth-child(2) {
        @include responsive (sm) {
          margin-left: 0;
        }
      }
    }
  }

  .title-nav {
    color: var(--featured);
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1rem;

    @include responsive (sm) {
      font-size: 1rem;
    }
  }
}
</style>
