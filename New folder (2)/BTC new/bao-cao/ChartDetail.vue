<template>
  <div>
    <b-card
      title="Sessions By Device"
      class="chart-data"
    >
      <template v-slot:headerTitle>
        <a
          class="chart-link"
          @click="openUrl()"
        >
          <p class="fz-20">{{ data.title }}</p>
        </a>
        <div
          v-for="(item, index) in data.descriptions"
          :key="index"
          class="description-item"
        >
          <div class="left-item">
            {{ item.key }}
          </div>
          <div class="right-item">
            {{ item.value + ' ' + item.unit }}
          </div>
        </div>
        <div class="chart-sub-title mt-15 mb-25">
          <h6>{{ data.subtitle }}</h6>
        </div>
      </template>
      <template v-slot:body>
        <AmChart
          v-if="chartType == 1"
          :element="data.element"
          :type="data.type"
          :option="data.bodyData"
        />
        <HighChart
          v-if="chartType == 2"
          :ref="data.type"
          :option="data.bodyData"
        />
        <ApexChart
          v-if="chartType == 3"
          :element="data.element"
          :chart-option="data.bodyData"
        />
      </template>
    </b-card>
  </div>
</template>
<script>
import AmChart from '@/views/components/core/charts/AmChart.vue'
import HighChart from '@/views/components/core/charts/HighChart.vue'
import ApexChart from '@/views/components/core/charts/ApexChart.vue'
import { BCard } from 'bootstrap-vue'

export default {
  components: {
    AmChart, HighChart, ApexChart, BCard,
  },
  props: {
    chartType: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    openUrl() {
      window.open(this.data.url, '_blank')
    },
  },
}
</script>
<style lang="scss">
.chart-data {
  .chart-link {
    p {
      color: var(--iq-primary);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
