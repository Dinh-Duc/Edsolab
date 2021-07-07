<template>
  <b-card
    class="box-thuchienmuctieu"
    no-body
  >
    <b-card-header>
      <b-card-title>Tình hình chi cân đối ngân sách theo từng tháng</b-card-title>
    </b-card-header>
    <b-card-body>
      <div id="chart">
        <div>Đơn vị tính: Tỷ đồng</div>
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        />
        <div class="month">
          <span>Tháng</span>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
// Lãi suất tiền gửi VNĐ (Đơn vị: %)
export default {
  data() {
    return {
      series: [{
        name: 'Chi năm nay',
        data: [1500, 2500, 2600, 3700, 4200, 5000, 5800, 6600, 7700, 7900, 9000, 0],
      }, {
        name: 'Chi cùng kỳ năm trước',
        data: [1170, 2180, 2040, 3350, 3150, 4470, 4780, 5980, 6250, 7800, 7700, 10900],
      }, {
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '80%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },
        yaxis: {
          title: {
            // text: '$ (thousands)'
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            // formatter: function (val) {
            //   return "$ " + val + " thousands"
            // }
          },
        },
      },
    }
  },
}
</script>

<style>
.month{
  text-align: center;
}
</style>
