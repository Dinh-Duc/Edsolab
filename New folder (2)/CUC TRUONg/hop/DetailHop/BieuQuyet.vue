<template>
  <div class="box-product-meetings flex-column">
    <div class="row-meetings over-x">
      <div
        v-for="(val, index) in items"
        :key="index"
        class="row-meetings-content"
      >
        <div class="meetings-head">
          {{ val.noiDung }}
        </div>
        <div class="box-head">
          <vue-countdown
            v-slot="{ days, hours, minutes, seconds }"
            :time="moment(val.thoiGianKetThuc) - moment(val.thoiGianBatDau)"
          >
            Thời gian còn lại：{{ days }} ngày, {{ hours }} giờ,
            {{ minutes }} phút, {{ seconds }} giây.
          </vue-countdown>
        </div>
        <div class="box-bottom">
          <div
            v-for="(item2, index2) in val.danhSachKetQuaBieuQuyet"
            :key="index2"
            class="box-child"
          >
            <div class="box-number">
              {{ item2.soLuongLuaChon }}
            </div>
            <b-button
              :variant="item2.mauLuaChon"
              :disable="checked(val.danhSachKetQuaBieuQuyet)"
              @click="bieuQuyet(val.id, item2.luaChonId, val.noiDung)"
            >
              {{ item2.tenLuaChon }}
            </b-button>
          </div>
        </div>
        <div class="option-box">
          <span
            v-if="moment(val.thoiGianBatDau) > moment()"
            v-b-tooltip.hover.top="'Bắt đầu sớm'"
          >
            <svg
              v-svg
              class="mr-1"
              symbol="icon-start-video"
              size="20 20"
              @click="batDauSom(val.id)"
            />
          </span>
          <span
            v-if="
              moment(val.thoiGianKetThuc) > moment() &&
                moment(val.thoiGianBatDau) < moment()
            "
            v-b-tooltip.hover.top="'Kết thúc'"
          >
            <svg
              v-svg
              class="mr-1"
              symbol="icon-stop-video"
              size="20 20"
              @click="ketThucSom(val.id)"
            />
          </span>
          <span
            v-if="moment(val.thoiGianBatDau) > moment()"
            v-b-tooltip.hover.top="'Sửa'"
          >
            <svg
              v-svg
              class="mr-1"
              symbol="icon-edit"
              size="20 20"
              @click="suaBieuQuyet(val)"
            />
          </span>
          <span
            v-if="moment(val.thoiGianBatDau) < moment()"
            v-b-tooltip.hover.top="'Xem chi tiết bình chọn'"
          >
            <svg
              v-svg
              class="mr-1"
              symbol="icon-preview"
              size="20 20"
            />
          </span>
          <span
            v-if="moment(val.thoiGianBatDau) > moment()"
            v-b-tooltip.hover.top="'Xóa'"
          >
            <svg
              v-svg
              class="mr-1"
              symbol="icon-delete"
              size="20 20"
              @click="xoaBieuQuyet(val.id)"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="pt-1 d-flex justify-content-center btn-them-bieu-quyet">
      <b-button
        variant="success"
        @click="$bvModal.show('modal-them-bieu-quyet')"
      >
        <feather-icon
          icon="PlusSquareIcon"
          class="mr-50"
        />
        Thêm biểu quyết
      </b-button>
    </div>
    <actionThemBieuQuyet
      :item="item"
      :render="render"
    />
  </div>
</template>
<script>
import {
  apiDanhSachBieuQuyet,
  apiBieuQuyet,
  apiBatDauSomBieuQuyet,
  apiKetThucSomBieuQuyet,
  apiXoaBieuQuyet,
  // apiSuaBieuQuyet,
} from '@/api/hop'
import VueCountdown from '@chenfengyuan/vue-countdown'
import moment from 'moment'
/* import ToastificationContent from '@core/components/toastification/ToastificationContent.vue' */

export default {
  name: 'BieuQuyet',
  components: {
    actionThemBieuQuyet: () => import('./actionHop/actionThemBieuQuyet.vue'),
    VueCountdown,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      items: [],
      moment,
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      // const canBo = JSON.parse(localStorage.getItem('userData'))
      apiDanhSachBieuQuyet({
        idLichHop: this.item.id,
        // canBoId: canBo.id,
      }).then(({ data }) => {
        this.items = data
      })
    },
    bieuQuyet(bieuQuyetId, luaChonId, noiDung) {
      console.log(bieuQuyetId, luaChonId, noiDung)
      const canBo = JSON.parse(localStorage.getItem('userData'))
      apiBieuQuyet({
        lichHopId: this.item.id,
        bieuQuyetId,
        canBoId: canBo.id,
        luaChonBietQuyetId: luaChonId,
        ghiChu: `Vote ${noiDung}`,
      }).then(() => {
        this.render()
      })
    },
    checked(luaChons) {
      let result = false
      luaChons.map(item => {
        if (item.voted) {
          result = true
        }
        return ''
      })
      return result
    },
    batDauSom(id) {
      this.$bvModal
        .msgBoxConfirm(
          'Bạn có muốn bắt đầu biểu quyết sớm hơn thời gian định sẵn.',
          {
            title: 'Thông báo',
            size: 'sm',
            okVariant: 'primary',
            buttonSize: 'sm',
            okTitle: 'Đồng ý',
            footerClass: 'confirm-footer',
            cancelTitle: 'Hủy',
            cancelVariant: 'outline-secondary',
            hideHeaderClose: false,
            centered: true,
          },
        )
        .then(value => {
          if (value) {
            apiBatDauSomBieuQuyet({
              bieuQuyetId: id,
              canboId: '',
            }).finally(() => this.render())
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.render())
    },
    ketThucSom(id) {
      this.$bvModal
        .msgBoxConfirm(
          'Bạn có muốn kết thúc biểu quyết sớm hơn thời gian định sẵn.',
          {
            title: 'Thông báo',
            size: 'sm',
            buttonSize: 'sm',
            footerClass: 'confirm-footer',
            okVariant: 'primary',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy',
            cancelVariant: 'outline-secondary',
            hideHeaderClose: false,
            centered: true,
          },
        )
        .then(value => {
          if (value) {
            apiKetThucSomBieuQuyet({
              bieuQuyetId: id,
              canboId: '',
            }).finally(() => this.render())
          }
        })
        .catch(error => console.log(error))
    },
    suaBieuQuyet(item) {
      console.log(item)
    },
    xoaBieuQuyet(id) {
      console.log(id)
      this.$bvModal
        .msgBoxConfirm('Bạn có chắc chắn muốn xóa biểu quyết.', {
          title: 'Cảnh báo',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          footerClass: 'confirm-footer',
          cancelTitle: 'Hủy',
          cancelVariant: 'outline-danger',
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          if (value) {
            apiXoaBieuQuyet({
              bieuQuyetId: id,
              canboId: '',
            }).finally(() => this.render())
          }
        })
        .catch(error => console.log(error))
    },
  },
}
</script>
<style scoped lang="scss">
.box-product-meetings {
  display: flex;
  align-content: center;
  justify-content: start;
  padding: 1rem;
  .btn-them-bieu-quyet {
    position: sticky;
    bottom: 1rem;
  }
  .row-meetings {
    width: 100%;
    height: 36vh;

    &::-webkit-scrollbar {
      background-color: #fff;
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: #fff;
    }
    &:hover {
      &::-webkit-scrollbar {
        display: block;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #aaa;
      }
    }

    .row-meetings-content {
      display: flex;
      flex-direction: column;
      padding-top: 0.56rem;
      padding-bottom: 0.56rem;
      border-bottom: 1px solid rgba(71, 95, 123, 0.2);

      .meetings-head {
        font-weight: 600;
        padding-bottom: 0.16rem;
        font-size: 1.2rem;
        max-width: 80%;
      }

      .box-head {
        font-weight: 300;
        margin-top: 1rem;
      }

      .box-bottom {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: center;
        justify-content: start;
        padding-top: 0.96rem;
        padding-bottom: 0.56rem;

        .box-child {
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          padding-right: 1rem;
          margin-top: 1rem;

          .box-number {
            line-height: 1.4rem;
            width: 100%;
            text-align: center;
            padding-bottom: 0.56rem;
            font-weight: 600;
          }

          .box-accept {
            cursor: pointer;
            border-radius: 0.26rem;
            line-height: 2.52rem;
            text-align: center;
            vertical-align: middle;
            color: #fff;
            padding: 0.26rem;
          }
        }

        .color-dongy {
          background: #219653;
        }
        .color-khongdongy {
          background: #ea5455;
        }
        .color-khongykien {
          background: #ff9f43;
        }
        .color-hethan {
          background: #d0d2d6;
        }
      }
    }
    .row-meetings-content {
      position: relative;
      .option-box {
        position: absolute;
        top: 1rem;
        right: 1rem;
        svg {
          cursor: pointer;
          &:hover {
            fill: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
  .over-x {
    overflow-x: hidden;
  }
}
</style>
