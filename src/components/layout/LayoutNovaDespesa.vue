<template>
  <div class="text-center">
    <button class="btn btn-lg btn-add-despesa" @click="showModal = true">
      <i class="fas fa-plus-circle"></i>
      Nova despesa
    </button>

    <div
      class="modal fade"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal()"
            ></button>
          </div>
          <div class="modal-body">
            <p>This is a vertically centered modal.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal()"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Nova Despesa',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-add-despesa {
  color: var(--featured);
  border: 1px solid var(--featured);
  border-radius: 30px;
  margin: 0.5rem auto 0;

  &:hover {
    color: var(--featured-dark);
    border: 1px solid var(--featured-dark);
  }
}
</style>
