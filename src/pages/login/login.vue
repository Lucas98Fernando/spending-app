<template>
  <div id="login-page">
    <form id="form" @submit.prevent="doLogin()">
      <div class="card">
        <div class="card-body">
          <div class="text-center">
            <img class="fluid logo-login" src="../../assets/logo.png" alt="" />
          </div>
          <h1 class="text-center mb-4">Spending</h1>
          <div class="form-group mb-4">
            <label class="label-text" for="email">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="examplo@email.com"
              required
            />
          </div>
          <div class="form-group mb-4">
            <label class="label-text" for="password">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="*******"
              required
            />
          </div>
          <button id="btn-login" class="btn btn-primary w-100" :disabled="loading">
              <!-- Template para quando o processo de autenticação estiver sendo executado -->
              <template v-if="loading">
                  <i class="fas fa-spinner fa-spin"></i>
                  Entrando...
              </template>
              <!-- Template padrão do botão de login -->
              <template v-else>
                  <i class="fas fa-sign-in-alt"></i>
                  Entrar
              </template>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      email: 'lucas@email.com',
      password: '12345678'
    }
  },
  methods: {
    // Método para realizar a autenticação de login
    async doLogin () {
      // Mesma coisa de: const email = this.email
      const { email, password } = this

      // Enquanto o processo de autenticação estiver ocorrendo, o ícone de loading estará ativo
      this.loading = true

      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        // Verifica o uid do usuário
        window.uid = res.user.uid

        // Com o usuário autenticado, acontece o redirecionamento para a rota: '/home'
        this.$router.push({ name: 'Home' })
        // console.log(res)
      } catch (err) {
        let messageError = ''

        switch (err.code) {
          case 'auth/user-not-found':
            messageError = 'E-mail incorreto.'
            break
          case 'auth/wrong-password':
            messageError = 'Senha incorreta.'
            break
          default:
            messageError = 'Não foi possível realizar o login.'
        }
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: messageError
        })
      }

      // Configurando o loading para falso, caso não aconteça o login
      this.loading = false
    }
  },
  // Será chamado antes da rota ser chamada
  beforeRouterEnter (to, from, next) {
    next(vm => {
      // Se existe uid, o usuário é redirecionado para rota '/home'
      if (window.uid) {
        vm.$router.push({ name: 'Home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#login-page {
  background-image: url("../../assets/images/bg-coins.jpg");
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 0 0 10%;
  color: var(--dark-medium);

  .form {
    width: 30%;
    card {
      margin: 0 auto;
    }
  }

  .logo-login {
    width: 80px;
  }
}
</style>
