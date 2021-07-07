<template>
  <b-card class="pbllcb">
    <b-card-header>
      <b-card-title>Cơ cấu vốn chủ sở hữu</b-card-title>
    </b-card-header>
    <b-card-body>
      <div class="box-content">
        <vue-apex-charts
          type="donut"
          height="370"
          :options="donutChart.chartOptions"
          :series="donutChart.series"
        />
        <!-- <div>
          <h5>Phân bố lực lượng cán bộ theo ngạch viên chức</h5>
          <vue-apex-charts
            type="donut"
            height="360"
            :options="donutChart2.chartOptions"
            :series="donutChart2.series"
          />
        </div> -->
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
/* eslint-disable */
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BDropdown,
  BDropdownItem,
  BProgress,
  BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'
import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
    BButton,
    BCardText,
    BDropdown,
    BDropdownItem,
    BProgress,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      donutChart: {
        series: [31033858, 20036844, 223104, 17091003, 856988],
        chartOptions: {
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Montserrat',
          },
          colors: ['#344f7b', '#3a6097', '#3b6db0', '#7791bf', '#a4b5d3'],
          dataLabels: {
            enabled: true,
          },
          labels: [
            'Vốn của Ngân hàng',
            'Quỹ của Ngân hàng',
            'Chênh lệch đánh giá lại tài sản',
            'Lợi nhuận chưa phân phối',
            'Lợi ích của cổ phiếu thiểu số',
          ],
          responsive: [
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 380,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                chart: {
                  height: 320,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        name: {
                          fontSize: '1.5rem',
                        },
                        value: {
                          fontSize: '1rem',
                        },
                        total: {
                          fontSize: '1.5rem',
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: true,
                },
              },
            },
          ],
          plotOptions: {
            pie: {
              donut: {
                size: '50%',
              },
            },
          },
        },
      },
      donutChart2: {
        series: [31033858, 20036844, 223104, 17091003, 856988],
        chartOptions: {
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Montserrat',
          },
          colors: ['#344f7b', '#3a6097', '#3b6db0', '#7791bf', '#a4b5d3'],
          dataLabels: {
            enabled: true,
          },
          labels: [
            'Vốn của Ngân hàng',
            'Quỹ của Ngân hàng',
            'Chênh lệch đánh giá lại tài sản',
            'Lợi nhuận chưa phân phối',
            'Lợi ích của cổ phiếu thiểu số',
          ],
          plotOptions: {
            pie: {
              donut: {
                size: '50%',
              },
            },
          },
        },
      },
    }
  },
  methods: {
    kFormatter,
  },
}
</script>
<style lang="scss">
.pbllcb {
  .box-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & > div {
      flex-grow: 1;
      h5 {
        text-align: center;
      }
    }
  }
}
</style>
<style scoped>
.card-header {
  padding-top: 0!important;
}
</style>
