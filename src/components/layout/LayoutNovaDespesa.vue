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
                <div class="form-group mt-4 col-12">
                  <input
                    class="d-none"
                    ref="inputFile"
                    type="file"
                    accept="image/*"
                    @change="handleFile($event)"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="openFileDialog()"
                  >
                    Adicionar comprovante
                  </button>
                  <div class="mt-2" v-if="form.receipt">
                    {{ form.receipt.name }}

                    <button
                      @click="form.receipt = ''"
                      type="button"
                      class="btn badge badge-light"
                    >
                      <i class="far fa-trash-alt text-danger"></i>
                    </button>
                  </div>
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
              <button class="btn btn-primary" :disabled="loading">
                <template v-if="loading">
                  <i class="fas fa-spinner fa-spin"></i>
                  Adicionando...
                </template>
                <template v-else>
                  Adicionar
                </template>
              </button>
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
      loading: false,
      showModal: false,
      form: {
        description: '',
        value: '',
        receipt: ''
      }
    }
  },
  computed: {
    // Para evitar ter nomes de arquivos repetidos
    fileName () {
      const { receipt } = this.form

      // Se houver arquivos com nome repetidos, será concatenado a hora atual
      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    // Abrir a caixa de upload de arquivos através do botão
    openFileDialog () {
      this.$refs.inputFile.value = ''
      // Acessando uma referência na DOM com o ref
      this.$refs.inputFile.click()
    },
    handleFile (event) {
      this.form.receipt = event.target.files[0]
      // console.log(event)
    },
    // Método para adicionar os items no firebase
    async submit () {
      // Váriavel da URL da imagem
      let url = ''
      this.loading = true

      try {
        this.$root.$emit('Spinner::show')
        // Passando o uid do usuário para o firebase
        const ref = this.$firebase.database().ref(window.uid)
        // Gera um hash único pra utilizar no firebase
        const id = ref.push().key

        // Se houver arquivo anexado
        if (this.form.receipt) {
          // Incluí ele no banco do firebase
          const snapshot = await this.$firebase
            .storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          // Gerando uma URL para imagem do comprovante da despesa
          url = await snapshot.ref.getDownloadURL()
        }

        // Dados que serão incluídos no firebase
        const payload = {
          id, // ID gerado
          receipt: url, // Arquivo de upload
          value: this.form.value, // Valor da despesa
          createdAt: new Date().getTime(), // Timestamp da hora atual
          description: this.form.description
        }

        // Criando uma nova entrada no banco do firebase, com os dados informados no form de despesas
        ref.child(id).set(payload, (err) => {
          // Tratamento dos erros no processo de inserção no firebase
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possível adicionar a despesa.'
            })
            this.loading = false
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Despesa adicionada com sucesso!'
            })

            this.closeModal()
            this.form.description = ''
            this.form.value = ''
            this.form.receipt = ''
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possível adicionar a despesa.'
        })
        this.loading = false
      } finally {
        // Quando as operações de tratamento encerrarem, o spinner desaparece
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
    },
    // Fechar o modal
    closeModal () {
      this.showModal = false
      this.form.receipt = ''
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
