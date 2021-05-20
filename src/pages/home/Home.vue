<template>
  <div class="home">
    <div class="row">
      <div class="col-md-6 box-stats">
        <div class="card">
          <div class="card-body text-center">
            <img src="../../assets/images/coins1.png" alt="Seus gastos">
            <h3 class="card-title">Seus gastos</h3>
            <h6 class="card-subtitle mb-2 text-muted">
              Resumo de todos os seus gastos
            </h6>
            <span class="card-text" v-money-format="totals.totalSpend"></span>
            <span>em {{ spendings.length }} compras</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 box-stats">
        <div class="card">
          <div class="card-body text-center">
            <img src="../../assets/images/coins4.png" alt="Maior despesa">
            <h3 class="card-title">Valor médio das despesas</h3>
            <h6 class="card-subtitle mb-2 text-muted">
              Média baseada em todos os seus gastos
            </h6>
            <span class="card-text" v-money-format="totals.averageSpend"></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 box-stats">
        <div class="card">
          <div class="card-body text-center">
            <img src="../../assets/images/coins2.png" alt="Maior despesa">
            <h3 class="card-title">Maior despesa</h3>
            <h6 class="card-subtitle mb-2 text-muted">
              Maior valor gasto em todas as suas depesas
            </h6>
            <span class="card-text" v-money-format="totals.biggest.value"></span>
            <span v-date-format="totals.biggest.createdAt"></span>
          </div>
        </div>
      </div>
      <div class="col-md-6 box-stats">
        <div class="card">
          <div class="card-body text-center">
            <img src="../../assets/images/coins3.png" alt="Menor despesa">
            <h3 class="card-title">Menor despesa</h3>
            <h6 class="card-subtitle mb-2 text-muted">
              Menor valor gasto em todas as suas depesas
            </h6>
            <span class="card-text" v-money-format="totals.lowest.value"></span>
            <span v-date-format="totals.lowest.createdAt"></span>
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
  computed: {
    // Propriedades computadas para gerar os dados para home, exxtraindo informações do firebase
    totals () {
      const { spendings: spend } = this
      const values = {
        totalSpend: 0,
        averageSpend: 0,
        biggest: {},
        lowest: {}
      }

      if (spend.length) {
        // Total gasto
        // Transformando os dados em um map, depois conventendo para float e realizando a soma com o reduce
        // O count é o valor total, o curr, é o valor atual para ser incrementado
        values.totalSpend = spend
          .map((e) => parseFloat(e.value))
          .reduce((count, curr) => count + curr, 0)

        // Média de gastos
        values.averageSpend = values.totalSpend / spend.length

        // Maior valor
        values.biggest = spend.sort(
          (a, b) => parseFloat(b.value) - parseFloat(a.value)
        )[0]

        // Menor valor
        values.lowest = spend.sort(
          (a, b) => parseFloat(a.value) - parseFloat(b.value)
        )[0]
      }
      return values
    }
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
  // padding: 0.5rem 0 0;
  .box-stats {
    .card {
      color: var(--light);
      background: var(--dark-medium);
      border: 1px solid var(--featured-dark);
      height: calc(40vh - 0.6rem);
      margin: 10px 0;
      transition: 0.3s ease-in-out;

      .card-body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .card-text {
          font-size: 2rem;
          color: var(--featured-dark);
          font-weight: 700;
        }
      }

      &:hover {
        transform: scale(1.03);
        transition: 0.3s ease-in-out;
      }
    }
  }
}
</style>
