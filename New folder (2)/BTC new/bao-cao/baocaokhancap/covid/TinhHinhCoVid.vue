<template>
  <div>
    <TheGioi v-if="keyChild == 'CovidTG'" />
    <VietNam v-if="keyChild == 'CovidVN'" />
    <DiaPhuong v-if="keyChild == 'CovidDP'" />
  </div>
</template>

<script>
import TheGioi from './TheGioi.vue'
import VietNam from './VietNam.vue'
import DiaPhuong from './DiaPhuong.vue'

export default {
  components: {
    TheGioi,
    VietNam,
    DiaPhuong,
  },
  props: {
    keyChild: {
      type: String,
      default() {
        return ''
      },
    },
  },
}
</script>

<style lang="scss"></style>
