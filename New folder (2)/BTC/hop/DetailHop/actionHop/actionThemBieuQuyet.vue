<template>
  <b-modal
    id="modal-them-bieu-quyet"
    cancel-variant="outline-secondary"
    centered
    size="lg"
    :hide-footer="true"
    title="Thêm nội dung biểu quyết"
  >
    <b-overlay
      :show="isSaving"
      variant="light"
      opacity="0.8"
    >
      <b-form>
        <b-form-group label="Nội dung *">
          <template #label>
            <p>Nội dung <span class="text-danger">*</span></p>
          </template>
          <b-form-textarea
            v-model="dataBieuQuyet.noiDung"
            placeholder="Nhập nội dung..."
          />
          <p
            v-if="valid.noiDung"
            id="val"
          >
            Vui lòng nhập nội dung biểu quyết
          </p>
        </b-form-group>
        <div class="d-flex flex-wrap">
          <b-form-group
            class="w_45 mr_10"
            label="Thời gian bắt đầu *"
          >
            <template #label>
              <p>Thời gian bắt đầu <span class="text-danger">*</span></p>
            </template>
            <!-- <time-picker
              v-model="dataBieuQuyet.thoiGianBatDau"
              format="HH:mm"
            /> -->
            <cleave
              v-model="dataBieuQuyet.thoiGianBatDau"
              class="form-control"
              :raw="false"
              :options="options.time"
              placeholder="HH:MM"
            />
            <p
              v-if="valid.thoiGianBatDau"
              id="val"
            >
              Vui lòng nhập thời gian bắt đầu
            </p>
          </b-form-group>
          <b-form-group
            class="w_45"
            label="Thời gian kết thúc *"
          >
            <template #label>
              <p>Thời gian kết thúc <span class="text-danger">*</span></p>
            </template>
            <!-- <time-picker
              v-model="dataBieuQuyet.thoiGianKetThuc"
              class="w_100"
              format="HH:mm"
            /> -->
            <cleave
              v-model="dataBieuQuyet.thoiGianKetThuc"
              class="form-control"
              :raw="false"
              :options="options.time"
              placeholder="HH:MM"
            />
            <p
              v-if="valid.thoiGianKetThuc"
              id="val"
            >
              Vui lòng nhập thời gian kết thúc
            </p>
          </b-form-group>
        </div>
        <b-form-group label="Loại biểu quyết">
          <div class="d-flex">
            <b-form-radio
              v-model="dataBieuQuyet.loaiBieuQuyet"
              class="mr-1"
              name="loai-bieu-quyet"
              :value="false"
            >Bỏ phiếu kín</b-form-radio>
            <b-form-radio
              v-model="dataBieuQuyet.loaiBieuQuyet"
              name="loai-bieu-quyet"
              :value="true"
            >Bỏ phiếu công khai</b-form-radio>
          </div>
        </b-form-group>
        <b-form-group label="Thành phần biểu quyết">
          <div class="d-flex mr-1">
            <b-form-radio
              v-model="isSelectThanhPhanBieuQuyet"
              class="mr-1"
              name="thanh-phan-bieu-quyet"
              :value="false"
            >Tất cả</b-form-radio>
            <b-form-radio
              v-model="isSelectThanhPhanBieuQuyet"
              name="thanh-phan-bieu-quyet"
              :value="true"
            >Chỉ định</b-form-radio>
          </div>
          <v-select
            v-if="isSelectThanhPhanBieuQuyet"
            v-model="dataBieuQuyet.danhSachThanhPhanThamGia"
            class="mt-1"
            multiple
            :options="thanhPhanThamGiaOptions"
          />
          <p v-if="valid.danhSachThanhPhanThamGia" id="val">Vui lòng chọn thành phần biểu quyết</p>
        </b-form-group>
        <b-form-group label="Danh sách lựa chọn *">
          <template #label>
            <p>Danh sách lựa chọn <span class="text-danger">*</span></p>
          </template>
          <b-form-tags
            v-model="dsLuaChon"
            class="mb-2"
            placeholder="Thêm lựa chọn"
            add-button-text="Thêm"
          />
          <p
            v-if="valid.danhSachLuaChon"
            id="val"
          >
            Vui lòng thêm lựa chọn
          </p>
        </b-form-group>
        <div class="text-center">
          <b-button
            variant="success"
            @click="luuBieuQuyet"
          >
            <feather-icon
              icon="PlusSquareIcon"
              class="mr-50"
            />
            Thêm biểu quyết
          </b-button>
        </div>
      </b-form>
    </b-overlay>
  </b-modal>
</template>
<script>
/* eslint-disable */
import vSelect from 'vue-select'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
/* import { TimePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' */
import moment from 'moment'
import {
  apiTaoMoiBieuQuyet,
  apiDanhSachThanhPhanThamGia,
} from '@/api/hop/indexNew'
import Cleave from 'vue-cleave-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'ActionThemBieuQuyet',
  components: {
    vSelect,
    Cleave,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
    render: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      valid: {
        noiDung: false,
        thoiGianBatDau: false,
        thoiGianKetThuc: false,
        dsLuaChon: false,
        danhSachThanhPhanThamGia: false,
        isSelectThanhPhanBieuQuyet: false,
      },
      options: {
        time: {
          time: true,
          timePattern: ['h', 'm'],
        },
      },
      isSelectThanhPhanBieuQuyet: false,
      moment: moment,
      dataBieuQuyet: {
        loaiBieuQuyet: false,
      },
      dsLuaChon: [],
      thanhPhanThamGiaOptions: [],
      configDate: {
        enableTime: false,
        time_24hr: false,
        allowInput: true,
        dateFormat: 'Y-m-d',
        defaultDate: new Date(),
        minDate: 'today',
        locale: Vietnamese,
      },
      isSaving: false,
    }
  },
  computed: {},
  created() {
    apiDanhSachThanhPhanThamGia({
      id: this.item.id,
    }).then(({ data }) => {
      console.log(data)
      this.thanhPhanThamGiaOptions.length = 0
      data.map((item, index) => {
        if (item.donViId == null) return
        this.thanhPhanThamGiaOptions.push({
          code: item.donViId,
          label: item.tenCanBo,
        })
      })
    })
  },
  methods: {
    focusTimeFrom() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeFrom.$el.querySelector(
          '.vs__dropdown-menu .vs__dropdown-option--selected',
        )
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
    validateData() {
      let result = true
      if (
        this.dataBieuQuyet.noiDung == null ||
        this.dataBieuQuyet.noiDung == '' ||
        typeof this.dataBieuQuyet.noiDung == 'undefined'
      ) {
        this.valid.noiDung = true
        result = false
      } else {
        this.valid.noiDung = false
      }
      if (
        this.dataBieuQuyet.thoiGianBatDau == null ||
        this.dataBieuQuyet.thoiGianBatDau == '' ||
        typeof this.dataBieuQuyet.thoiGianBatDau == 'undefined'
      ) {
        this.valid.thoiGianBatDau = true
        result = false
      } else {
        this.valid.thoiGianBatDau = false
      }

      if (
        this.dataBieuQuyet.thoiGianKetThuc == null ||
        this.dataBieuQuyet.thoiGianKetThuc == '' ||
        moment(this.dataBieuQuyet.thoiGianBatDau,'HH:mm') > moment(this.dataBieuQuyet.thoiGianKetThuc,'HH:mm') ||
        typeof this.dataBieuQuyet.thoiGianKetThuc == 'undefined'
      ) {
        this.valid.thoiGianKetThuc = true
        result = false
      } else {
        this.valid.thoiGianKetThuc = false
      }
      if (
        this.dataBieuQuyet.danhSachLuaChon == null ||
        this.dataBieuQuyet.danhSachLuaChon <= 0 ||
        typeof this.dataBieuQuyet.danhSachLuaChon == 'undefined'
      ) {
        this.valid.danhSachLuaChon = true
        result = false
      } else {
        this.valid.danhSachLuaChon = false
      }
      if(
        this.isSelectThanhPhanBieuQuyet == true &&
        this.dataBieuQuyet.danhSachThanhPhanThamGia == null ||
        this.dataBieuQuyet.danhSachThanhPhanThamGia == "-1"
      ){
        this.valid.danhSachThanhPhanThamGia = true;
        result = false
      }
      else{
        this.valid.danhSachThanhPhanThamGia = false;
      } 

      return result
    },
    luuBieuQuyet() {
      // validate data
      if (!this.validateData()) return
      //
      this.isSaving = true
      this.dataBieuQuyet.lichHopId = this.item.id
      this.dataBieuQuyet.trangThai = 0
      this.dataBieuQuyet.quyenBieuQuyet = true
      if (
        this.dataBieuQuyet.danhSachThanhPhanThamGia &&
        !this.isSelectThanhPhanBieuQuyet
      )
        this.dataBieuQuyet.danhSachThanhPhanThamGia.length = 0

      this.dataBieuQuyet.thoiGianBatDau =
        moment(this.item.ngayHop).format('YYYY-MM-DD') +
        'T' +
        moment(this.dataBieuQuyet.thoiGianBatDau, 'HH:mm').format('HH:mm:ss')

      this.dataBieuQuyet.thoiGianKetThuc =
        moment(this.item.ngayHop).format('YYYY-MM-DD') +
        'T' +
        moment(this.dataBieuQuyet.thoiGianKetThuc, 'HH:mm').format('HH:mm:ss')

      // danh sách lựa chọn
      /* if(this.dataBieuQuyet.danhSachLuaChon)
        this.dataBieuQuyet.danhSachLuaChon.length = 0
      if (val && val.length > 0) {
        val.map((item, index) => {
          this.dataBieuQuyet.danhSachLuaChon.push({
            tenLuaChon: item,
            mauBieuQuyet: 'default',
          })
        })
      } */
      //
      if (this.dsLuaChon.length == 0) return

      apiTaoMoiBieuQuyet(this.dataBieuQuyet)
        .then(data => {
          this.$bvModal.hide('modal-them-bieu-quyet')
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Thông báo',
              icon: 'CoffeeIcon',
              variant: data.code === '200' ? 'success' : 'danger',
              text: data.message,
            },
          })
          this.dataBieuQuyet = {
            loaiBieuQuyet: false,
          }
          this.dsLuaChon.length = 0
        })
        .finally(() => {
          this.isSaving = false
          this.render()
        })
    },
  },
  watch: {
    dsLuaChon: function(val) {
      if (this.dataBieuQuyet.danhSachLuaChon)
        this.dataBieuQuyet.danhSachLuaChon.length = 0
      else this.dataBieuQuyet.danhSachLuaChon = []
      if (val && val.length > 0) {
        val.map((item, index) => {
          this.dataBieuQuyet.danhSachLuaChon.push({
            tenLuaChon: item,
            mauBieuQuyet: 'primary',
          })
        })
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.w_45 {
  width: 45%;
}
#modal-them-bieu-quyet {
  .text-truncate {
    color: #40566f;
  }
}
#val {
  font-size: 0.9rem;
  color: #ea5455;
  padding-top: 4px;
}
</style>
