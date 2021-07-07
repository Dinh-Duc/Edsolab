<template>
  <div class="box-dashbroard2">
    <!-- <b-row>
      <ul class="nav navbar-nav d-xl-none mobile-top-navbar">
        <li class="nav-item">
          <b-link
            class="nav-link"
            @click="toggleVerticalMenuActive()"
          >
            <feather-icon
              icon="MenuIcon"
              size="21"
            />
          </b-link>
        </li>
      </ul>
      <b-col
        sm="12"
        md="6"
        lg="9"
        xl="8"
        class="col-fh-10 col-hd-9"
      >
        <h1 class="text-center text-bold">
          ỨNG DỤNG ĐIỀU HÀNH
        </h1>
      </b-col>
      <b-col
        sm="12"
        md="6"
        lg="3"
        xl="4"
        class="col-fh-2 col-hd-3 d-flex justify-content-end"
      >
        <notification-dropdown class="notifi-dasboard" />
        <user-dropdown />
      </b-col>
    </b-row> -->
    <b-row>
      <b-col
        sm="12"
        md="6"
        lg="7"
        xl="7"
        class="col-fh-9 col-hd-8"
      >
        <div class="box-thoigian">
          <div class="box-thoigian-left">
            <!-- <span>{{ currentTime.time }}</span> -->
            <span>{{ time }}</span>
          </div>
          <div class="box-nhietdo">
            <div class="box-nhietdo-gia-tri">
              <div>
                <img src="@/assets/images/icons/weather.svg">
                <span>{{ temperature }}°C</span>
              </div>

              <span class="box-nhietdo__right-value">AQI: </span>
              <span class="text-success">49 (Tốt)</span>
            </div>
          </div>
          <div class="box-thoigian-right">
            <p>{{ dateNow }}</p>
            <div class="box-thoigian-lich-am">
              <span>{{ moonDate }}</span>
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="3"
                  cy="3"
                  r="3"
                  fill="#FFA902"
                />
              </svg>
              <span> Ngày Hoàng đạo </span>
            </div>
          </div>
        </div>
      </b-col>
      <b-col
        sm="12"
        md="6"
        lg="5"
        xl="5"
        class="col-fh-3 col-hd-4"
        style="padding-top: 20px;"
      >
        <!-- <div class="box-nhietdo">
          <div class="box-nhietdo-gia-tri">
            <img src="@/assets/images/icons/weather.svg">
            <span>{{ temperature }}°C</span>
            <span
              class="box-nhietdo__right-value"
            >AQI: <span class="text-success">49 (Tốt)</span></span>
          </div>
          <div class="tabs-ngay-thang-nam">
            <b-button-group class="mt-1">
              <div class="btn-group">
                <b-button
                  :class="btnActive == 0 ? 'active' : ''"
                  variant="primary"
                  @click="active(0)"
                >
                  Ngày
                </b-button>
              </div>
              <div class="btn-group">
                <b-button
                  :class="btnActive == 1 ? 'active' : ''"
                  variant="primary"
                  @click="active(1)"
                >
                  Tuần
                </b-button>
              </div>
              <div class="btn-group">
                <b-button
                  :class="btnActive == 2 ? 'active' : ''"
                  variant="primary"
                  @click="active(2)"
                >
                  Tháng
                </b-button>
              </div>
            </b-button-group>
          </div>
        </div> -->

        <user-dropdown style="float: right" />
        <div style="float: right; width: 50px;">
          <notification-dropdown
            class="notifi-dasboard"
            style="padding-top: 10px; float: right;"
          />
        </div>
      </b-col>
    </b-row>

    <b-row
      class="match-height block-head"
      style="margin-top: 20px"
    >
      <b-col lg="4">
        <b-row class="match-height">
          <b-col
            lg="12"
            md="12"
            cols="12"
          >
            <NhiemVu :data="dataChart.statisticsOrder" />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="4">
        <b-row class="match-height">
          <b-col
            lg="12"
            md="12"
            cols="12"
          >
            <BoxThucHienMucTieu />

          </b-col>
        </b-row>
      </b-col>
      <b-col lg="4">
        <TinhTrangBaoCao :data="dataChart.revenue" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <!-- Company Table Card -->
      <b-col lg="8">
        <DonViTable :table-data="dataChart.companyTable" />
        <!-- <DonViTable2 /> -->
      </b-col>

      <!-- Developer Meetup Card -->
      <b-col
        lg="4"
        md="6"
      >
        <!-- <HopGiaoBan :data="dataChart.meetup" /> -->
        <BaoChi :data="dataChart.transactionData" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <!-- <b-col
        lg="5"
        md="6"
      > -->
      <!-- <Baocao /> -->
      <!-- <SoNguoiThamGiaBHXH /> -->
      <!-- </b-col> -->
      <b-col
        lg="5"
        md="6"
        cols="12"
      >
        <!-- <HanhChinhCong /> -->
        <BoxLaiSuatTienGui />
        <SoSanhMucTieu :data="dataChart.earningsChart" />

        <!-- <YkienNguoiDan :data="dataChart.goalOverview" /> -->
      </b-col>
      <b-col
        lg="7"
        md="6"
      >
        <BoxVonChuSoHuu />
        <!-- <BaoChi :data="dataChart.transactionData" /> -->
      </b-col>
    </b-row>
  </div>
</template>
<script>
/* eslint-disable */
import store from '@/store'
import moment from 'moment'
import { UrlAPI } from '@/configs/config'
import UserDropdown from '@core/layouts/components/app-navbar/components/UserDropdown.vue'
import { BRow, BCol, BButtonGroup, BButton, BCard } from 'bootstrap-vue'
import { COMMON_GET } from '@/api/base2'
import NotificationDropdown from '@core/layouts/components/app-navbar/components/NotificationDropdown.vue'

import { mapGetters } from 'vuex'

import TinhTrangBaoCao from './TinhTrangBaoCao.vue'
import NhiemVu from './NhiemVu.vue'
import VanBanCanXuLy from './VanBanCanXuLy.vue'
import SoSanhMucTieu from './SoSanhMucTieu.vue'
import DonViTable from './DonViTable.vue'
/* import DonViTable2 from './DonViTable2.vue' */
import HopGiaoBan from './HopGiaoBan.vue'
import BaoChi from './BaoChi.vue'
import YkienNguoiDan from './YkienNguoiDan.vue'
import Baocao from './Baocao.vue'

import BoxLaiSuatTienGui from './BoxLaiSuatTienGui.vue'
import BoxThucHienMucTieu from './BoxThucHienMucTieu.vue'
import BoxVonChuSoHuu from './BoxVonChuSoHuu.vue'
import HanhChinhCong from './hanhChinhCong.vue'
import SoNguoiThamGiaBHXH from './soNguoiThamGiaBHXH.vue'

export default {
  name: 'Dashboard',
  components: {
    UserDropdown,
    BRow,
    BCol,
    BButtonGroup,
    BButton,
    BCard,
    moment,
    NotificationDropdown,
    TinhTrangBaoCao,
    NhiemVu,
    VanBanCanXuLy,
    SoSanhMucTieu,
    DonViTable,
    HopGiaoBan,
    BaoChi,
    YkienNguoiDan,
    Baocao,
    BoxLaiSuatTienGui,
    BoxThucHienMucTieu,
    BoxVonChuSoHuu,
    HanhChinhCong,
    SoNguoiThamGiaBHXH,
    /* DonViTable2, */
  },
  computed: {
    ...mapGetters({
      ListEvents: 'lichlamviec/ListEvents',
    }),
  },
  data() {
    return {
      btnActive: 0,
      currentTime: {
        time: '',
        date: '',
        moonDate: '',
        zodiacDay: '',
      },
      dateNow: '',
      moonDate: '',
      time: '',
      temperature: 0,
      boxDataNv: [],
      lichlamviec: [],

      dataChart: {
        companyTable: [
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company1-img.png'),
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            // subtitle: 'Đoàn thanh niên Viện Hàn Lâm',
            title: 'Bộ trưởng họp Hội đồng quản lý Quỹ Bảo hiểm xã hội',
            viewTitle: '8:30 AM',
            viewsub: 'in 24 hours',
            totalPeople: 30,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Thứ trưởng Trần Xuân Hà họp với Cục QLCS',
            viewTitle: '8:30 AM',
            viewsub: 'in 24 hours',
            totalPeople: 42,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Họp rà soát Thông tư thay thế Thông tư 61/2016/TT-BTC',
            viewTitle: '13:30 PM',
            viewsub: 'in 24 hours',
            totalPeople: 42,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Thứ trưởng Tạ Anh Tuấn họp sửa đổi Thông tư 160, 161 về chi phí xuất, nhập, bảo quản hàng dự trữ ',
            viewTitle: '08:30 PM',
            viewsub: 'in 24 hours',
            totalPeople: 28,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Họp báo Chính phủ thường kỳ tháng 6',
            viewTitle: '17:00 PM',
            viewsub: 'in 24 hours',
            totalPeople: 38,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Bộ trưởng họp tiếp Đại sứ Hungary',
            viewTitle: '9:00 PM',
            viewsub: 'in 24 hours',
            totalPeople: 38,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Bộ trưởng làm việc với tỉnh Quảng Ngãi ',
            viewTitle: '14:00 PM',
            viewsub: 'in 24 hours',
            totalPeople: 38,
          },
          {
            avatarImg: '/img/toolbox.1c0f7f0b.svg',
            avatarTitle: [
              require('@/assets/images/dashboard2/company2-img.png'),
              require('@/assets/images/dashboard2/company3-img.png'),
              require('@/assets/images/dashboard2/company1-img.png'),
            ],
            loss: true,
            revenue: '891.2',
            sales: '68',
            title: 'Các đồng chí Lãnh đạo Bộ xử lý công việc thường xuyên',
            viewTitle: '8:30 AM',
            viewsub: 'in 24 hours',
            totalPeople: 38,
          },
        ],
        statisticsOrder: {
          series: [
            {
              data: [45, 85, 62, 45, 65],
              name: '2021',
            },
          ],
        },
        statisticsProfit: {
          series: [
            {
              data: [0, 20, 5, , 30, 15, 65],
            },
          ],
        },
        earningsChart: {
          data: {
            series: [88, 16, 31],
          },
        },
        revenue: {
          budget: '56,800',
          price: '25,852',
          budgetChart: {
            series: [
              {
                data: [61, 48, 49, 52, 64, 40, 79, 60, 59, 43, 62],
              },
              {
                data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27],
              },
            ],
          },
          revenueReport: {
            series: [
              {
                data: [95, 177, 284, 256, 105, 63, 168, 218, 72],
                name: 'Earning',
              },
              {
                data: [-145, -80, -60, -280, -100, -60, -85, -75, -100],
                name: 'Expense',
              },
            ],
          },
          years: ['2019', '2020', '2021'],
        },
        meetup: {
          avatars: [
            {
              avatar: '/img/avatar-s-9.397f0acd.jpg',
              fullName: 'Billy Hopkins',
            },
            {
              avatar: '/img/avatar-s-6.0f4533ab.jpg',
              fullName: 'Amy Carson',
            },
          ],
          mediaData: [
            {
              avatar: 'CalendarIcon',
              subtitle: '10:AM to 6:PM',
              title: 'Sat, May 25, 2020',
            },
            {
              avatar: 'MapPinIcon',
              subtitle: '2 Nguyễn Văn Trị, Biên Hoà, Đồng Nai',
              title: 'Tầng 7, vp UBND tỉnh',
            },
          ],
        },
        goalOverview: {
          completed: '786,617',
          inProgress: '13,561',
          series: [83],
        },
        transactionData: [
          {
            avatar: require('@/assets/images/dashboard2/baochi.svg'),
            avatarVariant: 'light-primary',
            payment: 200,
            mode: 'Báo chí',
          },
          {
            avatar: require('@/assets/images/dashboard2/facebook.svg'),
            avatarVariant: 'light-success',
            payment: 60,
            mode: 'Mạng xã hội',
          },
          {
            avatar: require('@/assets/images/dashboard2/blog.svg'),
            payment: 16,
            mode: 'Blog',
          },
          {
            avatar: require('@/assets/images/dashboard2/forum.svg'),
            avatarVariant: 'light-warning',
            payment: 500,
            mode: 'Forum',
          },
          {
            avatar: require('@/assets/images/dashboard2/other.svg'),
            avatarVariant: 'light-info',
            payment: 30,
            mode: 'Nguồn khác',
          },
        ],
      },
    }
  },
  beforeCreate() {
    store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: 'hidden' })
    store.commit('appConfig/UPDATE_FOOTER_CONFIG', { type: 'hidden' })
  },
  created() {
    COMMON_GET(
      'https://ubndtinhdongnai-be.chinhquyendientu.vn/api/LunarDate/getLunarDate',
    ).then(res => {
      this.dateNow = res.resultObj.dateMore
      console.log(this.dateNow)
      this.moonDate = res.resultObj.lunarDateArray[0]
      console.log(this.moonDate)
    })

    COMMON_GET(
      'https://ubndtinhdongnai-be.chinhquyendientu.vn/api/AreaWeather/getweatherbycode',
      { code: setLocaltion },
    ).then(res => {
      if (res.resultObj.current) {
        this.temperature = Math.ceil(res.resultObj.current.temp.day)
      } else {
        this.temperature = 32
      }
    })

    /* this.$http.get('/ecommerce/data').then(response => {
      console.log(response.data)
      this.dataChart = response.data
    }) */

    this.getTimeNow()
    this.getDocs()
    this.getDataNv()
    this.$store.dispatch('lichlamviec/getListEvents', {
      PageIndex: 1,
      PageSize: 100,
      Status: '1,2,3,4',
      StatusNotIn: '6',
    })
  },
  mounted() {},
  beforeDestroy() {
    store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: 'sticky' })
  },
  methods: {
    active(number) {
      this.btnActive = number
    },
    route(url) {
      console.log(url)
      this.$router.push({ name: url })
    },
    toggleVerticalMenuActive() {
      /* document.querySelector.classList.remove(); */
    },
    getTimeNow() {
      let current = new Date()
      this.time = `${current.getHours()}:${this.forMatMinute(
        current.getMinutes(),
      )}`
      setTimeout(() => {
        this.time = `${current.getHours()}:${this.forMatMinute(
          current.getMinutes(),
        )}`
        this.getTimeNow()
      }, 1000)
    },
    forMatMinute(number) {
      const minute = number.toString().length
      if (minute == 1) {
        return '0' + number
      } else {
        return number
      }
    },
    getDocs() {
      const param = {
        loaiVanBan: 1,
        pageIndex: 1,
        pageSize: 10,
      }

      COMMON_GET(`${UrlAPI}/api/QuanLyVanBan/filter-quanly-vanban`, param).then(
        res => {
          if (res && res.pageData.length > 0) {
            const listPush = []
            for (let index = 0; index < res.pageData.length; index++) {
              const element = {
                icon: require('@/assets/images/icons/ellipse_blue.svg'),
                title:
                  res.pageData[index].soKyHieu +
                  ' ' +
                  res.pageData[index].ngayNhan +
                  ' ' +
                  res.pageData[index].trichYeu,
                url: '#',
              }
              listPush.push(element)
            }

            this.leftData = this.leftData.map(x => {
              if (x.id === 2) {
                x.data = listPush
              }
              return x
            })
          }
        },
      )
    },
    getDataNv() {
      const params = {
        pageIndex: 1,
        pageSize: 12,
      }
      COMMON_GET(
        `${UrlAPI}/api/QuanLyNhiemVu/filter-loai-nhiemvu`,
        params,
      ).then(res => {
        const data = []
        if (res.pageData.length > 0) {
          res.pageData.map(item => {
            if (item.noiDung) {
              const dataGet = {
                icon: require('@/assets/images/icons/ellipse.svg'),
                title: item.noiDung,
                url: '#',
              }
              data.push(dataGet)
            }
          })

          this.leftData = this.leftData.map(x => {
            if (x.id === 4) {
              x.data = data
            }
            return x
          })
        }
      })
    },
  },
  filters: {
    DayFormat(value) {
      if (!value) return ''
      const dateval = new Date(value)
      const d = dateval.getDate()
      const m = dateval.getMonth() + 1
      const y = dateval.getFullYear()
      const h = dateval.getHours()
      const minutes = dateval.getMinutes()

      const dateString = `${d <= 9 ? `0${d}` : d}/${
        m <= 9 ? `0${m}` : m
      }/${y} ${h <= 9 ? `0${h}` : h}:${minutes <= 9 ? `0${minutes}` : minutes}`
      return dateString
    },
  },
}
</script>
<style lang="scss">
@import '../../assets/scss/trang-chu.scss';
.notifi-dasboard {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0.358rem 0.5rem;
  position: relative;
  top: 2px;
  .dropdown-toggle {
    &::after {
      display: none;
    }
  }
  .dropdown-menu-media {
    width: 30rem;
  }
}

.box-dashbroard2 {
  margin-top: -2rem;
}

</style>
