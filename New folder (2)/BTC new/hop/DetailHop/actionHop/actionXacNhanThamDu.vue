<template>
  <b-modal
    id="xac-nhan-tham-du"
    centered
    size="lg"
    :hide-footer="true"
    title="Xác nhận tham dự họp"
  >
    <b-form-group>
      <div class="d-flex flex-wrap">
        <b-form-radio
          v-model="xacNhanThamDu.kieuThamGia"
          class="w_35 mr_10"
          name="kieu-tham-gia"
          :value="1"
        >Xác nhận tham dự</b-form-radio>
        <b-form-radio
          v-model="xacNhanThamDu.kieuThamGia"
          class="w_45"
          name="kieu-tham-gia"
          :value="2"
        >Từ chối tham dự</b-form-radio>
      </div>
    </b-form-group>
    <div v-if="xacNhanThamDu.kieuThamGia == 1">
      <b-form-group label="Chọn cán bộ chỉ định">
        <v-select
          v-model="xacNhanThamDu.danhSachIdCanBo"
          multiple
          label="name"
          :reduce="c => c.code"
          :options="dsCanBo"
        />
      </b-form-group>
      <b-form-group>
        <template #label>
          <p>
            Ghi chú
          </p>
        </template>
        <b-form-textarea
          v-model="xacNhanThamDu.ghiChu"
          placeholder="Nhập ghi chú..."
        />
      </b-form-group>
    </div>
    <div v-else>
      <b-form-group>
        <template #label>
          <p>Lý do từ chối <span class="text-danger">*</span></p>
        </template>
        <b-form-textarea
          v-model="xacNhanThamDu.ghiChu"
          placeholder="Nhập lý do..."
        />
      </b-form-group>
    </div>
    <div class="text-center">
      <b-button
        variant="success"
        @click="sendXacNhanThamDu()"
      >
        Xác nhận
      </b-button>
    </div>
  </b-modal>
</template>
<script>
import { apiLayDanhSachCanBo } from '@/api/can-bo'
import { apiChapNhanTuChoiCuocHop } from '@/api/hop'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    vSelect,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      xacNhanThamDu: {
        lichHopId: this.item.id,
        donViId: '',
        canBoId: JSON.parse(localStorage.getItem('userData')).id,
        kieuDuocMoi: 2,
        kieuThamGia: 1,
        danhSachIdCanBo: [],
        ghiChu: '',
      },
      dsCanBo: [],
      canBoPagination: {
        pageIndex: 1,
        pageSize: 50,
        id_donVi: '',
      },
    }
  },
  created() {
    this.renderCanBo()
  },
  methods: {
    renderCanBo() {
      this.canBoPagination.id_donVi = JSON.parse(
        localStorage.getItem('userData'),
      ).donViTrucThuoc.id
      apiLayDanhSachCanBo(this.canBoPagination).then(response => {
        this.dsCanBo.length = 0
        // console.log(response.data.items)
        response.data.items.map(item => {
          this.dsCanBo.push({
            code: item.id,
            name: item.hoTen,
          })
          return null
        })
      })
    },
    sendXacNhanThamDu() {
      console.log(this.xacNhanThamDu)
      this.xacNhanThamDu.donViId = JSON.parse(
        localStorage.getItem('userData'),
      ).donViTrucThuoc.id
      apiChapNhanTuChoiCuocHop(this.xacNhanThamDu)
        .then(response => {
          this.xacNhanThamDu = {
            lichHopId: this.item.id,
            donViId: '',
            canBoId: JSON.parse(localStorage.getItem('userData')).id,
            kieuDuocMoi: 2,
            kieuThamGia: 1,
            danhSachIdCanBo: [],
            ghiChu: '',
          }
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Thông báo',
              icon: 'CoffeeIcon',
              variant: response.code === '200' ? 'success' : 'danger',
              text: response.message,
            },
          })
        })
        .catch(error => console.log(error))
    },
  },
}
</script>
<style lang=""></style>
