<template>
  <div class="prt-pop-reject">
    <!-- Tiêu đề -->
    <div class="title-reject">
      <b>Khai mạc cuộc thi khoa học kỹ thuật quốc gia 2021</b>
      <feather-icon
        icon="XIcon"
        size="23"
      />
    </div>

    <!-- Nội dung -->
    <div class="content-reject">
      <b>Nội dung lời nhắn</b>
      <b-form-textarea
        id="textarea"
        placeholder="Nội dung..."
        rows="5"
        max-rows="8"
      />
    </div>

    <!-- Action -->
    <div class="info-base-pop">
      <div class="ket-noi-btn-pop">
        <button>Lưu</button>
        <button>Hủy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.prt-pop-reject {
  width: 100%;
  float: left;
  margin-top: 35px;
  .title-reject {
    width: 100%;
    float: left;
    padding-bottom: 15px;
    border-bottom: 1px solid #e7e5ec;
    margin-bottom: 5px;
    b {
      width: calc(100% - 23px);
      float: left;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      color: #40566f;
    }
    svg {
      float: left;
      cursor: pointer;
    }
  }
  .content-reject {
    width: 100%;
    float: left;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .content-reject b {
    width: 100%;
    float: left;
    color: #40566f;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .ket-noi-btn-pop {
    width: 300px;
    float: right;
    margin-top: 20px;
  }
  .ket-noi-btn-pop button:last-child {
    background: #ffffff;
    border: 1px solid #5a8dee;
    border-radius: 6px;
    width: 109px;
    height: 48px;
    outline: unset;
    color: #5a8dee;
    font-weight: 500;
    font-size: 16px;
    float: right;
  }
  .ket-noi-btn-pop button:first-child {
    background: #5a8dee;
    border-radius: 6px;
    border: 1px solid #5a8dee;
    width: 109px;
    height: 48px;
    outline: unset;
    color: white;
    font-weight: 500;
    font-size: 16px;
    margin-left: 20px;
    float: right;
  }
  .info-base-pop {
    width: 100%;
    float: left;
  }
}
.custom-ketnoi-pop {
  .modal-header {
    background: white !important;
    display: none;
  }
  .modal-footer {
    display: none;
  }
}
</style>
