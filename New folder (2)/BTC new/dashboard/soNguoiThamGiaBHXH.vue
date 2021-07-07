<template>
  <b-card
    no-body
    class="card-revenue-budget"
  >
    <b-row class="mx-0">
      <b-col
        md="12"
        class="revenue-report-wrapper"
      >
        <div class="d-sm-flex justify-content-between align-items-center">
          <h4 class="card-title mb-50 mb-sm-0">
            Số người tham gia BHXH, BHTN, BHYT
          </h4>
        </div>

        <!-- chart -->
        <vue-apex-charts
          id="revenue-report-chart"
          type="bar"
          height="350"
          :options="revenueReport.chartOptions"
          :series="revenueReport.series"
        />
        <!-- <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart> -->
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
/* eslint-disable */
import { BCard, BRow, BCol, BButton } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    VueApexCharts,
    BCard,
    BButton,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      revenueReport: {
        series: [
          {
            name: 'Số người tham gia BHXH bắt buộc',
            data: [
              9441246,
              10104497,
              10431617,
              10889333,
              11452522,
              12072860,
              12851833,
            ],
          },
          {
            name: 'Số người tham gia BHXH tự nguyên',
            data: [
              81319,
              96400,
              133831,
              168095,
              193329,
              217669,
              203871,
              227506,
            ],
          },
          {
            name: 'Số người tham gia BHTN',
            data: [
              7206163,
              7968231,
              8269552,
              8691392,
              9219753,
              10310210,
              11060178,
              11774742,
            ],
          },
          {
            name: 'Số người tham gia BHYT',
            data: [
              52407090,
              57081956,
              58977203,
              61764317,
              64645024,
              68466050,
              75832103,
              79982085,
            ],
          },
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 550,
            stacked: true,
            toolbar: {
              // show download chart
              show: true,
            },
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px',
              colors: ['#f8f8f8'],
            },
            formatter(val) {
              return (Number(val))?.toLocaleString()
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
            },
          },
          xaxis: {
            categories: [
              '2010',
              '2011',
              '2012',
              '2013',
              '2014',
              '2015',
              '2016',
              '2017',
            ],
          },
          yaxis: {
            labels: {
              formatter(val) {
                return (Number(val))?.toLocaleString()
              },
            },
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          },
          fill: {
            opacity: 1,
          },
        },
      },
      // budget chart
      budgetChart: {
        options: {
          chart: {
            height: 80,
            toolbar: { show: false },
            zoom: { enabled: false },
            type: 'line',
            sparkline: { enabled: true },
          },
          stroke: {
            curve: 'smooth',
            dashArray: [0, 5],
            width: [2],
          },
          colors: [$themeColors.primary, '#dcdae3'],
          tooltip: {
            enabled: false,
          },
        },
      },
    }
  },
}
</script>
<style lang="scss">
// .btn-tinhtrang {
//   width: 100%;
//   float: left;
//   margin-bottom: 10px;
// }
// .btn-tinhtrang button {
//   border: unset;
//   height: 32px;
//   width: 76px;
// }
// .btn-tinhtrang button:first-child {
//   color: white;
//   background: #5a8dee;
// }
// .carousel-caption {
//   position: unset !important;
// }
// .carousel-indicators {
//   display: none !important;
// }
// .btn-group button {
//   border-radius: 0px;
// }
</style>
