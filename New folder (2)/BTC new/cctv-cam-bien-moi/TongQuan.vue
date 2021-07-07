<template>
  <div id="overview">
    <div class="top-layout">
      <div class="box">
        <div class="box-item">
          <span>Quận/Huyện</span>
          <b-form-select
            v-model="selected"
            :options="options"
          />
        </div>
        <div class="box-item">
          <span>Phường/Xã</span>
          <b-form-select
            v-model="selected"
            :options="options"
          />
        </div>
      </div>
      <div class="box">
        <div class="box-item">
          <span>Camera</span>
          <b-form-select
            v-model="selected"
            :options="options"
          />
        </div>
        <div class="box-item">
          <span>Loại vi phạm</span>
          <b-form-select
            v-model="selected"
            :options="options"
          />
        </div>
      </div>
      <div class="box">
        <div class="box-item">
          <span>Thời Gian</span>
          <b-form-select
            v-model="selected"
            :options="options"
          />
        </div>
        <div class="box-item">
          <span>Ngày</span>
          <b-form-select
            v-model="selected"
            :options="fakeDate"
          />
        </div>
      </div>
    </div>
    <div class="mid-layout">
      <!-- TOP -->
      <div>
        <b-card
          class="box-chart"
          title="Số lượt vi phạm phát hiện - Giao thông"
        >
          <AppEchartLine
            class="chart"
            :option-data="dataChart"
          />
        </b-card>
        <b-card
          class="box-chart"
          title="Số lượt vi phạm phát hiện - TNMT"
        >
          <AppEchartLine
            class="chart"
            :option-data="dataChart"
          />
        </b-card>
      </div>
      <!-- BOTTOM -->
      <div>
        <b-card
          class="box-chart"
          title="Số lượt vi phạm phát hiện - Y tế"
        >
          <AppEchartLine
            class="chart"
            :option-data="dataChart"
          />
        </b-card>
        <b-card
          class="box-chart"
          title="Số lượt vi phạm phát hiện - An ninh"
        >
          <AppEchartLine
            class="chart"
            :option-data="dataChart"
          />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import vSelect from 'vue-select'
import { BCard } from 'bootstrap-vue'
import AppEchartLine from '@core/components/charts/echart/AppEchartLine.vue'

export default {
  components: {
    // vSelect,
    BCard,
    AppEchartLine,
    // BBadge,
  },
  data() {
    return {
      selected: null,
      fakeDate: [{ value: null, text: '02/05/2021 - 03/05/2021' }],
      options: [
        { value: null, text: 'Tất Cả' },
        { value: 'disabled', text: 'Chưa có dữ liệu', disabled: true },
      ],
      dataChart: {
        xAxisData: ['9/5', '10/5', '11/5', '12/5', '13/5', '14/5', '15/5'],
        series: ['0', '300', '50', '250', '320', '50', '400'],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
#overview {
  .top-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
    .box {
      flex-grow: 1;

      .box-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1em;

        .custom-select {
          opacity: 0.6;
        }

        span {
          font-weight: 600;
          font-size: 1.2em;
        }

        select {
          width: 60%;
          margin-left: 1em;
        }
      }
    }
  }

  .mid-layout {
    margin-top: 2em;

    > div {
      gap: 1em;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .box-chart {
      width: 48%;

      .card-title {
        font-weight: 600;
        font-size: 20px;
      }

      .chart {
        height: 270px;
      }
    }
  }
}
</style>
