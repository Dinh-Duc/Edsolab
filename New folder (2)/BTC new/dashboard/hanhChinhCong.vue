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
            Hành chính công
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
import {
  BCard, BRow, BCol, BButton,
} from 'bootstrap-vue'
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
            name: 'Đúng hạn',
            data: [90, 94, 80, 79, 90],
          },
          {
            name: 'Sớm hạn',
            data: [43, 40, 30, 40, 35],
          },
          {
            name: 'Trễ hạn',
            data: [40, 45, 40, 35, 40],
          },
          {
            name: 'Chưa đến hạn',
            data: [8, 9, 9, 11, 10],
          },
          {
            name: 'Quá hạn',
            data: [10, 9, 8, 9, 7],
          },
          {
            name: 'Quá hạn',
            data: [10, 9, 8, 9, 7],
          },
          {
            name: 'Quá hạn',
            data: [10, 9, 8, 9, 7],
          },
          {
            name: 'Quá hạn',
            data: [10, 9, 8, 9, 7],
          },
          {
            name: 'Quá hạn',
            data: [10, 9, 8, 9, 7],
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
              horizontal: true,
              borderRadius: 10,
            },
          },
          xaxis: {
            categories: [
              'Thu BHXH, BHYT, BHTN',
              'Cấp sổ BHXH, thẻ BHYT',
              'Giải quyết hưởng các chế độ BHXH',
              'Chi trả các chế độ BHXH',
              'Thực hiện chính sách BHYT',
              'Thực hiện chính sách BHYT',
              'Thực hiện chính sách BHYT',

              'Thực hiện chính sách BHYT',
              'Thực hiện chính sách BHYT',

            ],
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
      // budgetChart: {
      //   options: {
      //     chart: {
      //       height: 80,
      //       toolbar: { show: false },
      //       zoom: { enabled: false },
      //       type: 'line',
      //       sparkline: { enabled: true },
      //     },
      //     stroke: {
      //       curve: 'smooth',
      //       dashArray: [0, 5],
      //       width: [2],
      //     },
      //     colors: [$themeColors.primary, '#dcdae3'],
      //     tooltip: {
      //       enabled: false,
      //     },
      //   },
      // },
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
