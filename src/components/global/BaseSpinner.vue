<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <img class="logo-loading" src="../../assets/images/spending.png" />
    <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  created () {
    // Evento para ouvir mudanças dentro do root do vue, para alterar o estado e chamar o spinner
    // Mostrando o spinner
    this.$root.$on('Spinner::show', () => {
      this.visible = true
    })
    // Ocultando o spinner
    this.$root.$on('Spinner::hide', () => {
      this.visible = false
    })
  }
}
</script>

<style lang="scss" scoped>
.base-spinner {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  z-index: 100000;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--dark-medium);

  .logo-loading {
    width: 100px;
    margin-bottom: 1rem;
  }

  .fa-spin {
    color: var(--featured);
  }
}
</style>
