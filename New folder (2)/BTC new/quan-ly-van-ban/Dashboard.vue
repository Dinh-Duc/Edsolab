<template>
  <div style="height: 100%">
    <b-col
      cols="12"
      style="float: left; height: 50%; padding-bottom: 10px;"
    >
      <b-col
        cols="6"
        style="float: left"
      >
        <DocsChart :chart-data="ChartData" />
      </b-col>
      <b-col
        cols="6"
        style="float: left; height: 100%;"
      >
        <!-- Tình trạng văn bản -->
        <div class="docs-status">
          <InfoDocHandle
            :title="'Tình trạng văn bản đến'"
            :total="Go_Total"
            :data-chart="TinhTrangVBDenFake"
            :type-docs="1"
          />
        </div>

        <!-- Văn bản xử lý chậm - Thống kê -->
        <div class="docs-statistic">
          <StatisticDocs :title="'Văn bản đến xử lý chậm theo đơn vị'" />
        </div>
      </b-col>
    </b-col>
    <b-col
      cols="12"
      style="float: left; height: 50%; padding-top: 10px;"
    >
      <b-col
        cols="6"
        style="float: left; height: 100%;"
      >
        <DocsChart :chart-data="ChartDataDi" />
      </b-col>
      <b-col
        cols="6"
        style="float: left; height: 100%;"
      >
        <!-- Tình trạng văn bản -->
        <div class="docs-status">
          <InfoDocHandle
            :title="'Tình trạng văn bản đi'"
            :total="Go_Total"
            :data-chart="TinhTrangVBDiFake"
            :type-docs="1"
          />
        </div>

        <!-- Văn bản xử lý chậm - Thống kê -->
        <div class="docs-statistic">
          <StatisticDocs :title="'Văn bản đi xử lý chậm theo đơn vị'" />
        </div>
      </b-col>
    </b-col>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { UrlAPI } from '@/configs/config'
import InfoDocHandle from './components/InfoDocHandle.vue'
import StatisticDocs from './components/StatisticDocs.vue'
import DocsChart from './components/DocsChart.vue'

export default {
  components: {
    InfoDocHandle,
    StatisticDocs,
    DocsChart,
  },
  data() {
    return {
      /* Chart Văn bản đến */
      ChartData: {
        Title: 'Văn bản đến',
        Type: 'pie',
        ChartOptions: {
          chart: {
            type: 'pie',
          },
          colors: [
            '#CA498C',
            '#8B2F8A',
            '#FDE3DF',
            '#E6BFCE',
            '#B977AC',
            '#CF9BBD',
            '#A2539B',
          ],
          labels: [
            'Văn phòng Bộ',
            'Thanh tra Bộ',
            'Vụ Tổ chức cán bộ',
            'Vụ Hợp tác quốc tế',
            'Vụ Pháp chế',
            'Vụ Kế hoạch - Tài chính',
            'Vụ Tổng hợp',
          ],
          // labels: [],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                  height: 300,
                },
                legend: {
                  position: 'left',
                },
              },
            },
          ],
          legend: {
            position: 'right',
            offsetY: 120,
          },
        },
        Series: [40, 55, 13, 43, 22, 100, 40],
        // Series: [],
        Total: 378,
        IsNonData: false,
      },

      ChartDataDi: {
        Title: 'Văn bản đi',
        Type: 'pie',
        ChartOptions: {
          chart: {
            type: 'pie',
          },
          colors: [
            '#E5C646',
            '#F9F5E5',
            '#F4E9BD',
            '#EFDE96',
            '#EAD26E',
            '#C4AA41',
            '#A38E3C',
          ],
          labels: [
            'Văn phòng Bộ',
            'Thanh tra Bộ',
            'Vụ Tổ chức cán bộ',
            'Vụ Hợp tác quốc tế',
            'Vụ Pháp chế',
            'Vụ Kế hoạch - Tài chính',
            'Vụ Tổng hợp',
          ],
          /* labels: [], */
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                  height: 300,
                },
                legend: {
                  position: 'left',
                },
              },
            },
          ],
          legend: {
            position: 'right',
            offsetY: 120,
          },
        },
        Series: [10, 80, 33, 83, 12, 30, 40],
        /* Series: [], */
        Total: 407,
        IsNonData: false,
      },
      TinhTrangVBDiFake: {
        choXuLy: 200,
        daXuLy: 150,
        dangXuLy: 57,
      },
      TinhTrangVBDenFake: {
        choXuLy: 120,
        daXuLy: 80,
        dangXuLy: 178,
      },
    }
  },
  computed: mapGetters([
    'Go_Total',
    'DataChartNumber',
    'TinhTrangVBDen',
    'TinhTrangVBDi',
  ]),
  created() {
    this.getThongKeVBDen()
    /* this.getThongKeVBDi() */
    this.getTinhTrangVanBanDen()
  },
  methods: {
    getThongKeVBDen() {
      const param = {
        loaiVanBan: 1,
      }

      try {
        // eslint-disable-next-line no-undef
        COMMON_GET(
          `${UrlAPI}/api/QuanLyVanBan/thongke-soluong-vanban-theodonvi`,
          param,
        ).then(res => {
          if (res && res.length > 0) {
            // for (let index = 0; index < res.length; index += 1) {
            //   this.ChartData.Total += res[index].soLuongVanBan
            //   if (index >= 7) return
            //   this.ChartData.ChartOptions.labels.push(res[index].tenDonVi)
            //   this.ChartData.Series.push(res[index].soLuongVanBan)
            // }
          } else {
            this.ChartData.IsNonData = true
          }
        })
      } catch (error) {
        console.log(`getThongKeVBDen: ${error}`)
      }
    },

    getThongKeVBDi() {
      const param = {
        loaiVanBan: 0,
      }

      try {
        // eslint-disable-next-line no-undef
        COMMON_GET(
          `${UrlAPI}/api/QuanLyVanBan/thongke-soluong-vanban-theodonvi`,
          param,
        ).then(res => {
          if (res && res.length > 0) {
            for (let index = 0; index < res.length; index += 1) {
              if (index >= 7) return
              this.ChartDataDi.ChartOptions.labels.push(res[index].tenDonVi)
              this.ChartDataDi.Series.push(res[index].soLuongVanBan)
              this.ChartDataDi.Total += res[index].soLuongVanBan
            }
          } else {
            this.ChartDataDi.IsNonData = true
          }
        })
      } catch (error) {
        console.log(`getThongKeVBDi: ${error}`)
      }
    },

    getTinhTrangVanBanDen() {
      const param = {
        loaiVanBan: 1,
      }

      this.$store.dispatch('tinhTrangVanBan', param)
    },
    getTinhTrangVanBanDi() {
      const param = {
        loaiVanBan: 0,
      }

      this.$store.dispatch('tinhTrangVanBan', param)
    },
  },
}
</script>
<style lang="scss" scoped>
.docs-manage {
  .docs-status {
    width: 100%;
    float: left;
  }

  .docs-statistic {
    width: 100%;
    float: left;
    height: calc(100% - 125px);
  }
}
</style>
