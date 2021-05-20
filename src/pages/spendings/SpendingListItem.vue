<template>
  <div class="row spendings-list-item">
    <div class="col-sm-2"><small class="dateText" v-date-format="data.createdAt"></small></div>
    <div class="col-sm-8 description">
      <span>{{ data.description }}</span>
      <button
        v-if="data.receipt"
        @click="openReceipt()"
        class="btn btn-outline-primary btn-sm"
      >
        <i class="fas fa-paperclip"></i>
        comprovante
      </button>
    </div>
    <div class="col-sm-2" v-money-format="data.value" />
  </div>
</template>

<script>
export default {
  name: 'SpendingListItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    // Método para abrir o comprovante
    openReceipt () {
      window.open(this.data.receipt, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.spendings-list-item {
  padding: 10px;
  border-bottom: 1px solid var(--featured-dark);

  & div:not(:last-child) {
    border-right: 1px solid var(--featured-dark);
  }

  .dateText {
    font-size: 0.85rem;
  }

  .description {
    display: flex;
    justify-content: space-between;
  }
}
</style>
