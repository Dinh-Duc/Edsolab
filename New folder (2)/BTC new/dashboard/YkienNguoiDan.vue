<template>
  <b-card
    v-if="data"
    no-body
  >
    <b-card-header>
      <h4 class="card-title mb-0">
        Số lượng đề tài NCCB
      </h4>
      <!-- <b-card-text class="font-medium-5 mb-0">
        <feather-icon
          icon="MoreVerticalIcon"
          size="21"
          class="text-muted cursor-pointer"
        />
      </b-card-text> -->
    </b-card-header>

    <vue-apex-charts
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
    <!-- apex chart -->
    <!-- <vue-apex-charts
      type="radialBar"
      height="245"
      class="my-2"
      :options="goalOverviewRadialBar"
      :series="data.series"
    />
    <b-row class="text-center mx-0">
      <b-col
        cols="6"
        class="border-top border-right d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          Đã hoàn thành
        </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          {{ data.completed }}
        </h3>
      </b-col>

      <b-col
        cols="6"
        class="border-top d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          Đang xử lý
        </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          {{ data.inProgress }}
        </h3>
      </b-col>
    </b-row> -->
  </b-card>
</template>

<script>
/* eslint-disable */
import {
  BCard, BCardHeader, BRow, BCol, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

const $strokeColor = '#ebe9f1'
const $textHeadingColor = '#5e5873'
const $goalStrokeColor2 = '#51e5a8'
export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      goalOverviewRadialBar: {
        chart: {
          height: 245,
          type: 'radialBar',
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1,
          },
        },
        colors: [$goalStrokeColor2],
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '77%',
            },
            track: {
              background: $strokeColor,
              strokeWidth: '50%',
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                color: $textHeadingColor,
                fontSize: '2.86rem',
                fontWeight: '600',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: [$themeColors.success],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        grid: {
          padding: {
            bottom: 30,
          },
        },
      },
      series: [
        {
          name: '2018',
          data: [5, 6, 15, 15, 4, 12, 5, 4],
        },
        {
          name: '2019',
          data: [15, 5, 17, 14, 6, 11, 4, 6],
        },
        {
          name: '2020',
          data: [5, 5, 16, 14, 8, 13, 8, 7],
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: ['Toán học', 'Khoa học thông tin và máy tính', 'Vật lý', 'Hóa học', 'Khoa học Trái đất', 'Sinh học nông nghiệp', 'Y học', 'Cơ học'],
           legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetX: 40,
        },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        fill: {
          opacity: 1,
        }
      },
    }
  },
}
</script>
