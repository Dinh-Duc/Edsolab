<template>
  <b-card
    v-if="data"
    class="earnings-card"
  >
    <b-row>
      <b-col cols="12">
        <b-carousel
          id="carousel-1 hash_class_chaoc123vab"
          :interval="100000"
          controls
          indicators
          img-width="1024"
          img-height="480"
          style="height: 330px"
        >
          <!-- Slides with custom text -->
          <b-carousel-slide class="bhlaubajkbdv">
            <div
              style="display: flex; flex-direction: column; justify-content: space-between; height: 100%"
            >
              <b-row>
                <b-col
                  cols="12"
                  class="ssmt"
                  style="text-align: center"
                >
                  <b-card-title
                    class="mb-1"
                    style="text-align: left;font-size: 20px"
                  >
                    Cơ cấu chi cân đối ngân sách nhà nước
                  </b-card-title>
                  <b-card-text class="font-small-3">
                    <!-- <strong style="font-size: 40px">
                      16.717.723
                    </strong> -->
                    <!-- <span>hồ sơ</span> -->
                  </b-card-text>
                  <b-card-text class="font-small-2">
                    <!-- <span>Trong đó
                      <span
                        class="font-weight-bolder"
                        style="font-size: 15px; padding: 0 2px"
                      >15.998.503</span>
                      hồ sơ giải quyết đúng hạn</span> -->
                  </b-card-text>
                </b-col>
                <b-col
                  cols="12"
                  class="d-flex justify-content-center align-items-center"
                >
                  <!-- chart -->
                  <vue-apex-charts
                    height="200"
                    :options="earningsChart.chartOptions"
                    :series="earningsChart.series"
                  />
                </b-col>
              </b-row>
            </div>
          </b-carousel-slide>
          <!-- <b-carousel-slide class="bhlaubajkbdv">
            <div
              style="display: flex; flex-direction: column; justify-content: space-between; height: 100%"
              @click="
                openNewWindow(
                  'https://app.powerbi.com/view?r=eyJrIjoiOTc2MzRhY2MtMWU0ZS00NTBjLTllZTItZGRhZDUyYzhlZWJiIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
                )
              "
            >
              <b-row>
                <b-col
                  cols="7"
                  class="ssmt"
                >
                  <b-card-title class="mb-1">
                    Tổng tài sản
                  </b-card-title>
                  <b-card-text class="font-small-3">
                    <strong style="font-size: 40px">
                      1.451.426
                    </strong>
                    <span>tỷ đồng</span>
                  </b-card-text>
                  <b-card-text class="font-small-2">
                    <span>Tăng
                      <span
                        class="font-weight-bolder"
                        style="font-size: 15px; padding: 0 2px"
                      >169.829 (+13%)</span>
                      so với năm trước</span>
                  </b-card-text>
                </b-col>
                <b-col
                  cols="5"
                  class="d-flex justify-content-between align-items-center"
                >
                  <vue-apex-charts
                    height="140"
                    :options="earningsChart.chartOptions"
                    :series="earningsChart.series"
                  />
                </b-col>
              </b-row>
              <b-row style="padding-top: 20px">
                <b-col
                  cols="7"
                  class="ssmt"
                >
                  <b-card-title class="mb-1">
                    Vốn huy động thị trường 1
                  </b-card-title>
                  <b-card-text class="font-small-3">
                    <strong style="font-size: 40px">
                      1.347.382
                    </strong>
                    <span>tỷ đồng</span>
                  </b-card-text>
                  <b-card-text class="font-small-2">
                    <span>Tăng
                      <span
                        class="font-weight-bolder"
                        style="font-size: 15px; padding: 0 2px"
                      >161.084(+13.6%)</span>
                      so với năm trước</span>
                  </b-card-text>
                </b-col>
                <b-col
                  cols="5"
                  class="d-flex justify-content-between align-items-center"
                >
                  <vue-apex-charts
                    height="140"
                    :options="earningsChart2.chartOptions"
                    :series="earningsChart2.series"
                  />
                </b-col>
              </b-row>
            </div>
          </b-carousel-slide> -->
        </b-carousel>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BCardTitle, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
// eslint-disable-next-line
import { $themeColors } from '@themeConfig'

const $earningsStrokeColor2 = '#28c76f66'
const $earningsStrokeColor3 = '#28c76f33'
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardTitle,
    BCardText,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      earningsChart: {
        series: [4, 96],
        chartOptions: {
          chart: {
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          labels: ['Khác', 'Đúng hạn'],
          stroke: { width: 0 },
          colors: [$earningsStrokeColor2, '#5dcba5', $earningsStrokeColor3],
          grid: {
            padding: {
              right: -20,
              bottom: -8,
              left: -20,
            },
          },
          plotOptions: {
            pie: {
              startAngle: -10,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: 15,
                  },
                  value: {
                    offsetY: -15,
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${val}%`
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: 'Đúng hạn',
                    formatter() {
                      return '96.0%'
                    },
                  },
                },
              },
            },
          },
          responsive: [
            {
              breakpoint: 1325,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
            {
              breakpoint: 1045,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
          ],
        },
      },
      earningsChart2: {
        series: [50, 135.8],
        chartOptions: {
          chart: {
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          labels: ['Khác', 'kế hoạch'],
          stroke: { width: 0 },
          colors: [$earningsStrokeColor2, '#5dcba5', $earningsStrokeColor3],
          grid: {
            padding: {
              right: -20,
              bottom: -8,
              left: -20,
            },
          },
          plotOptions: {
            pie: {
              startAngle: -10,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: 15,
                  },
                  value: {
                    offsetY: -15,
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${val}%`
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: 'Kế hoạch',
                    formatter() {
                      return '135.8%'
                    },
                  },
                },
              },
            },
          },
          responsive: [
            {
              breakpoint: 1325,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
            {
              breakpoint: 1045,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
          ],
        },
      },
    }
  },
}
</script>
<style lang="scss">
.bhlaubajkbdv {
  cursor: pointer;
}
.ssmt {
  text-align: left;
  color: #40566f;
  .card-title {
    margin-bottom: 30px !important;
  }
  .card-text {
    .font-weight-bolder {
      margin-bottom: 20px !important;
    }
    span {
      font-size: 16px;
    }
  }
}
</style>
