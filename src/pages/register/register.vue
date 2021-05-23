<template>
  <div id="register-page">
    <form id="form" @submit.prevent="register()">
      <div class="card">
        <div class="card-body">
          <div class="text-center">
            <img class="fluid logo-register" src="../../assets/images/spending.png" alt="" />
          </div>
          <h1 class="text-center mb-4">Sp&euro;ndings</h1>
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
          <div class="form-group mb-4">
            <label class="label-text" for="password">Confirmar Senha</label>
            <input
              id="password"
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="*******"
              required
            />
          </div>
          <button id="btn-register" class="btn btn-primary w-100" :disabled="loading">
              <!-- Template para quando o processo de autenticação estiver sendo executado -->
              <template v-if="loading">
                  <i class="fas fa-spinner fa-spin"></i>
                  Cadastrando...
              </template>
              <!-- Template padrão do botão de cadastro -->
              <template v-else>
                  Cadastrar
                  <i class="fas fa-user-plus"></i>
              </template>
          </button>
        </div>
        <div class="card-footer d-flex justify-content-center">
          <span
            >Já possui conta ? <router-link class="link-login" to="/login">Entrar</router-link>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      loading: false,
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register () {
      this.loading = true
      const { email, password, confirmPassword } = this
      try {
        if (password === confirmPassword) {
          const res = await this.$firebase.auth()
            .createUserWithEmailAndPassword(email, password)
          window.uid = res.user.uid
          this.$router.push({ name: 'Home' })
        } else {
          const message = 'As senhas não coincidem, tente novamente.'
          this.$root.$emit('Notification::show', {
            message,
            type: 'danger'
          })
          this.password = '' // Limpa o input de senha
          this.confirmPassword = '' // Limpa o input de senha
        }
        this.$root.$emit('Notification::show', {
          message: 'Bem-vindo(a) ao Spendings !',
          type: 'info'
        })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/email-already-in-use':
            message = 'O endereço de e-mail informado, já está em uso.'
            this.email = '' // Limpa o input de E-mail
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível criar a conta, tente novamente.'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/responsive.scss";

#register-page {
  background-image: url("../../assets/images/bg-coins.jpg");
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 0 0 10%;
  color: var(--dark-medium);

  @include responsive (sm) {
    padding: 5%;
    background-position: right;
  }

  .form {
    width: 30%;
    card {
      margin: 0 auto;
    }
  }

  .logo-register {
    width: 80px;
  }

  .link-login {
    color: var(--featured-dark);
    text-decoration: none;
    transition: .5s ease-in-out;

    &:hover {
      color: var(--featured);
      transition: .5s ease-in-out;
    }
  }
}
</style>
