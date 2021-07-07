<template>
  <div class="p-2">
    <!-- <BaoCaoChart
      :data="dataChart"
      :col="6"
    /> -->
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
/* eslint-disable */
import BaoCaoChart from '../components/BaoCaoChart'

export default {
  components: {
    BaoCaoChart,
  },
  props: {
    dataItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataChart: [
        {
          title: 'Thu - Chi ngân sách',
          element: 'ThuChiNganSach',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
          descriptions: [
            {
              key: 'Tổng thu ngân sách',
              value: '52.844',
              unit: 'Tỷ VNĐ',
            },
            {
              key: 'Tổng chi ngân sách',
              value: '31.138',
              unit: 'Tỷ VND',
            },
            {
              key: 'Ngân sách còn lại',
              value: '30.012',
              unit: 'Tỷ VND',
            },
          ],
          subtitle: 'Thu - Chi ngân sách qua các năm',
          bodyData: {
            chartType: 'HighChart',
            chart: {
              zoomType: 'xy',
              backgroundColor: null,
            },
            title: {
              text: '',
            },
            subtitle: {
              text: '',
            },
            xAxis: [
              {
                categories: ['2016', '2017', '2018', '2019', '2020'],
                crosshair: true,
              },
            ],
            yAxis: [
              {
                labels: {},
                title: {
                  text: '',
                },
              },
              {
                title: {
                  text: '',
                },
                labels: {},
                opposite: true,
              },
            ],
            tooltip: {
              shared: true,
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              x: 20,
              verticalAlign: 'top',
              y: 0,
              floating: true,
              backgroundColor: 'rgba(255,255,255,0.25)',
            },
            series: [
              {
                name: 'Thu ngân sách',
                type: 'column',
                yAxis: 1,
                data: [6236, 6210, 6597, 8773, 9723],
                color: '#0084ff',
                tooltip: {
                  valueSuffix: ' Tỷ VND',
                },
              },
              {
                name: 'Chi ngân sách',
                type: 'spline',
                data: [2230, 3116, 1649, 4258, 6139],
                color: '#00ca00',
                tooltip: {
                  valueSuffix: ' Tỷ VND',
                },
              },
            ],
          },
        },
        {
          title: 'Đầu tư công',
          element: 'DauTuCongCP',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
          descriptions: [
            {
              key: 'Vốn thực hiện',
              value: '24.700',
              unit: 'Tỷ VND',
            },
            {
              key: 'Giải ngân vốn ngân sách địa phương',
              value: '96',
              unit: '%',
            },
            {
              key: 'Giải ngân vốn ngân sách trung ương',
              value: '98,9',
              unit: '%',
            },
          ],
          subtitle: 'Giải ngân vốn đầu tư công',
          bodyData: {
            chartType: 'HighChart',
            chart: {
              zoomType: 'xy',
              backgroundColor: null,
            },
            title: {
              text: '',
            },
            subtitle: {
              text: '',
            },
            xAxis: [
              {
                categories: ['2016', '2017', '2018', '2019', '2020'],
                crosshair: true,
              },
            ],
            yAxis: [
              {
                labels: {},
                title: {
                  text: '',
                },
              },
              {
                title: {
                  text: '',
                },
                labels: {},
                opposite: true,
              },
            ],
            tooltip: {
              shared: true,
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              x: 1000,
              verticalAlign: 'top',
              y: 0,
              floating: true,
              backgroundColor: 'rgba(255,255,255,0.25)',
            },
            series: [
              {
                name: '',
                type: 'column',
                yAxis: 1,
                data: [85, 89, 90, 97, 99],
                color: '#0084ff',
                tooltip: {
                  valueSuffix: ' %',
                },
              },
            ],
          },
        },
        {
          title: 'Xuất khẩu - Nhập khẩu',
          element: 'XuatKhauNhapkhau',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
          descriptions: [
            {
              key: 'Kim ngạch xuất khẩu',
              value: '6.2',
              unit: 'Tỷ USD',
            },
            {
              key: 'Kim ngạch nhập khẩu',
              value: '2.6',
              unit: 'Tỷ USD',
            },
            {
              key: 'Thặng dư thương mại',
              value: '3.6',
              unit: 'Tỷ USD',
            },
          ],
          subtitle: 'Số doanh nghệp thành lập mới',
          type: 'bar',
          bodyData: {
            chartType: 'ApexChart',
            chart: {
              height: 385,
              type: 'bar',
              backgroundColor: null,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            series: [
              {
                data: [1240, 930, 744, 620, 558],
              },
            ],
            xaxis: {
              categories: [
                'Giày dép',
                'Máy móc, phụ tùng',
                'Dệt may',
                'Sản phẩm gỗ',
                'Xơ sợi dệt',
              ],
            },
          },
        },
        {
          title: 'Đăng ký doanh nghiệp',
          element: 'DkiDN',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
          descriptions: [
            {
              key: 'Số doanh nghiệp đang hoạt động',
              value: '37.500',
              unit: '',
            },
            {
              key: 'Số lao động đăng ký',
              value: '903.730',
              unit: '',
            },
            {
              key: 'Số vốn đăng ký',
              value: '39.780 Tỷ VND',
              unit: '',
            },
          ],
          subtitle: 'Số doanh nghệp thành lập mới',
          bodyData: {
            chartType: 'HighChart',
            chart: {
              zoomType: 'xy',
              backgroundColor: null,
            },
            title: {
              text: '',
            },
            subtitle: {
              text: '',
            },
            xAxis: [
              {
                categories: ['2016', '2017', '2018', '2019', '2020'],
                crosshair: true,
              },
            ],
            yAxis: [
              {
                labels: {},
                title: {
                  text: '',
                },
              },
              {
                title: {
                  text: '',
                },
                labels: {},
                opposite: true,
              },
            ],
            tooltip: {
              shared: true,
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              x: 1000,
              verticalAlign: 'top',
              y: 0,
              floating: true,
              backgroundColor: 'rgba(255,255,255,0.25)',
            },
            series: [
              {
                name: '',
                type: 'column',
                yAxis: 1,
                data: [5612, 5746, 8233, 8857, 10682],
                color: '#0084ff',
              },
            ],
          },
        },
        {
          title: 'Đầu tư nước ngoài',
          element: 'DauTuNuocNgoai',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
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
          subtitle: 'Vốn đăng ký (Triệu USD)',
          bodyData: {
            chartType: 'BaseStakedColumnsChart',
            series: [
              {
                name: 'Vốn đăng ký cấp mới',
                data: [489, 513, 574, 621, 394],
              },
              {
                name: 'Vốn đăng ký tăng thêm',
                data: [1135, 1254, 1340, 1680, 946],
              },
            ],
            categories: ['2016', '2017', '2018', '2019', '2020'],
          },
        },
        {
          title: 'Đầu tư trong nước',
          element: 'DauTuNuocNgoai',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiNzZhNDU1MmQtZTE3ZS00NTAwLTkxOWItZWI5NTY2Yzc4NDY1IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection',
          descriptions: [
            {
              key: 'Tổng vốn đăng ký',
              value: '32.239,4',
              unit: 'Tỷ VNĐ',
            },
            {
              key: 'Tổng vốn thực hiện',
              value: '29.982,7',
              unit: 'Tỷ VNĐ',
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
          subtitle: 'Vốn đăng ký (Triệu USD)',
          bodyData: {
            chartType: 'BaseStakedColumnsChart',
            series: [
              {
                name: 'Vốn đăng ký cấp mới',
                data: [23578, 25249, 24631, 25878, 26771],
              },
              {
                name: 'Vốn đăng ký tăng thêm',
                data: [5894, 6057, 6212, 5348, 5868],
              },
            ],
            categories: ['2016', '2017', '2018', '2019', '2020'],
          },
        },
      ],
    }
  },
}
</script>
