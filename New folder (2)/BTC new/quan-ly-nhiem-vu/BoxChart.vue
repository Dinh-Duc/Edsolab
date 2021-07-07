<template>
  <div class="row">
    <BasePieChart
      :chart-data="data.bodyData.data"
      height-chart="230"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import BasePieChart from '../../components/core/charts/BasePieChart'

export default {
  components: {
    BasePieChart,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
