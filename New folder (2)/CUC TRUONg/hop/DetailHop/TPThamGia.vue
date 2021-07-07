<template>
  <div class="box-tpthamgia">
    <div>
      <b-button
        variant="primary"
        class="btn-diem-danh mb-1"
        @click="diemDanh()"
      >
        <b-overlay :show="isDiemDanhLoading">
          <feather-icon icon="UserCheckIcon" />
          Điểm danh
        </b-overlay>
      </b-button>
    </div>
    <b-table
      small
      class="table-tpthamgia"
      :fields="fields"
      :items="ListTPThamGia"
      responsive="sm"
    >
      <template #head(check)="data">
        <div class="d-flex flex-wrap">
          <b-form-checkbox
            v-model="checkAll"
            :class="'user-item user-item-' + data.index"
          />
        </div>
      </template>
      <template #cell(check)="data">
        <b-form-checkbox
          v-model="checkItems[data.index]"
          :class="'user-item user-item-' + data.index"
        />
      </template>
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(trangThaiThamGia)="data">
        <b-badge
          v-if="data.value"
          variant="light-success"
        >
          Tham gia
        </b-badge>

        <b-badge
          v-else
          variant="light-secondary"
        >
          Chờ xác nhận
        </b-badge>
      </template>

      <template #cell(diemDanh)="data">
        <b-badge :variant="data.value ? 'success': 'secondary'">
          {{ data.value ? 'Đã điểm danh' : 'Chưa xác nhận' }}
        </b-badge>
      </template>

      <template #cell(canBoId)="data">
        <b-button
          variant="gradient-danger"
          class="btn-icon"
          @click="removeCanBo(data.value)"
        >
          <feather-icon icon="XCircleIcon" />
        </b-button>
      </template>
    </b-table>
    <div class="d-flex w-100 justify-content-center">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="$bvModal.show('modal-moi-nguoi-tham-gia')"
      >
        <feather-icon
          icon="UserPlusIcon"
          class="mr-50"
        />
        Mời người tham gia
      </b-button>
    </div>
    <actionMoiNguoiThamGia />
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { mapGetters } from 'vuex'
import { apiDiemDanh } from '@/api/hop'
/* import ToastificationContent from '@core/components/toastification/ToastificationContent.vue' */

export default {
  name: 'TPThamGia',
  directives: {
    Ripple,
  },
  components: {
    actionMoiNguoiThamGia: () => import('./actionHop/actionMoiNguoiThamGia.vue'),
  },
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'check', label: 'check' },
        { key: 'index', label: 'STT' },
        // A column that needs custom formatting
        { key: 'tenDonVi', label: 'Tên đơn vị' },
        // A column that needs custom formatting
        { key: 'tenCanBo', label: 'Tên cán bộ' },
        // A regular column
        { key: 'vaiTro', label: 'Vai trò' },
        // A virtual column made up from two fields
        { key: 'trangThaiThamGia', label: 'Trạng thái' },
        // A virtual column made up from two fields
        { key: 'diemDanh', label: 'Điểm danh' },
        // A virtual column made up from two fields
        { key: 'canBoId', label: 'Thao tác' },
      ],
      checkAll: false,
      checkItems: [],
      isDiemDanhLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
      ListTPThamGia: 'hop/ListTPThamGia',
    }),
  },
  watch: {
    checkAll(val) {
      if (val) {
        this.ListTPThamGia.map((item, i) => {
          this.checkItems[i] = true
          return ''
        })
      } else this.checkItems.length = 0
    },
  },
  created() {
    this.$store.dispatch('hop/getListTPThamGia', { id: this.DetailMeeting.id })
  },
  methods: {
    removeCanBo(idcanbo) {
      console.log(idcanbo)
    },
    diemDanh() {
      console.log(this.checkItems)
      if (this.checkItems.length > 0) {
        this.isDiemDanhLoading = false
        this.$bvModal
          .msgBoxConfirm(
            'Bạn có chắc chắn muốn điểm danh cho những người được chọn',
            {
              title: 'Thông báo',
              size: 'sm',
              okVariant: 'success',
              okTitle: 'Đồng ý',
              cancelTitle: 'Hủy bỏ',
              cancelVariant: 'outline-success',
              hideHeaderClose: false,
              centered: true,
            },
          )
          .then(value => {
            if (value) {
              this.checkItems.map((item, index) => {
                apiDiemDanh({
                  canBoId: this.ListTPThamGia[index].canBoId,
                  donViId: this.ListTPThamGia[index].donViId,
                  lichHopId: this.DetailMeeting.id,
                  typeDiemDanh: this.ListTPThamGia[index].type,
                })
                  .then(response => {
                    console.log(response)
                    /* this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: 'Thông báo',
                        icon: 'CoffeeIcon',
                        variant: 'success',
                        text: 'Điểm danh thành công!',
                      },
                    }) */
                  })
                  .catch(error => {
                    console.log(error)
                    /* this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: 'Thông báo',
                        icon: 'CoffeeIcon',
                        variant: 'error',
                        text: 'Điểm danh thất bại!',
                      },
                    }) */
                  })
                  .finally(() => {
                    this.isDiemDanhLoading = true
                  })
                return ''
              })
            }
          })
      }
    },
  },
}
</script>
<style scoped lang="scss">
.box-tpthamgia {
  padding: 1rem;

  .box-action {
    cursor: pointer;
  }
  .table-responsive-sm {
    max-height: 400px;
    overflow-y: auto;
  }

  .table-tpthamgia {
    height: 38vh;
    .btn-diem-danh {
      margin-right: 1rem;
      width: 3rem;
      height: 2.52rem;
    }

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
  }
}
</style>
