<template>
  <div id="cmsForm">
    <div class="prt-pop-kn">
      <h2>Tạo sự kiện mới</h2>
      <!-- Thông tin -->
      <div class="info-base-pop">
        <div class="elm-line-pop">
          <b-col cols="12">
            <b class="title-elm-kn">Tên chương trình</b>
            <input type="text">
          </b-col>
        </div>
        <div class="elm-line-pop">
          <b-col cols="6">
            <b class="title-elm-kn">Ngày bắt đầu</b>
            <input type="text">
          </b-col>
          <b-col cols="6">
            <b class="title-elm-kn">Thời gian</b>
            <input type="text">
          </b-col>
        </div>
        <div class="elm-line-pop">
          <b-col cols="6">
            <b class="title-elm-kn">Địa điểm</b>
            <input type="text">
          </b-col>
          <b-col cols="6">
            <b class="title-elm-kn">Thành phần tham dự</b>
            <select
              id=""
              name=""
            >
              <option value="">
                Huỳnh Minh Hoàn
              </option>
            </select>
          </b-col>
        </div>
      </div>

      <!-- Content -->
      <div class="info-base-pop">
        <b class="title-elm-kn">Nội dung</b>
        <div class="area-text">
          <b-form-textarea
            id="textarea"
            placeholder="Nội dung..."
            rows="5"
            max-rows="8"
          />
        </div>
      </div>

      <!-- Thêm ảnh -->
      <div class="info-base-pop">
        <b class="title-elm-kn">Tải ảnh lên</b>
        <input
          type="file"
          accept="image/*"
        >
      </div>

      <!-- Button -->
      <div class="info-base-pop">
        <div class="ket-noi-btn-pop">
          <button @click="btnHuy()">
            Lưu
          </button>
          <button @click="btnHuy()">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    btnHuy() {
      this.$emit('tab-choose', 1)
    },
  },
}
</script>
<style lang="scss">
#cmsForm {
  .prt-pop-kn {
    width: 100%;
    float: left;
    margin-top: 35px;
    .title-pop-ketnoi {
      width: 100%;
      float: left;
      padding-bottom: 15px;
      border-bottom: 1px solid #e7e5ec;
      margin-bottom: 5px;
      input {
        width: calc(100% - 23px);
        float: left;
        border: unset !important;
        outline: unset !important;
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
    .info-base-pop {
      width: 100%;
    }
    .elm-line-pop {
      width: 100%;
    }
    .elm-line-pop .col-12 {
      padding-left: 0 !important;
    }
    .elm-line-pop .col-6:first-child {
      padding-left: 0 !important;
    }
    .elm-line-pop .col-6:last-child {
      padding-right: 0 !important;
    }
    .title-elm-kn {
      width: 100%;
      float: left;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #40566f;
      margin-bottom: 10px;
      margin-top: 15px;
    }
    .elm-line-pop .col-12 input,
    .elm-line-pop .col-6 input,
    .elm-line-pop .col-6 select {
      width: 100%;
      float: left;
      background: #ffffff;
      border: 1px solid rgba(71, 95, 123, 0.2);
      box-sizing: border-box;
      border-radius: 6px;
      height: 48px;
      font-size: 16px;
      line-height: 20px;
      color: #727e8c;
      padding: 0 10px;
      outline: unset;
    }
    .modal-footer {
      display: none;
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
      width: 100px;
      height: 40px;
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
      width: 100px;
      height: 40px;
      outline: unset;
      color: white;
      font-weight: 500;
      font-size: 16px;
      margin-left: 20px;
      float: right;
    }
    .area-text {
      width: 100%;
      float: left;
      textarea {
        font-size: 16px;
        line-height: 20px;
        color: #727e8c;
      }
    }
  }
}
</style>
