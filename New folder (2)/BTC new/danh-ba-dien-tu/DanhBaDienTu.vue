<template>
  <div
    style="height: inherit"
    class="content-dbdt"
  >
    <div
      class="body-content-overlay"
      :class="{ show: mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center border-bottom-0">
        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area p-2"
      >
        <div class="search-by-name mb-2 d-flex justify-content-end">
          <div class="input-search w-50">
            <b-input-group>
              <b-form-input
                v-model="keyword"
                placeholder="Tìm kiếm danh bạ theo tên"
              />
              <b-input-group-append is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <b-table
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="listData"
          :fields="dataTable.fields"
          @row-clicked="rowActived"
        >
          <template #cell(phone_CoQuan)="data">
            <div class="name">
              {{ data.value || 'Chưa có dữ liệu' }}
            </div>
          </template>
        </b-table>
        <b-pagination
          v-if="totalRow > pageSize"
          :value="pageIndex"
          :total-rows="totalRow"
          :per-page="pageSize"
          first-number
          last-number
          align="right"
          prev-class="prev-item"
          next-class="next-item"
          class="mt-1 mb-0"
          @input="pageChanged"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
        <div
          v-if="listData.length == 0 && !loading"
          class="no-data text-center w-100"
        >
          Không tìm thấy dữ liệu
        </div>
        <div
          v-if="loading"
          class="py-2 text-center w-100"
        >
          <Loading />
        </div>
      </vue-perfect-scrollbar>
    </div>

    <transition name="fade">
      <div
        v-show="isShowPopup"
        class="popup"
        @click.self="isShowPopup = false"
      >
        <div class="inner">
          <!-- <div class="header-box-popup position-relative">
            <div class="name-cb">
              Cán bộ : {{ getValRow('hoTen') }}
            </div>
            <div class="icon-close">
              <feather-icon icon="XIcon" />
            </div>
          </div> -->
          <div class="wrap-infor-content">
            <div>
              <p><span>Mã cán bộ :</span> <strong> {{ getValRow('maCanBo') }} </strong></p>
              <p><span>Họ tên :</span> <strong> {{ getValRow('hoTen') }} </strong></p>
              <p><span>Giới tính :</span> <strong> {{ getValRow('gioiTinh') ? 'Nữ' : 'Nam' }} </strong></p>
              <p><span>Ngày Sinh :</span> <strong> {{ getBirthDay(getValRow('ngaySinh')) }} </strong></p>
              <p><span>Chức Vụ :</span> <strong> {{ getValRow('chucVu') }} </strong></p>
              <p><span>Đơn vị :</span> <strong> {{ getValRow('donVi') }} </strong></p>
              <p><span>Email :</span> <strong> {{ getValRow('email') }} </strong></p>
              <p><span>Số di động :</span> <strong> {{ getValRow('phong_DiDong') }} </strong></p>
              <p><span>Số nhà riêng :</span> <strong> {{ getValRow('phone_NhaRieng') }} </strong></p>
              <p><span>Số cơ quan :</span> <strong> {{ getValRow('phone_CoQuan') }} </strong></p>
            </div>

            <div>
              <div>
                <h3>Chức vụ chi tiết</h3>
                <p><span>Mã chức vụ :</span> <strong> {{ getValRow('chucVuDetail', 'maChucVu') }} </strong></p>
                <p><span>Chức vụ :</span> <strong> {{ getValRow('chucVuDetail', 'chucVu') }} </strong></p>
              </div>

              <div>
                <h3>Nhóm chức vụ</h3>
                <p><span>Mã chức vụ :</span> <strong> {{ getValRow('chucVuDetail', 'maChucVu') }} </strong></p>
                <p><span>Chức vụ :</span> <strong> {{ getValRow('chucVuDetail', 'chucVu') }} </strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <SibarLeftDBDT
        :class="{ show: mqShallShowLeftSidebar }"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
        @idDonVi="idDv = $event"
      />
    </portal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// eslint-disable-next-line import/extensions
import Loading from '@core/components/loading/Loading'
import SibarLeftDBDT from './SibarLeftDBDT.vue'

export default {
  components: {
    SibarLeftDBDT,
    VuePerfectScrollbar,
    Loading,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      keyParent: '',
      keyChild: '',
      perPage: 10,
      currentPage: 1,
      dataTable: {
        fields: [
          {
            key: 'hoTen',
            label: 'Họ tên',
            sortable: false,
          },
          {
            key: 'chucVu',
            label: 'Chức vụ',
            sortable: false,
          },
          {
            key: 'phone_CoQuan',
            label: 'Số điện thoại',
            sortable: false,
          },
          {
            key: 'email',
            label: 'Email',
            sortable: false,
          },
        ],
        items: [],
      },
      listData: [],
      idDv: '',
      keyword: '',
      loading: false,
      timeOutStatus: null,
      isShowPopup: false,
      currentRowActived: { },
      totalRow: 0,
      pageSize: 0,
      pageIndex: 1,
    }
  },
  computed: {},
  watch: {
    idDv() {
      this.getDataById()
    },
    keyword(val) {
      if (val.length > 0) {
        if (this.timeOutStatus) clearTimeout(this.timeOutStatus)
        this.timeOutStatus = setTimeout(() => {
          this.search()
        }, 300)
      } else if (val.length === 0) {
        this.getDataById()
      } else {
        this.loading = false
      }
    },
  },
  created() {
    /*
    {
   "id":"373adcea-4397-41ba-adc7-36d2f4e2b64f",
   "maCanBo":"baot",
   "hoTen":"Thái Bảo",
   "phone_DiDong":null,
   "phone_CoQuan":null,
   "phone_NhaRieng":null,
   "email":"mail.dongnai.gov.vn",
   "gioiTinh":false,
   "ngaySinh":"1970-01-01T00:00:00",
   "iD_ChucVu":"48b96f09-6d25-41db-96bc-0b82768c3d1a",
   "userName":"baot",
   "userId":"39227131-3db7-48f8-a1b2-57697430cc69",
   "iD_DonVi":"1141b196-e3e4-481b-8bf5-8dba8c82cd65",
   "iD_DonVi_BietPhai":null,
   "cmtnd":null,
   "anhDaiDien_FilePath":"http://10.0.0.55:65/",
   "anhChuKy_FilePath":"http://10.0.0.55:65/",
   "anhChuKyNhay_FilePath":"http://10.0.0.55:65/",
   "bit_ChuyenCongTac":false,
   "thoiGian_CapNhat":"2021-05-21T04:08:08.0174231",
   "bit_NhanTinBuon_Email":null,
   "bit_NhanTinBuon_SMS":null,
   "bit_DanhBa":null,
   "chucVu":"Phó chủ tịch",
   "donVi":"Lãnh đạo UBND Tỉnh",
   "bit_ThuTruongDonVi":false,
   "bitDauMoiPAKN":null,
   "diaChi":null,
   "duongDanIdDonViCha":null,
   "duongDanIdDonViBietPhaiCha":null,
   "donViDetail":{
      "cayDonVi":null,
      "cayDonViBietPhai":null
   },
   "chucVuDetail":{
      "chucVu":"Phó chủ tịch",
      "iD_NhomChucVu":"a2da0ebb-ba11-484b-88bf-a5052e57f1fa",
      "thuTu":1,
      "maChucVu":"PCTT",
      "isDeleted":false,
      "createdAt":"2021-05-21T04:03:58.1115175",
      "createdBy":"3f2124a0-d74d-435f-3ed9-08d8a64939ff",
      "updatedAt":"2021-05-21T04:03:58.1115175",
      "updatedBy":"3f2124a0-d74d-435f-3ed9-08d8a64939ff",
      "id":"48b96f09-6d25-41db-96bc-0b82768c3d1a"
   },
   "nhomChucVuDetail":{
      "tenNhom":"Lãnh đạo tỉnh",
      "thuTu":1,
      "isDeleted":false,
      "createdAt":"2021-05-21T04:03:57.9690948",
      "createdBy":"3f2124a0-d74d-435f-3ed9-08d8a64939ff",
      "updatedAt":"2021-05-21T04:03:57.9690948",
      "updatedBy":"3f2124a0-d74d-435f-3ed9-08d8a64939ff",
      "id":"a2da0ebb-ba11-484b-88bf-a5052e57f1fa"
   },
   "thuTu":1,
   "_ThuTu":0,
   "lsCanBoKiemNhiemResponse":null
}

    */
  },
  methods: {
    getDataById() {
      this.listData = []
      this.loading = true
      // eslint-disable-next-line no-undef
      COMMON_GET(`${COMMON_BE}/api/CanBo/search`, { ID_DonVi: this.idDv, PageIndex: this.pageIndex })
        .then(res => {
          this.listData = res.data.items
          this.loading = false
          this.totalRow = res.data.totalCount
          this.pageSize = res.data.pageSize
        })
        .catch(() => {
          this.loading = false
        })
    },
    search() {
      this.listData = []
      this.loading = true
      // eslint-disable-next-line no-undef
      COMMON_GET(`${COMMON_BE}/api/CanBo/search`, {
        ID_DonVi: this.idDv,
        FilterBy: this.keyword,
      })
        .then(res => {
          this.listData = res.data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    rowActived(row) {
      console.log(row)
      this.currentRowActived = row
      this.isShowPopup = true
    },
    getBirthDay(str) {
      if (!str) return undefined
      return new Date(str).toLocaleDateString()
    },
    getValRow(parentKey, childKey) {
      if (!childKey) return this.currentRowActived[parentKey] || '--Chưa có dữ liệu--'
      return this.currentRowActived[parentKey]?.[childKey] || '--Chưa có dữ liệu--'
    },
    pageChanged(page) {
      this.pageIndex = page
      this.getDataById()
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.danh-ba-dien-tu {
  .todo-task-list-wrapper {
    height: 100% !important;
  }
}

.content-dbdt {
  .popup {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000070;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner {
      background: #fff;
      overflow-y: auto;
      width: 50%;
      padding: 1em;
      margin: 3em auto;
      border-radius: 8px;
      height: calc(100% - 20em);
      box-shadow: 0 0 20px rgb(0 0 0 / 30%);

      .wrap-infor-content {
        display: flex;
        flex-wrap: wrap;
        &>div {
          flex-grow: 1;
          h3 ~ p {
            padding-left: 1em;
          }
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}

.dark-layout {
  .popup .inner {
    background: #283046;
  }
}
</style>
