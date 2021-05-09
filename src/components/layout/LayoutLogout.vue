<template>
  <button class="btn btn-logout" @click="logout()">
    Sair
    <i class="fas fa-sign-out-alt"></i>
  </button>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    async logout () {
      // Mostrando o spinner enquanto ocorre o processo de logout
      this.$root.$emit('Spinner::show')
      // Método do firebase para logout
      await this.$firebase.auth().signOut()
      // Quando ocorrer o logout, o usuário é redirecionado para rota de login
      this.$router.push({ name: 'Login' })
      // Quando o processo de logout for finalizado, o spinner desaparece
      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-logout {
  width: 50%;
  margin: 0 auto 1rem;
  color: var(--light);
  border: 1px solid var(--light);
  border-radius: 20px;
  transition: .5s ease-in-out;

  &:hover {
    background: var(--red-dark);
    color: var(--light);
    transform: scale(1.1);
  }
}
</style>
