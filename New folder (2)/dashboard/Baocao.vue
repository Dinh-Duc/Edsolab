<template>
  <b-card
    no-body
    class="card-browser-states"
  >
    <b-card-header style="padding-bottom: 0">
      <div>
        <b-card-title>Báo cáo không đạt chỉ tiêu</b-card-title>
        <b-card-text class="font-small-2">
          3 tháng gần nhất 2021
        </b-card-text>
      </div>

      <b-dropdown
        variant="link"
        no-caret
        class="chart-dropdown"
        toggle-class="p-0"
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="text-body cursor-pointer"
          />
        </template>
        <b-dropdown-item href="#">
          28 ngày trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Tháng trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Năm trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Chỉ đạo
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <!-- body -->
    <b-card-body>
      <div
        v-for="(browser, index) in browserData"
        :key="index"
        class="browser-states"
      >
        <b-media no-body>
          <b-media-aside class="mr-1">
            <b-img
              :src="browser.imgAvtBaoCao"
              style="width: 26px"
              alt="browser img"
            />
          </b-media-aside>
          <b-media-body>
            <h6 class="align-self-center my-auto">
              {{ browser.name }}
            </h6>
          </b-media-body>
        </b-media>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-body-heading mr-1">{{
            browser.usage
          }}</span>
          <vue-apex-charts
            type="radialBar"
            height="30"
            width="30"
            :options="chartData[index].options"
            :series="chartData[index].series"
          />
        </div>
      </div>
    </b-card-body>
    <!--/ body -->
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BMedia,
  BMediaAside,
  BMediaBody,
  BImg,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
/* eslint-disable global-require */
const $trackBgColor = '#e9ecef'
export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BMediaAside,
    BMediaBody,
    BImg,
    BDropdown,
    BDropdownItem,
    VueApexCharts,
  },
  data() {
    return {
      chartData: [],
      chartClone: {},
      chartColor: [
        $themeColors.primary,
        $themeColors.warning,
        $themeColors.secondary,
        $themeColors.info,
        $themeColors.danger,
        $themeColors.danger,
      ],
      chartSeries: [54.4, 6.1, 14.6, 4.2, 8, 9],
      browserData: [
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/thuChiNgansach.svg'),
          name: 'Lĩnh vực Toán học',
          usage: '54.4%',
          imgChart: require('@/assets/images/dashboard2/thuChiNS.png'),
        },
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/dauTuCong.svg'),
          name: 'Lĩnh vực Vật lý',
          usage: '6.1%',
          imgChart: require('@/assets/images/dashboard2/dautuCong.png'),
        },
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/dkDoanhNghiep.svg'),
          name: 'Lĩnh vực Hóa học',
          usage: '14.6%',
          imgChart: require('@/assets/images/dashboard2/dkDoangNghiep.png'),
        },
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/xuatNhapKhau.svg'),
          name: 'Lĩnh vực Sinh học',
          usage: '4.2%',
          imgChart: require('@/assets/images/dashboard2/xuatNhapKhau.png'),
        },
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/dauTuTrongNgoaiNuoc.svg'),
          name: 'Lĩnh vực Công nghệ sinh học',
          usage: '8%',
          imgChart: require('@/assets/images/dashboard2/dauTuTrongNuoc.png'),
        },
        {
          imgAvtBaoCao: require('@/assets/images/dashboard2/dauTuTrongNgoaiNuoc.svg'),
          name: 'Lĩnh vực Công nghệ thông tin',
          usage: '8%',
          imgChart: require('@/assets/images/dashboard2/dauTuNgoaiNuoc.png'),
        },
      ],
      chart: {
        series: [65],
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [$themeColors.primary],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: $trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    }
  },
  created() {
    for (let i = 0; i < this.browserData.length; i += 1) {
      const chartClone = JSON.parse(JSON.stringify(this.chart))
      chartClone.options.colors[0] = this.chartColor[i]
      chartClone.series[0] = this.chartSeries[i]
      this.chartData.push(chartClone)
    }
  },
}
</script>

<style lang="scss">
.browser-states {
  margin-top: 1.14rem !important;
}
</style>
