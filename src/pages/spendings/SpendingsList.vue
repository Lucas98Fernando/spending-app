<template>
  <div>
    <!-- Barra de navegação dos meses -->
    <div class="months-navigation">
      <div
        :key="i"
        v-for="(month, i) in groupedMonths"
        @click="setActiveMonth(month)"
        class="months-link"
        :class="{ active: month.month == activeMonth.month }"
      >
        <span class="date-label">{{ month.month }}</span>
        <span class="value-label" v-money-format="month.total"></span>
      </div>
    </div>

    <!-- Lista das despesas-->
    <div class="container-fluid container-list-spendings">
      <div v-if="activeMonth.data && !activeMonth.data.length">
        Nenhum dado cadastrado
      </div>
      <template v-else>
        <div class="row mb-2 heading-table">
          <div class="col-sm-2"><span>Data de criação</span></div>
          <div class="col-sm-8"><span>Descrição</span></div>
          <div class="col-sm-2"><span>Valor</span></div>
        </div>
        <spending-list-item
          :key="index"
          :data="item"
          v-for="(item, index) in activeMonth.data"
        />
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// Importando o módulo do groupBy do lodash
import groupBy from 'lodash.groupby'
import SpendingListItem from './SpendingListItem'
export default {
  name: 'SpendingsList',
  components: {
    SpendingListItem
  },
  data () {
    return {
      spendings: [],
      activeMonth: {}
    }
  },
  // No ciclo de vida do created, o método getData() será chamado
  created () {
    this.getData()
  },
  mounted () {
    this.setActiveMonth()
  },
  computed: {
    groupedMonths () {
      let groupedMonths = []

      const addCurrentMonth = () => {
        // Adicionando um novo indíce ao array
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format('MM/YYYY')
        })
      }

      if (this.spendings.length) {
        // Usando a biblioteca do lodash
        const months = groupBy(this.spendings, (i) =>
          // Utilizando a biblioteca do moment e passando a data de criação da despesa
          moment(i.createdAt).format('MM/YYYY')
        )

        // Ordenando o array dos meses
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'
          // Usando o moment para pegar os dados de meses e anos anteriores no firebase
          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1
        })
        // Total gasto
        groupedMonths = sortedMonths.map((month) => ({
          month,
          data: months[month],
          total: months[month]
            .map((i) => parseFloat(i.value))
            .reduce((a, c) => a + c, 0)
        }))

        // Constante para pegar o último mês e depois verificar se o mês é igual ao mês atual
        const lastMonth = moment(
          groupedMonths[groupedMonths.length - 1].month,
          'MM/YYYY'
        )

        // isSame é um método do moment para verificar se um objeto do momento é igual ao segundo objeto passado
        // Verifica se o mês anterior NÃO é igual ao mês atual
        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }
      return groupedMonths
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
    },
    setActiveMonth (month = null) {
      this.activeMonth =
        month || this.groupedMonths[this.groupedMonths.length - 1]
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

.container-list-spendings {
  padding: 2rem 0 1rem;
  height: calc(100vh - 175px);
  overflow: hidden auto;

  .heading-table span {
    font-size: 1.1rem;
    color: var(--light-medium);
    font-weight: 600;
  }
}
</style>
