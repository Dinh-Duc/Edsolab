<template>
  <vue-perfect-scrollbar
    :settings="perfectScrollbarSettings"
    class="sidebar-menu-list scroll-areac czjxiochaj"
    style="max-height: 100%"
  >
    <div class="bao-cao-2">
      <b-row class="match-height">
        <b-col
          lg="6"
          md="6"
          cols="6"
        >
          <BaoCaoThongKe :data="dataChartBaoCao.statisticsItems" />
        </b-col>
        <b-col
          lg="3"
          sm="6"
        >
          <BaoCaoAreaChart
            v-if="dataChartBaoCao.subscribersGained"
            icon="UsersIcon"
            :statistic="
              kFormatter(
                dataChartBaoCao.subscribersGained.analyticsData.subscribers,
              )
            "
            statistic-title="Số người nhiễm Covid trong nước"
            :chart-data="dataChartBaoCao.subscribersGained.series"
          />
        </b-col>
        <b-col
          lg="3"
          sm="6"
        >
          <BaoCaoAreaChart
            v-if="dataChartBaoCao.ordersRecevied"
            icon="PackageIcon"
            color="warning"
            :statistic="
              kFormatter(dataChartBaoCao.ordersRecevied.analyticsData.orders)
            "
            statistic-title="Báo cáo trễ hẹn trong ngày"
            :chart-data="dataChartBaoCao.ordersRecevied.series"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          lg="6"
          md="6"
          cols="6"
        >
          <BaoCaoThuTucHanhChinh :data="dataChartBaoCao.avgSessions" />
        </b-col>
        <b-col
          lg="6"
          md="6"
          cols="6"
        >
          <BaoCaoThuChiNganSach :data="dataChartBaoCao.appDesign" />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          lg="4"
          md="4"
          cols="4"
        >
          <BaoCaoCapNhatGanNhat :data="dataChartBaoCao.timeline" />
        </b-col>
        <b-col
          lg="4"
          md="4"
          cols="4"
        >
          <BaoCaoVanBanDiDen :data="dataChartBaoCao.salesChart" />
        </b-col>
        <b-col
          lg="4"
          md="4"
          cols="4"
        >
          <BaoCaoXuLyNhiemVu :data="dataChartBaoCao.supportTracker" />
        </b-col>
      </b-row>
    </div>
  </vue-perfect-scrollbar>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { kFormatter } from '@core/utils/filter'
import BaoCaoThongKe from './BaoCao_ThongKe.vue'
import BaoCaoThuChiNganSach from './BaoCao_ThuChiNganSachs.vue'
import BaoCaoAreaChart from './BaoCao_AreaChart.vue'
import BaoCaoThuTucHanhChinh from './BaoCao_ThuTucHanhChinh.vue'
import BaoCaoXuLyNhiemVu from './BaoCao_XuLyNhiemVu.vue'
import BaoCaoCapNhatGanNhat from './BaoCao_CapNhatGanNhat.vue'
import BaoCaoVanBanDiDen from './BaoCao_VanBanDiDen.vue'

export default {
  components: {
    VuePerfectScrollbar,
    BaoCaoThongKe,
    BaoCaoAreaChart,
    BaoCaoThuTucHanhChinh,
    BaoCaoXuLyNhiemVu,
    BaoCaoCapNhatGanNhat,
    BaoCaoVanBanDiDen,
    BaoCaoThuChiNganSach,
  },
  data() {
    return {
      dataChartBaoCao: {
        statisticsItems: [
          {
            color: 'light-primary',
            customClass: 'mb-2 mb-xl-0',
            icon: 'TrendingUpIcon',
            subtitle: 'Tổng tài sản',
            title: '1.451.426 tỷ đồng',
          },
          {
            color: 'light-info',
            customClass: 'mb-2 mb-xl-0',
            icon: 'UserIcon',
            subtitle: 'Dư nợ cho vay nền kinh tế',
            title: '1.121.900 tỷ đồng',
          },
          {
            color: 'light-danger',
            customClass: 'mb-2 mb-sm-0',
            icon: 'BoxIcon',
            subtitle: 'Tỷ trong cho vay trong nông nghiệp nông thôn',
            title: '69,7%',
          },
          {
            color: 'light-success',
            customClass: '',
            icon: 'DollarSignIcon',
            subtitle: 'Tỷ lệ nợ xấu',
            title: '1,46%',
          },
        ],
        subscribersGained: {
          analyticsData: {
            subscribers: 13348, // Số người nhiễm Covid trong nước
          },
          series: [
            {
              data: [28, 40, 36, 52, 38, 60, 55],
              name: 'Subscribers',
            },
          ],
        },
        ordersRecevied: {
          analyticsData: {
            orders: 26,
          },
          series: [
            {
              data: [10, 15, 8, 15, 7, 12, 8],
              name: 'Orders',
            },
          ],
        },
        avgSessions: {
          /* duration: 1,
          goal: 100000,
          retention: 90,
          users: 100000, */
          growth: '+5.2%',
          lastDays: ['28 ngày trước', 'Tháng trước', 'Năm trước'],
          salesBar: {
            series: [
              {
                name: 'Sessions',
                data: [75, 125, 225, 175, 125, 75, 25],
              },
            ],
          },
          sessions: 2700,
        },
        supportTracker: {
          newTicket: 29,
          openTicket: 63,
          responseTime: 1,
          title: 'Tình hình xử lý nhiệm vụ',
          totalTicket: 163,
          lastDays: ['28 ngày trước', 'Tháng trước', 'Năm trước'],
          supportTrackerRadialBar: {
            series: [83],
          },
        },
        timeline: {
          step1: {
            /*  duration: '12 phút trước', */
            fileName: 'bct5.docx',
            img:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAMAAAAw96PuAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIaADAAQAAAABAAAAJAAAAADeoA9wAAABcVBMVEUAAAD/qlX/qlX/n2D/qlX/n1D/pUv/qkf/oUP/pk3/qkn/okb/o0f/okT/n0j/oEn/n0b/pEn/oEf/okb/oUj/o0f/n0X/oUT/o0f/oEb/pEP/okb/n0T/okT/oEb/n0T/oEX/o0b/n0P/oUP/okb/oUT/n0b/oUX/oET/oUb/n0X/oET/oUP/oEX/okT/oEP/oUX/oUP/oET/oUX/oEX/n0T/oEX/oET/oEX/n0T/oET/n0P/oEX/n0P/oUT/n0T/oEX/oUT/oET/oEP/oET/oUT/oEP/oEP/oET/oEP/oEP/oET/n0T/oET/oEP/n0T/oET/n0T/n0T/oET/n0T/n0P/oET/n0P/oET/n0T/oEP/oET/oET/n0T/n0T/oEP/oEP/n0P/oET/n0P/n0T/n0T/n0P/oEP/n0T/oEP/n0P/oET/n0T/oEP/oET/n0T/oET/oEP/n0T/oEP/oET/n0P/oEP/oET/n0T/oEP/n0NWaDR5AAAAenRSTlMAAwYICRAREhMUFRYZHiAjKCorLC4vMDEyMzU3ODw+QENFSExNT1BRU1RVVldZWltcX2Zna21zdHZ4e31+hYeIkZKTlJmam5yen6OkpaanqKmtsLG4ury9v8DBw8fIytHU1dfY2t3g5OXn6Onq6+zt7u/w8/n6+/z9/jLTlDYAAAE3SURBVDjL7dRHUwIxFMDxZ0OsIAoqtijqYhcVCxZQZO0iWLAXYC0IsqIivE/vRh2GLLs5evJ/yLyZ/CaHzCQAAAbxAZmezMBUfoPqEk2McGFpz5Zi4VPtyjllSTYXiYBKRCYpSbVwBIx/UmLlCBij5MXGETCaVYZ0G0fAMCVyO0eA80MZX+0cAQIlmVaOgAFK5rREbOq3sJ5g+hcaQvweTyOYCPjjiMf+c2XZyeP+PSsER6rW2ruNQzWDlW4ksIlVB2pxBnuIR3CCqxAjlvo3Y4nITgCRlsve8RZCxGP2NgRZ0S8gXpuc6xDFEFyRhWBdI3NGdM2wKC1tmEbSxr5dmz1H5vMdwIhw13TmTuh2JzHu6pmV0bOFl46Lv71TH0/M6P0OhTp1fphChz8Po1p81N6XVioAvgBZgp3AxW+3KgAAAABJRU5ErkJggg==',
            subtitle: 'Báo cáo tháng 5.',
            title: 'Ban kiểm soát vừa gửi báo cáo',
          },
          step2: {
            avatar: '/img/avatar-s-9.397f0acd.jpg',
            avatarName: 'Nguyễn Đăng Trung',
            /* duration: '45 min ago', */
            occupation: 'Đồng nghiệp',
            subtitle: 'Họp giao ban với lãnh đạo Viện',
            title: 'Họp giao ban',
          },
          step3: {
            /* duration: '2 day ago', */
            title: 'Ban Truyền thông vừa gửi báo cáo',
            subtitle: 'Báo cáo Tháng 5',
            fileName: 'bct5.docx',
            img:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAMAAAAw96PuAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIaADAAQAAAABAAAAJAAAAADeoA9wAAABcVBMVEUAAAD/qlX/qlX/n2D/qlX/n1D/pUv/qkf/oUP/pk3/qkn/okb/o0f/okT/n0j/oEn/n0b/pEn/oEf/okb/oUj/o0f/n0X/oUT/o0f/oEb/pEP/okb/n0T/okT/oEb/n0T/oEX/o0b/n0P/oUP/okb/oUT/n0b/oUX/oET/oUb/n0X/oET/oUP/oEX/okT/oEP/oUX/oUP/oET/oUX/oEX/n0T/oEX/oET/oEX/n0T/oET/n0P/oEX/n0P/oUT/n0T/oEX/oUT/oET/oEP/oET/oUT/oEP/oEP/oET/oEP/oEP/oET/n0T/oET/oEP/n0T/oET/n0T/n0T/oET/n0T/n0P/oET/n0P/oET/n0T/oEP/oET/oET/n0T/n0T/oEP/oEP/n0P/oET/n0P/n0T/n0T/n0P/oEP/n0T/oEP/n0P/oET/n0T/oEP/oET/n0T/oET/oEP/n0T/oEP/oET/n0P/oEP/oET/n0T/oEP/n0NWaDR5AAAAenRSTlMAAwYICRAREhMUFRYZHiAjKCorLC4vMDEyMzU3ODw+QENFSExNT1BRU1RVVldZWltcX2Zna21zdHZ4e31+hYeIkZKTlJmam5yen6OkpaanqKmtsLG4ury9v8DBw8fIytHU1dfY2t3g5OXn6Onq6+zt7u/w8/n6+/z9/jLTlDYAAAE3SURBVDjL7dRHUwIxFMDxZ0OsIAoqtijqYhcVCxZQZO0iWLAXYC0IsqIivE/vRh2GLLs5evJ/yLyZ/CaHzCQAAAbxAZmezMBUfoPqEk2McGFpz5Zi4VPtyjllSTYXiYBKRCYpSbVwBIx/UmLlCBij5MXGETCaVYZ0G0fAMCVyO0eA80MZX+0cAQIlmVaOgAFK5rREbOq3sJ5g+hcaQvweTyOYCPjjiMf+c2XZyeP+PSsER6rW2ruNQzWDlW4ksIlVB2pxBnuIR3CCqxAjlvo3Y4nITgCRlsve8RZCxGP2NgRZ0S8gXpuc6xDFEFyRhWBdI3NGdM2wKC1tmEbSxr5dmz1H5vMdwIhw13TmTuh2JzHu6pmV0bOFl46Lv71TH0/M6P0OhTp1fphChz8Po1p81N6XVioAvgBZgp3AxW+3KgAAAABJRU5ErkJggg==',
          },
          step4: {
            /* duration: '5 day ago', */
            title: 'Ban Hợp tác quốc tế vừa gửi báo cáo',
            subtitle: 'Báo cáo tháng 5',
          },
        },
        salesChart: {
          series: [
            {
              name: 'Đến',
              data: [90, 50, 86, 40, 100, 20],
            },
            {
              name: 'Đi',
              data: [70, 75, 70, 76, 20, 85],
            },
          ],
        },
        appDesign: {
          date: '03 Sep, 20',
          title: 'Tăng trưởng lợi nhuận',
          thuNganSach: {
            name: 'Lợi nhuận trước thuế',
            series: [
              {
                data: [3.183, 3.881, 4.985, 7.345, 14.117],
                name: 'Subscribers',
              },
            ],
          },
          chiNganSach: {
            name: 'Lợi nhuận sau thuế',
            series: [
              {
                data: [2.373, 2.990, 3.931, 5.770, 11.248],
                name: 'Orders',
              },
            ],
          },
        },
      },
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
    }
  },
  created() {
    this.$http.get('/analytics/data').then(response => {
      /* this.data = response.data */
      console.log(response.data)
    })
  },
  methods: {
    kFormatter,
    openUrl(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
<style lang="scss">
.bao-cao-2 {
  width: 100%;
  float: left;
  padding: 0 15px;
  height: 100%;
  padding-top: 15px;
}

</style>
