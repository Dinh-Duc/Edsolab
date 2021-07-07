<template>
  <b-card
    class="box-vonchusohuu"
    no-body
  >
    <b-card-header>
      <b-card-title>Các khoản chi ngân sách trong năm</b-card-title>
    </b-card-header>
    <b-card-body>
      <div id="chart">
        <div class="don_vi_tinh">
          Đơn vị tính: Tỷ đồng
        </div>
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
export default {
  data() {
    return {
      series: [
        {
          name: 'tỷ đồng',
          data: [25860, 13730, 5912, 2933, 2334, 2230, 1594, 679, 551, 458, 311, 273, 174, 2],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 35,
          style: {
            fontSize: '12px',
            colors: ['black'],
          },
          dropShadow: {
            enabled: false,
            left: 0,
            top: 0,
            opacity: 0.4,
          },
          formatter(val) {
            return `${(val).toLocaleString({ currency: 'VND' })}`
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(val) {
              if (!Number(val) > -1) return ''
              return `${val.toLocaleString({ currency: 'VND' })} tỷ VNĐ`
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        xaxis: {
          categories: [
            'Chi các hoạt động kinh tế',
            'Chi giáo dục - đào tạo và tay nghề',
            'Chi hoạt động các cơ quan quản lý nhà nước, đảng, đoàn thể',
            'Chi văn hóa thông tin',
            'Chi bảo đảm xã hội',
            'Chi Y tế, dân số và gia đình',
            'Chi Bảo vệ môi trường',
            'Chi quốc phòng',
            'Chi an ninh và trật tự xã hội',
            'Chi khác',
            'Chi phát thanh, truyền hình, thông tấn',
            'Chi thể dục thể thao',
            'Chi khoa học và công nghệ',
            'Chi ngành, lĩnh vực khác',
          ],
          labels: {
            formatter() {
              return null
              // return `${val}Ox`
            },
          },
        },
      },
    }
  },
}
</script>

<style>
.don_vi_tinh{
  
}
</style>
