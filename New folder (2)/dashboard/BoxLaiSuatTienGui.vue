<template>
  <b-card
    class="box-thuchienmuctieu"
    no-body
  >
    <b-card-header>
      <b-card-title>Lãi suất tiền gửi VNĐ (Đơn vị: %)</b-card-title>
    </b-card-header>
    <b-card-body>
      <div id="chart">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
// Lãi suất tiền gửi VNĐ (Đơn vị: %)
export default {
  data() {
    return {
      series: [
        {
          name: 'Cá nhân',
          data: [0.1, 3.1, 3.4, 4.0, 5.6, 0.1],
        },
        {
          name: 'Doanh nghiệp',
          data: [0.2, 3.0, 3.3, 3.7, 4.9, 0.2],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          // stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [
            'Không kỳ hạn',
            '1 tháng',
            '3 tháng',
            '6 tháng',
            '12 tháng',
            'Tiền gửi thanh toán',
          ],
          labels: {
            formatter(val) {
              return val
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
              return `${val}%`
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
    }
  },
}
</script>

<style></style>
