<template>
  <div
    v-if="show"
    :class="`alert-${type}`"
    class="alert alert-dismissible fade show"
  >
    {{ message }}
    <button type="button" class="btn-close" @click="close()"></button>
  </div>
</template>

<script>
export default {
  name: 'LayoutNotification',
  data () {
    return {
      show: false,
      message: '',
      type: 'danger'
    }
  },
  created () {
    // Ouvir alterações no estado
    this.$root.$on('Notification::show', (payload) => {
      this.show = true
      this.type = payload.type
      this.message = payload.message

      setTimeout(() => {
        this.close()
      }, payload.timeout || 5000)
    })
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  z-index: 1000;
  right: 20px;
  top: 20px;
  max-width: 400px;
  border-radius: 10px;
}
</style>
