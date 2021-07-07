<template>
  <div class="detail-container-content">
    <div class="box-left">
      <div class="row-left">
        <div class="row-left-label">
          Người chủ trì:
        </div>
        <div class="row-left-result">
          {{ dataThongTin.canBoChuTri.tenCanBo }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Tổng số người tham gia:
        </div>
        <div class="row-left-result">
          {{ dataThongTin.soNguoiThamDu }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Sử dụng máy chiếu:
        </div>
        <div class="row-left-result">
          {{ dataThongTin.bit_MayChieu?'Có':'Không' }}
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
          {{ dataThongTin.canBoLienHe.tenCanBo }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Số ĐT cơ quan:
        </div>
        <div class="row-left-result">
          {{ dataThongTin.canBoLienHe.sdT_CoQuan }}
        </div>
      </div>
      <div class="row-left">
        <div class="row-left-label">
          Số ĐTDĐ:
        </div>
        <div class="row-left-result">
          {{ dataThongTin.canBoLienHe.sdT_DiDong }}
        </div>
      </div>
    </div>

  </div>
</template>
<script>

export default ({
  name: 'ThongTin',
  props: {
    dataThongTin: {
      type: Object,
    },
  },
  created() {
    // console.log("dataThongTin: ", this.dataThongTin)
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
