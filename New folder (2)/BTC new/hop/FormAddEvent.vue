<template>
  <div class="form-calendar-dn">
    <b-row>
      <div
        class="w-100"
      >

        <div class="row m-0 form-event-dn">
          <div class="col-md-12">
            <b-form-group label="Tiêu đề cuộc họp *">
              <model-select
                v-model="item_topic"
                :options="ListTopic"
                placeholder="Chọn chủ đề"
              />
            </b-form-group>
          </div>

          <div class="col-md-6">
            <b-form-group label="Thời gian họp *">
              <flat-pickr
                  v-model="dataTimeMeeting.date"
                  placeholder="YYYY-MM-DD"
                  class="form-control"
                  :config="configDate"
                />
            </b-form-group>
          </div>

          <div class="col-md-6 box-time-select">
            <div class="col-md-6">
              <b-form-group
                class="color-white"
                label=" ."
              >
                <model-select
                  v-model="dataTimeMeeting.timeStart"
                  :options="optionsTime"
                  placeholder="Thời gian bắt đầu"
                />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="color-white"
                label=" ."
              >
                <model-select
                  v-model="dataTimeMeeting.timeEnd"
                  :options="optionsTime"
                  placeholder="Thời gian kết thúc"
                />
              </b-form-group>
            </div>
          </div>

          <div class="col-md-12">
            <b-form-group label="Người chủ trì *">
              <model-select
                v-model="item_nguoichutri"
                :options="ListUser"
                placeholder="Chọn người chủ trì"
              />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Tổng số người tham dự">
              <b-form-input
                v-model="dataInsert.soNguoiThamDu"
                type="number"
                placeholder="Nhập số người tham dự... "
              />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Khách quốc tế">
              <b-form-input
                v-model="dataInsert.soNguoiThamDu_KhachQuocTe"
                type="number"
                placeholder="Nhập số khách quốc tế... "
              />
            </b-form-group>
          </div>

          <div class="col-md-6">
            <b-form-group label="Khách ở cơ quan bên ngoài">
              <b-form-input
                v-model="dataInsert.soNguoiThamDu_KhachCoQuanNgoai"
                type="number"
                placeholder="Nhập số khách ở cơ quan bên ngoài"
              />
            </b-form-group>
          </div>
          <div class="col-md-6 box-nguoichutri" />

          <div class="col-md-12">
            <b-form-group label="Thông tin liên hệ">
              <model-select
                v-model="item_nguoilienhe"
                :options="ListUser"
                placeholder="Chọn người chủ trì"
              />
            </b-form-group>
          </div>

          <div class="col-md-12 p-0 m-0">
            <div class="row m-0 p-0 d-flex align-items-center mb-1">
              <div class="col-md-3">
                Họp trực tuyến
              </div>
              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <b-button
                    variant="outline-primary"
                    class="btn-hoptructuyen"
                    @click="rndStr(10)"
                  >
                    Trên Jitsi
                  </b-button>
                </div>
              </div>

              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <b-button
                    variant="outline-primary"
                    class="btn-hoptructuyen"
                  >
                    Trên Zoom
                  </b-button>
                  <span>{{ item_linktructuyen.zoom }}</span>
                </div>
              </div>
            </div>
            <div class="col m-0 p-0">
              <div class="row m-0 p-0 d-flex align-items-center mb-1">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <span>{{ item_linktructuyen.jitsi == 'https://call.chinhquyendientu.vn/UBND-DN-HOP-'?'':`Jitsi: ${item_linktructuyen.jitsi}` }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col m-0 p-0">
            <div class="row m-0 p-0 d-flex align-items-center mb-1">
              <div class="col-md-3">
                <span>Phòng họp</span>
              </div>

              <div class="col-md-9">
                <model-select
                  v-model="item_room"
                  :options="ListMeetingRoom"
                  placeholder="Chọn phòng họp"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 p-0 m-0 box-footer">
            <div class="row m-0 p-0 d-flex align-items-center mb-1">
              <div class="col-md-3">
                Nội dung *
              </div>
              <div class="col-md-9">
                <b-form-textarea
                  v-model="dataInsert.noiDung"
                  placeholder="Nhập nội dung chi tiết công việc"
                  rows="3"
                />
                <div class="box-sudungmaychieu">
                  <b-form-checkbox
                    v-model="dataInsert.bit_MayChieu"
                    value="true"
                  >
                    Sử dụng máy chiếu
                  </b-form-checkbox>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="nav-contain">
              <div
                v-for="(item, idx) in listNav"
                :key="idx"
                class="nav-box"
                :class="isActive == item.name?'ActiveNav':''"
                @click="isActive = item.name"
              >
                {{ item.name }}
              </div>
            </div>
            <ThongTin v-if="isActive === 'Thông tin'" />
            <ChuongTrinhHop v-if="isActive === 'Chương trình họp'" />
            <BieuQuyet v-if="isActive === 'Biểu quyết'" />
            <TPThamGia v-if="isActive === 'Thành phần tham gia'" />
            <KetLuanHop v-if="isActive === 'Kết luận họp'" />
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>
<script>
/* eslint-disable */
import { createSchedules } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ModelSelect } from 'vue-search-select'
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'

export default {
  name: 'FormAddEvent',
  components: {
    ThongTin: () => import('./DetailHop/ThongTin.vue'),
    ChuongTrinhHop: () => import('./DetailHop/ChuongTrinhHop.vue'),
    BieuQuyet: () => import('./DetailHop/BieuQuyet.vue'),
    TPThamGia: () => import('./DetailHop/TPThamGia.vue'),
    KetLuanHop: () => import('./DetailHop/KetLuanHop.vue'),
    ModelSelect,
    vSelect,
    flatPickr,
  },
  props: {
    isCreateEventChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      configDate: {
        enableTime: false,
        time_24hr: false,
        allowInput: true,
        dateFormat: 'Y-m-d',
        defaultDate: new Date(),
        minDate: 'today',
        locale: Vietnamese,
      },
      chars: "abcdefghijklmnopqrstuvwxyz",
      status: 1,
      optionsTime: [],
      item_linktructuyen: {
        jitsi: 'https://call.chinhquyendientu.vn/UBND-DN-HOP-',
        zoom: '',
        msteam: '',
      },
      item_topic: {
        value: '',
        text: ''
      },
      item_nguoichutri: {
        value: '',
        text: ''
      },
      item_nguoilienhe: {
        value: '',
        text: ''
      },
      item_room:{
        value: '',
        text: ''
      },
      sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
      dataTimeMeeting: {},
      dataInsert: {
        thoiGianHop_BatDau: '',//x
        thoiGianHop_KetThuc: '',//x
        bit_MayChieu: false,//x
        bit_HopTrucTuyen: false,//x
        bit_PhongTrungTamDieuHanh: false,
        bit_BoKHDTChuTri: false,
        soLuongKhungHinh: 0,
        bit_PhienDich: false,
        bit_ThuAm: false,
        bit_LanhDaoBoChuTri: false,
        lienHe_SDT_CoQuan: 'Thien',//x
        lienHe_SDT_DiDong: 'Thien',//x
        iD_NguoiTao: 352,
        iD_DonViGoc: 3,
        trangThaiSo: 1, //0: chờ đăng ký, 1: chờ duyệt, 2: đã duyệt, 3: đã kết thúc
        iD_CanBoLienHe: 352,//x
        iD_ChuDe: '3fa85f64-5717-4562-b3fc-2c963f66afa6',//x
      },
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      dvPhoiHop: null,
      nPhoiHop: null,
      options_lienhe:[
        { value: null, text: 'Chọn cán bộ chủ trì' },
        { value: 'Thien', text: 'Cao Tiến Dũng' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
      ],
      options_canbochutri: [
        { value: null, text: 'Chọn cán bộ chủ trì' },
        { value: 352, text: 'Cao Tiến Dũng' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
      ],
      isActive: 'Chương trình họp',
      listNav: [
          {
              name: 'Thông tin'
          },
          {
              name: 'Chương trình họp'
          },
          {
              name: 'Thành phần tham gia'
          },
          {
            name: 'Kết luận họp'
          },
          {
            name: 'Biểu quyết'
          },

      ],
    }
  },
  watch: {
    isCreateEventChild: function(val){
      if(val){
        this.dataInsert.thoiGianHop_BatDau = `${this.dataTimeMeeting.date}T${this.dataTimeMeeting.timeStart}`
        this.dataInsert.thoiGianHop_KetThuc = `${this.dataTimeMeeting.date}T${this.dataTimeMeeting.timeEnd}`
        this.dataInsert.soNguoiThamDu = Number(this.dataInsert.soNguoiThamDu)
        this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai = Number(this.dataInsert.soNguoiThamDu_KhachCoQuanNgoai)
        this.dataInsert.soNguoiThamDu_KhachQuocTe = Number(this.dataInsert.soNguoiThamDu_KhachQuocTe)

        //người chủ trì
        this.dataInsert.iD_ChuDe = this.item_topic.value
        this.dataInsert.iD_CanBoChuTri = this.item_nguoichutri.value.Id
        //người liên hệ
        this.dataInsert.iD_CanBoLienHe = this.item_nguoilienhe.value.Id
        this.dataInsert.lienHe_HoTen = this.item_nguoilienhe.value.hoTen
        this.dataInsert.lienHe_SDT_CoQuan = this.item_nguoilienhe.value.phone_CoQuan
        this.dataInsert.lienHe_SDT_DiDong = this.item_nguoilienhe.value.phone_DiDong
        //link trực tuyến
        this.dataInsert.linktructuyen = this.item_linktructuyen.jitsi
        this.actionCreateEvent()
      }
    }
  },
  computed:{
    ...mapGetters({
      ListTopic: 'hop/ListTopic',
      ListUser: 'hop/ListUser',
      ListMeetingRoom: 'hop/ListMeetingRoom',
    }),

  },
  methods: {
    rndStr(len) {

      this.dataInsert.bit_HopTrucTuyen = true

      this.item_linktructuyen.jitsi = 'https://call.chinhquyendientu.vn/UBND-DN-HOP-'

      for( let i=0; i < len; i++ ) {
				this.item_linktructuyen.jitsi += this.chars.charAt(Math.floor(Math.random() * this.chars.length))
      }

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
    startsWithPredicate(text, inputText){
      // console.log(text)
      // this.dataTimeMeeting.timeStart = { text: '00:01', value: '00:01'}
      // console.log('this.dataTimeMeeting.timeStart: ', this.dataTimeMeeting.timeStart)
      // return text.startsWith(inputText)
    },
    focusTimeFrom() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeFrom.$el.querySelector('.vs__dropdown-menu .vs__dropdown-option--selected')
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
    clickEvent(number) {
      this.status = number
    },
    actionCreateEvent(){
      const res = createSchedules(this.dataInsert)
      res.then((data) => {
        if(data.status === 200 && data.data.statusCode === 200 && data.data.succeeded){
          this.$toast({
                    component: ToastificationContent,
                    position: 'top-center',
                    props: {
                      title: `Thêm mới`,
                      icon: 'BellIcon',
                      variant: 'success',
                      text: `${data.data.message}.`,
                    },
                  })
          this.$bvModal.hide('modal-event-add')
          this.$store.dispatch('hop/getListEvents', {
            ID_DonVi: 2,
            ID_CanBo: 349,
            Loai: -1,
            page: 1,
            pageSize: 20,
            orderBy: 'ThoiGian',
            orderType: false,
            dateFrom: moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
            dateTo: moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
          })
        }
      }).catch(error => {
        this.$toast({
                    component: ToastificationContent,
                    position: 'top-center',
                    props: {
                      title: `Thêm mới`,
                      icon: 'BellIcon',
                      variant: 'outline-danger',
                      text: `Thêm thất bại. Lỗi: ${error}.`,
                    },
                  })
      })
    },
  },
  created(){
    this.actionOptionsTime()
    this.$store.dispatch('hop/getListTopic', {
      pageSize: 100,
      page: 1
    })

    this.$store.dispatch('hop/getListUser', {
      pageSize: 1000,
      page: 1
    })

    this.$store.dispatch('hop/getListMeetingRoom', {
      category: 1,
      bitTrungTamDieuHanh: false
    })
  },
}
</script>
<style lang="scss">
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

    .box-time-select{
      display: flex;
    }

    .box-footer{
      border-bottom: 1px solid rgba(71, 95, 123, 0.2);
    }

    .color-white{
      color: #FFF;
    }

    .btn-hoptructuyen{
      width: 11.6rem;
      padding: 0.16rem 0.116rem !important;
      height: 3rem;
    }

    .box-sudungmaychieu{
      padding-top: 0.56rem;
    }

    .box-nguoichutri{
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

    .nav-contain{
      display: flex;
      align-content: center;
      justify-content: flex-start;
      text-align: center;
      font-size: 1.0rem;
      padding-top: 1rem;

      .nav-box{
          cursor: pointer;
          display: flex;
          height: 100%;
          align-content: center;
          justify-content: space-evenly;
          padding: 0.71rem;
          background: rgba(234, 238, 245, 0.5);
          border-radius: 0.29rem;
          margin-left: 0.89rem;

          &:hover{
              color: #007bff;;
          }

      }

      .ActiveNav{
          background: #5A8DEE;
          color: #FFF;

            &:hover{
              color: #FFF;
          }
      }
    }
  }
}
</style>
