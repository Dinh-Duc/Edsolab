<template>
  <div class="p-2">
    <BaoCaoChart
      :data="dataChart"
      :col="4"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import BaoCaoChart from '../components/BaoCaoChart'

export default {
  components: {
    BaoCaoChart,
  },
  data() {
    return {
      dataChart: [
        {
          title: 'Đất đai',
          element: 'DatDaiDP',
          url: '',
          subtitle: 'Hiện trạng sử dụng đất',
          descriptions: [
            {
              key: 'Diện tích đất',
              value: '7.392',
              unit: 'ha',
            },
            {
              key: 'Đất nông nghiệp',
              value: '29.982,7',
              unit: 'ha',
            },
            {
              key: 'Đất phi nông nghiệp',
              value: '15.244',
              unit: 'ha',
            },
            {
              key: 'Số dự án điều chỉnh vốn',
              value: '16',
              unit: '',
            },
          ],
          bodyData: {
            chartType: 'BaseDonutChart',
            chart: {
              height: 250,
            },
            colors: ['#473869', '#8C6ED0', '#B3B3B3'],
            series: [57.83, 28.04, 14.13],
            categories: ['Phi nông nghiệp', 'Nông nghiệp', 'Chưa sử dụng'],
          },
        },
        {
          title: 'Dân số',
          element: 'DansoDP',
          url: '',
          subtitle: 'Tháp tuổi dân số',
          descriptions: [
            {
              key: 'Dân số',
              value: '1.062.000',
              unit: 'Người',
            },
            {
              key: 'Mật độ dân số',
              value: '4.030',
              unit: 'người/km2',
            },
          ],
          bodyData: {
            chartType: 'BaseBarWithNegative',
            chart: {
              height: 250,
            },
            colors: ['#4472C4', '#FFCCFF'],
            series: [
              {
                name: 'Males',
                data: [1, 1.1, 1.8, 3.3, 4.1, 4.3, 4.1, 3.8, 3.0],
              },
              {
                name: 'Females',
                data: [-1, -1.1, -1.8, -3.3, -4.1, -4.3, -4.1, -3.8, -3.0],
              },
            ],
            categories: [
              '80+',
              '70-79',
              '60-69',
              '50-59',
              '40-49',
              '30-39',
              '20-29',
              '10-19',
              '0-9',
            ],
          },
        },
        {
          title: 'Giáo dục',
          element: 'GiaoDucDP',
          url: '',
          subtitle: 'Số trường theo các cấp học',
          descriptions: [
            {
              key: 'Số học sinh',
              value: '25.237',
              unit: '',
            },
            {
              key: 'Số học sinh trên 1 giáo viên',
              value: '31',
              unit: '',
            },
          ],
          bodyData: {
            chartType: 'BaseStakedColumnsChart',
            chart: {
              height: 250,
            },
            colors: ['#4472C4', '#FFCCFF'],
            series: [
              {
                name: 'Đạt chuẩn QG',
                data: [21, 35, 30, 17],
              },
              {
                name: 'Chưa đạt chuẩn',
                data: [34, 26, 14, 8],
              },
            ],
            categories: ['Mầm non', 'Tiểu học', 'THCS', 'THPT'],
          },
        },
        {
          title: 'Y tế',
          element: 'YTeDP',
          url: '',
          subtitle: 'Tỷ lệ dân số tham gia BHYT',
          descriptions: [
            {
              key: 'Số cở sở y tế',
              value: '1.248',
              unit: '',
            },
            {
              key: 'Số giường bệnh viện vạn dân',
              value: '30',
              unit: '',
            },
            {
              key: 'Số bác sỹ trên vạn dân',
              value: '11',
              unit: '',
            },
          ],
          bodyData: {
            chartType: 'BaseColumnBarChart',
            colors: ['#473869'],
            series: [
              {
                data: [65.0, 78.0, 79.0, 85.0, 87.0],
              },
            ],
            categories: [2016, 2017, 2018, 2019, 2020],
          },
        },
        {
          title: 'Doanh nghiệp',
          element: 'DoanhNghiepDP',
          url: '',
          subtitle: 'Số DN đang hoạt động',
          descriptions: [
            {
              key: 'Số lao động trong các doanh nghiệp',
              value: '416.827',
              unit: '',
            },
            {
              key: 'Lợi nhuận trước thuế của DN',
              value: '35.098',
              unit: 'tỷ VND',
            },
            {
              key: 'Thu nhập của người lao động trong DN',
              value: '6.71',
              unit: 'triệu VND',
            },
          ],
          bodyData: {
            chartType: 'BaseColumnBarChart',
            chart: {
              height: 250,
            },
            colors: ['#473869'],
            series: [
              {
                data: [5.612, 5.746, 8.233, 8.857, 10.682],
              },
            ],
            categories: [2016, 2017, 2018, 2019, 2020],
          },
        },
        {
          title: 'Nông nghiệp',
          element: 'NongNghiepDP',
          url: '',
          subtitle: 'Số DN đang hoạt động',
          descriptions: [
            {
              key: 'Số trang trại',
              value: '3',
              unit: '',
            },
            {
              key: 'Sản lượng lương thực',
              value: '0,95',
              unit: 'kg/người',
            },
            {
              key: 'Diện tích trồng cây lương thực',
              value: '196.5 ',
              unit: 'ha',
            },
          ],
          bodyData: {
            chartType: 'BaseColumnBarChart',
            chart: {
              height: 250,
            },
            colors: ['#8D6FD1'],
            series: [
              {
                data: [9.522, 9.01, 8.9, 8.601, 7.392],
              },
            ],
            categories: [2016, 2017, 2018, 2019, 2020],
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
