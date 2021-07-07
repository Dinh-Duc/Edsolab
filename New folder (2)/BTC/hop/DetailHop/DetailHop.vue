<template>
  <div class="box-detail">
    <div class="detail-head">
      <div>Chi tiết lịch họp</div>
      <div
        class="btn-quaylai"
        @click="$emit('btn-rollback', true)"
      >
        <img
          src="@/assets/icons/btn-callback.svg"
          alt=""
        >Quay lại
      </div>
    </div>
    <div v-if="!DetailMeeting.canBoChuTriInfo" />

    <div
      v-else-if="permisstionMeeting != null"
      class="detail-container"
    >
      <div class="detail-container-head">
        <div class="c-head box-action w-100">
          <div class="box-left w-100">
            <div class="c-head-icon">
              <img
                src="@/assets/icons/ellipse.svg"
                alt=""
              >
            </div>
            <div class="c-head-result text-bold">
              {{ DetailMeeting.title }}
            </div>
          </div>
        </div>
        <div class="c-head">
          <div class="c-head-icon">
            <img
              src="@/assets/icons/union.svg"
              alt=""
            >
          </div>
          <div class="c-head-result">
            {{ DetailMeeting.noiDung }}
          </div>
        </div>
        <div class="c-head">
          <div class="c-head-icon">
            <img
              src="@/assets/icons/clock.svg"
              alt=""
            >
          </div>
          <div class="c-head-result">
            {{ formatHour(DetailMeeting.dateTimeFrom) }} -
            {{ formatHour(DetailMeeting.dateTimeTo) }}
          </div>
        </div>
        <div class="c-head">
          <div class="c-head-icon">
            <img
              src="@/assets/icons/calendar.svg"
              alt=""
            >
          </div>
          <div class="c-head-result">
            {{ formatDate(DetailMeeting.dateTimeFrom) }}
          </div>
        </div>
        <div class="c-head">
          <div class="c-head-icon">
            <img
              src="@/assets/icons/point-map.svg"
              alt=""
            >
          </div>
          <div class="c-head-result">
            {{
              DetailMeeting.tenPhongHop
                ? DetailMeeting.tenPhongHop
                : 'Chờ duyệt phòng'
            }}
          </div>
        </div>
        <div class="c-head">
          <div class="c-head-icon">
            <img
              src="@/assets/icons/user.svg"
              alt=""
            >
          </div>
          <div class="c-head-result">
            {{ DetailMeeting.canBoChuTriInfo.hoTen }} -
            {{ DetailMeeting.canBoChuTriInfo.tenChucVu }} -
            {{ DetailMeeting.canBoChuTriInfo.tenDonVi }}
          </div>
        </div>
        <div class="c-head box-action">
          <div class="box-left">
            <div class="d-flex flex-row" v-if="DetailMeeting.linkTrucTuyen">
              <div class="c-head-icon">
                <img
                  src="@/assets/icons/zoom.svg"
                  alt=""
                >
              </div>
              <div
                v-if="DetailMeeting.linkTrucTuyen"
                class="c-head-result box-link"
                @click="openLinkHop(DetailMeeting.linkTrucTuyen)"
              >
                {{ DetailMeeting.linkTrucTuyen }}
              </div>
            </div>
          </div>
          <div class="box-right">
            <div
              v-for="(item, idx) in permisstionMeeting[
                DetailMeeting.statusCode
              ].Btn_Detail.Main"
              :key="idx"
              class="pr-1"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                :variant="item.data.variant"
                :class="item.data.class"
                @click="action_Click_Btn_Detail(item.data.name)"
              >
                <feather-icon
                  v-if="item.data.type_icon == 'feather'"
                  :icon="item.data.icon"
                  class="mr-50"
                />
                <img
                  v-else
                  :src="item.data.icon"
                  alt=""
                >

                {{ item.data.name }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-contain">
        <div
          v-for="(item, idx) in permisstionMeeting[DetailMeeting.statusCode]
            .NavMenu"
          :key="idx"
        >
          <div
            class="nav-box"
            :class="isActive == item ? 'ActiveNav' : ''"
            @click="isActive = item"
          >
            <span>
              {{ item }}
            </span>
          </div>
        </div>
      </div>
      <ThongTin v-if="isActive === 'Thông tin'" />
      <ChuongTrinhHop
        v-if="isActive === 'Chương trình họp'"
      />
      <BieuQuyet
        v-if="isActive === 'Biểu quyết'"
        :item="DetailMeeting"
      />
      <TPThamGia v-if="isActive === 'Thành phần tham gia'" />
      <KetLuanHop
        v-if="isActive === 'Kết luận họp'"
        :item="DetailMeeting"
      />
      <TaiLieuCuaToi
        v-if="isActive === 'Tài liệu của tôi'"
        :id="DetailMeeting.id"
      />
      <BocBang
        v-if="isActive === 'Bóc băng'"
        :item="DetailMeeting"
      />
      <TaiLieuCuocHop v-if="isActive === 'Tài liệu cuộc họp'" />
      <actionBtnDuyet
        v-if="
          permisstionMeeting[DetailMeeting.statusCode].Btn_Detail
            .Child_duyet_phong
        "
        :btn-action-duyet="
          permisstionMeeting[DetailMeeting.statusCode].Btn_Detail
            .Child_duyet_phong
        "
        @is-action-duyet="actionCheckDuyet"
      />
      <actionChoYKien />
      <actionXacNhanThamDu :item="DetailMeeting" />
      <actionDangKyBocBang
        :item="DetailMeeting"
        :show-boc-bang-tab="showBocBangTab"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
import { mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'
import { data_btn } from '../Permissions_Btn/Btn_data.json'
import { USER_DATA } from '@/configs/config.js'

export default {
  name: 'DetailLich',
  components: {
    ThongTin: () => import('./ThongTin.vue'),
    ChuongTrinhHop: () => import('./ChuongTrinhHop.vue'),
    BieuQuyet: () => import('./BieuQuyet.vue'),
    TPThamGia: () => import('./TPThamGia.vue'),
    KetLuanHop: () => import('./KetLuanHop.vue'),
    TaiLieuCuaToi: () => import('./TaiLieuCuaToi.vue'),
    TaiLieuCuocHop: () => import('./TaiLieuCuocHop.vue'),
    actionBtnDuyet: () => import('./actionHop/actionBtnDuyet.vue'),
    actionChoYKien: () => import('./actionHop/actionChoYKien.vue'),
    actionXacNhanThamDu: () => import('./actionHop/actionXacNhanThamDu.vue'),
    actionDangKyBocBang: () => import('./actionHop/actionDangKyBocBang.vue'),
    BocBang: () => import('./BocBang.vue'),
  },
  directives: {
    Ripple,
  },
  props: {
    eventDetailChild: {
      type: String,
    },
  },
  data() {
    return {
      canBoDangKyId: '',
      data_btn: data_btn,
      isDuyetPhong: false,
      idLichHop: '',
      data_duyet_phong: {},
      item_room: {
        value: '',
        text: '',
      },
      isTrangThai: {
        'Chưa gửi': 0,
        'Đã gửi duyệt': 1,
        'Đã duyệt': 2,
        'Từ chối': 3,
        'Đang diễn ra': 4,
        'Thu hồi duyệt': 5,
        'Đã mời họp': 6,
        'Đã xóa': 7,
        'Đã kết thúc': 8,
        'Đã hủy': 9,
      },
      idLich: undefined,
      dataThongTin: {},
      isActive: 'Thông tin',
      obChiTietLich: undefined,
      hinhThucHop: ['Họp trực tiếp', 'Họp trực tuyến'],
      Base_Permissions: ['Thông tin', 'Chương trình họp'],

      listContents: {
        ThongTin: {},
        ChuongTrinhHop: {},
        DiemDanh: {},
        MoiHop: {},
        YKienVaHoiDap: {},
        BieuQuet: {},
        KetLuanHop: {},
      },
      bocBangTab: [],
      bocBangBtn: [],
      permisstionMeeting: null
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
    }),
  },
  created() {
    this.getCanBoDangKyId()
    this.$store.dispatch('hop/getDetailMeeting', {
      id: this.eventDetailChild,
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

  methods: {
    openLinkHop(link) {
      window.open(link)
    },
    action_Click_Btn_Detail(name) {
      switch (name) {
        case 'Sửa':
          this.$store.dispatch('hop/actionEditMeeting', this.DetailMeeting)
          this.$bvModal.show('modal-event-add')
          break
        case 'Duyệt':
          this.$bvModal.show('modal-duyet-phong')
          break
        case 'Thu hồi':
          this.$bvModal.show('modal-duyet-phong')
          break
        case 'Từ chối duyệt':
          this.$bvModal.show('modal-duyet-phong')
          break
        case 'Cho ý kiến':
          this.$bvModal.show('modal-cho-y-kien')
          break
        case 'Xác nhận tham dự':
          this.$bvModal.show('xac-nhan-tham-du')
          break
        case 'Tạo phiên bóc băng':
          this.$bvModal.show('dang-ky-boc-bang')
          break
        default:
          return
      }
    },
    actionCheckDuyet(val) {
      if (val) {
        this.$store.dispatch('hop/getDetailMeeting', {
          id: this.eventDetailChild,
        })
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
      }
    },
    formatHour(value) {
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
      return ''
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
      return ''
    },
    getCanBoDangKyId() {
      const info = JSON.parse(localStorage.getItem(USER_DATA))
      this.canBoDangKyId = info.id
    },
    showBocBangTab() {
      console.log("Show bóc băng tab")
      this.bocBangTab = ['Bóc băng']
      this.bocBangBtn = []
      this.Permissions_Meeting()
    },
    Permissions_Meeting() {
      if (!this.DetailMeeting.hasBocBang) {
        this.bocBangBtn = []
        this.bocBangBtn.push(this.data_btn.btn_dangKyBocBang)
      } else {
        this.bocBangTab = []
        this.bocBangTab.push('Bóc băng')
      }
      //console.log(this.DetailMeeting)
      const result_Permissions_Meeting = {
        DRAFT: {
          //nháp
          NavMenu: [].concat(this.Base_Permissions, ['Tài liệu cuộc họp']),
          Btn_Detail: {
            Main: [...this.bocBangBtn, this.data_btn.btn_sua],
          },
        },
        APPROVED_RECALL: {
          //Thu hồi
          NavMenu: [].concat(this.Base_Permissions, ['Tài liệu cuộc họp']),
          Btn_Detail: {
            Main: [this.data_btn.btn_sua],
          },
        },
        REGISTERED: {
          //đã gửi đăng ký
          NavMenu: [].concat(this.Base_Permissions, [
            'Tài liệu cuộc họp',
            ...this.bocBangTab,
          ]),
          Btn_Detail: {
            Main: [...this.bocBangBtn, this.data_btn.btn_duyet],
            Child_duyet_phong: this.data_btn.btn_duyet.data.child,
          },
        },
        APPROVED: {
          //đã duyệt
          NavMenu: [].concat(this.Base_Permissions, [
            'Tài liệu cuộc họp',
            'Biểu quyết',
            'Thành phần tham gia',
            'Kết luận họp',
            'Tài liệu của tôi',
            ...this.bocBangTab,
          ]),
          Btn_Detail: {
            Main: [
              ...this.bocBangBtn,
              this.data_btn.btn_thuhoi,
              this.data_btn.btn_choykien,
              this.data_btn.btn_xacnhanthamdu,
            ],
            Child_duyet_phong: this.data_btn.btn_thuhoi.data.child,
          },
        },
        REJECTED: {
          //Từ chối duyệt phòng
          NavMenu: [].concat(this.Base_Permissions, ['Tài liệu cuộc họp']),
          Btn_Detail: {
            Main: [this.data_btn.btn_sua],
          },
        },
        INVITATION_SENT: {
          //Đã mời họp
          NavMenu: [].concat(this.Base_Permissions, [
            'Tài liệu cuộc họp',
            'Biểu quyết',
            'Thành phần tham gia',
            'Kết luận họp',
            'Tài liệu của tôi',
          ]),
          Btn_Detail: {
            Main: [
              ...this.bocBangBtn,
              this.data_btn.btn_choykien,
              this.data_btn.btn_xacnhanthamdu,
            ],
          },
        },
        DONE: {
          //	Đã kết thúc
          NavMenu: [].concat(this.Base_Permissions, [
            'Biểu quyết',
            'Thành phần tham gia',
            'Kết luận họp',
            'Tài liệu của tôi',
          ]),
          Btn_Detail: {
            Main: [this.data_btn.btn_choykien, this.data_btn.btn_xacnhanthamdu],
          },
        },
        CANCELLED: {
          //Đã hủy
          NavMenu: [].concat(this.Base_Permissions, [
            'Biểu quyết',
            'Thành phần tham gia',
            'Kết luận họp',
            'Tài liệu của tôi',
          ]),
          Btn_Detail: {
            Main: [this.data_btn.btn_choykien, this.data_btn.btn_xacnhanthamdu],
          },
        },
      }
      this.permisstionMeeting = result_Permissions_Meeting
      //return result_Permissions_Meeting
    },
  },
  watch:{
    DetailMeeting: function(val){
      this.Permissions_Meeting()
    }
  }
}
</script>
<style lang="scss">
.box-detail {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .detail-head {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    text-align: center;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    line-height: 3rem;
    vertical-align: middle;
    color: #2b486a;
    border-bottom: 1px solid rgba(71, 95, 123, 0.2);

    div {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .btn-quaylai {
      cursor: pointer;

      img {
        padding-right: 0.56rem;
      }

      &:hover {
        color: #5583b6;
      }
    }

    span {
      background-color: #5583b6;
      font-size: 1rem;
      color: #fff;
      text-align: center;
      margin-left: 1.4rem;
      max-width: 10rem;
      min-width: 6rem;
      border-radius: 1.16rem;
    }
  }

  .detail-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .detail-container-head {
      display: flex;
      flex-direction: column;
      padding: 1.2rem;
      padding-top: 0rem;

      .c-head {
        display: flex;
        flex-direction: row;
        padding-top: 1rem;
        align-items: center;
        justify-content: left;

        .c-head-icon {
          height: 100%;
          width: auto;
          padding-right: 1rem;

          img {
            width: 1rem;
          }
        }

        .box-link {
          cursor: pointer;
          color: #5a8dee;
        }

        .c-head-result {
          width: auto;
        }
      }

      .box-action {
        display: flex;
        align-content: center;
        justify-content: space-between;

        .text-bold {
          font-weight: 600;
          color: #2b486a;
        }

        .box-left {
          display: flex;
        }

        .box-right {
          display: flex;
          line-height: 1.2rem;
          cursor: pointer;

          .box-duyet {
            background-color: #ff9f43;
            border: 1px solid rgba(255, 159, 67, 0.5);
            border-radius: 6px;
            color: #fff;
            padding: 0.86rem;
            margin-right: 1rem;
            font-weight: 600;

            &:hover {
              background-color: rgba(255, 159, 67, 0.7);
            }
          }
          .box-choykien {
            background-color: #7367f0;
            border: 1px solid rgba(115, 103, 240, 0.5);
            border-radius: 6px;
            color: #fff;
            padding: 0.86rem;
            margin-right: 1rem;
            font-weight: 600;

            &:hover {
              background-color: rgba(115, 103, 240, 0.7);
            }
          }
          .box-xacnhanthamdu {
            background-color: #28c76f;
            border: 1px solid rgba(40, 199, 111, 0.5);
            border-radius: 6px;
            color: #fff;
            padding: 0.86rem;
            font-weight: 600;

            &:hover {
              background-color: rgba(40, 199, 111, 0.7);
            }
          }

          .box-head-ttnb {
            width: 100%;
            margin-left: 1rem;
            color: #5a8dee;
          }
        }
      }
    }

    .nav-contain {
      display: flex;
      align-content: center;
      justify-content: flex-start;
      text-align: center;
      font-size: 1rem;

      .nav-box {
        cursor: pointer;
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: space-evenly;
        padding: 0.71rem;
        background: rgba(234, 238, 245, 0.5);
        border-radius: 0.29rem;
        margin-left: 0.89rem;

        &:hover {
          color: #007bff;
        }
      }

      .ActiveNav {
        background: #5a8dee;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
