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
            for-v-b="VBDEN"
            :title="'Tình trạng văn bản đến'"
            :total="Go_Total"
            :data-chart="TinhTrangVBDen"
            :type-docs="1"
          />
        </div>

        <!-- Văn bản xử lý chậm - Thống kê -->
        <div class="docs-statistic">
          <StatisticDocs
            :title="'Văn bản đến xử lý chậm theo đơn vị'"
            for-v-b="VBDEN"
          />
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
            '#CA498C',
            '#8B2F8A',
            '#FDE3DF',
            '#E6BFCE',
            '#B977AC',
            '#CF9BBD',
            '#A2539B',
            '#CA498C',
            '#8B2F8A',
            '#FDE3DF',
            '#E6BFCE',
            '#B977AC',
            '#CF9BBD',
            '#A2539B',
            '#CA498C',
            '#8B2F8A',
            '#FDE3DF',
            '#E6BFCE',
            '#B977AC',
            '#CF9BBD',
            '#A2539B',
            '#CA498C',
            '#8B2F8A',
            '#FDE3DF',
            '#E6BFCE',
            '#B977AC',
            '#CF9BBD',
            '#A2539B',
            '#A2539B',
          ],
          labels: [
            'Vụ Ngân sách nhà nước',
            'Vụ Đầu tư',
            'Vụ Tài chính quốc phòng, an ninh, đặc biệt (Vụ I)',
            'Vụ Tài chính hành chính sự nghiệp',
            'Vụ Chính sách thuế',
            'Vụ Tài chính các ngân hàng và tổ chức tài chính',
            'Vụ Hợp tác quốc tế',
            'Vụ Pháp chế',
            'Vụ Tổ chức cán bộ',
            'Vụ Thi đua - Khen thưởng',
            'Thanh tra',
            'Văn phòng',
            'Cục Quản lý công sản',
            'Cục Quản lý nợ và tài chính đối ngoại',
            'Cục Quản lý, giám sát bảo hiểm',
            'Cục Quản lý, giám sát kế toán, kiểm toán',
            'Cục Quản lý giá',
            'Cục Tin học và Thống kê tài chính',
            'Cục Tài chính doanh nghiệp',
            'Cục Kế hoạch - Tài chính',
            'Tổng cục Thuế',
            'Tổng cục Hải quan',
            'Tổng cục Dự trữ Nhà nước',
            'Kho bạc Nhà nước',
            'Ủy ban Chứng khoán Nhà nước',
            'Viện Chiến lược và chính sách tài chính',
            'Thời báo Tài chính Việt Nam',
            'Tạp chí Tài chính',
            'Trường Bồi dưỡng cán bộ tài chính',
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
        Series: [400, 550, 130, 430, 220, 1000, 400],
        // Series: [],
        Total: 3130,
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
            '#E5C646',
            '#F9F5E5',
            '#F4E9BD',
            '#EFDE96',
            '#EAD26E',
            '#C4AA41',
            '#A38E3C',
            '#E5C646',
            '#F9F5E5',
            '#F4E9BD',
            '#EFDE96',
            '#EAD26E',
            '#C4AA41',
            '#A38E3C',
            '#E5C646',
            '#F9F5E5',
            '#F4E9BD',
            '#EFDE96',
            '#EAD26E',
            '#C4AA41',
            '#A38E3C',
            '#E5C646',
            '#F9F5E5',
            '#F4E9BD',
            '#EFDE96',
            '#EAD26E',
            '#C4AA41',
            '#A38E3C',
          ],
          labels: [
            'Vụ Ngân sách nhà nước',
            'Vụ Đầu tư',
            'Vụ Tài chính quốc phòng, an ninh, đặc biệt (Vụ I)',
            'Vụ Tài chính hành chính sự nghiệp',
            'Vụ Chính sách thuế',
            'Vụ Tài chính các ngân hàng và tổ chức tài chính',
            'Vụ Hợp tác quốc tế',
            'Vụ Pháp chế',
            'Vụ Tổ chức cán bộ',
            'Vụ Thi đua - Khen thưởng',
            'Thanh tra',
            'Văn phòng',
            'Cục Quản lý công sản',
            'Cục Quản lý nợ và tài chính đối ngoại',
            'Cục Quản lý, giám sát bảo hiểm',
            'Cục Quản lý, giám sát kế toán, kiểm toán',
            'Cục Quản lý giá',
            'Cục Tin học và Thống kê tài chính',
            'Cục Tài chính doanh nghiệp',
            'Cục Kế hoạch - Tài chính',
            'Tổng cục Thuế',
            'Tổng cục Hải quan',
            'Tổng cục Dự trữ Nhà nước',
            'Kho bạc Nhà nước',
            'Ủy ban Chứng khoán Nhà nước',
            'Viện Chiến lược và chính sách tài chính',
            'Thời báo Tài chính Việt Nam',
            'Tạp chí Tài chính',
            'Trường Bồi dưỡng cán bộ tài chính',
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
        Series: [100, 800, 330, 830, 120, 300, 400],
        /* Series: [], */
        Total: 4070,
        IsNonData: false,
      },
      TinhTrangVBDiFake: {
        choXuLy: 500,
        daXuLy: 50,
        dangXuLy: 100,
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

    .list-statistics-detail {
      overflow: auto;
      height: calc(100% - 25px);
    }
  }
}
</style>
<style lang="scss">
.docs-manage {
  .docs-statistic {
    .list-statistics-detail {
      overflow: auto;
      height: calc(100% - 25px);

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background: rgb(201, 198, 198);
        border-radius: 5px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgb(163, 163, 163);
      }
    }
  }
}
</style>
