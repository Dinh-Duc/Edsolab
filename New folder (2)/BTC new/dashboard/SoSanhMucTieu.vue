<template>
  <b-card
    class="box-thuchienmuctieu"
    no-body
  >
    <b-card-header>
      <b-card-title>Cơ cấu chi cân đối ngân sách nhà nước</b-card-title>
    </b-card-header>
    <b-card-body>
     <div id="chart">
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      series: [38.8, 61.2],
          chartOptions: {
            chart: {
              type: 'AAAAAAA',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 100
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
          labels: ["Chi đầu tư phát triển", "Chi thường xuyên" ]
          },
    }
  },
}
</script>

<style></style>
