<template>
  <div class="row spendings-list-item">
    <div class="col-2"><small v-date-format="data.createdAt"></small></div>
    <div class="col-8">{{ data.description }}</div>
    <div class="col-2" v-money-format="data.value" />
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
}
</style>
