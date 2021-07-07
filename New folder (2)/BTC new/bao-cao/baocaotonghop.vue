<template>
  <div class="baocaotonghop">
    <div class="left">
      <div class="box">
        <div
          class="box-data"
          style="padding: 45px;"
        >
          >2.273
        </div>
        <p class="box-content">
          Công trình khoa học, trong đó số bài báo quốc tế là 1178 tăng 20% so
          với năm 2018. Số bài đăng trên tạp chí Quốc tế uy tín đạt tiêu chuẩn
          (SCI và SCI-E) là 888 bài tăng 20,8% so với năm 2018, trong đó có
          nhiều công trình có chất lượng cao đạt chuẩn Q1 (theo phân loại của
          Scimago) là 359 bài báo chiếm 40,4%;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          923
        </div>
        <p class="box-content">
          Hợp đồng KHCN với tổng kinh phí là 672,4 tỉ đồng;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          828
        </div>
        <p class="box-content">
          Đề tài, dự án, nhiệm vụ các cấp;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          133
        </div>
        <p class="box-content">
          Loài động vật - thực vật mới được phát hiện;
        </p>
      </div>
    </div>
    <div class="right">
      <div class="box">
        <div class="box-data">
          52
        </div>
        <p class="box-content">
          Bằng độc quyền phát minh sáng chế và Bằng độc quyền giải pháp hữu ích;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          47
        </div>
        <p class="box-content">
          Sách chuyên khảo được NXB khoa học tự nhiên và Công nghệ xuất bản;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          1241
        </div>
        <p class="box-content">
          Học viên, bao gốm 670 nghiên cứu sinh, 571 học viên cao học;
        </p>
      </div>
      <div class="box">
        <div class="box-data">
          155
        </div>
        <p class="box-content">
          Đài trạm trại thuộc 13 viện nghiên cứu chuyên ngành, phân bổ tại 35
          tỉnh, thành phố đặc trưng cho hầu hết các vùng địa lý của Việt Nam:
          đồng bằng, ven biển trung du, miền núi và hải đảo.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
.baocaotonghop {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  padding: 2em 0 0 2em;
  & > div {
    width: 100%;
    max-width: 45%;
  }

  .box {
    position: relative;
    border-radius: 16px;
    padding: 10px 0 5px 30px;
    border: 2px solid #5a8dee;
    margin: 4em 0;
    transition: all 0.2s;
    background: #fff;
    &:hover {
      box-shadow: 0 4px 18px -4px rgb(90 141 238 / 65%);
    }

    .box-data {
      background: #5a8dee;
      position: absolute;
      top: 0;
      left: 0;
      width: 75px;
      min-width: 70px;
      height: 75px;
      border-radius: 50%;
      transform: translate(-50%, -60%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px -4px rgb(90 141 238 / 65%);
      border: 1px solid rgb(255 255 255 / 65%);
      color: #eee;
      font-weight: bold;
      font-size: 24px;
    }
    .box-content {
      font-size: 16px;
      padding: 10px 5px 0 0;
    }
  }
}
</style>
