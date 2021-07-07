<template>
  <b-card
    v-if="data"
    class="card-app-design"
    style="height: 450px"
  >
    <b-badge variant="light-primary">
      {{ data.date }}
    </b-badge>
    <b-card-title class="mt-1 mb-75">
      {{ data.title }}
    </b-card-title>

    <!-- Thu ngân sách -->
    <div>
      <vue-apex-charts
        type="area"
        height="100"
        width="100%"
        :options="chartOptionsComputedChi"
        :series="data.thuNganSach.series"
      />
      <b-card-text>{{ data.thuNganSach.name }}</b-card-text>
    </div>

    <!-- Chi ngân sách -->
    <div>
      <vue-apex-charts
        type="area"
        height="100"
        width="100%"
        :options="chartOptionsComputedThu"
        :series="data.chiNganSach.series"
      />
      <b-card-text>{{ data.chiNganSach.name }}</b-card-text>
    </div>
    <!-- button -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
      style="margin-top: 40px"
    >
      Xem chi tiết
    </b-button>
  </b-card>
</template>

<script>
import {
  BCard, BBadge, BCardTitle, BCardText, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { $themeColors } from '@themeConfig'
import VueApexCharts from 'vue-apexcharts'
import { areaChartOptions } from './chartOptions'

export default {
  components: {
    BCard,
    BBadge,
    BButton,
    BCardTitle,
    BCardText,
    VueApexCharts,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    chartOptionsThu: {
      type: Object,
      default: null,
    },
    chartOptionsChi: {
      type: Object,
      default: null,
    },
    colorThu: {
      type: String,
      default: 'success',
    },
    colorChi: {
      type: String,
      default: 'warning',
    },
  },
  computed: {
    chartOptionsComputedChi() {
      if (this.chartOptionsThu === null) {
        const options = JSON.parse(JSON.stringify(areaChartOptions))
        options.theme.monochrome.color = $themeColors[this.colorThu]
        return options
      }
      return this.chartOptionsThu
    },

    chartOptionsComputedThu() {
      if (this.chartOptionsChi === null) {
        const options = JSON.parse(JSON.stringify(areaChartOptions))
        options.theme.monochrome.color = $themeColors[this.colorChi]
        return options
      }
      return this.chartOptionsChi
    },
  },
}
</script>
<style lang="scss">
.app-fixed-search {
  display: none !important;
}
</style>
