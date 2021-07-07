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
          <b-form-textarea
            v-model="nhiemVu.noiDung"
            rows="5"
            placeholder="Nhập nội dung..."
          />
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
          <flat-pickr
            v-model="nhiemVu.thoiGianHoanThanh"
            class="form-control"
          />
        </b-form-group>
        <b-form-group label="Loại nhiệm vụ *">
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
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import { apiThemNhiemVu, listDonVi } from '@/api/hop'
import { apiLayDanhSachCanBo } from '@/api/can-bo'

export default {
  components: {
    flatPickr,
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
    themNhiemVu() {
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
<style lang="scss"></style>
