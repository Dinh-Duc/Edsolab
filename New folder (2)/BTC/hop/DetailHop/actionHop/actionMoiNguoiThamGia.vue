<template>
  <b-modal
    id="modal-moi-nguoi-tham-gia"
    cancel-variant="outline-secondary"
    centered
    no-close-on-backdrop
    size="lg"
    :hide-footer="true"
    title="Mời người tham gia"
    @hide="actionClearData"
  >
    <div class="d-flex flex-column justify-content-center">
      <div>
        <div class="pl-1 pb-1">
          <b>Mời nội bộ</b>
        </div>
        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            Mời đơn vị:
          </div>
          <div class="col-md-9">
            <v-select
              ref="selectTimeFrom"
              v-model="dataMoiNoiBoDonVi"
              :clearable="false"
              label="text"
              :options="ListDonVi"
              :reduce="option => option.value"
              class="w-100"
              @search:focus="focusTimeFrom"
            />
          </div>
        </div>
        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            Mời cá nhân:
          </div>
          <div class="col-md-9">
            <v-select
              ref="selectTimeFrom"
              v-model="dataMoiNoiBoUser"
              :clearable="false"
              label="text"
              multiple
              :options="ListUser"
              :reduce="option => option.value"
              class="w-100"
              @search:focus="focusTimeFrom"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="pl-1">
          <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-success"
            class="btn-icon"
            @click="actionMoiNoiBo"
          >
            <feather-icon icon="PlusCircleIcon" />
            Thêm
          </b-button>
        </div>
      </div>
      <div class="p-1 d-flex flex-column w-100">
        <b-table
          small
          responsive
          bordered
          hover
          :items="items_noibo"
          :fields="fields_noibo"
        >
          <template #cell(action)="data">
            <b-button
              variant="gradient-danger"
              class="btn-icon"
              @click="actionRemoveNguoiDuocMoiNoiBo(data.index)"
            >
              <feather-icon icon="XCircleIcon" />
            </b-button>
          </template>
        </b-table>
      </div>

      <div
        role="button"
        class="pl-1 pb-1 d-flex align-items-center"
        @click="isShowDonVi = !isShowDonVi"
      >
        <b>Mời khách bên ngoài đơn vị:</b>
        <div class="pl-1">
          <b-button
            v-if="isShowDonVi"
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-success"
            class="btn-icon"
          >
            <feather-icon icon="ChevronDownIcon" />
          </b-button>
          <b-button
            v-else
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-success"
            class="btn-icon"
          >
            <feather-icon icon="ChevronRightIcon" />
          </b-button>

        </div>
      </div>
      <div v-show="isShowDonVi">

        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            Tên đơn vị:
          </div>
          <div class="col-md-9">
            <b-form-input
              v-model="dataMoiBenNgoai.tenDonVi"
              placeholder="Nhập tên đơn vị"
            />
          </div>
        </div>
        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            Tên cá nhân:
          </div>
          <div class="col-md-9">
            <b-form-input
              v-model="dataMoiBenNgoai.canBoDuocMoi"
              placeholder="Nhập tên cá nhân"
            />
          </div>
        </div>
        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            Email:
          </div>
          <div class="col-md-9">
            <b-form-input
              v-model="dataMoiBenNgoai.email"
              placeholder="Nhập Email"
            />
          </div>
        </div>
        <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
          <div class="pr-1 col-md-3">
            SĐT:
          </div>
          <div class="col-md-9">
            <b-form-input
              v-model="dataMoiBenNgoai.sdt"
              type="number"
              placeholder="Nhập SĐT"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="pl-1">
            <b-button
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon"
              @click="actionMoiNguoiNgoai"
            >
              <feather-icon icon="PlusCircleIcon" />
              Thêm người
            </b-button>
          </div>
        </div>

        <div class="p-1 d-flex flex-column w-100">
          <b-table
            small
            responsive
            bordered
            hover
            :items="items_nguoingoai"
            :fields="fields"
          >
            <template #cell(action)="data">
              <b-button
                variant="gradient-danger"
                class="btn-icon"
                @click="actionRemoveNguoiDuocMoi(data.index)"
              >
                <feather-icon icon="XCircleIcon" />
              </b-button>
            </template>
          </b-table>
        </div>
      </div>

      <div class="pt-1 d-flex justify-content-end">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="success"
          @click="actionMoi"
        >
          <feather-icon
            icon="UserPlusIcon"
            class="mr-50"
          />
          Mời
        </b-button>
      </div>

    </div>
  </b-modal>

</template>
<script>
/* eslint-disable */
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import { createMeetingMoiHop } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default ({
  name: 'ActionMoiNguoiThamGia',
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      dataInsert: {
        moiHopNoiBo: [],
        moiHopBenNgoai: [],
      },
      isShowDonVi: false,
      dataMoiNoiBoDonVi: undefined,
      dataMoiNoiBoUser: undefined,
      dataMoiBenNgoai: {},
      fields: [
        {
          key: 'tenDonVi',
          label: 'Tên đơn vị',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'canBoDuocMoi',
          label: 'Tên cá nhân',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'email',
          label: 'email',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'sdt',
          label: 'SĐT',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'action',
          tdClass: 'w-5 word-break',
          label: '',
        },
      ],
      fields_noibo: [
        {
          key: 'tenDonVi',
          label: 'Tên đơn vị',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'hoTen',
          label: 'Tên cá nhân',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'sdt',
          label: 'SĐT',
          tdClass: 'w-23 word-break',
        },
        {
          key: 'action',
          tdClass: 'w-5 word-break',
          label: '',
        },
      ],
      items_noibo: [],
      items_nguoingoai: [],
    }
  },
  watch: {
    dataMoiNoiBoDonVi(val) {
      if (val) {
        this.$store.dispatch('hop/getListUser', {
          ID_DonVi: val.donViId,
          IsGetAll: false,
          UserId: null,
          SortBy: null,
          FilterBy: null,
          PageIndex: 1,
          PageSize: 9999,
        })

        this.dataMoiNoiBoUser = []
      }
    },
  },
  computed: {
    ...mapGetters({
      ListUser: 'hop/ListUser',
      ListDonVi: 'hop/ListDonVi',
      DetailMeeting: 'hop/DetailMeeting',
    }),

  },
  created() {

  },
  methods: {
    actionClearData(){
      this.items_noibo = []
      this.items_nguoingoai = []
      this.dataInsert = {
        moiHopNoiBo: [],
        moiHopBenNgoai: [],
      }
    },
    focusTimeFrom() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeFrom.$el.querySelector('.vs__dropdown-menu .vs__dropdown-option--selected')
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
    actionRemoveNguoiDuocMoi(idx) {
      this.items_nguoingoai.splice(idx, 1)
    },
    actionRemoveNguoiDuocMoiNoiBo(idx) {
      this.items_noibo.splice(idx, 1)
      this.dataMoiNoiBoUser.splice(idx, 1)
    },
    actionMoi() {
      this.items_noibo.forEach(element => {
        const tmp_insert = {
          lichHopId: element.lichHopId,
          donViId: element.donViId,
          canBoId: element.canBoId,
        }
        this.dataInsert.moiHopNoiBo.push(tmp_insert)
      })

      this.items_nguoingoai.forEach(el => {
        const tmp_insert2 = {
          tenDonVi: el.tenDonVi,
          sdt: el.sdt,
          canBoDuocMoi: el.canBoDuocMoi,
          email: el.email,
        }
        this.dataInsert.moiHopBenNgoai.push(tmp_insert2)
      })

      createMeetingMoiHop(this.dataInsert)
        .then(data => {
          console.log(data)
          if (data.data.succeeded) {
            this.$store.dispatch('hop/getListTPThamGia', { id: this.DetailMeeting.id })
            this.actionClearData()
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Đã mời thành công',
                icon: 'BellIcon',
                variant: 'success',
                text: 'Mời thành công.',
              },
            })
            this.items_noibo = []
            this.items_nguoingoai = []
            this.$bvModal.hide('modal-moi-nguoi-tham-gia')
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Mời thất bại',
                icon: 'BellIcon',
                variant: 'danger',
                text: 'Mời thất bại.',
              },
            })
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Mời thất bại',
              icon: 'BellIcon',
              variant: 'danger',
              text: `${err}`,
            },
          })
        })
    },
    actionMoiNguoiNgoai() {
      const tmp = { ...this.dataMoiBenNgoai }
      this.items_nguoingoai.push(tmp)
      this.dataMoiBenNgoai = {}
    },
    actionMoiNoiBo() {
      this.dataMoiNoiBoUser.forEach(element => {
        console.log('this.dataMoiNoiBoUser: ', this.dataMoiNoiBoUser)
        const VALIDATE_INSERTED = this.items_noibo.filter(item => item.canBoId == element.CanBoId)
        console.log('VALIDATE_INSERTED', VALIDATE_INSERTED)
        if (!VALIDATE_INSERTED.length > 0) {
          const tmp = {
            lichHopId: this.DetailMeeting.id,
            donViId: element.iD_DonVi,
            canBoId: element.CanBoId,
            tenDonVi: element.tenDonVi,
            hoTen: element.hoTen,
            sdt: element.phone_DiDong,
          }
          this.items_noibo.push(tmp)
        }
      })

      if (this.dataMoiNoiBoUser.length > 0) {
        this.dataMoiNoiBoUser = []
        return
      }

      if (this.dataMoiNoiBoDonVi) {
        const VALIDATE_INSERTED = this.items_noibo.filter(item => (item.donViId == this.dataMoiNoiBoDonVi.donViId & !item.canBoId))
        if (VALIDATE_INSERTED.length == 0) {
          const tmp_donvi = { ...this.dataMoiNoiBoDonVi }
          tmp_donvi.canBoId = null
          tmp_donvi.lichHopId = this.DetailMeeting.id,

          this.items_noibo.push(tmp_donvi)
        }
      }

      this.dataMoiNoiBoDonVi = undefined
    },
  },

})
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
#modal-moi-nguoi-tham-gia{
  .table-responsive {
    max-height: 300px;
    overflow-y: auto;

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

  .modal-lg{
    max-width: 900px
  }
}
</style>
