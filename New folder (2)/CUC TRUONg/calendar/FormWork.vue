<template>
  <div class="row m-0">
    <div class="col-md-12">
      <b-form-group label="Nội dung chi tiết công việc *">
        <b-form-textarea
          v-model="dataform.content"
          placeholder="Nhập nội dung chi tiết công việc"
          rows="3"
        />
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    dataform: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
