<template>
  <div class="row m-0">
    <div class="col-md-6">
      <b-form-group label="Ngày nhắc lịch">
        <b-form-datepicker v-model="dateN" />
      </b-form-group>
    </div>

    <div class="col-md-6">
      <b-form-group label="Thời gian nhắc lịch">
        <b-form-timepicker
          v-model="timeN"
          locale="en"
        />
      </b-form-group>
    </div>
    <div class="col-md-6">
      <b-form-group label="Tùy chỉnh nhắc lịch">
        <b-form-select
          v-model="selectN"
          :options="options"
        />
      </b-form-group>
    </div>
    <div class="col-md-6 custom-slect-ln">
      <b-form-group label="Lặp lại tùy chỉnh">
        <span class="mr-1 color-text">
          Lặp lại mỗi
        </span>
        <span>
          <b-form-select
            v-model="selectFor"
            class="mr-1"
            :options="optionsFor"
          />
        </span>
        <span>
          <b-form-select
            v-model="selectDate"
            :options="optionsDate"
          />
        </span>
      </b-form-group>
    </div>
    <div class="col-md-3 d-flex align-items-center">
      <b-form-radio
        v-model="selectR"
        value="0"
      >
        Không bao giờ
      </b-form-radio>
    </div>
    <div class="col-md-9 d-flex align-items-center custom-text-radio">
      <b-form-radio
        v-model="selectR"
        value="1"
      >
        Vào ngày
      </b-form-radio>
      <b-form-datepicker v-model="dateN" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateN: '',
      timeN: '',
      selectN: 'hangngay',
      options: [
        { value: 'hangngay', text: 'Hằng ngày' },
        { value: 'hangtuan', text: 'Hằng tuần' },
        { value: 'hangthang', text: 'Hằng tháng' },
      ],
      selectFor: '1',
      optionsFor: [
        { value: '1', text: '1' },
        { value: '7', text: '7' },
        { value: '20', text: '30' },
      ],
      selectDate: 'ngay',
      optionsDate: [
        { value: 'ngay', text: 'Ngày' },
        { value: 'tuan', text: 'Tuần' },
        { value: 'thang', text: 'Tháng' },
      ],
      selectR: 1,
    }
  },
}
</script>

<style lang="scss">
.custom-slect-ln {
  select {
    max-width: 100px;
  }
  .color-text {
    color: #727e8c;
  }
}
.custom-text-radio{
    .custom-radio{
      width: 115px;
      margin-right: 10px;
    }
  }
</style>
