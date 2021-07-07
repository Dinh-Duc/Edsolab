<template>
  <div>
    <ThanhPhoBienHoa />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import ThanhPhoBienHoa from './ThanhPhoBienHoa'

export default {
  components: {
    ThanhPhoBienHoa,
  },
  props: {
    keyData: {
      type: String,
      default() {
        return 'TPBH'
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
