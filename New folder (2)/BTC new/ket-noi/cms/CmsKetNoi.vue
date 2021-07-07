<template>
  <div>
    <div class="create-event-btn">
      <button @click="openForm()">
        <feather-icon
          icon="PlusIcon"
          size="16"
        />
        Quản lý dành cho Admin
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    openForm() {
      this.$emit('open-cms-form', 9)
    },
  },
}
</script>
