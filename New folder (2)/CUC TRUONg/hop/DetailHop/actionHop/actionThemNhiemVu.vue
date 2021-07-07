<template>
  <b-modal
    id="them-nhiem-vu"
    size="lg"
    title="Nhiệm vụ cần thực hiện"
    :hide-footer="true"
    :hide-header="false"
    centered
  >
    <b-overlay :show="isSaving">
      <b-form>
        <b-form-group label="Nội dung *">
          <template #label>
            Nội dung <span class="text-danger">*</span>
          </template>
          <b-form-textarea
            v-model="nhiemVu.noiDung"
            rows="5"
            placeholder="Nhập nội dung..."
          />
          <p v-if="valid.noiDung" id="val">Vui lòng thêm nội dung</p>
        </b-form-group>
        <div class="d-flex">
          <b-form-group
            class="w_45 mr_10"
            label="Đơn vị thực hiện"
          >
            <b-form-select
              v-model="nhiemVu.donViThucHien"
              :options="donViThucHienOptions"
            />
          </b-form-group>
          <b-form-group
            class="w_45"
            label="Cán bộ chỉ định"
          >
            <b-form-select
              v-model="canBoThucHien"
              :options="canBoThucHienOptions"
            />
          </b-form-group>
        </div>
        <b-form-group label="Hạn xử lý *">
          <template #label>
            Hạn xử lý <span class="text-danger">*</span>
          </template>
          <b-form-datepicker
            v-model="nhiemVu.thoiGianHoanThanh"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="vi"
            class="form-control"
          />
          <p v-if="valid.thoiGianHoanThanh" id="val">Hạn xử lý không hợp lệ</p>
        </b-form-group>
        <b-form-group label="Loại nhiệm vụ *">
          <template #label>
            Loại nhiệm vụ <span class="text-danger">*</span>
          </template>
          <b-form-select
            v-model="nhiemVu.loaiNhiemVu"
            :options="loaiNhiemVuOptions"
          />
        </b-form-group>
        <div class="text-center">
          <b-button
            variant="success"
            @click="themNhiemVu()"
          >
            Thêm nhiệm vụ
          </b-button>
        </div>
      </b-form>
    </b-overlay>
  </b-modal>
</template>
<script>
import moment from 'moment'
import { apiThemNhiemVu, listDonVi } from '@/api/hop'
import { apiLayDanhSachCanBo } from '@/api/can-bo'

export default {
  components: {
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
        thoiGianHoanThanh: false,
      },
      isSaving: false,
      loaiNhiemVuOptions: ['Nhiệm vụ địa phương', 'Nhiệm vụ Chính phủ'],
      canBoThucHien: '',
      nhiemVu: {
        noiDung: '',
        thoiGianHoanThanh: moment().format('YYYY-MM-DD'),
        loaiNhiemVu: 'Nhiệm vụ địa phương',
        donViThucHien: '',
        lichHopId: '',
      },
      donViThucHienOptions: [],
      canBoThucHienOptions: [],
      donViPagination: {
        pageIndex: 1,
        pageSize: 50,
      },
      canBoPagination: {
        pageIndex: 1,
        pageSize: 50,
        id_DonVi: '',
      },
    }
  },
  watch: {
    'nhiemVu.donViThucHien': function (val) {
      this.canBoPagination.id_DonVi = val
      this.renderCanBo()
    },
  },
  created() {
    this.firstRenderData()
  },
  methods: {
    validate() {
      let result = true
      if (
        this.nhiemVu.noiDung === null || this.nhiemVu.noiDung === '' || typeof this.nhiemVu.noiDung === 'undefined'
      ) {
        this.valid.noiDung = true
        result = false
      } else {
        this.valid.noiDung = false
      }
      if (
        moment(this.nhiemVu.thoiGianHoanThanh, 'YYYY-MM-DD') < moment()
      ) {
        this.valid.thoiGianHoanThanh = true
        result = false
      } else {
        this.valid.thoiGianHoanThanh = false
      }
      return result
    },
    themNhiemVu() {
      // validate data
      if (!this.validate()) return
      //
      this.isSaving = true

      this.nhiemVu.lichHopId = this.item.id
      if (!this.isNullOrEmpty(this.nhiemVu.donViThucHien)) {
        this.nhiemVu.donViThucHien = this.donViThucHienOptions.filter(
          t => t.text === this.nhiemVu.donViThucHien,
        ).tenDonVi
      }
      if (!this.isNullOrEmpty(this.canBoThucHien)) {
        if (!this.isNullOrEmpty(this.nhiemVu.donViThucHien)) {
          this.nhiemVu.donViThucHien += ' - '
        }
        this.nhiemVu.donViThucHien += this.canBoThucHien
      }
      apiThemNhiemVu(this.nhiemVu).then(() => {
        this.nhiemVu = {
          thoiGianHoanThanh: moment().format('YYYY-MM-DD'),
          loaiNhiemVu: 'Nhiệm vụ địa phương',
        }
        this.$bvModal.hide('them-nhiem-vu')
        this.isSaving = false
        this.render()
      })
    },
    firstRenderData() {
      // Đơn vị
      listDonVi(1)
        .then(({ data }) => {
          this.donViThucHienOptions = [{ value: '', text: 'Chọn đơn vị' }]
          data.data.map(item => {
            this.donViThucHienOptions.push({
              value: item.id,
              text: item.tenDonVi,
            })
            return null
          })
        })
        .catch(error => console.log(error))
      //
      this.renderCanBo()
    },
    renderCanBo() {
      apiLayDanhSachCanBo(this.canBoPagination)
        .then(response => {
          this.canBoThucHienOptions = [{ value: '', text: 'Chọn cán bộ' }]
          this.canBoPagination.pageIndex = response.pageIndex
          this.canBoPagination.pageSize = response.pageSize
          response.data.items.map(item => {
            this.canBoThucHienOptions.push({
              value: item.hoTen, // item.id
              text: item.hoTen,
            })
            return null
          })
        })
        .catch(error => console.log(error))
    },
    isNullOrEmpty(text) {
      return text == null || text === ''
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    },
  },
}
</script>
<style lang="scss">
#val {
  font-size: 0.9rem;
  color: #ea5455;
  padding-top: 4px;
}
</style>
