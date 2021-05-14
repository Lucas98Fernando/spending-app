<template>
  <div class="months-navigation">
    <div :key="i" v-for="(month, i) in groupedMonths" class="months-link">
      <span class="date-label">{{ month.month }}</span>
      <span class="value-label" v-money-format="month.total"></span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// Importando o módulo do groupBy do lodash
import groupBy from 'lodash.groupby'
export default {
  name: 'ListaDespesas',
  data () {
    return {
      spendings: []
    }
  },
  // No ciclo de vida do created, o método getData() será chamado
  created () {
    this.getData()
  },
  computed: {
    groupedMonths () {
      if (this.spendings.length) {
        // Usando a biblioteca do lodash
        const months = groupBy(this.spendings, (i) =>
          // Utilizando a biblioteca do moment e passando a data de criação da despesa
          moment(i.createdAt).format('MM/YYYY')
        )

        // Ordenando o array dos meses
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY'
          // Usando o moment para pegar os dados de meses e anos anteriores no firebase
          if (moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))) {
            return -1
          } else {
            return +1
          }
        })
        // Total gasto
        return sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map((i) => parseFloat(i.value)).reduce((a, c) => a + c, 0)
        }))
      } else {
        return []
      }
    }
  },
  methods: {
    // Método para buscar os dados do firebase
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', (snapshot) => {
        const values = snapshot.val()
        this.spendings = Object.keys(values).map((i) => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.months-navigation {
  width: 100%;
  display: flex;
  margin: 1rem 0 0;
  justify-content: space-around;
  background: var(--dark-medium);
  border-radius: 20px;

  .months-link {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0;
    transition: 0.5s ease-in-out;

    &:hover {
      background: var(--dark-low);
      cursor: pointer;
    }

    &:hover:nth-child(1) {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:hover:nth-child(4) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    &.active {
      background: var(--featured-dark);
    }

    &:not(:last-child) {
      border-right: 1px solid var(--featured);
    }

    .date-label {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .value-label {
      font-size: 0.8rem;
    }
  }
}
</style>
