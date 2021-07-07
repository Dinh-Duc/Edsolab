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
          title: 'Kinh tế',
          element: 'KinhTe',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiOWI4Y2MyOGEtNDJjMy00ZTM1LWEzZTItNWE3OGIyODMyZDE3IiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSectiond56e241388a62ab19db9',
          descriptions: [
            {
              key: 'Tổng sản phẩm trên địa bàn',
              value: '210,5',
              unit: 'nghìn tỷ VND',
            },
            {
              key: 'Chỉ số sản xuất công nghiệp',
              value: '+6,2',
              unit: '%',
            },
            {
              key: 'Đầu tư trực tiếp nước ngoài',
              value: '1.247,8',
              unit: 'triệu USD',
            },
            {
              key: 'Tổng mức bán lẻ HH&DV',
              value: '127',
              unit: 'nghìn tỷ VND',
            },
          ],
          subtitle: 'Số doanh nghệp thành lập mới',
          bodyData: {
            chart: {
              height: 250,
            },
            chartType: 'BaseDonutChart',
            colors: ['#6A539D', '#A48CDA', '#CCCCCC'],
            series: [65.6, 26.5, 7.9],
            categories: ['Phi nông nghiệp', 'Nông nghiệp', 'Chưa sử dụng'],
          },
        },
        {
          title: 'Văn hóa - Xã hội',
          element: 'VanHoaXaHoi',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiMmQ2OWM5OTAtZGEwYS00N2E4LTk4YWQtYjBmOTEwMjJjOGYzIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D',
          descriptions: [
            {
              key: 'Mức giảm tỷ lệ hộ nghèo',
              value: '0.25',
              unit: '%',
            },
            {
              key: 'Mức giảm tỷ lệ thất nghiệp ở thành thị',
              value: '0,31',
              unit: '%',
            },
            {
              key: 'Tỷ lệ lao động qua đào tạo nghề',
              value: '64,21',
              unit: '%',
            },
            {
              key: 'Tỷ lệ tuyển sinh từ trung cấp nghề trở lên',
              value: '24,78',
              unit: '%',
            },
          ],
          subtitle: 'Giảm tỷ lệ hộ nghèo so kế hoạch',
          bodyData: {
            chartType: 'BaseSplineAreaChart',
            chart: {
              height: 250,
            },
            colors: ['#F8961E', '#A48CDA'],
            series: [
              {
                name: 'Thực hiện',
                data: [1.0, 0.4, 0.2, 0.3, 0.25],
              },
              {
                name: 'Kế hoạch',
                data: [1.0, 0.31, 0.2, 0.2, 0.19],
              },
            ],
            categories: [
              '85+',
              '80-84',
              '75-79',
              '70-74',
              '65-69',
              '60-64',
              '55-59',
              '50-54',
              '45-49',
              '40-44',
              '35-39',
              '30-34',
              '25-29',
              '20-24',
              '15-19',
              '10-14',
              '5-9',
              '0-4',
            ],
          },
        },
        {
          title: 'Môi trường',
          element: 'MoiTruong',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiOTAyNmNkMzItODE5My00MTc2LWIxOTYtNzY2ZjVhZjg4MDJiIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSection45326a7872ae68411007',
          descriptions: [
            {
              key: 'Tỷ lệ xử lý cơ sở gây ô nhiễm môi trường',
              value: '100',
              unit: '%',
            },
            {
              key: 'Tỷ lệ KCN có hệ thống xử lý nước thải đạt chuẩn',
              value: '100',
              unit: '%',
            },
            {
              key: 'Tỷ lệ KCN có hệ thống quan trắc nước thải',
              value: '94',
              unit: '%',
            },
            {
              key: 'Tỷ lệ che phủ rừng',
              value: '31',
              unit: '%',
            },
          ],
          subtitle: 'Số KCN có hệ thống quan trắc nước thải tự động',
          bodyData: {
            chartType: 'BaseSplineAreaChart',
            colors: ['#B5179E', '#4895EF'],
            series: [
              {
                name: 'Thực hiện',
                data: [11, 14, 16, 25, 29],
              },
              {
                name: 'Kế hoạch',
                data: [15, 18, 20, 28, 30],
              },
            ],
            categories: [2016, 2017, 2018, 2019, 2020],
          },
        },
        {
          title: 'Quốc phòng an ninh',
          element: 'QuocPhongAnNinh',
          href: 'https://app.powerbi.com/view?r=eyJrIjoiMmVmNDk2NzEtZTRiNC00YzEzLWFiYmUtZDRjNTM4MTFlYTRlIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D&pageName=ReportSectionee80d4950f388c608a46',
          descriptions: [
            {
              key: 'Tỷ lệ giải quyết tin báo, tố giác tội phạm',
              value: '79,51',
              unit: '%',
            },
            {
              key: 'Tỷ lệ điều tra, khám phá các loại án',
              value: '83,45',
              unit: '%',
            },
            {
              key: 'Tỷ lệ điều tra án rất, đặc biệt nghiêm trọng',
              value: '86,53',
              unit: '%',
            },
            {
              key: 'Tỷ lệ thi hành xong án dân sự',
              value: '73,64',
              unit: '%',
            },
          ],
          subtitle: 'Số vụ tội phạm hình sự',
          bodyData: {
            chartType: 'BaseColumnBarChart',
            colors: ['#6A539D'],
            series: [
              {
                data: [921, 912, 881, 902, 836],
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
