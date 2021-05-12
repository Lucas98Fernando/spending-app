<template>
  <div class="home">
    <div class="row">
      <div class="col-6 box-stats">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Seus gastos</h3>
            <h6 class="card-subtitle mb-2 text-muted">Resumo de todos os seus gastos</h6>
            <p class="card-text">
              R$ 500,00
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 box-stats">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 box-stats">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 box-stats">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      spendings: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // Método para resgatar as informações do banco do firebase
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      // Listener para o ref, onde para cada novo dado inserido ou removido no firebase seja sincronizado
      ref.on('value', (data) => {
        const values = data.val()
        // Transformando os dados recebidos do firebase em um array de objetos
        this.spendings = Object.keys(values).map((i) => values[i])

        // console.log(Object.keys(values).map(i => values[i]))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0.5rem 0 0;
  .box-stats {
    .card {
      color: var(--light);
      background: var(--dark-medium);
      border: 1px solid var(--featured-dark);
      height: calc(40vh - 0.5rem);
      margin: 10px 0;

      .card-body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
}

  /* .box-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(42vh - 1.3rem);
    border: 1px solid var(--featured-dark);

    .card {
      width: 100%;
    }

    &:nth-child(2),
    &:nth-child(4) {
      border-left: none;
    }

    &:nth-child(3),
    &:nth-child(4) {
      border-top: none;
    }
  } */
</style>
