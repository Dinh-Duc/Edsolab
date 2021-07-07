<template>
  <b-card
    v-if="data"
    body-class="pb-50"
  >
    <b-carousel
      id="nv-1"
      :interval="3000"
      controls
      indicators
      img-width="1024"
      img-height="480"
      style="height: 344px"
    >
      <!-- Slides with custom text -->
      <b-carousel-slide>
        <div
          class="duty"
          @click="$router.push('/apps/quan-ly-nhiem-vu')"
        >
          <h6 class="">
            Nhiệm vụ cần xử lý
          </h6>
          <b-row>
            <b-col
              md="6"
              class="border-right mb-3"
            >
              <div class="card ">
                <div class="number">
                  165
                </div>
                <div class="name">
                  Tổng số nhiệm vụ
                </div>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card ">
                <div
                  class="number"
                  style="color:#28c76f"
                >
                  119
                </div>
                <div class="name">
                  Trong hạn
                </div>
              </div>
            </b-col>
            <b-col
              md="6"
              class="border-right"
            >
              <div class="card ">
                <div
                  class="number"
                  style="color:#ff9f43"
                >
                  34
                </div>
                <div class="name">
                  Đến hạn
                </div>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card">
                <div
                  class="number"
                  style="color:red"
                >
                  12
                </div>
                <div class="name">
                  Quá hạn
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-carousel-slide>
      <b-carousel-slide>
        <div
          class="duty"
          @click="$router.push('/apps/quan-ly-van-ban')"
        >
          <h6 class="">
            Văn bản cần xử lý
          </h6>
          <b-row>
            <b-col
              md="6"
              class="border-right mb-3"
            >
              <div class="card ">
                <div class="number">
                  153
                </div>
                <div class="name">
                  Tổng số tiếp nhận
                </div>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card ">
                <div
                  class="number"
                  style="color:#28c76f"
                >
                  76
                </div>
                <div class="name">
                  Trong hạn
                </div>
              </div>
            </b-col>
            <b-col
              md="6"
              class="border-right"
            >
              <div class="card ">
                <div
                  class="number"
                  style="color:#ff9f43"
                >
                  42
                </div>
                <div class="name">
                  Đến hạn
                </div>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card">
                <div
                  class="number"
                  style="color:red"
                >
                  35
                </div>
                <div class="name">
                  Quá hạn
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </b-card>
</template>

<script>
/* eslint-disable */
import { BCard } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

const $barColor = '#f3f3f3'

export default {
  components: {
    BCard,
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
      statisticsOrder: {
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '20%',
              startingShape: 'rounded',
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 5,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.warning],

          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
    }
  },
}
</script>
<style lang="scss">
.duty {
  h6 {
    font-weight: 500;
    font-size: 1.285rem;
    text-align: left !important;
    padding: 0px 1.5rem 1.5rem 0rem;
  }
  .card {
    text-align: center;
    .number {
      font-size: 40px;
      margin-bottom: 10px;
      font-weight: 700;
      color: #000;
    }
    .name {
      font-size: 16px;
      color: #40566f;
    }
    .border-right {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
