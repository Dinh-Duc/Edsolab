<template>
  <div>
    <div class="box-table-yknd row">
      <div class="col-md-12">
        <h3 class="title_box mb-1">
          Ý kiến cần xử lý <span class="color-span-title">(5)</span>
        </h3>
      </div>
      <div class="col-md-12">
        <BoxTable :data="dataTableCXL" />
      </div>
    </div>
    <BoxChart :data="dataChart" />
    <div class="row box-table-yknd">
      <div class="col-md-12">
        <h3 class="title_box mb-1">
          Danh sách người dân có nhiều ý kiến
          <span class="color-span-title">(5)</span>
        </h3>
      </div>
      <div class="col-md-12">
        <BoxTable :data="dataTableNYK" />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import BoxTable from './BoxTable'
// eslint-disable-next-line import/extensions
import BoxChart from './BoxChart'

export default {
  components: {
    BoxTable,
    BoxChart,
  },
  data() {
    return {
      dataTableCXL: {
        fields: [
          {
            key: 'STT',
            label: 'STT',
            sortable: false,
          },
          {
            key: 'THOIGIAN',
            label: 'THỜI GIAN',
            sortable: false,
          },
          {
            key: 'NGUOIHOI',
            label: 'NGƯỜI HỎI',
            sortable: false,
          },
          {
            key: 'NOIDUNG',
            label: 'NỘI DUNG',
            sortable: false,
          },
          {
            key: 'TRANGTHAI',
            label: 'TRẠNG THÁI',
            sortable: false,
          },
        ],
        items: [
          {
            THOIGIAN: '09/05/2021 17:00',
            NGUOIHOI: 'Nguyễn Thị Chanh',
            NOIDUNG:
              'Tôi tên là: Nguyễn Thị Chanh Tôi xin hỏi về nội dung nâng lương trước...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '06/05/2021 11:00',
            NGUOIHOI: 'Trần Văn Nam',
            NOIDUNG:
              'Tôi là nhân viên thuộc bộ phận văn phòng của trường học, là nhân viên có...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '05/05/2021 09:00',
            NGUOIHOI: 'Đỗ Đức Hùng',
            NOIDUNG:
              'Kính gửi: Bộ Nội Vụ! Tôi có một câu hỏi liên quan đến Luật cán bộ, công...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '01/05/2021 14:00',
            NGUOIHOI: 'Phạm Thị Trà',
            NOIDUNG:
              'Kính gửi Bộ Nội vụ. Em có đôi điều muốn hỏi về chứng chỉ B1(PET) do Cambrige...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '22/04/2021 16:00',
            NGUOIHOI: 'Lê Hồng Hà',
            NOIDUNG:
              'Chúng tôi tham gia công tác từ năm 2014 tại Công ty quản lý sửa...',
            TRANGTHAI: 'Chờ xử lý',
          },
        ],
      },
      dataTableNYK: {
        fields: [
          {
            key: 'STT',
            label: 'STT',
            sortable: false,
          },
          {
            key: 'HOVATEN',
            label: 'HỌ VÀ TÊN',
            sortable: false,
          },
          {
            key: 'NOIO',
            label: 'NƠI Ở',
            sortable: false,
          },
          {
            key: 'SOLANYKIEN',
            label: 'SỐ LẦN Ý KIẾN',
            sortable: false,
          },
        ],
        items: [
          {
            HOVATEN: 'Phạm Đức Nhân',
            NOIO: '81 Phố Dịch Vọng Hậu, Dịch Vọng Hậu, Cầu Giấy, TP Hà Nội',
            SOLANYKIEN: '15',
          },
          {
            HOVATEN: 'Trịnh Quang Minh',
            NOIO: 'Thịnh Đán, Thành phố Thái Nguyên, Thái Nguyên',
            SOLANYKIEN: '9',
          },
          {
            HOVATEN: 'Bùi Trọng Nghĩa',
            NOIO: 'Nguyễn Quang Bích, Hoà Cường Bắc, Hải Châu, Đà Nẵng',
            SOLANYKIEN: '8',
          },
          {
            HOVATEN: 'Phan Duy Anh',
            NOIO: 'Phường 11, Quận 10, Thành phố Hồ Chí Minh',
            SOLANYKIEN: '4',
          },
          {
            HOVATEN: 'Lê Hồng Hà',
            NOIO: 'Đường D1, Mỹ Phước, Bến Cát, Bình Dương',
            SOLANYKIEN: '5',
          },
        ],
      },
      dataChart: [
        {
          title: 'So sánh tình trạng xử lý theo lĩnh vực',
          element: 'XULYTHEOLINHVUC',
          type: 'stacked',
          bodyData: {
            chartType: 'ApexChart',
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
              strokeDashArray: 3,
            },
            series: [
              {
                name: 'Đã xử lý',
                data: [6800, 3200, 1800, 1500, 1800],
              },
              {
                name: 'Đang xử lý',
                data: [2300, 1300, 1000, 2500, 3000],
              },
            ],
            chart: {
              type: 'bar',
              height: 600,
              stacked: true,
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
                'Tổ chức - Biên chế',
                'Tiền lương',
                'Hợp tác quốc tế',
                'Văn thư lưu trữ',
                'Chính quyền địa phương',
              ],
              labels: {
                // formatter(val) {
                //   return `${val} nghìn`
                // },
              },
            },
            yaxis: {
              title: {
                text: undefined,
              },
            },
            tooltip: {
              y: {
                // formatter(val) {
                //   return `${val} nghìn`
                // },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 40,
              fontSize: 14,
            },
          },
        },
        {
          title: 'So sánh tình trạng xử lý theo địa phương',
          element: 'XULYTHEOLINHVUCDIAPUONG',
          type: 'stacked',
          bodyData: {
            chartType: 'ApexChart',
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
              strokeDashArray: 3,
            },
            series: [
              {
                name: 'Đã xử lý',
                data: [
                  6800,
                  3200,
                  1800,
                  1500,
                  1800,
                  1500,
                  1500,
                  3600,
                  2000,
                  1000,
                ],
              },
              {
                name: 'Đang xử lý',
                data: [
                  2300,
                  1300,
                  1200,
                  5000,
                  2300,
                  2500,
                  3200,
                  1300,
                  1600,
                  2400,
                ],
              },
            ],
            chart: {
              type: 'bar',
              height: 600,
              stacked: true,
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
                'TP Hà Nội',
                'TP HCM',
                'Tỉnh Đồng Nai',
                'Tỉnh Bắc Ninh',
                'Tỉnh Bắc Giang',
                'Tỉnh Hà Tĩnh',
                'TP Đà Nẵng',
                'Tỉnh Bình Dương',
                'Tỉnh Kiên Giang',
              ],
              labels: {
                // formatter(val) {
                //   return `${val} nghìn`
                // },
              },
            },
            yaxis: {
              title: {
                text: undefined,
              },
            },
            tooltip: {
              y: {
                // formatter(val) {
                //   return `${val} nghìn`
                // },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 40,
            },
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.XULYTHEOLINHVUC {
  .apexcharts-menu-icon {
    display: none !important;
  }
  .card-title {
    font-size: 20px;
    font-weight: 600;
  }
  .body-chart-data {
    padding-top: 0;
  }
}

.XULYTHEOLINHVUCDIAPUONG {
  .apexcharts-menu-icon {
    display: none !important;
  }
  .card-title {
    font-size: 20px;
    font-weight: 600;
  }
  .body-chart-data {
    padding-top: 0;
  }
}
.box-table-yknd {
  .title_box {
    font-size: 20px;
  }
  .color-span-title {
    color: #5a8dee;
  }
}
</style>
