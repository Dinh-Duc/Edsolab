<template>
  <div class="p-2">
    <BaoCaoChart
      :data="dataChart"
      :col="6"
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
          title: 'Đầu tư công',
          element: 'DauTuCongS',
          href:
            'https://app.powerbi.com/view?r=eyJrIjoiZTU5YTdiNWMtMzU5NC00ZTcwLThiZjUtYWUyODE2N2VhNTE2IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
          subtitle: 'Tỷ lệ giải ngân vốn đầu tư công',
          descriptions: [
            {
              key: 'Vốn đầu tư công thực hiện',
              value: '24.700',
              unit: 'Tỷ VND',
            },
            {
              key: 'Tỷ lệ giải ngân vốn NS địa phương',
              value: '96',
              unit: '%',
            },
            {
              key: 'Tỷ lệ giải ngân vốn NSTW ',
              value: '98.9',
              unit: '%',
            },
          ],
          type: 'stacked',
          bodyData: {
            chartType: 'AmChart',
            colors: ['#70A48C'],
            xAxis: ['year'],
            yAxis: ['Tỷ lệ giải ngân'],
            data: [
              {
                year: '2016',
                'Tỷ lệ giải ngân': 95.7,
              },
              {
                year: '2017',
                'Tỷ lệ giải ngân': 96.2,
              },
              {
                year: '2018',
                'Tỷ lệ giải ngân': 93.2,
              },
              {
                year: '2019',
                'Tỷ lệ giải ngân': 90.1,
              },
              {
                year: '2020',
                'Tỷ lệ giải ngân': 98.8,
              },
            ],
          },
        },
        {
          title: 'Doanh nghiệp',
          element: 'DoanhNghiep',
          url:
            'https://app.powerbi.com/view?r=eyJrIjoiNjE1NDJiNzAtODg1Mi00NjA4LWI0ODQtZGUwZWM5YjU3M2EyIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
          subtitle: 'Số doanh nghiệp đang hoạt động',
          descriptions: [
            {
              key: 'Số doanh nghiệp thành lập mới',
              value: '3.850',
              unit: '',
            },
            {
              key: 'Số vốn đăng ký',
              value: '39.780',
              unit: 'Tỷ VND',
            },
            {
              key: 'Tổng số lao động',
              value: '903.737',
              unit: '',
            },
          ],
          type: 'stacked',
          bodyData: {
            chartType: 'AmChart',
            colors: ['#473869'],
            fill: '#fff',
            xAxis: ['year'],
            yAxis: ['Số DN đang hoạt động'],
            data: [
              {
                year: '2016',
                'Số DN đang hoạt động': 26773,
              },
              {
                year: '2017',
                'Số DN đang hoạt động': 29898,
              },
              {
                year: '2018',
                'Số DN đang hoạt động': 33654,
              },
              {
                year: '2019',
                'Số DN đang hoạt động': 34785,
              },
              {
                year: '2020',
                'Số DN đang hoạt động': 37500,
              },
            ],
          },
        },
        {
          title: 'Đầu tư nước ngoài',
          element: 'DauTuNuocNgoaiS',
          url:
            'https://app.powerbi.com/view?r=eyJrIjoiMGI2MDY3ZjAtZmI3OS00Mzc4LTk2YzQtZjhkMjQ4ZjFiNDliIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
          subtitle: 'Vốn đăng ký (triệu USD)',
          descriptions: [
            {
              key: 'Tổng vốn đăng ký',
              value: '1.341,7',
              unit: 'Triệu USD',
            },
            {
              key: 'Tổng vốn thực hiện',
              value: '1.247,8',
              unit: 'Triệu USD',
            },
            {
              key: 'Số dự án cấp mới',
              value: '78',
              unit: '',
            },
            {
              key: 'Số dự án điều chỉnh vốn',
              value: '126',
              unit: '',
            },
          ],
          type: 'stacked',
          bodyData: {
            chartType: 'AmChart',
            colors: ['#43AA8B', '#F8961E'],
            xAxis: ['year'],
            yAxis: ['Vốn đăng ký cấp mới', 'Vốn đăng ký tăng thêm'],
            data: [
              {
                year: '2016',
                'Vốn đăng ký cấp mới': 489.8,
                'Vốn đăng ký tăng thêm': 1135.7,
              },
              {
                year: '2017',
                'Vốn đăng ký cấp mới': 513.3,
                'Vốn đăng ký tăng thêm': 1254.6,
              },
              {
                year: '2018',
                'Vốn đăng ký cấp mới': 574.6,
                'Vốn đăng ký tăng thêm': 1340.8,
              },
              {
                year: '2019',
                'Vốn đăng ký cấp mới': 621.5,
                'Vốn đăng ký tăng thêm': 1680.4,
              },
              {
                year: '2020',
                'Vốn đăng ký cấp mới': 394.8,
                'Vốn đăng ký tăng thêm': 946.9,
              },
            ],
          },
        },
        {
          title: 'Đầu tư trong nước',
          element: 'DauTuTrongNuocS',
          url:
            'https://app.powerbi.com/view?r=eyJrIjoiMGI2MDY3ZjAtZmI3OS00Mzc4LTk2YzQtZjhkMjQ4ZjFiNDliIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
          subtitle: 'Vốn đăng ký (tỷ VNĐ)',
          descriptions: [
            {
              key: 'Tổng vốn đăng ký',
              value: '32.239,4',
              unit: 'Tỷ VND',
            },
            {
              key: 'Tổng vốn thực hiện',
              value: '29.982,7',
              unit: 'Tỷ VND',
            },
            {
              key: 'Số dự án cấp mới',
              value: '112',
              unit: '',
            },
            {
              key: 'Số dự án điều chỉnh vốn',
              value: '16',
              unit: '',
            },
          ],
          type: 'stacked',
          bodyData: {
            chartType: 'AmChart',
            colors: ['#43AA8B', '#F8961E'],
            xAxis: ['year'],
            yAxis: ['Vốn đăng ký cấp mới', 'Vốn đăng ký tăng thêm'],
            data: [
              {
                year: '2016',
                'Vốn đăng ký cấp mới': 23578.2,
                'Vốn đăng ký tăng thêm': 5894.3,
              },
              {
                year: '2017',
                'Vốn đăng ký cấp mới': 25247.8,
                'Vốn đăng ký tăng thêm': 6057.5,
              },
              {
                year: '2018',
                'Vốn đăng ký cấp mới': 24631.2,
                'Vốn đăng ký tăng thêm': 6212.8,
              },
              {
                year: '2019',
                'Vốn đăng ký cấp mới': 25879.9,
                'Vốn đăng ký tăng thêm': 5348.1,
              },
              {
                year: '2020',
                'Vốn đăng ký cấp mới': 26771.7,
                'Vốn đăng ký tăng thêm': 5467.8,
              },
            ],
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
