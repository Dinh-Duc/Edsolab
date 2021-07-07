<template>
  <div class="docs-chart">
    <div class="title-docs-chart">
      <b>{{ chartData.Title }}</b>
    </div>
    <!-- Detail chart -->
    <div v-if="chartData.IsNonData">
      <i class="non-data-chart-vb">Không có dữ liệu</i>
    </div>
    <div
      v-else
      class="chart-paint"
    >
      <div id="chart">
        <ApexCharts
          width="100%"
          height="300"
          :type="chartData.Type"
          :options="chartData.ChartOptions"
          :series="chartData.Series"
          class="chat-elm-hihi"
        />
      </div>
      <b class="total-number-chart">{{ formatNumber(chartData.Total) }}</b>
    </div>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'

export default {
  components: {
    ApexCharts,
  },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    formatNumber: number => `${number.toFixed(0)}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
  },
}
</script>
<style lang="scss" scoped>
.docs-manage {
  .chart-paint {
    width: 100%;
    float: left;
    position: relative;
  }
  .total-number-chart {
    position: absolute;
    top: 0;
    right: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 64px;
    line-height: 78px;
    color: #40566f;
  }
  .docs-chart {
    padding-top: 9px;
  }
  .title-docs-chart {
    width: 100%;
    float: left;
    border-bottom: 1px solid #828282;
    b {
      width: 100%;
      float: left;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
      padding-bottom: 1px;
    }
  }
  .chat-elm-hihi .apexcharts-legend.apexcharts-align-center.position-right {
    top: unset !important;
  }
  .non-data-chart-vb {
    width: 100%;
    float: left;
    margin-top: 10px;
    color: #ea5455;
  }
}
</style>
