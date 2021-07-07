<template>
  <div class="box-detail">
      <div class="detail-head">
        <div>Chi tiết lịch họp </div>
        <div
          class="btn-quaylai"
          @click="$emit('btn-rollback', true)"
        ><img
          src="@/assets/icons/btn-callback.svg"
          alt=""
        >Quay lại
        </div>
      </div>
      <div v-if="isLoading" />
      <div v-else class="detail-container">
        <div class="detail-container-head">
          <div class="c-head box-action">
            <div class="box-left">
              <div class="c-head-icon">
                <img
                  src="@/assets/icons/ellipse.svg"
                  alt=""
                >
              </div>
              <div class="c-head-result text-bold">
                {{ dataLichHopDetail.chuDe.tenChuDe }}
              </div>
            </div>
            <div class="box-right">
              <img
                src="@/assets/icons/group-ttnb.svg"
                alt=""
              >
              <div class="box-head-ttnb">
                Tương tác nội bộ
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
              {{ dataLichHopDetail.chuDe.moTa }}
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
              {{ formatHour(dataLichHopDetail.thoiGianHop_BatDau) }} - {{ formatHour(dataLichHopDetail.thoiGianHop_KetThuc) }}
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
              {{ formatDate(dataLichHopDetail.thoiGianHop_BatDau) }}
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
              <div v-if="!isDuyetPhong">
                {{ dataLichHopDetail.ten_PhongHop?dataLichHopDetail.ten_PhongHop:'Chờ duyệt phòng' }}
              </div>
              <div v-else>
                <model-select
                  v-model="item_room"
                  :options="ListMeetingRoom"
                  placeholder="Chọn phòng họp"
                />
              </div>
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
              {{ dataLichHopDetail.canBoChuTri.tenCanBo }} - {{ dataLichHopDetail.canBoChuTri.chucVu }} - {{ dataLichHopDetail.canBoChuTri.tenDonVi }}
            </div>
          </div>
          <div class="c-head box-action">
            <div class="box-left">
              <div class="c-head-icon">
                <img
                  src="@/assets/icons/zoom.svg"
                  alt=""
                >
              </div>
              <div class="c-head-result box-link">
                http://meet.google.com/sae-ciyd-sbs
              </div>
            </div>
            <div class="box-right">
              <div @click="isDuyetPhong = !isDuyetPhong" class="box-duyet">
                Duyệt
              </div>
              <div class="box-choykien">
                Cho ý kiến
              </div>
              <div class="box-xacnhanthamdu">
                Xác nhận tham dự
              </div>
            </div>
          </div>
        </div>
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
        <ThongTin v-if="isActive === 'Thông tin'" :dataThongTin="dataThongTin" />
        <ChuongTrinhHop v-if="isActive === 'Chương trình họp'" />
        <BieuQuyet v-if="isActive === 'Biểu quyết'" />
        <TPThamGia v-if="isActive === 'Thành phần tham gia'" />
        <KetLuanHop v-if="isActive === 'Kết luận họp'" />
        <TaiLieuCuaToi v-if="isActive === 'Tài liệu của tôi'" />
        <TaiLieuCuocHop v-if="isActive === 'Tài liệu cuộc họp'" />
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
import { listSchedulesDetail } from '@/api/hop'
import { mapGetters } from 'vuex'
import { ModelSelect } from 'vue-search-select'

export default ({
  name: 'DetailLich',
  components: {
    ThongTin: () => import('./ThongTin.vue'),
    ChuongTrinhHop: () => import('./ChuongTrinhHop.vue'),
    BieuQuyet: () => import('./BieuQuyet.vue'),
    TPThamGia: () => import('./TPThamGia.vue'),
    KetLuanHop: () => import('./KetLuanHop.vue'),
    TaiLieuCuaToi: () => import('./TaiLieuCuaToi.vue'),
    TaiLieuCuocHop: () => import('./TaiLieuCuocHop.vue'),
    ModelSelect,
  },
  props: {
    eventDetailChild: {
      type: Object,
    },
  },
  data() {
    return {
      isDuyetPhong: false,
      item_room:{
        value: '',
        text: ''
      },
      idLich: undefined,
      dataLichHopDetail: undefined,
      dataThongTin: {},
      isLoading: true,
      isActive: 'Thông tin',
      obChiTietLich: undefined,
      hinhThucHop: ['Họp trực tiếp', 'Họp trực tuyến'],
      listNav: [
        {
          name: 'Thông tin',
        },
        {
          name: 'Tài liệu cuộc họp',
        },
        {
          name: 'Chương trình họp',
        },
        {
          name: 'Biểu quyết',
        },
        {
          name: 'Thành phần tham gia',
        },
        {
          name: 'Kết luận họp',
        },
        {
          name: 'Tài liệu của tôi',
        },
      ],
      listContents: {
        ThongTin: {},
        ChuongTrinhHop: {},
        DiemDanh: {},
        MoiHop: {},
        YKienVaHoiDap: {},
        BieuQuet: {},
        KetLuanHop: {},
      },
    }
  },
  computed: {
    ...mapGetters({
        ListMeetingRoom: 'hop/ListMeetingRoom',
    }),
  },
  created() {
    this.idLich = this.$route.query.id
    listSchedulesDetail({ id: this.eventDetailChild.extendedProps.data.id}).then(data => {
      if(data.status === 200 && data.data.succeeded){
        this.dataLichHopDetail = data.data.data.lichHop

        this.getDataThongTin()
        this.isLoading = !this.isLoading
      }
    }).catch(err => {console.log(err)})

    this.$store.dispatch('hop/getListMeetingRoom', {
      category: 1,
      bitTrungTamDieuHanh: false
    })
  },
  methods: {

    formatHour(value) {
      if (value) {
        return moment(String(value)).format('hh:mm')
      }
      return ''
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
      return ''
    },
    getDataThongTin(){
      if(this.dataLichHopDetail){
        this.dataThongTin.canBoChuTri = this.dataLichHopDetail.canBoChuTri
        this.dataThongTin.soNguoiThamDu = this.dataLichHopDetail.soNguoiThamDu
        this.dataThongTin.bit_MayChieu = this.dataLichHopDetail.bit_MayChieu
        this.dataThongTin.canBoLienHe = this.dataLichHopDetail.canBoLienHe

      }
    },
    setRoomDuyetPhong(){
      if(this.dataLichHopDetail){
        this.item_room.value = this.dataLichHopDetail.iD_PhongHop
        this.item_room.text = this.dataLichHopDetail.ten_PhongHop
      }
    }
  },
})
</script>
<style lang='scss'>
.box-detail{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .detail-head{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
        text-align: center;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        line-height: 3rem;
        vertical-align: middle;
        color: #2B486A;
        border-bottom: 1px solid rgba(71, 95, 123, 0.2);

        div{
            font-size: 1.2rem;
            font-weight: 600;
        }

        .btn-quaylai{
            cursor: pointer;

            img{
                padding-right: 0.56rem;
            }

            &:hover{
                color: #5583B6;
            }
        }

        span{
            background-color: #5583B6;
            font-size: 1.0rem;
            color: #FFF;
            text-align: center;
            margin-left: 1.4rem;
            max-width: 10rem;
            min-width: 6rem;
            border-radius: 1.16rem;
        }
    }

    .detail-container{
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;

        .detail-container-head{
            display: flex;
            flex-direction: column;
            padding: 1.2rem;

            .c-head{
                display: flex;
                flex-direction: row;
                padding-top: 1.0rem;
                align-items: center;
                justify-content: left;

                .c-head-icon{
                    height: 100%;
                    width: auto;
                    padding-right: 1rem;

                    img{
                        width: 1rem;
                    }
                }

                .box-link{
                    cursor: pointer;
                    color: #5A8DEE;
                }

                .c-head-result{
                  width: auto;
                }
            }

            .box-action{
                display: flex;
                align-content: center;
                justify-content: space-between;

                .text-bold{
                    font-weight: 600;
                    color: #2B486A;
                }

                .box-left{
                    display: flex;
                }

                .box-right{
                    display: flex;
                    line-height:1.2rem;
                    cursor: pointer;
                    width: auto;

                    .box-duyet{
                        background-color: #FF9F43;
                        border: 1px solid rgba(255, 159, 67, 0.5);
                        border-radius: 6px;
                        color: #FFF;
                        padding: 0.86rem;
                        margin-right: 1rem;
                        font-weight: 600;

                        &:hover{
                          background-color: rgba(255, 159, 67, 0.7);
                        }
                    }
                    .box-choykien{
                        background-color: #7367F0;
                        border: 1px solid rgba(115, 103, 240, 0.5);
                        border-radius: 6px;
                        color: #FFF;
                        padding: 0.86rem;
                        margin-right: 1rem;
                        font-weight: 600;

                        &:hover{
                          background-color: rgba(115, 103, 240, 0.7);
                        }
                    }
                    .box-xacnhanthamdu{
                        background-color: #28C76F;
                        border: 1px solid rgba(40, 199, 111, 0.5);
                        border-radius: 6px;
                        color: #FFF;
                        padding: 0.86rem;
                        font-weight: 600;

                        &:hover{
                          background-color: rgba(40, 199, 111, 0.7);
                        }
                    }

                    .box-head-ttnb{
                        width: 100%;
                        margin-left: 1rem;
                        color: #5A8DEE;
                    }
                }
            }
        }

        .nav-contain{
            display: flex;
            align-content: center;
            justify-content: flex-start;
            text-align: center;
            font-size: 1.0rem;

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
