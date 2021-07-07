<template>
  <div id="TaiNguyenMoitruong">
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
      <b-button
        variant="primary"
        style="width: 100%; margin-top: 1em;"
        size="lg"
      >Thống kê dữ liệu</b-button>

      <b-card
        class="card-chart"
        title="Thống kê tài nguyên môi trường"
      >
        <HighChart :option="bodyChart" />
      </b-card>
      <b-card
        class="card-chart"
        title="Dữ liệu thống kê tài nguyên môi trường trên địa bàn"
      >
        <b-table
          :items="itemsTable"
          :fields="fieldsTable"
          :bordered="false"
          :small="false"
          hover
          style="border: thin solid #f3f2f7;"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import HighChart from '../../components/core/charts/HighChart.vue'

export default {
  components: {
    BTable,
    HighChart,
  },
  data() {
    return {
      selected: null,
      fakeDate: [{ value: null, text: '02/05/2021 - 03/05/2021' }],
      options: [
        { value: null, text: 'Tất Cả' },
        { value: 'disabled', text: 'Chưa có dữ liệu', disabled: true },
      ],
      itemsTable: [
        {
          column1: 'Trảng Bom',
          column2: 'Trảng Bom',
          column3: 'Đậu xe sai quy định',
          column4: 15,
        },
        {
          column1: 'Thống Nhất',
          column2: 'Thống Nhất',
          column3: 'Phát hiện đám đông',
          column4: 9,
        },
        {
          column1: 'TP.Biên Hòa',
          column2: 'TP.Biên Hòa',
          column3: 'Phát hiện xâm nhập',
          column4: 8,
        },
      ],
      fieldsTable: [
        {
          key: 'column1',
          label: 'QUẬN/HUYỆN',
        },
        {
          key: 'column2',
          label: 'PHƯỜNG/XÃ',
        },
        {
          key: 'column3',
          label: 'LOẠI VI PHẠM',
        },
        {
          key: 'column4',
          label: 'SỐ LƯỢNG',
        },
      ],
      bodyChart: {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        colors: [
          '#49c185',
          '#19baba',
          '#ca71ce',
          '#1981be',
          '#f3543b',
          '#95a619',
          '#c63842',
        ],
        xAxis: {
          categories: [
            '02/05/2021',
            '03/05/2021',
            '04/05/2021',
            '05/05/2021',
            '06/05/2021',
            '07/05/2021',
            '08/05/2021',
            '09/05/2021',
          ],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
            + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            Width: 100,
          },
        },
        series: [
          {
            name: 'Đậu đỗ sai quy định',
            data: [0, 0, 8, 9, 14, 16, 17, 4],
          },
          {
            name: 'Phát hiện đám đông',
            data: [0, 0, 3, 3, 4, 0, 0, 0],
          },
          {
            name: 'Phát hiện xâm nhập',
            data: [0, 0, 0, 5, 0, 8, 0, 0],
          },
          {
            name: 'Quá tải',
            data: [0, 0, 9, 0, 0, 0, 0, 0],
          },
          {
            name: 'Rời bỏ vị trí',
            data: [0, 0, 52, 10, 39, 64, 0, 0],
          },
          {
            name: 'Sử dụng điện thoại',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: 'Xem trực tiếp',
            data: [0, 0, 0, 0, 0, 0],
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
#TaiNguyenMoitruong {
  .top-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box {
      width: 31%;

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
    .card-chart {
      margin: 2em 0;
      border: none;

      .card-title {
        font-weight: bold;
      }
    }
  }
}
</style>
