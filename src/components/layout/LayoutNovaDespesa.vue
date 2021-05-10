<template>
  <div>
    <button class="btn btn-lg btn-add-despesa" @click="showModal = true">
      <i class="fas fa-plus-circle"></i>
      Nova despesa
    </button>

    <form @submit.prevent="submit()">
      <div
        class="modal fade"
        :class="{ show: showModal }"
        :style="{ display: showModal ? 'block' : 'none' }"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Adicionar nova despesa
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="closeModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="description">Descrição:</label>
                  <input
                    id="description"
                    name="description"
                    v-model="form.description"
                    class="form-control"
                    type="text"
                    placeholder="Mensalidade da faculdade..."
                    required
                  />
                </div>
                <div class="form-group col-4">
                  <label for="value">Valor:</label>
                  <input
                    id="value"
                    name="value"
                    v-model="form.value"
                    class="form-control"
                    type="text"
                    placeholder="20.00"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal()"
              >
                Fechar
              </button>
              <button class="btn btn-primary">Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div
      class="modal-backdrop fade"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNovaDespesa',
  data () {
    return {
      showModal: false,
      form: {
        description: '',
        value: ''
      }
    }
  },
  methods: {
    // Método para adicionar os items no firebase
    submit () {
      this.$root.$emit('Spinner::show')
      // Passando o uid do usuário para o firebase
      const ref = this.$firebase.database().ref(window.uid)
      // Gera um hash único pra utilizar no firebase
      const id = ref.push().key

      // Dados que serão incluídos no firebase
      const payload = {
        id, // ID gerado
        receipt: '', // Arquivo de upload
        value: this.form.value, // Valor da despesa
        createdAt: new Date().getTime(), // Timestamp da hora atual
        description: this.form.description
      }

      // Criando uma nova entrada no banco do firebase, com os dados informados no form de despesas
      ref.child(id).set(payload, (err) => {
        this.$root.$emit('Spinner::hide')
        // Tratamento dos erros no processo de inserção no firebase
        if (err) {
          console.error(err)
        } else {
          this.closeModal()
          this.form.description = ''
          this.form.value = ''
        }
      })
    },
    // Fechar o modal
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-add-despesa {
  display: flex;
  align-items: center;
  color: var(--featured);
  border: 1px solid var(--featured);
  border-radius: 30px;
  margin: 0.5rem auto 0;

  &:hover {
    color: var(--featured-dark);
    border: 1px solid var(--featured-dark);
  }
}

.modal {
  color: var(--darker);
}
</style>
