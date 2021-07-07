<template>
  <div class="box-product-meetings">
    <div class="box-contents-product-meetings">
      <div class="row-meetings">
        <div class="meetings-head">
          Phiên 1: Mở đầu
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Người phát biểu:
          </div>
          <div class="box-right">
            Cao Tiến Dũng
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Nội dung:
          </div>
          <div class="box-right">
            Giới thiệu các cán bộ tham dự
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Tài liệu:
          </div>
          <div class="box-right box-link-doc">
            danh-sach-can-bo-tham-du(.doc)
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Câu hỏi:
          </div>
          <div class="box-right">
            Định hướng 5 năm tới là gì <br> Kế hoạch làm việc cử chi hàng năm <br> Kế hoạch tham các công việc theo ngành
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script >

export default ({
  name: 'ChuongTrinhHop',
})

</script>
<style scoped lang="scss">
.box-product-meetings{
    display: flex;
    align-content: center;
    justify-content: start;
    padding: 1rem;
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

    .box-contents-product-meetings{
        width: 100%;
        .row-meetings{
            width: 100%;
            border-bottom: 1px solid rgba(71, 95, 123, 0.2);

            .meetings-head{
                font-weight: 600;
                padding-top: 1rem;
                padding-bottom: 0.16rem;
                font-size: 1.2rem;
            }

            .row-meetings-content{
                display: flex;
                padding-top: 0.56rem;
                padding-bottom: 0.56rem;

                .box-left{
                    width: 10rem;
                }

                .box-link-doc{
                    cursor: pointer;
                    color: #5A8DEE;
                }
            }
        }
    }

}
</style>
