<template>
  <b-card
    v-if="data"
    no-body
    class="card-revenue-budget"
  >
    <b-row class="mx-0">
      <b-col
        md="12"
        class="budget-wrapper"
      >
        <!-- <div>
          <div class="btn-tinhtrang">
            <button>Ngày</button>
            <button>Tuần</button>
            <button>Tháng</button>
          </div>
          <h3 class="mb-25">
            Số ca nhiễm Covid
          </h3>
          <h2 class="mb-25">
            5,929
          </h2>
          <div class="d-flex justify-content-center">
            <span class="font-weight-bolder mr-25">Địa phương:</span>
            <span>25 ca</span>
          </div>
          <vue-apex-charts
            id="budget-chart"
            type="line"
            height="80"
            :options="budgetChart.options"
            :series="data.budgetChart.series"
          />

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
          >
            Báo cáo chi tiết
          </b-button>
        </div> -->
        <b-carousel
          id="carousel-1"
          :interval="3000"
          controls
          indicators
          img-width="1024"
          img-height="480"
          style="height: 318px"
        >
          <!-- Slides with custom text -->
          <b-carousel-slide>
            <div>
              <div class="btn-tinhtrang">
                <button>Ngày</button>
                <button>Tuần</button>
                <button>Tháng</button>
              </div>
              <h3 class="mb-25">
                Số ca nhiễm Covid
              </h3>
              <h2 class="mb-25">
                15.643
              </h2>
              <!-- <div class="d-flex justify-content-center">
                <span class="font-weight-bolder mr-25">Địa phương:</span>
                <span>25 ca</span>
              </div> -->
              <vue-apex-charts
                id="budget-chart"
                type="line"
                height="80"
                :options="budgetChart.options"
                :series="data.budgetChart.series"
              />

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="openNewWindow('https://app.powerbi.com/view?r=eyJrIjoiNmZiNTZlMmUtMzE1OC00MWFiLTlmM2UtNzY5OGMwMzg2YTFmIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D')"
              >
                Báo cáo chi tiết
              </b-button>
            </div>
          </b-carousel-slide>

          <b-carousel-slide>
            <div>
              <div class="btn-tinhtrang">
                <button>Ngày</button>
                <button>Tuần</button>
                <button>Tháng</button>
              </div>
              <h3 class="mb-25">
                Số ca đang điều trị
              </h3>
              <h2 class="mb-25">
                9.244
              </h2>
              <!-- <div class="d-flex justify-content-center">
                <span class="font-weight-bolder mr-25">Địa phương:</span>
                <span>25 ca</span>
              </div> -->
              <vue-apex-charts
                id="budget-chart"
                type="line"
                height="80"
                :options="budgetChart.options"
                :series="data.budgetChart.series"
              />

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="openNewWindow('https://app.powerbi.com/view?r=eyJrIjoiNmZiNTZlMmUtMzE1OC00MWFiLTlmM2UtNzY5OGMwMzg2YTFmIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D')"
              >
                Báo cáo chi tiết
              </b-button>
            </div>
          </b-carousel-slide>

          <b-carousel-slide>
            <div>
              <div class="btn-tinhtrang">
                <button>Ngày</button>
                <button>Tuần</button>
                <button>Tháng</button>
              </div>
              <h3 class="mb-25">
                Số điều trị khỏi
              </h3>
              <h2 class="mb-25">
                6.319
              </h2>
              <!-- <div class="d-flex justify-content-center">
                <span class="font-weight-bolder mr-25">Địa phương:</span>
                <span>25 ca</span>
              </div> -->
              <vue-apex-charts
                id="budget-chart"
                type="line"
                height="80"
                :options="budgetChart.options"
                :series="data.budgetChart.series"
              />

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="openNewWindow('https://app.powerbi.com/view?r=eyJrIjoiNmZiNTZlMmUtMzE1OC00MWFiLTlmM2UtNzY5OGMwMzg2YTFmIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D')"
              >
                Báo cáo chi tiết
              </b-button>
            </div>
          </b-carousel-slide>

          <b-carousel-slide>
            <div>
              <div class="btn-tinhtrang">
                <button>Ngày</button>
                <button>Tuần</button>
                <button>Tháng</button>
              </div>
              <h3 class="mb-25 text-danger">
                Số ca tử vong
              </h3>
              <h2 class="mb-25 text-danger">
                76
              </h2>
              <!-- <div class="d-flex justify-content-center">
                <span class="font-weight-bolder mr-25">Địa phương:</span>
                <span>25 ca</span>
              </div> -->
              <vue-apex-charts
                id="budget-chart"
                type="line"
                height="80"
                :options="budgetChart.options"
                :series="data.budgetChart.series"
              />

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="openNewWindow('https://app.powerbi.com/view?r=eyJrIjoiNmZiNTZlMmUtMzE1OC00MWFiLTlmM2UtNzY5OGMwMzg2YTFmIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D')"
              >
                Báo cáo chi tiết
              </b-button>
            </div>
          </b-carousel-slide>

        </b-carousel>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  /* BDropdown, BDropdownItem, */ BButton,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    VueApexCharts,
    /*    BDropdown,
    BDropdownItem, */
    BCard,
    BButton,
    BRow,
    BCol,
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
      revenue_report: {},
      revenueReport: {
        chartOptions: {
          chart: {
            stacked: true,
            type: 'bar',
            toolbar: { show: false },
          },
          grid: {
            padding: {
              top: -20,
              bottom: -10,
            },
            yaxis: {
              lines: { show: false },
            },
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
            ],
            labels: {
              style: {
                colors: '#6E6B7B',
                fontSize: '0.86rem',
                /* fontFamily: 'Montserrat', */
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.primary, $themeColors.warning],
          plotOptions: {
            bar: {
              columnWidth: '17%',
              endingShape: 'rounded',
            },
            distributed: true,
          },
          yaxis: {
            labels: {
              style: {
                colors: '#6E6B7B',
                fontSize: '0.86rem',
                /* fontFamily: 'Montserrat', */
              },
            },
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
  methods: {
    openNewWindow(url) {
      if (!url) return
      window.open(url, '_blank')
    },
  },
}
</script>
<style lang="scss">
.btn-tinhtrang {
  width: 100%;
  float: left;
  margin-bottom: 10px;
}
.btn-tinhtrang button {
  border: unset;
  height: 32px;
  width: 76px;
}
.btn-tinhtrang button:first-child {
  color: white;
  background: #5a8dee;
}
.carousel-caption {
  position: unset !important;
}
.carousel-indicators {
  display: none !important;
}
</style>
