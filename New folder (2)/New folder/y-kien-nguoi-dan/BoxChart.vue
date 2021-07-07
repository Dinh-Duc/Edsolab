<template>
  <div class="row">
    <div
      v-for="(item, key) in data"
      :key="key"
      class="col-md-6"
    >
      <b-card
        :title="item.title"
        :class="`chart-data ${item.element}`"
      >
        <b-card-body class="body-chart-data">
          <div class="chart">
            <ApexChart
              v-if="item.bodyData.chartType == 'ApexChart'"
              :element="item.element"
              :chart-option="item.bodyData"
            />
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import ApexChart from '../../components/core/charts/ApexChart'

export default {
  components: {
    ApexChart,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
