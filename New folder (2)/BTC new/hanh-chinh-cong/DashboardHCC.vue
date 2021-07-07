<template>
  <div class="dashboard-hcc d-flex flex-column">
    <div>
      <b class="title-hcc">Lĩnh vực</b>

      <!-- Table -->
      <div class="elm-data-dashboard">
        <div class="table-data">
          <boxTable :data="boxTable" />
        </div>
      </div>
    </div>

    <!-- Chart 1 -->
    <div class="row d-flex flex-row">
      <!-- Theo lĩnh vực -->
      <div class="col-xl-6 pt-2">
        <div class="data-chart-elm">
          <b class="title-box-chart">Đánh giá mức độ hài lòng theo lĩnh vực</b>
          <div class="chart-content">
            <ApexCharts
              type="bar"
              height="420"
              :options="linhvuc_chartOptions"
              :series="linhvuc_series"
            />
          </div>
        </div>
      </div>

      <!-- Theo địa phương -->
      <div class="col-xl-6 pt-2">
        <div class="data-chart-elm">
          <b
            class="title-box-chart"
          >Đánh giá mức độ hài lòng theo địa phương</b>
          <div class="chart-content">
            <ApexCharts
              type="bar"
              height="420"
              :options="diaPhuong_chartOptions"
              :series="diaPhuong_series"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Chart 2 -->
    <div class="row d-flex flex-row">
      <div class="col-xl-6 pt-2">
        <!-- Progress -->
        <div class="data-chart-elm">
          <div class="elm-chart-2">
            <b class="title-box-chart">Số hồ sơ tiếp nhận (17.234)</b>
            <div class="progress-data">
              <div class="prt-progress">
                <b-progress
                  show-progress
                  :max="100"
                >
                  <b-progress-bar
                    style="background: #796EEF"
                    :value="120"
                  />
                  <b-progress-bar
                    style="background: #FF9F43"
                    :value="56"
                  />
                  <b-progress-bar
                    style="background: #00CFE8"
                    :value="17"
                  />
                  <b-progress-bar
                    style="background: #51CD89"
                    :value="17"
                  />
                </b-progress>
              </div>
              <div class="note-progress">
                <div class="note-elm-3">
                  <div
                    class="elm-square"
                    style="background: #796EEF"
                  />
                  <span>Chờ vào sổ</span>
                </div>
                <div class="note-elm-3">
                  <div
                    class="elm-square"
                    style="background: #FF9F43"
                  />
                  <span>Chờ phân xử lý</span>
                </div>
                <div class="note-elm-3">
                  <div
                    class="elm-square"
                    style="background: #00CFE8"
                  />
                  <span>Chờ xử lý</span>
                </div>
                <div class="note-elm-3">
                  <div
                    class="elm-square"
                    style="background: #51CD89"
                  />
                  <span>Đang xử lý</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart line -->
        <div class="data-chart-elm elm-margin-custom">
          <div class="elm-chart-2">
            <b class="title-box-chart">Tình trạng xử lý qua các năm</b>
            <div class="chart-content">
              <ApexCharts
                type="line"
                height="233"
                :options="line_chartOptions"
                :series="line_series"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6 pt-2">
        <div class="data-chart-elm">
          <b
            class="title-box-chart"
          >Tổng số hồ sơ quá hạn phân theo đơn vị xử lý (2021)</b>
          <div class="chart-content">
            <ApexCharts
              type="bar"
              height="420"
              :options="tongHS_chartOptions"
              :series="tongHS_series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'
import boxTable from './boxTable.vue'

export default {
  components: {
    ApexCharts,
    boxTable,
  },
  data() {
    return {
      boxTable: {
        fields: [
          {
            key: 'linhVuc',
            label: 'LĨNH VỰC',
            sortable: true,
          },
          {
            key: 'soHoSo',
            label: 'SỐ HỒ SƠ',
            sortable: false,
          },
          {
            key: 'chuHoSo',
            label: 'QUÁ HẠN XỬ LÝ',
            sortable: true,
          },
          {
            key: 'hoanThanh',
            label: 'HOÀN THÀNH',
            sortable: true,
          },
          {
            key: 'hoanThanhDungHan',
            label: 'HOÀN THÀNH ĐÚNG HẠN',
            sortable: true,
          },
        ],
        items: [
          {
            linhVuc: 'Văn hóa thể thao và du lịch',
            soHoSo: '944',
            chuHoSo: '57.14%',
            hoanThanh: '0.50%',
            hoanThanhDungHan: '42.35%',
          },
          {
            linhVuc: 'Công thương',
            soHoSo: '944',
            chuHoSo: '57.14%',
            hoanThanh: '0.50%',
            hoanThanhDungHan: '42.35%',
          },
          {
            linhVuc: 'Giao thông và Vận tải',
            soHoSo: '944',
            chuHoSo: '57.14%',
            hoanThanh: '0.50%',
            hoanThanhDungHan: '42.35%',
          },
          {
            linhVuc: 'Kế hoạch và Đầu tư',
            soHoSo: '944',
            chuHoSo: '57.14%',
            hoanThanh: '0.50%',
            hoanThanhDungHan: '42.35%',
          },
          {
            linhVuc: 'Khoa học và Công nghệ',
            soHoSo: '944',
            chuHoSo: '57.14%',
            hoanThanh: '0.50%',
            hoanThanhDungHan: '42.35%',
          },
        ],
      },

      /* Chart lĩnh vực */
      linhvuc_chartOptions: {
        chart: {
          type: 'bar',
          height: 385,
          stacked: true,
          toolbar: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [
            'Đất đai',
            'Kết quả tại nhà',
            'PC06 - CMND',
            'Tư pháp',
            'Việc làm - Ban',
            'Xúc tiến thương mại',
            'Hộ tịch',
            'PC67 - Cảnh sát giao thông',
          ],
          labels: {
            // formatter(val) {
            //   return `${val} nghìn`
            // },
            style: {
              colors: ['#40566F'],
              fontSize: '14px',
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter(val) {
              return `${val} nghìn`
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#28C76F', '#FAAF40'],
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          strokeDashArray: 5,
        },
      },
      linhvuc_series: [
        {
          name: 'Hài lòng',
          data: [4000, 5000, 1000, 3000, 2000, 7000, 6000, 9000],
        },
        {
          name: 'Chưa hài lòng',
          data: [3000, 2000, 3000, 5000, 1000, 4000, 9000, 1000],
        },
      ],

      /* Chart địa phương */
      diaPhuong_chartOptions: {
        chart: {
          type: 'bar',
          height: 385,
          stacked: true,
          toolbar: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [
            'Thành phố Long Khánh',
            'Thành phố Biên Hòa',
            'Huyện Thống Nhất',
            'Huyện Trảng Bom',
            'Huyện Long Thành',
            'Huyện Tân Phú',
            'Huyện Định Quán',
            'Huyện Cẩm Mỹ',
          ],
          labels: {
            // formatter(val) {
            //   return `${val} nghìn`
            // },
            style: {
              colors: ['#40566F'],
              fontSize: '14px',
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter(val) {
              return `${val} nghìn`
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#28C76F', '#FAAF40'],
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          strokeDashArray: 5,
        },
      },
      diaPhuong_series: [
        {
          name: 'Hài lòng',
          data: [9000, 7000, 6000, 1000, 7000, 4000, 2000, 3000],
        },
        {
          name: 'Chưa hài lòng',
          data: [5000, 4000, 3000, 5000, 1000, 4000, 1000, 1000],
        },
      ],

      /* Chart Tổng số hồ sơ */
      tongHS_chartOptions: {
        chart: {
          type: 'bar',
          height: 385,
          stacked: true,
          toolbar: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [
            'UBND huyện Thống Nhất',
            'UBND huyện Xuân Lộc',
            'UBND huyện Trảng Bom',
            'UBND huyện Vĩnh Cửu',
            'UBND TP Biên Hòa',
            'UBND TX Long Khánh',
            'UBND huyện Cẩm Mỹ',
            'UBND huyện Tân Phú',
            'UBND huyện Long Thành',
            'UBND huyện Định Quán',
          ],
          labels: {
            formatter(val) {
              return `${val}`
            },
            style: {
              colors: ['#40566F'],
              fontSize: '14px',
              fontWeight: 400,
            },
          },
        },
        tooltip: {
          y: {
            formatter(val) {
              return `${val}`
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#C45FDD'],
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          strokeDashArray: 5,
        },
      },
      tongHS_series: [
        {
          data: [4, 5, 1, 3, 2, 7, 6, 9],
        },
      ],

      /* Chart line */
      /* line_chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          animations: {
            enabled: true,
          },
          stacked: true,
          toolbar: false,
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          strokeDashArray: 5,
          top: 70,
          bottom: 50,
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ['2020', '2021'],
          tickPlacement: 'between',
        },
        yaxis: {
          min: 0,
          max: 100,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
      line_series: [
        {
          name: '2020',
          data: [28, 59],
        },
        {
          name: '2021',
          data: [12, 31],
        },
      ], */
      line_chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
          },
          stacked: true,
          toolbar: false,
        },
        stroke: {
          width: [5, 5, 5],
          curve: 'straight',
        },
        labels: [2020, 2021],
        xaxis: {
          tickPlacement: 'between',
        },
        yaxis: {
          show: true,
          seriesName: ['0', '50%', '100%'],
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          strokeDashArray: 5,
          top: 70,
          bottom: 50,
        },
      },
      line_series: [
        {
          name: 'Line 1',
          data: [68, 43],
        },
        {
          name: 'Line 2',
          data: [23, 46],
        },
      ],
    }
  },
}
</script>
<style lang="scss">
.hanh-chinh-cong {
  .title-box-chart {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    width: 100%;
    float: left;
    color: #40566f;
    margin-top: 15px;
  }
  .elm-data-dashboard {
    width: 100%;
    float: left;
    margin-top: 20px;
    .col-6:first-child {
      padding-left: 0;
    }
    .col-6:last-child {
      padding-right: 0;
    }
  }
  .title-hcc {
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #2b486a;
  }
  .table-data .card-body {
    padding: unset !important;
    .table-responsive {
      margin: 0;
    }
  }
  .table-data .card {
    margin: 0 !important;
  }
  .chart-content {
    width: 100%;
    float: left;
  }
  .data-chart-elm {
    width: 100%;
    float: left;
    background: #ffffff;
    border: 1px solid rgba(71, 95, 123, 0.2);
    border-radius: 6px;
  }
  .progress-data {
    width: 100%;
    float: left;
    padding: 25px;
  }
  .progress {
    border-radius: 3px !important;
    width: 100%;
    height: 35px;
  }
  .progress .progress-bar {
    cursor: pointer;
  }
  .progress .progress-bar:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .progress-bar span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
  }
  .note-progress {
    width: 100%;
    float: left;
    padding-top: 20px;
    .note-elm-3 {
      width: 25%;
      float: left;
      .elm-square {
        height: 18px;
        width: 18px;
        float: left;
        vertical-align: middle;
        margin-top: 2px;
        border-radius: 2px;
      }
      span {
        vertical-align: middle;
        width: calc(100% - 18px);
        float: left;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 15px;
        color: #000000;
        padding-left: 7px;
        padding-top: 5px;
      }
    }
  }
  .elm-margin-custom {
    margin-top: 20px;
  }
  .table-data tbody tr td:nth-child(n + 3) {
    color: #ea5455;
  }
  .table-data tbody tr td:nth-child(n + 4) {
    color: #28c76f;
  }
  .dashboard-hcc{
    .progress-data{
      .note-progress *{
        color: var(--dark-color);
      }
    }
  }
}
</style>
