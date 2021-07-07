<template>
  <b-modal
    id="modal-event-add"
    title="Tạo lịch họp"
    centered
    no-close-on-backdrop
    scrollable
    size="lg"
    modal-class="modal-calendar custom-form-model-dn"
    @hide="clearCache"
  >
    <template #modal-footer>
      <b-button
        v-if="EditMeeting.canBoChuTriInfo"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="secondary"
        @click="actionCreateMeeting('lưu')"
      >
        Lưu
      </b-button>
      <b-button
        v-else
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="secondary"
        @click="actionCreateMeeting('lưu nháp')"
      >
        Lưu nháp
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="actionCreateMeeting('gửi duyệt')"
      >
        Gửi duyệt
      </b-button>
    </template>
    <div class="form-calendar-dn">
      <b-row>
        <div v-if="!ListUser.length > 0" />
        <div
          v-else
          class="w-100"
        >
          <div class="row m-0 form-event-dn">
            <div class="col-md-12 d-flex align-items-center">
              <div class="col-md-3">
                Tiêu đề cuộc họp:<span class="box-note">*</span>
              </div>
              <div class="col-md-9">
                <b-form-input
                  v-model="dataInsert.title"
                  required
                  placeholder="Nhập tiêu đề cuộc họp"
                />
                <div
                  v-show="errorList['title']"
                  class="color-red"
                >
                  <span>{{ errorList['title'] }}</span>
                </div>
              </div>
            </div>

            <div class="col-md-12 d-flex align-items-center pt-1">
              <div class="col-md-3">
                Thời gian họp:<span class="box-note">*</span>
              </div>
              <div class="col-md-9 pl-1 d-flex">
                <div class="col-4 p-0">
                  <flat-pickr
                    v-model="dataInsert.ngayHop"
                    placeholder="DD-MM-YYYY"
                    class="form-control mr-1"
                    :config="configDate"
                  />
                </div>
                <div class="col-4 pl-1">
                  <cleave
                    v-model="dataInsert.timeStart"
                    class="form-control"
                    :raw="false"
                    :options="cleverOption.time"
                    placeholder="Thời gian bắt đầu hh:mm"
                  />
                </div>
                <div class="col-4 p-0">
                  <cleave
                    v-model="dataInsert.timeTo"
                    class="form-control"
                    :raw="false"
                    :options="cleverOption.time"
                    placeholder="Thời gian kết thúc hh:mm"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-12 d-flex pt-1">
              <div class="col-md-3">
                Người chủ trì:<span class="box-note">*</span>
              </div>
              <div class="col-md-9">
                <model-select
                  v-model="item_nguoichutri"
                  :options="ListUser"
                  placeholder="Chọn người chủ trì"
                />
              </div>
            </div>
            <div class="col-md-4 pt-1">
              <b-form-group
                label="Tổng số người tham dự:"
                class="pl-1"
              >
                <b-form-input
                  v-model="dataInsert.soNguoiThamDu"
                  type="number"
                  placeholder="Nhập số người tham dự... "
                />
              </b-form-group>
            </div>
            <div class="col-md-4 pt-1">
              <b-form-group label="Khách quốc tế:">
                <b-form-input
                  v-model="dataInsert.soNguoiThamDu_KhachQuocTe"
                  type="number"
                  placeholder="Nhập số khách quốc tế... "
                />
              </b-form-group>
            </div>

            <div class="col-md-4 pt-1">
              <b-form-group
                label="Khách ở cơ quan bên ngoài:"
                class="pr-1"
              >
                <b-form-input
                  v-model="dataInsert.soNguoiThamDu_KhachCoQuanNgoai"
                  type="number"
                  placeholder="Nhập số khách ở cơ quan bên ngoài"
                />
              </b-form-group>
            </div>

            <div class="col-md-12 d-flex align-items-center">
              <div class="col-md-3">
                Thông tin liên hệ<span class="box-note">*</span>
              </div>
              <div class="col-md-9">
                <model-select
                  v-model="item_nguoilienhe"
                  :options="ListUser"
                  placeholder="Chọn người liên hệ"
                />
              </div>
            </div>

            <div class="col-md-12 d-flex pt-1 align-items-center">
              <div class="col-md-3">
                Họp trực tuyến
              </div>
              <div class="col-md-9">
                <div>
                  <b-button
                    variant="outline-primary"
                    class="btn-hoptructuyen mr-2"
                    :class="
                      item_linktructuyen.jitsi.check
                        ? 'box-checklinktructuyenactive'
                        : 'box-checklinktructuyenDeactive'
                    "
                    @click="rndLinkTrucTuyen('jitsi')"
                  >
                    Trên Jitsi
                  </b-button>
                  <b-button
                    variant="outline-primary"
                    class="btn-hoptructuyen"
                    :class="
                      item_linktructuyen.emeeting.check
                        ? 'box-checklinktructuyenactive'
                        : 'box-checklinktructuyenDeactive'
                    "
                    @click="rndLinkTrucTuyen('emeeting')"
                  >
                    Trên Emeeting
                  </b-button>
                </div>
                <div class="pt-1">
                  <span>{{
                    item_linktructuyen.jitsi.check
                      ? `Jitsi: ${item_linktructuyen.jitsi.value}`
                      : ''
                  }}</span>
                  <span>{{
                    item_linktructuyen.emeeting.check
                      ? `Emeeting: ${item_linktructuyen.emeeting.value}`
                      : ''
                  }}</span>
                </div>
              </div>
            </div>

            <div class="col-md-12 pt-1 box-footer">
              <div class="row m-0 p-0 d-flex mb-1">
                <div class="col-md-3">
                  Nội dung:<span class="box-note">*</span>
                </div>
                <div class="col-md-9">
                  <b-form-textarea
                    v-model="dataInsert.noiDung"
                    placeholder="Nhập nội dung chi tiết công việc"
                    rows="3"
                  />
                  <div class="box-sudungmaychieu pt-1">
                    <b-form-checkbox v-model="checkMayChieu">
                      Sử dụng máy chiếu
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </b-modal>
</template>
<script>
/* eslint-disable */
import { createSchedules, editSchedules } from '@/api/hop/indexNew'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ModelSelect } from 'vue-search-select'
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import { USER_DATA, LINK_TRUC_TUYEN } from '@/configs/config.js'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'

export default {
  name: 'FormAddEvent',
  components: {
    ModelSelect,
    vSelect,
    flatPickr,
    Cleave,
  },
  directives: {
    Ripple,
  },
  props: {
    isCreateEventChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errorList: {
        title: null,
      },
      cleverOption: {
        time: {
          time: true,
          timePattern: ['h', 'm'],
        },
      },
      canBoDangKyId: '',
      configDate: {
        enableTime: false,
        time_24hr: false,
        allowInput: true,
        dateFormat: 'd-m-Y',
        defaultDate: new Date(),
        minDate: 'today',
        locale: Vietnamese,
      },
      chars: 'abcdefghijklmnopqrstuvwxyz',
      status: 1,
      optionsTime: [],
      item_linktructuyen: {
        jitsi: {
          value: LINK_TRUC_TUYEN.jitsi,
          check: false,
        },
        emeeting: {
          value: LINK_TRUC_TUYEN.emeeting,
          check: false,
        },
      },
      item_nguoichutri: {
        value: '',
        text: '',
      },
      item_nguoilienhe: {
        value: '',
        text: '',
      },
      checkMayChieu: false,
      sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
      dataInsert: {
        ngayHop: moment().format('DD-MM-YYYY'),
        timeStart: moment().format('HH:mm'),
        timeTo: moment().format('HH:mm'),
        bit_MayChieu: false, //x
        bit_HopTrucTuyen: false,
        bit_PhongTrungTamDieuHanh: false,
        bit_BoKHDTChuTri: false,
        soLuongKhungHinh: 0,
        bit_PhienDich: false,
        bit_ThuAm: false,
        bit_LanhDaoBoChuTri: false,
        nguoiDangKyUserId: '',
        status: 1, //0: chờ đăng ký, 1: chờ duyệt, 2: đã duyệt, 3: đã kết thúc
      },
    }
  },
  computed: {
    ...mapGetters({
      ListUser: 'hop/ListUser',
      EditMeeting: 'hop/EditMeeting',
    }),
  },
  /* eslint-disable */
  watch: {
    EditMeeting: {
      handler(val) {
        if (val.canBoChuTriInfo) {
          console.log('EditMeeting', val)

          this.dataInsert.title = val.title
          this.dataInsert.ngayHop = moment(val.ngayHop).format('DD-MM-YYYY')
          // this.configDate.defaultDate = moment(val.ngayHop).format('Y-m-d')
          this.dataInsert.timeStart = val.timeStart
          this.dataInsert.timeTo = val.timeTo

          const tmp_NguoiChuTri = this.ListUser.filter(
            item => item.value.CanBoId == val.canBoChuTriInfo.canBoId,
          )

          if (tmp_NguoiChuTri.length > 0) {
            this.item_nguoichutri = tmp_NguoiChuTri[0]
          }

          this.dataInsert.soNguoiThamDu = val.soNguoiThamDu
          this.dataInsert.soNguoiThamDu_KhachQuocTe =
            val.soNguoiThamDuKhachQuocTe
          this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai =
            val.soNguoiThamDuKhachCoQuanNgoai

          const tmp_nguoilienhe = this.ListUser.filter(
            item => item.value.CanBoId == val.canBoLienHeInfo.canBoId,
          )

          if (tmp_nguoilienhe.length > 0) {
            this.item_nguoilienhe = tmp_nguoilienhe[0]
          }

          if (val.bitHopTrucTuyen) {
            if (val.linkTrucTuyen.includes('emeeting')) {
              this.item_linktructuyen.jitsi.check = false
              this.item_linktructuyen.emeeting.check = true
              this.item_linktructuyen.emeeting.value = val.linkTrucTuyen
            } else {
              this.item_linktructuyen.emeeting.check = false
              this.item_linktructuyen.jitsi.check = true
              this.item_linktructuyen.jitsi.value = val.linkTrucTuyen
            }
          } else {
            this.item_linktructuyen.jitsi.check = false
            this.item_linktructuyen.emeeting.check = false
          }

          console.log('this.item_linktructuyen', this.item_linktructuyen)

          this.dataInsert.noiDung = val.noiDung

          this.dataInsert.status = val.status

          this.checkMayChieu = val.bitMayChieu
        }
      },
    },
  },
  methods: {
    actionEdit() {
      if (this.EditMeeting) {
        console.log('actionEdit: ', this.EditMeeting)
      }
    },
    actionCreateMeeting(val_case) {
      switch (val_case) {
        case 'lưu':
          this.preparePostEvent()
          break
        case 'lưu nháp':
          this.dataInsert.status = 0
          this.preparePostEvent()
          break
        case 'gửi duyệt':
          this.dataInsert.status = 1
          this.preparePostEvent()
          break
        default:
          return
      }
    },
    preparePostEvent() {
      this.dataInsert.soNguoiThamDu = Number(this.dataInsert.soNguoiThamDu)
      this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai = Number(
        this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai,
      )
      this.dataInsert.soNguoiThamDu_KhachQuocTe = Number(
        this.dataInsert.soNguoiThamDu_KhachQuocTe,
      )

      //người chủ trì
      this.dataInsert.canBoIdCanBoChuTri = this.item_nguoichutri.value.CanBoId

      //người liên hệ
      this.dataInsert.canBoLienHeId = this.item_nguoilienhe.value.CanBoId

      //link trực tuyến
      if (this.item_linktructuyen.jitsi.check) {
        // khi click vao jitsi
        this.dataInsert.linkTrucTuyen = this.item_linktructuyen.jitsi.value
      } else if (this.item_linktructuyen.emeeting.check) {
        // khi click vao emeeting
        this.dataInsert.linkTrucTuyen = this.item_linktructuyen.emeeting.value
      } else {
        //check lại phát cuối
        this.dataInsert.bit_HopTrucTuyen = false
        this.dataInsert.linkTrucTuyen = ''
      }

      //format ngay
      ;(this.dataInsert.ngayHop = this.YEU_CAU_NGAY_THEO_KIEU_VIET_NAM(
        this.dataInsert.ngayHop,
      )),
        //check may chieu
        (this.dataInsert.bit_MayChieu = this.checkMayChieu)

      const item_IdCanBo = this.ListUser.filter(
        element => element.value.CanBoId == this.canBoDangKyId.toString(),
      )

      if (item_IdCanBo.length > 0) {
        this.dataInsert.nguoiDangKyCanBoId = item_IdCanBo[0].value.CanBoId
        this.dataInsert.donViId = item_IdCanBo[0].value.iD_DonVi
      }

      if (this.EditMeeting.canBoChuTriInfo) {
        this.actionEditMeeting()
        return
      }

      this.actionCreateEvent()
    },
    rndLinkTrucTuyen(_case) {
      switch (_case) {
        case 'jitsi':
          if (this.item_linktructuyen.jitsi.check) {
            this.item_linktructuyen.jitsi.check = !this.item_linktructuyen.jitsi
              .check
            this.item_linktructuyen.emeeting.check = false
            this.item_linktructuyen.jitsi.value = LINK_TRUC_TUYEN.jitsi
            break
          }
          this.item_linktructuyen.jitsi.check = !this.item_linktructuyen.jitsi
            .check
          this.item_linktructuyen.emeeting.check = false
          this.item_linktructuyen.jitsi.value =
            LINK_TRUC_TUYEN.jitsi + this.rndStr(6)
          break
        case 'emeeting':
          if (this.item_linktructuyen.emeeting.check) {
            this.item_linktructuyen.jitsi.check = false
            this.item_linktructuyen.emeeting.check = !this.item_linktructuyen
              .emeeting.check
            this.item_linktructuyen.emeeting.value = LINK_TRUC_TUYEN.emeeting
            break
          }
          this.item_linktructuyen.jitsi.check = false
          this.item_linktructuyen.emeeting.check = !this.item_linktructuyen
            .emeeting.check
          this.item_linktructuyen.emeeting.value =
            LINK_TRUC_TUYEN.emeeting + this.rndStr(6)
          break
        default:
          return
      }
    },
    rndStr(len) {
      this.dataInsert.bit_HopTrucTuyen = true

      let result = ''

      for (let i = 0; i < len; i++) {
        result += this.chars.charAt(
          Math.floor(Math.random() * this.chars.length),
        )
      }

      return result
    },
    actionOptionsTime(hour = 0) {
      // eslint-disable-next-line no-var
      this.optionsTime = []
      let i = hour
      for (i; i < 24; i += 1) {
        if (i < 10) {
          this.optionsTime.push({ text: `0${i}:00`, value: `0${i}:00` })
          this.optionsTime.push({ text: `0${i}:30`, value: `0${i}:30` })
        } else {
          this.optionsTime.push({ text: `${i}:00`, value: `${i}:00` })
          this.optionsTime.push({ text: `${i}:30`, value: `${i}:30` })
        }
      }
    },
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
    clickEvent(number) {
      this.status = number
    },
    actionEditMeeting() {
      this.dataInsert.id = this.EditMeeting.id
      editSchedules(this.dataInsert)
        .then(data => {
          if (data.succeeded) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: `Chỉnh sửa`,
                icon: 'BellIcon',
                variant: 'success',
                text: `${
                  data.message ? data.message : 'Chỉnh sửa thành công'
                }.`,
              },
            })
            this.actionClear()
            this.$store.dispatch('hop/getDetailMeeting', {
              id: this.EditMeeting.id,
            })
            this.render()
            this.$bvModal.hide('modal-event-add')
            this.actionClear()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    actionCreateEvent() {
      const res = createSchedules(this.dataInsert)
      res
        .then(data => {
          console.log('actionCreateEvent', data)
          if (data.succeeded) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: `Thêm mới`,
                icon: 'BellIcon',
                variant: 'success',
                text: `${data.message ? data.message : 'Thêm mới thành công'}.`,
              },
            })
            this.actionClear()
            this.$bvModal.hide('modal-event-add')
            this.render()
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: `Thêm mới`,
              icon: 'BellIcon',
              variant: 'outline-danger',
              text: `Thêm thất bại. Lỗi: ${error.message}.`,
            },
          })
        })
    },
    getCanBoDangKyId() {
      const info = JSON.parse(localStorage.getItem(USER_DATA))
      this.canBoDangKyId = info.id
    },
    YEU_CAU_NGAY_THEO_KIEU_VIET_NAM(val) {
      console.log('YEU_CAU_NGAY_THEO_KIEU_VIET_NAM:', val)
      //serve nhận định dạng YYYY-MM-DD nhưng một số người thích DD-MM-YYYY NÊN MỚI VIẾT CÁI HÀM NÀY
      if (!val) return null
      const tmp_arr_ngay = val.split('-')

      return `${tmp_arr_ngay[2]}-${tmp_arr_ngay[1]}-${tmp_arr_ngay[0]}`
    },
    actionClear() {
      this.dataInsert.title = ''
      this.dataInsert.ngayHop = moment().format('YYYY-MM-DD')
      this.dataInsert.timeStart = ''
      this.dataInsert.timeTo = ''
      this.dataInsert.soNguoiThamDu = null
      this.dataInsert.soNguoiThamDu_KhachQuocTe = null
      this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai = null
      this.item_nguoilienhe.value = {}
      this.item_nguoilienhe.text = ''
      this.item_nguoichutri.value = {}
      this.item_nguoichutri.text = ''
      this.dataInsert.noiDung = ''
      this.dataInsert.bit_MayChieu = false

      this.dataInsert.bit_HopTrucTuyen = false
      this.dataInsert.linkTrucTuyen = ''
      this.item_linktructuyen = {
        jitsi: {
          value: LINK_TRUC_TUYEN.jitsi,
          check: false,
        },
        emeeting: {
          value: LINK_TRUC_TUYEN.emeeting,
          check: false,
        },
      }
    },
    clearCache() {
      this.$store.dispatch('hop/actionEditMeeting', {})
      this.actionClear()
    },
    render() {
      this.$store.dispatch('hop/getListEvents', {
        CanBoId: this.canBoDangKyId,
        Loai: -1,
        PageIndex: 1,
        PageSize: 15,
        orderBy: 'ThoiGian',
        orderType: false,
        DateStart: moment()
          .subtract(0, 'months')
          .startOf('month')
          .format('YYYY-MM-DD'),
        DateTo: moment()
          .subtract(0, 'months')
          .endOf('month')
          .format('YYYY-MM-DD'),
      })

      this.$store.dispatch('hop/getListUser', {
        ID_DonVi: null,
        IsGetAll: true,
        UserId: null,
        SortBy: null,
        FilterBy: null,
        PageIndex: 1,
        PageSize: 9999,
      })
    },
  },
  created() {
    this.actionOptionsTime()

    this.getCanBoDangKyId()
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.form-calendar-dn {
  .button-event {
    .btn-color-custome {
      border: 1px solid #eaeef5;
      margin-right: 10px;
      background: #eaeef5;
      &.active {
        background: #5a8dee;
        color: #fff;
      }
    }
  }

  .form-event-dn {
    padding-top: 1.3rem;

    .box-time-select {
      display: flex;
    }

    .color-white {
      color: #fff;
    }

    .btn-hoptructuyen {
      width: 11.6rem;
      padding: 0.16rem 0.116rem !important;
      height: 3rem;
    }

    .box-sudungmaychieu {
      padding-top: 0.56rem;
    }

    .box-nguoichutri {
      display: flex;
      align-items: center;
      height: 8rem;
      justify-content: flex-start;
      vertical-align: middle;
    }

    .custom-file-input-dn {
      .custom-file-label {
        border-top-left-radius: 0.357rem !important;
        border-bottom-left-radius: 0.357rem !important;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
        &::after {
          display: none !important;
        }
      }
    }
    .group-file-input-dn {
      .input-group-append {
        .input-group-text {
          padding: 0.438rem 0.6em !important;
        }
      }
    }
  }
}

.box-note {
  color: red;
}

.box-checklinktructuyenactive {
  background-color: #5a8dee33;
}

.box-checklinktructuyenDeactive {
  background-color: #fff !important;
}
</style>
