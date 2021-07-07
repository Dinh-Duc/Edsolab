<template>
  <div>
    <b-row>
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
    </b-row>
    <b-row>
      <b-col
        sm="12"
        md="6"
        lg="9"
        xl="8"
        class="col-fh-10 col-hd-9"
      >
        <div class="box-thoigian">
          <div class="box-thoigian-left">
            <!-- <span>{{ currentTime.time }}</span> -->
            <span>{{ time }}</span>
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
              <span> Ngày hoàng đạo </span>
            </div>
          </div>
        </div>
      </b-col>
      <b-col
        sm="12"
        md="6"
        lg="3"
        xl="4"
        class="col-fh-2 col-hd-3"
      >
        <div class="box-nhietdo">
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
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="6"
        sm="12"
        class="data-box left-box"
      >
        <b-card
          v-for="(item, index) in leftData"
          :key="index"
          class=""
          @click="route(item.boxUrl)"
        >
          <div class="box-container">
            <div class="box-content-title">
              <img :src="item.icon">
              <h3>{{ item.title }}</h3>
            </div>
            <div class="box-content-detail">
              <div
                v-for="(item2, index2) in item.data"
                :key="index2"
                class="content-detail-item"
              >
                <img :src="item2.icon">
                {{ item2.title }}
              </div>
            </div>
          </div>
          <div class="box-number">
            <p :class="item.numberDanger ? 'text-danger' : 'o-6'">
              {{ item.number }}
            </p>
          </div>
        </b-card>
      </b-col>
      <b-col
        md="6"
        sm="12"
        class="data-box right-box"
      >
        <b-card class="">
          <div class="box-container">
            <div class="box-content-title">
              <img :src="rightData.icon">
              <h3>{{ rightData.title }}</h3>
            </div>
            <div class="box-content-detail">
              <div
                v-for="(item, index) in ListEvents"
                :key="index"
                class="box-lich-item"
              >
                <div class="box-lich-item__title">
                  {{ item.title }}
                </div>
                <div class="box-lich-item__content">
                  <p class="w_50">
                    <img src="@/assets/images/icons/time.svg">
                    {{ item.start | DayFormat }} -
                    {{ item.end | DayFormat }}
                  </p>
                  <p class="w_50">
                    <img src="@/assets/images/icons/location.svg">
                    {{ item.extendedProps.address }}
                  </p>
                  <p class="w_50">
                    <img src="@/assets/images/icons/user_empty.svg">
                    {{ item.extendedProps.user }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="box-number">
            <p :class="rightData.numberDanger ? 'text-danger' : 'o-6'">
              {{ ListEvents.length }}
            </p>
          </div>
        </b-card>
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
    NotificationDropdown
  },
  computed: {
    ...mapGetters({
      ListEvents: 'lichlamviec/ListEvents',
    }),
  },
  data() {
    return {
      leftData: [
        {
          id: 1,
          icon: require('@/assets/images/icons/warning.svg'),
          title: 'Các tình huống khẩn cấp',
          number: '02',
          numberDanger: true,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/warning-accident.svg'),
              title: 'Hiện trường vụ tai nạn giao thông tại đường...',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/warning-accident.svg'),
              title: 'Hiện trường vụ tai nạn giao thông tại đường...',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/warning-accident.svg'),
              title: 'Hiện trường vụ tai nạn giao thông tại đường...',
              url: '#',
            },
          ],
        },
        {
          id: 2,
          icon: require('@/assets/images/icons/document.svg'),
          title: 'Văn bản chờ xử lý',
          number: '05',
          numberDanger: false,
          boxUrl: 'quan-ly-van-ban',
          data: [
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title: '',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title: '',
              url: '#',
            },
          ],
        },
        {
          id: 3,
          icon: require('@/assets/images/icons/sktn.svg'),
          title: 'Sự kiện',
          number: '02',
          numberDanger: false,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/star.svg'),
              title: 'Sinh nhật Ông Nguyễn Văn A',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/star.svg'),
              title: 'Talkshow “Trí tuệ nhân tạo với cuộc sống”',
              url: '#',
            },
          ],
        },
        {
          id: 4,
          icon: require('@/assets/images/icons/ring-nv.svg'),
          title: 'Nhiệm vụ cần xử lý',
          number: '05',
          numberDanger: false,
          boxUrl: 'quan-ly-nhiem-vu',
          data: [
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Hoàn thành dự thảo Quyết định về sử dụng đất công nghiệp tại Đồng Nai',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title: 'Báo cáo Thủ tướng về ô nhiễm KCN',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Hoàn thành dự thảo Quyết định về sử dụng đất công nghiệp tại Đồng Nai',
              url: '#',
            },
          ],
        },
      ],
      rightData: {
        title: 'Lịch làm việc tiếp theo',
        number: '02',
        icon: require('@/assets/images/icons/calendar.svg'),
        numberDanger: false,
        boxUrl: '',
      },
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
      lichlamviec: []
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
      this.moonDate = res.resultObj.lunarDateArray[0]
    })

    COMMON_GET(
      'https://ubndtinhdongnai-be.chinhquyendientu.vn/api/AreaWeather/getweatherbycode',
      { code: setLocaltion },
    ).then(res => {
      if(res.resultObj.current){
        this.temperature = Math.ceil(res.resultObj.current.temp.day)
      }else{
        this.temperature = 32
      }
    })

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

      COMMON_GET(
        `${UrlAPI}/api/QuanLyVanBan/filter-quanly-vanban`,
        param
      ).then(res => {
        console.log(res)
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
      })
    },
    getDataNv() {
      const params = {
        pageIndex: 1,
        pageSize: 12
      }
      COMMON_GET(
        `${UrlAPI}/api/QuanLyNhiemVu/filter-loai-nhiemvu`,
        params,
      ).then(res => {
        const data = []
        if(res.pageData.length > 0){
          res.pageData.map(item => {
            if(item.noiDung){
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
    }
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

      const dateString = `${d <= 9 ? `0${d}` : d}/${m <= 9 ? `0${m}` : m}/${y} ${h <= 9 ? `0${h}` : h}:${minutes <= 9 ? `0${minutes}` : minutes}`
      return dateString
    },
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/trang-chu.scss';
.notifi-dasboard{
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0.358rem 0.5rem;
  position: relative;
  top: 2px;
  .dropdown-toggle{
    &::after{
      display: none
    }
  }
  .dropdown-menu-media{
    width: 30rem;
  }
  
}
</style>
