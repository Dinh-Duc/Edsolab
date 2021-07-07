<template>
  <div>
    <!-- faq search section -->
    <section id="faq-search-filter">
      <b-card
        no-body
        class="faq-search"
        :style="{
          backgroundImage: `url(${require('@/assets/images/banner/banner.png')})`,
        }"
      >
        <b-card-body class="text-center">
          <h2 class="text-primary mb-1">
            Hướng dẫn sử dụng ứng dụng
          </h2>

          <!-- form -->
          <b-form class="faq-search-input">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="searchbar"
                v-model="keySearch"
                placeholder="Tìm kiếm câu hỏi"
              />
            </b-input-group>
          </b-form>
          <!-- form -->
        </b-card-body>
      </b-card>
    </section>
    <!--/ faq search section -->

    <!-- frequently asked questions tabs pills -->
    <section
      id="faq-tabs"
      class="content-parent-hdsd"
    >
      <b-tabs
        vertical
        content-class="col-12 col-md-8 col-lg-9"
        pills
        nav-wrapper-class="faq-navigation col-md-4 col-lg-3 col-12"
        nav-class="nav-left"
      >
        <b-tab
          v-for="(item, key) in navMenuItems"
          :key="key"
          :active="active == key"
          @click="showData(item, key)"
        >
          <template #title>
            <span
              v-if="active != key"
              class="icon mr-1"
            >
              <img
                :src="item.icon"
                alt="icon"
              >
            </span>
            <span
              v-else
              class="icon mr-1"
            >
              <img
                :src="item.icon_white"
                alt="icon"
              >
            </span>
            <span class="font-weight-bold">{{ item.label }}</span>
          </template>

          <ContentHDSD
            v-if="keySearch.length == 0"
            :item-data="item.faq"
          />
          <ContentHDSD
            v-else
            :item-data="dataSearch"
          />
          <div class="loading-data text-center py-5">
            <Loading v-if="loading" />
          </div>
        </b-tab>
      </b-tabs>
    </section>
    <!--/ frequently asked questions tabs pills -->

    <!-- contact us -->
    <section class="faq-contact">
      <b-row class="mt-5 pt-75 text-center">
        <b-col cols="12">
          <h2>Bạn vẫn còn câu hỏi?</h2>
          <b-card-text class="mb-3">
            Nếu bạn không thể tìm thấy câu hỏi trong Câu hỏi thường gặp của
            chúng tôi, bạn luôn có thể liên hệ với chúng tôi. Chúng tôi sẽ giải
            đáp cho bạn ngay sau đây!
          </b-card-text>
        </b-col>
        <b-col sm="6">
          <b-card class="shadow-none py-1 faq-contact-card">
            <b-avatar
              size="42"
              rounded
              variant="light-primary"
              class="mb-2"
            >
              <feather-icon
                icon="PhoneCallIcon"
                size="18"
              />
            </b-avatar>
            <h4>(0251).3847292</h4>
            <span class="text-body">Chúng tôi luôn sẵn lòng giúp đỡ!</span>
          </b-card>
        </b-col>
        <b-col sm="6">
          <b-card class="shadow-none py-1 faq-contact-card">
            <b-avatar
              size="42"
              rounded
              variant="light-primary"
              class="mb-2"
            >
              <feather-icon
                icon="MailIcon"
                size="18"
              />
            </b-avatar>
            <h4>www.dongnai.gov.vn</h4>
            <span
              class="text-body"
            >Cách tốt nhất để nhận được câu trả lời nhanh hơn!</span>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <!--/ contact us -->
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BForm,
  BInputGroup,
  BFormInput,
  BCardText,
  BInputGroupPrepend,
  BTabs,
  BTab,
  BRow,
  BCol,
  BAvatar,
} from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import Loading from '@core/components/loading/Loading'
import ContentHDSD from './ContentHDSDNew.vue'
import dataJson from './data.json'

export default {
  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BAvatar,
    BCardBody,
    BInputGroup,
    BFormInput,
    BCardText,
    BInputGroupPrepend,
    BTabs,
    BTab,
    ContentHDSD,
    Loading,
  },
  data() {
    return {
      keySearch: '',
      faqData: {},
      navMenuItems: [
        {
          label: 'Báo cáo',
          icon: require('@/assets/images/icons/menu_baocao.svg'),
          icon_white: require('@/assets/images/icons/menu_baocao_white.svg'),
          faq: dataJson.baocao,
        },
        {
          label: 'Lịch làm việc',
          icon: require('@/assets/images/icons/menu_lichlamviec.svg'),
          icon_white: require('@/assets/images/icons/menu_lichlamviec_white.svg'),
          faq: dataJson.lichlamviec,
        },
        {
          label: 'Họp',
          icon: require('@/assets/images/icons/menu_hop.svg'),
          icon_white: require('@/assets/images/icons/menu_hop_white.svg'),
          faq: dataJson.hop,
        },
        {
          label: 'Quản lý nhiệm vụ',
          icon: require('@/assets/images/icons/menu_quanlynhiemvu.svg'),
          icon_white: require('@/assets/images/icons/menu_quanlynhiemvu_white.svg'),
          faq: dataJson.qlnv,
        },
        {
          label: 'Hành chính công',
          icon: require('@/assets/images/icons/menu_hanhchinhcong.svg'),
          icon_white: require('@/assets/images/icons/menu_hanhchinhcong_white.svg'),
          faq: dataJson.hcc,
        },
        {
          label: 'Ý kiến người dân',
          icon: require('@/assets/images/icons/menu_ykiennguoidan.svg'),
          icon_white: require('@/assets/images/icons/menu_ykiennguoidan_white.svg'),
          faq: dataJson.yknd,
        },
        {
          label: 'Quản lý văn bản',
          icon: require('@/assets/images/icons/menu_quanlyvanban.svg'),
          icon_white: require('@/assets/images/icons/menu_quanlyvanban_white.svg'),
          faq: dataJson.qlvb,
        },
        {
          label: 'Báo chí - Mạng xã hội',
          icon: require('@/assets/images/icons/menu_baochi_mangxahoi.svg'),
          icon_white: require('@/assets/images/icons/menu_baochi_mangxahoi_white.svg'),
          faq: dataJson.bcmxh,
        },
        {
          label: 'CCTV & Cảm biến',
          icon: require('@/assets/images/icons/menu_cctv_cambien.svg'),
          icon_white: require('@/assets/images/icons/menu_cctv_cambien_white.svg'),
          faq: dataJson.cctv,
        },
        {
          label: 'Kết nối',
          icon: require('@/assets/images/icons/menu_ketnoi.svg'),
          icon_white: require('@/assets/images/icons/menu_ketnoi_white.svg'),
          faq: dataJson.ketnoi,
        },
        {
          label: 'Tương tác nội bộ',
          icon: require('@/assets/images/icons/menu_tuongtacnoibo.svg'),
          icon_white: require('@/assets/images/icons/menu_tuongtacnoibo_white.svg'),
          faq: dataJson.ttnb,
        },
        {
          label: 'Tiện ích',
          icon: require('@/assets/images/icons/menu_tienich.svg'),
          icon_white: require('@/assets/images/icons/menu_tienich_white.svg'),
          faq: dataJson.tienich,
        },
        {
          label: 'Danh bạ điện tử',
          icon: require('@/assets/images/icons/danhba.svg'),
          icon_white: require('@/assets/images/icons/danhba_white.svg'),
          faq: dataJson.dbdt,
        },
      ],
      active: 0,
      timeOutStatus: null,
      dataSearch: [],
      dataAll: [],
      loading: false,
    }
  },
  watch: {
    keySearch(val) {
      if (val.length > 0) {
        this.loading = true
        if (this.timeOutStatus) clearTimeout(this.timeOutStatus)
        this.timeOutStatus = setTimeout(() => {
          this.filterFaq()
        }, 300)
      } else if (val.length === 0) {
        this.loading = false
        this.dataSearch = []
      } else {
        this.loading = false
        this.dataSearch = []
      }
    },
  },
  created() {
    this.dataAll = this.dataAll.concat(
      dataJson.baocao,
      dataJson.lichlamviec,
      dataJson.hop,
      dataJson.qlnv,
      dataJson.hcc,
      dataJson.yknd,
      dataJson.qlvb,
      dataJson.bcmxh,
      dataJson.cctv,
      dataJson.ketnoi,
      dataJson.ttnb,
      dataJson.tienich,
      dataJson.dbdt,
    )
  },
  methods: {
    filterFaq() {
      this.dataSearch = []
      this.dataSearch = this.dataAll.filter(item => {
        const textcovert = this.bodauTiengViet(item.title.toLowerCase())
        return textcovert.includes(
          this.bodauTiengViet(this.keySearch.toLowerCase()),
        )
      })
      this.loading = false
    },
    showData(item, key) {
      this.active = key
    },
    bodauTiengViet(str) {
      let string = str
      if (string) {
        string = string.toLowerCase()
        string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        string = string.replace(/đ/g, 'd')
        return string
      }
      return string
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-faq.scss';
</style>
