<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu">
          <vue-perfect-scrollbar :settings="perfectScrollbarSettings">
            <div class="menu-filter-docs">
              <!-- Tổng quan -->
              <div
                class="all-filter-docs"
                @click="chooseFilterAll(headerLeftmenu), (showChildIndex = -1)"
              >
                <div
                  class="none-active-filter"
                  :class="{ 'active-tab': IsAllTab }"
                />
                <div class="img-all-docs">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.87497 5.05005H5.625C6.13519 5.05005 6.55006 4.63518 6.55006 4.12499V1.87497C6.55006 1.36487 6.13518 0.95 5.625 0.95H1.87497C1.36487 0.95 0.95 1.36487 0.95 1.87497V4.12499C0.95 4.63518 1.36487 5.05005 1.87497 5.05005ZM1.8 1.87497C1.8 1.83365 1.83365 1.8 1.87497 1.8H5.625C5.66644 1.8 5.70006 1.83367 5.70006 1.87497V4.12499C5.70006 4.1664 5.66641 4.20005 5.625 4.20005H1.87497C1.83367 4.20005 1.8 4.16643 1.8 4.12499V1.87497Z"
                      fill="#5A8DEE"
                      stroke="#5A8DEE"
                      stroke-width="0.1"
                    />
                    <path
                      d="M1.87497 13.05H5.625C6.13518 13.05 6.55006 12.6351 6.55006 12.125V6.87501C6.55006 6.36481 6.13519 5.94994 5.625 5.94994H1.87497C1.36487 5.94994 0.95 6.36482 0.95 6.87501V12.125C0.95 12.6351 1.36487 13.05 1.87497 13.05ZM1.8 6.87501C1.8 6.83356 1.83367 6.79994 1.87497 6.79994H5.625C5.66641 6.79994 5.70006 6.83359 5.70006 6.87501V12.125C5.70006 12.1663 5.66644 12.2 5.625 12.2H1.87497C1.83365 12.2 1.8 12.1664 1.8 12.125V6.87501Z"
                      fill="#5A8DEE"
                      stroke="#5A8DEE"
                      stroke-width="0.1"
                    />
                    <path
                      d="M8.37507 13.05H12.1251C12.6352 13.05 13.0501 12.6351 13.0501 12.125V9.87501C13.0501 9.36482 12.6352 8.94994 12.1251 8.94994H8.37507C7.86487 8.94994 7.45 9.36481 7.45 9.87501V12.125C7.45 12.6351 7.86488 13.05 8.37507 13.05ZM8.3 9.87501C8.3 9.83359 8.33365 9.79994 8.37507 9.79994H12.1251C12.1664 9.79994 12.2001 9.83356 12.2001 9.87501V12.125C12.2001 12.1663 12.1664 12.2 12.1251 12.2H8.37507C8.33363 12.2 8.3 12.1663 8.3 12.125V9.87501Z"
                      fill="#5A8DEE"
                      stroke="#5A8DEE"
                      stroke-width="0.1"
                    />
                    <path
                      d="M8.37507 8.05001H12.1251C12.6352 8.05001 13.0501 7.63513 13.0501 7.12495V1.87491C13.0501 1.36481 12.6352 0.949939 12.1251 0.949939H8.37507C7.86488 0.949939 7.45 1.36481 7.45 1.87491V7.12495C7.45 7.63514 7.86487 8.05001 8.37507 8.05001ZM8.3 1.87491C8.3 1.83361 8.33363 1.79994 8.37507 1.79994H12.1251C12.1664 1.79994 12.2001 1.83359 12.2001 1.87491V7.12495C12.2001 7.16639 12.1664 7.20001 12.1251 7.20001H8.37507C8.33365 7.20001 8.3 7.16636 8.3 7.12495V1.87491Z"
                      fill="#5A8DEE"
                      stroke="#5A8DEE"
                      stroke-width="0.1"
                    />
                  </svg>
                  <span
                    class="text-elm-filter"
                    :class="{ 'active-name': IsAllTab }"
                  >{{ headerLeftmenu.Name }}</span>
                </div>
                <b-badge class="align-self-center">
                  7200
                  <!-- {{ formatNumber(Go_Total) }} -->
                </b-badge>
              </div>

              <!-- dataSibar -->
              <div
                v-for="(item, index) in dataSidebar"
                :key="index"
                class="filter-goto-elm"
              >
                <!-- Tags -->
                <div
                  class="title-doc-goto"
                  :class="{ 'active': showChildIndex === index }"
                  @click="showChildIndex = index, chooseFilterAll(item.children[0])"
                >
                  <b>
                    {{ item.name }}
                  </b>
                </div>
                <div
                  v-if="showChildIndex == index"
                  class="sub-filter-docs"
                >
                  <ul>
                    <li
                      v-for="(filter, indexChild) in item.children"
                      :key="indexChild"
                      @click="chooseFilterAll(filter)"
                    >
                      <div
                        class="none-active-filter"
                        :class="{ 'active-tab': key === filter.key }"
                      />
                      <div class="text-filter-elm">
                        <div>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M6.18572 0.0440433L11.7144 2.78121C11.8878 2.86693 11.9999 3.06398 11.9997 3.28149C11.9996 3.49918 11.8868 3.69586 11.7133 3.78106L6.18462 6.5001C6.12588 6.5291 6.06291 6.5436 6.00007 6.5436C5.93724 6.5436 5.87442 6.5291 5.81536 6.5001L0.28672 3.78109C0.11333 3.69572 0.000549002 3.49921 0.000244135 3.28151C8.02528e-05 3.06382 0.112229 2.86695 0.285619 2.78121L5.81426 0.0440433C5.93285 -0.0146811 6.06699 -0.0146811 6.18572 0.0440433ZM11.9617 8.50459C11.8591 8.22853 11.5816 8.10072 11.343 8.21927L6.00002 10.8645L0.657033 8.21927C0.417502 8.10037 0.140917 8.22871 0.0383544 8.50459C-0.064372 8.7805 0.04637 9.10025 0.285573 9.21862L5.81421 11.956C5.87358 11.9853 5.93688 12 6.00002 12C6.06317 12 6.12647 11.9853 6.18584 11.956L11.7145 9.21862C11.9535 9.10022 12.0643 8.78047 11.9617 8.50459ZM11.3441 5.4997C11.5833 5.38203 11.86 5.51057 11.9623 5.78664C12.0642 6.06306 11.9529 6.38246 11.7135 6.50009L6.18485 9.21913C6.12596 9.24813 6.06298 9.26263 6.00014 9.26263C5.93731 9.26263 5.87449 9.24813 5.81543 9.21913L0.286792 6.50012C0.0474256 6.38248 -0.0639258 6.06308 0.0381678 5.78664C0.140121 5.51057 0.416847 5.38187 0.656378 5.4997L6.00014 8.1279L11.3441 5.4997Z"
                              fill="#40566F"
                              fill-opacity="0.5"
                            />
                          </svg>

                          <span
                            class="text-elm-filter"
                            :class="{
                              'active-name': key === filter.key,
                            }"
                          >{{ filter.name }}</span>
                        </div>
                        <b-badge class="align-self-center">
                          {{ formatNumber(filter.total) }}
                        </b-badge>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UrlAPI } from '@/configs/config'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { mapGetters } from 'vuex'

export default {
  directives: {
    Ripple,
  },
  components: {
    VuePerfectScrollbar,
  },
  props: {
    dataChart: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showChildIndex: 0,
      dataSidebar: [
        // {
        //   name: 'Đơn vị chuyên môn',
        //   children: [
        //     {
        //       name: 'Ban Tổ chức - Cán bộ',
        //       total: 350,
        //       key: 'DVCM_BTCCB',
        //     },
        //     {
        //       name: 'Ban Kế hoạch - Tài chính',
        //       total: 540,
        //       key: 'DVCM_BKHTC',
        //     },
        //     {
        //       name: 'Ban ứng dụng và triển khai công nghệ',
        //       total: 340,
        //       key: 'DVCM_BUDVTKCN',
        //     },
        //     {
        //       name: 'Ban Hợp tác quốc tế',
        //       total: 400,
        //       key: 'DVCM_BHTQT',
        //     },
        //     {
        //       name: 'Ban kiểm tra',
        //       total: 200,
        //       key: 'DVCM_BKT',
        //     },
        //     {
        //       name: 'Văn phòng',
        //       total: 320,
        //       key: 'DVCM_VP',
        //     },
        //     {
        //       name: 'Văn phòng đại diện tại Hồ Chí Minh',
        //       total: 420,
        //       key: 'DVCM_VPĐTHCM',
        //     },
        //   ],
        // },
        // {
        //   name: 'Viện nghiên cứu',
        //   children: [
        //     {
        //       key: 'VNC_10',
        //       name: 'Viện Toán học',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_11',
        //       name: 'Viện Vật lý',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_12',
        //       name: 'Viện Hóa học',
        //       total: 40,
        //     },
        //     {
        //       key: 'VNC_13',
        //       name: 'Viện Hóa học các hợp chất thiên nhiên',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_14',
        //       name: 'Viện Cơ học',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_15',
        //       name: 'Viện Sinh thái và tài nguyên sinh vật',
        //       total: 60,
        //     },
        //     {
        //       key: 'VNC_16',
        //       name: 'Viện Địa lý',
        //       total: 60,
        //     },
        //     {
        //       key: 'VNC_17',
        //       name: 'Viện Địa chất',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_18',
        //       name: 'Viện Vật lý địa cầu',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_19',
        //       name: 'Viện Hải dương học',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_20',
        //       name: 'Viện Tài nguyên và môi trường biển',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_21',
        //       name: 'Viện Địa chất và địa vật lý biển',
        //       total: 30,
        //     },
        //     {
        //       key: 'VNC_22',
        //       name: 'Viện Khoa học năng lượng',
        //       total: 30,
        //     },
        //     {
        //       key: 'VNC_23',
        //       name: 'Viện Khoa học vật liệu',
        //       total: 40,
        //     },
        //     {
        //       key: 'VNC_24',
        //       name: 'Viện Công nghệ thông tin',
        //       total: 30,
        //     },
        //     {
        //       key: 'VNC_25',
        //       name: 'Viện Công nghệ sinh học',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_26',
        //       name: 'Viện Công nghệ môi trường',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_27',
        //       name: 'Viện Công nghệ hóa học',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_28',
        //       name: 'Viện Công nghệ vũ trụ',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_29',
        //       name: 'Viện Cơ học và tin học ứng dụng',
        //       total: 60,
        //     },
        //     {
        //       key: 'VNC_30',
        //       name: 'Viện Sinh học nhiệt đới',
        //       total: 60,
        //     },
        //     {
        //       key: 'VNC_31',
        //       name: 'Viện Kỹ thuật nhiệt đới',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_32',
        //       name: 'Viện Khoa học vật liệu ứng dụng',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_32A',
        //       name: 'Viện Nghiên cứu và ứng dụng công nghệ Nha Trang',
        //       total: 30,
        //     },
        //     {
        //       key: 'VNC_32B',
        //       name: 'Viện Hóa sinh biển',
        //       total: 40,
        //     },
        //     {
        //       key: 'VNC_32C',
        //       name: 'Trung tâm vũ trụ Việt Nam',
        //       total: 30,
        //     },
        //     {
        //       key: 'VNC_33',
        //       name: 'Viện Nghiên cứu khoa học Tây Nguyên',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_34',
        //       name: 'Viên Nghiên cứu hệ Gen',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_35',
        //       name: 'Viện Vật lý TP HCM',
        //       total: 50,
        //     },
        //     {
        //       key: 'VNC_36',
        //       name: 'Nghiên cứu khoa học miền trung',
        //       total: 20,
        //     },
        //     {
        //       key: 'VNC_37',
        //       name: 'Địa lý tài nguyên TP HCM',
        //       total: 10,
        //     },
        //     {
        //       key: 'VNC_38',
        //       name: 'Viện Sinh thái học miền Nam',
        //       total: 50,
        //     },
        //   ],
        // },
        // {
        //   name: 'Đơn vị sự nghiệp',
        //   children: [
        //     {
        //       name: 'Nhà xuất bản Khoa học tự nhiên và công nghệ',
        //       total: 200,
        //       key: 'DVSN_BTCCB',
        //     },
        //     {
        //       name: 'Bảo tàng thiên nhiên Việt Nam',
        //       total: 150,
        //       key: 'DVSN_BKHTC',
        //     },
        //     {
        //       name: 'Trung tâm Thông tin - Tư liệu',
        //       total: 220,
        //       key: 'DVSN_BUDVTKCN',
        //     },
        //     {
        //       name: 'Trung tâm Tin học và tính toán',
        //       total: 300,
        //       key: 'DVSN_BHTQT',
        //     },
        //     {
        //       name: 'Trung tâm phát triển công nghệ cao',
        //       total: 120,
        //       key: 'DVSN_BKT',
        //     },
        //     {
        //       name: 'Học viện Khoa học và công nghệ',
        //       total: 130,
        //       key: 'DVSN_VP',
        //     },
        //     {
        //       name: 'Trường Đại học Khoa học và Công nghệ Hà Nội',
        //       total: 210,
        //       key: 'DVSN_VPĐTHCM',
        //     },
        //     {
        //       name: 'Trung tân Nghiên cứu và chuyển giao công nghệ',
        //       total: 230,
        //       key: 'DVSN_VPĐTHCM',
        //     },
        //   ],
        // },
        {
          name: 'Văn bản đến',
          children: [
            {
              name: 'Tổng quan',
              total: 3130,
              key: 'VBDEN_tongQuan',
              TinhTrang: '',
              TrangThai: '',
              TrangThaiVanBan: '',
            },
            {
              name: 'Chưa xử lý quá hạn',
              total: 450,
              key: 'VBDEN_chuaXuLyQuaHan',
              TinhTrang: 0,
              TrangThai: 1,
              TrangThaiVanBan: 'chờ xử lý quá hạn',
            },
            {
              name: 'Chưa xử lý trong hạn',
              total: 550,
              key: 'VBDEN_chuaXuLyTrongHan',
              TinhTrang: 0,
              TrangThai: 0,
              TrangThaiVanBan: 'chờ xử lý',
            },
            {
              name: 'Đã xử lý quá hạn',
              total: 900,
              key: 'VBDEN_daXuLyQuaHan',
              TinhTrang: 2,
              TrangThai: 1,
              TrangThaiVanBan: 'đã xử lý quá hạn',
            },
            {
              name: 'Đã xử lý trong hạn',
              total: 100,
              key: 'VBDEN_daXuLyTrongHan',
              TinhTrang: 2,
              TrangThai: 0,
              TrangThaiVanBan: 'đã xử lý',
            },
            {
              name: 'Đang xử lý quá hạn',
              total: 400,
              key: 'VBDEN_dangXuLyQuaHan',
              TinhTrang: 1,
              TrangThai: 1,
              TrangThaiVanBan: 'đang xử lý quá hạn',
            },
            {
              name: 'Đang xử lý trong hạn',
              total: 730,
              key: 'VBDEN_dangXuLyTrongHan',
              TinhTrang: 1,
              TrangThai: 0,
              TrangThaiVanBan: 'đang xử lý',
            },
          ],
        },
        {
          name: 'Văn bản đi',
          children: [
            { name: 'Tổng quan', total: 4070, key: 'VBDI_TONG_QUAN' },
            { name: 'Chờ trình ký', total: 300, key: 'VBDI_CHO_TRINH_KY' },
            { name: 'Chờ xử lý', total: 1200, key: 'VBDI_CHO_XU_LY' },
            { name: 'Đã xử lý', total: 500, key: 'VBDI_DA_XU_LY' },
            { name: 'Đã trả lại', total: 1000, key: 'VBDI_DA_TRA_LAI' },
            { name: 'Chờ ý kiến', total: 800, key: 'VBDI_CHO_Y_KIEN' },
            { name: 'Chờ cấp số', total: 270, key: 'VBDI_CHO_CAP_SO' },
          ],
        },
      ],
      headerLeftmenu: {
        Name: 'Tổng quan',
        Total: 1,
        key: 'TONG_QUAN',
        TinhTrang: -1,
        TrangThai: -1,
        TrangThaiVanBan: '',
      },
      IsAllTab: true,
      key: '',
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      DataCountChart: null,
    }
  },
  computed: {
    ...mapGetters([
      'Go_Total',
      'DataChartNumber',
      'TinhTrangVBDen',
      'TinhTrangVBDi',
    ]),
  },
  created() {
    /* this.getTotalDoc() */
    this.changeTotalDen()
  },
  methods: {
    chooseFilterAll(data) {
      this.$store.dispatch('keyActivedSidebar', data.key)
      if (data.key === 'TONG_QUAN') {
        // this.IsAllTab = this.$store.state.docsManage.isAllFilter
        this.IsAllTab = true
        this.key = ''
      } else {
        this.key = data.key
        this.IsAllTab = false
      }
      const model = {}

      if (data.key.includes('VBDEN_')) {
        model.DocTypeId = 1
      } else if (data.key.includes('VBDI_')) {
        model.DocTypeId = 2
      } else if (data.key.includes('DVCM_')) {
        model.DocTypeId = 3
      } else if (data.key.includes('VNC_')) {
        model.DocTypeId = 4
      } else if (data.key.includes('DVSN_')) {
        model.DocTypeId = 5
      } else {
        model.DocTypeId = 0
      }
      model.TinhTrang = data.TinhTrang
      model.TrangThai = data.TrangThai
      model.TrangThaiVanBan = data.TrangThaiVanBan
      model.PageIndex = 1
      this.$emit('tab-docs-selected', model)
      this.$store.dispatch('changeTab')
    },

    changeTotalDen() {
      const param = {
        loaiVanBan: 1,
      }

      try {
        // eslint-disable-next-line no-undef
        COMMON_GET(
          `${UrlAPI}/api/QuanLyVanBan/thongke-trangthai-vanban`,
          param,
        ).then(res => {
          if (res) {
            // for (let index = 0; index < this.goDocs.Child.length; index += 1) {
            //   if (this.goDocs.Child[index].key === 'VBDEN_tongQuan') {
            //     this.goDocs.Child[index].Total = res.daXuLy + res.dangXuLy + res.choXuLy
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_chuaXuLyQuaHan'
            //   ) {
            //     this.goDocs.Child[index].Total = 0
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_chuaXuLyTrongHan'
            //   ) {
            //     this.goDocs.Child[index].Total = res.choXuLy
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_daXuLyQuaHan'
            //   ) {
            //     this.goDocs.Child[index].Total = 0
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_daXuLyTrongHan'
            //   ) {
            //     this.goDocs.Child[index].Total = res.daXuLy
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_dangXuLyQuaHan'
            //   ) {
            //     this.goDocs.Child[index].Total = 0
            //   } else if (
            //     this.goDocs.Child[index].key === 'VBDEN_dangXuLyTrongHan'
            //   ) {
            //     this.goDocs.Child[index].Total = res.dangXuLy
            //   }
            // }
          }
        })
      } catch (error) {
        console.log(`getThongKeVBDen: ${error}`)
      }
    },

    formatNumber: number => `${number ? number.toFixed(0) : 0}`.replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1.',
    ),
  },
}
</script>

<style lang="scss">
.docs-manage {
  .sidebar-content.todo-sidebar {
    height: 100%;
    overflow-y: auto;

    .menu-tong-quan {
      .title-doc {
        padding-top: 8px;
        padding-left: 20px;
        font-weight: 500;
        font-size: 16px;
        color: #40566f;
        b {
          font-weight: 500;
          font-size: 16px;
        }
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          cursor: pointer;
          position: relative;
          svg {
            margin-bottom: 4px;
          }
          .none-active-filter {
            top: calc(50% - 19px);
          }
          .text-filter {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            padding: 6px 0 6px 20px;
            color: #727e8c;
          }
        }
      }
    }
  }

  /* width */
  .sidebar-content.todo-sidebar::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  .sidebar-content.todo-sidebar::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  .sidebar-content.todo-sidebar::-webkit-scrollbar-thumb {
    background: rgb(201, 198, 198);
    border-radius: 5px;
  }

  /* Handle on hover */
  .sidebar-content.todo-sidebar::-webkit-scrollbar-thumb:hover {
    background: rgb(163, 163, 163);
  }

  .menu-filter-docs {
    width: 100%;
    float: left;
    padding: 18px 0;
    padding-right: 5px;
  }
  .all-filter-docs {
    width: 100%;
    float: left;
    height: 38px;
    padding-top: 8px;
    cursor: pointer;
    position: relative;
  }
  .img-all-docs {
    width: 200px;
    float: left;
    padding-left: 20px;
  }
  .img-all-docs svg {
    margin-right: 5px;
  }
  .text-elm-filter {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #727e8c;
    vertical-align: middle;
  }
  .align-self-center {
    float: right;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #5a8dee;
    background: #e6eefc;
    border-radius: 2px;
  }
  .filter-goto-elm {
    width: 100%;
    float: left;
    .title-doc-goto {
      width: 100%;
      float: left;
      padding-left: 20px;
      height: 38px;
      padding-top: 8px;
      &.active b{
        color: #5a8dee;
      }
      b {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #40566f;
        cursor: pointer;
      }
    }
    .sub-filter-docs {
      width: 100%;
      float: left;
      ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
        li {
          height: 38px;
          cursor: pointer;
          position: relative;
          div {
            svg {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .none-active-filter {
    width: 3px;
    height: 38px;
    float: left;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 1.5px;
  }
  .active-tab {
    background: #5a8dee;
  }
  .text-filter-elm {
    width: 100%;
    float: left;
    padding-left: 20px;
    padding-top: 7px;
  }
  .text-filter-elm div {
    width: 200px;
    float: left;
  }
  .active-name {
    color: #5a8dee;
  }
}
</style>
