import Vue from 'vue'
import moment from 'moment'

// Diretiva para formatação dos valores para moeda brasileira
Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2
  }).format(value || 0)
})

// Diretiva para formatação de datas com a biblioteca do moment js
Vue.directive('date-format', (el, { value }) => {
  el.innerHTML = moment(value).format('DD/MM/YYYY [às] HH:mm:ss')
})
