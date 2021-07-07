<template>
  <div class="detail-container-content">
    <div v-if="!DetailMeeting.canBoLienHeInfo" />
    <div
      v-else
      class="box-left"
    >
      <div class="row-left">
        <div class="row-left-label">
          Người chủ trì:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.canBoChuTriInfo.hoTen }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Tổng số người tham gia:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.soNguoiThamDu }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Sử dụng máy chiếu:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.bitMayChieu?'Có':'Không' }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label text-boid box-ref">
          Thông tin liên hệ:
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Họ tên:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.canBoLienHeInfo.hoTen }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Số ĐT cơ quan:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.canBoLienHeInfo.sdtDonVi }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Số ĐTDĐ:
        </div>
        <div class="row-left-result">
          {{ DetailMeeting.canBoLienHeInfo.sdtCanBo }}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'ThongTin',
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
    }),
  },
})
</script>
<style lang="scss">
.detail-container-content{
    display: flex;
    padding: 1.2rem;
    padding-top: 0rem;
    justify-content: start !important;

    .box-left{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: start;
        height: 47vh;
        overflow-y: scroll;

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

        .row-left{
            display: flex;
            padding-top: 1.2rem;
            align-content: center;

            .row-left-label{
                width: 13rem !important;
                padding-right: 1rem;

            }

            .row-left-result{
                color: #727E8C;
            }

            .text-boid{
                font-weight: 600;
            }

            .box-ref{
              padding-top: 1rem;
            }
        }
    }

}
</style>
