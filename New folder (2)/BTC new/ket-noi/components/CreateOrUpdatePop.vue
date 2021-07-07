<template>
  <div class="prt-pop-kn">
    <!-- Tiêu đề -->
    <div class="title-pop-ketnoi">
      <input
        v-model="oSuKien.Title"
        type="text"
        placeholder="Tên sự kiện"
      >
      <feather-icon
        icon="XIcon"
        size="23"
        @click="
          $bvModal.hide('modal-event-add1')
          $bvModal.hide('modal-event-add2')
        "
      />
    </div>

    <!-- Thông tin thời gian -->
    <div class="info-base-pop">
      <div class="elm-line-pop">
        <b-col cols="6">
          <b class="title-elm-kn">Ngày bắt đầu</b>
          <input
            v-model="oSuKien.Day"
            type="text"
          >
        </b-col>
        <b-col cols="6">
          <b class="title-elm-kn">Thời gian</b>
          <input
            v-model="oSuKien.Hour"
            type="text"
          >
        </b-col>
      </div>
      <div class="elm-line-pop">
        <b-col cols="6">
          <b class="title-elm-kn">Địa điểm</b>
          <input
            v-model="oSuKien.Location"
            type="text"
          >
        </b-col>
        <b-col cols="6">
          <b class="title-elm-kn">Thành phần tham dự</b>
          <select
            id=""
            name=""
          >
            <option value="">
              Bộ giáo dục
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
          v-model="oSuKien.Content"
          placeholder="Nội dung..."
          rows="5"
          max-rows="8"
        />
      </div>
    </div>

    <!-- Button -->
    <div class="info-base-pop">
      <div class="ket-noi-btn-pop">
        <button
          @click="
            $bvModal.hide('modal-event-add1')
            $bvModal.hide('modal-event-add2')
          "
        >
          Lưu
        </button>
        <button
          @click="
            $bvModal.hide('modal-event-add1')
            $bvModal.hide('modal-event-add2')
          "
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    oSuKien() {
      const data = {
        Id: null,
        Title: null,
        Day: '',
        Hour: '',
        Location: '',
        Friends: '',
        Content: '',
        /* Title:
          'Chương trình Camera Y tế: Đến với Bệnh viện Đại học Y dược Shing Mark',
        Day: '09/05/2021',
        Hour: '09:00',
        Location: '1054 QL51, Long Bình Tân, Biên Hòa, ĐN',
        Friends: 'GĐ sở Y tế: Huỳnh Minh Hoàn',
        Content:
          'Với tổng kinh phí đầu tư lên đến hơn 6,4 ngàn tỉ đồng, Bệnh viện Đại học Y dược Shing Mark được đánh giá là một trong số các bệnh viện có quy mô đầu tư lớn nhất ở tỉnh Đồng Nai, và là bệnh viện tư nhân có vốn đầu tư nước ngoài lớn nhất tại Việt Nam', */
      }
      if (this.data) {
        data.Id = null
        /* data.Title = this.data.Title
        data.Day = this.data.Day
        data.Hour = this.data.Hour
        data.Location = this.data.Location
        data.Friends = this.data.Friends
        data.Content = this.data.Content */
        data.Title = ''
        data.Day = ''
        data.Hour = ''
        data.Location = ''
        data.Friends = ''
        data.Content = ''
      }

      return data
    },
  },
}
</script>
<style lang="scss">
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
    float: left;
  }
  .elm-line-pop {
    width: 100%;
    float: left;
  }
  .elm-line-pop .col-6:first-child {
    padding-left: 0 !important;
    float: left !important;
  }
  .elm-line-pop .col-6:last-child {
    padding-right: 0 !important;
    float: left !important;
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
