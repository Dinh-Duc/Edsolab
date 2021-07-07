<template>
  <div class="row">
    <div
      v-for="(item, key) in data"
      :key="key"
      :class="`col-md-${col}`"
    >
      <a
        v-if="item.href"
        :href="item.href"
        target="_blank"
        style="color:#333"
      >
        <b-card
          :title="item.title"
          :class="`chart-data ${item.element}`"
        >
          <b-card-body class="body-chart-data">
            <div class="teaser-chart">
              <div
                v-for="(item1, key1) in item.descriptions"
                :key="key1"
                class="item-teaser row d-flex align-items-center"
              >
                <div class="left col-xl-8">
                  {{ item1.key }}
                </div>
                <div class="right col-xl-4 text-right">
                  {{ item1.value + ' ' + item1.unit }}
                </div>
              </div>
            </div>

            <div
              v-if="item.subtitle"
              class="chart-title"
            >
              {{ item.subtitle }}
            </div>
            <div class="chart">
              <ApexChart
                v-if="item.bodyData.chartType == 'ApexChart'"
                :element="item.element"
                :chart-option="item.bodyData"
              />
              <HighChart
                v-if="item.bodyData.chartType == 'HighChart'"
                :option="item.bodyData"
              />
              <BaseStakedColumnsChart
                v-if="item.bodyData.chartType == 'BaseStakedColumnsChart'"
                :series="item.bodyData.series"
                :categories="item.bodyData.categories"
                :height="250"
              />
              <BaseDonutChart
                v-if="item.bodyData.chartType == 'BaseDonutChart'"
                :series="item.bodyData.series"
                :categories="item.bodyData.categories"
                :colors="item.bodyData.colors"
                :height="250"
              />
              <BaseSplineAreaChart
                v-if="item.bodyData.chartType == 'BaseSplineAreaChart'"
                :series="item.bodyData.series"
                :categories="item.bodyData.categories"
                :colors="item.bodyData.colors"
                :height="238"
              />
              <BaseColumnBarChart
                v-if="item.bodyData.chartType == 'BaseColumnBarChart'"
                :series="item.bodyData.series"
                :categories="item.bodyData.categories"
                :colors="item.bodyData.colors"
                :height="238"
              />
              <BaseBarWithNegative
                v-if="item.bodyData.chartType == 'BaseBarWithNegative'"
                :series="item.bodyData.series"
                :categories="item.bodyData.categories"
                :colors="item.bodyData.colors"
                :height="238"
              />
              <AmChart
                v-if="item.bodyData.chartType == 'AmChart'"
                :element="item.element"
                :type="item.type"
                :option="item.bodyData"
              />
              <BasePieChart
                v-if="item.bodyData.chartType == 'BasePieChart'"
                :chart-data="item.bodyData.data"
                height-chart="350px"
              />
            </div>
          </b-card-body>
        </b-card>
      </a>
      <b-card
        v-else
        :title="item.title"
        :class="`chart-data ${item.element}`"
      >
        <b-card-body class="body-chart-data">
          <div class="teaser-chart">
            <div
              v-for="(item1, key1) in item.descriptions"
              :key="key1"
              class="item-teaser row d-flex align-items-center"
            >
              <div class="left col-xl-8">
                {{ item1.key }}
              </div>
              <div class="right col-xl-4 text-right">
                {{ item1.value + ' ' + item1.unit }}
              </div>
            </div>
          </div>

          <div
            v-if="item.subtitle"
            class="chart-title"
          >
            {{ item.subtitle }}
          </div>
          <div class="chart">
            <ApexChart
              v-if="item.bodyData.chartType == 'ApexChart'"
              :element="item.element"
              :chart-option="item.bodyData"
            />
            <HighChart
              v-if="item.bodyData.chartType == 'HighChart'"
              :option="item.bodyData"
            />
            <BaseStakedColumnsChart
              v-if="item.bodyData.chartType == 'BaseStakedColumnsChart'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :height="250"
            />
            <BaseDonutChart
              v-if="item.bodyData.chartType == 'BaseDonutChart'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :colors="item.bodyData.colors"
              :height="250"
            />
            <BaseSplineAreaChart
              v-if="item.bodyData.chartType == 'BaseSplineAreaChart'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :colors="item.bodyData.colors"
              :height="238"
            />
            <BaseColumnBarChart
              v-if="item.bodyData.chartType == 'BaseColumnBarChart'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :colors="item.bodyData.colors"
              :height="238"
            />
            <BaseColumnBarHorizontalChart
              v-if="item.bodyData.chartType == 'BaseColumnBarHorizontalChart'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :colors="item.bodyData.colors"
              :height="350"
            />
            <BaseBarWithNegative
              v-if="item.bodyData.chartType == 'BaseBarWithNegative'"
              :series="item.bodyData.series"
              :categories="item.bodyData.categories"
              :colors="item.bodyData.colors"
              :height="238"
            />
            <AmChart
              v-if="item.bodyData.chartType == 'AmChart'"
              :element="item.element"
              :type="item.type"
              :option="item.bodyData"
            />
            <BasePieChart
              v-if="item.bodyData.chartType == 'BasePieChart'"
              :chart-data="item.bodyData.data"
              height-chart="350px"
            />
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { BCard, BCardBody } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import HighChart from '../../../components/core/charts/HighChart'
// eslint-disable-next-line import/extensions
import ApexChart from '../../../components/core/charts/ApexChart'
// eslint-disable-next-line import/extensions
import BaseStakedColumnsChart from '../../../components/core/charts/BaseStakedColumnsChart'
// eslint-disable-next-line import/extensions
import BaseDonutChart from '../../../components/core/charts/BaseDonutChart'
// eslint-disable-next-line import/extensions
import BaseSplineAreaChart from '../../../components/core/charts/BaseSplineAreaChart'
// eslint-disable-next-line import/extensions
import BaseColumnBarChart from '../../../components/core/charts/BaseColumnBarChart'
// eslint-disable-next-line import/extensions
import BaseColumnBarHorizontalChart from '../../../components/core/charts/BaseColumnBarHorizontalChart'
// eslint-disable-next-line import/extensions
import AmChart from '../../../components/core/charts/AmChart'
// eslint-disable-next-line import/extensions
import BaseBarWithNegative from '../../../components/core/charts/BaseBarWithNegative'
// eslint-disable-next-line import/extensions
import BasePieChart from '../../../components/core/charts/BasePieChart'

export default {
  components: {
    BCard,
    BCardBody,
    HighChart,
    ApexChart,
    BaseStakedColumnsChart,
    BaseDonutChart,
    BaseSplineAreaChart,
    BaseColumnBarChart,
    AmChart,
    BaseBarWithNegative,
    BasePieChart,
    BaseColumnBarHorizontalChart,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    col: {
      type: Number,
      default() {
        return 6
      },
    },
  },
  data() {
    return {
      col_bt: this.col || 6,
    }
  },
  watch: {
    data() {
      // console.log('data', this.data)
    },
    col() {
      // console.log(this.col)
    },
  },
}
</script>

<style lang="scss" scoped>
.report-list {
  .teaser-chart {
    .item-teaser {
      padding: 5px 0;
    }
  }
  .chart-title {
    padding: 10px 0;
    font-size: 18px;
    font-weight: 500;
  }
  .chart {
    margin-top: 10px;
  }
  .DatDai {
    height: 510px;
  }
  .Danso {
    height: 510px;
  }
  .GiaoDuc {
    height: 489px;
  }
  .YTe {
    height: 489px;
  }
  .DauTuCongCP {
    height: 636px;
    overflow: hidden;
  }
  .DauTuCongS {
    height: 735px;
    overflow: hidden;
  }
  .DoanhNghiep {
    height: 735px;
    overflow: hidden;
  }
  .ThuChiNganSach {
    height: 636px;
    overflow: hidden;
  }
  .XuatKhauNhapkhau {
    height: 636px;
    overflow: hidden;
  }
  .DkiDN {
    height: 636px;
    overflow: hidden;
  }
  .DauTuNuocNgoai {
    height: 535px;
    overflow: hidden;
  }
  .DauTuTrongNuoc {
    height: 535px;
    overflow: hidden;
  }
  .DauTuNuocNgoaiS {
    height: 760px;
    overflow: hidden;
  }
  .DauTuTrongNuocS {
    height: 760px;
    overflow: hidden;
  }
  .DansoDP {
    height: 498px;
    overflow: hidden;
  }
  .DatDaiDP {
    height: 498px;
    overflow: hidden;
  }
  .GiaoDucDP {
    height: 498px;
    overflow: hidden;
  }
  .DoanhNghiepDP {
    height: 528px;
    overflow: hidden;
  }
  .YTeDP {
    height: 528px;
    overflow: hidden;
  }
  .NongNghiepDP {
    height: 528px;
    overflow: hidden;
  }
  .ThongKETINHTRANGXULY {
    height: 445px;
    .card-title {
      text-align: center;
    }
  }
  .THONGKEBCKCTHEOLINHVUC {
    height: 445px;
    .card-title {
      text-align: center;
    }
  }
}
</style>
