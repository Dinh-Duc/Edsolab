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
          Danh sách người dân có nhiều ý kiến <span class="color-span-title">(5)</span>
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
            NGUOIHOI: 'Phạm Đức Nhân',
            NOIDUNG:
              'Cho tôi hỏi hiện nay gia đình tôi có mua 1 mảnh đất và đã xây...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '06/05/2021 11:00',
            NGUOIHOI: 'Trịnh Quanh Minh',
            NOIDUNG:
              ' Theo Nghị định 19/2013/NĐ-CP ngày 23/2/2013 của Chính phủ...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '05/05/2021 09:00',
            NGUOIHOI: 'Bùi Trọng Nghĩa',
            NOIDUNG:
              'Hiện nay trên đọan đường QL 1 A gần đến cổng Công ty Cổ phần...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '01/05/2021 14:00',
            NGUOIHOI: 'Phan Duy Anh',
            NOIDUNG:
              'Tôi đang công tác tại vùng sâu, vùng xa, vùng đặc biệt khó khăn...',
            TRANGTHAI: 'Chờ xử lý',
          },
          {
            THOIGIAN: '22/04/2021 16:00',
            NGUOIHOI: 'Lê Hồng Hà',
            NOIDUNG:
              'Chúng tôi tham gia công tác từ năm 2004 tại Công ty quản lý sửa...',
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
            NOIO: '423 Quang Trung, huyện Thống Nhất, tỉnh Đồng Nai',
            SOLANYKIEN: '15',
          },
          {
            HOVATEN: 'Trịnh Quang Minh',
            NOIO: '56 Trần Phú, thành phố Biên Hòa, tỉnh Đồng Nai',
            SOLANYKIEN: '9',
          },
          {
            HOVATEN: 'Bùi Trọng Nghĩa',
            NOIO: '193 Lê Lợi, thành phố Long Khánh, tỉnh Đồng Nai',
            SOLANYKIEN: '8',
          },
          {
            HOVATEN: 'Phan Duy Anh',
            NOIO: '423 Quang Trung, huyện Thống Nhất, tỉnh Đồng Nai',
            SOLANYKIEN: '4',
          },
          {
            HOVATEN: 'Lê Hồng Hà',
            NOIO: '56 Trần Phú, thành phố Biên Hòa, tỉnh Đồng Nai',
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
                data: [6.8, 3.2, 1.8, 1.5, 0.8, 1, 0.5, 3.6],
              },
              {
                name: 'Đang xử lý',
                data: [2.3, 1.3, 1, 0.5, 0.3, 0.5, 0.3, 1.3],
              },
            ],
            chart: {
              type: 'bar',
              height: 450,
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
                data: [6.8, 3.2, 1.8, 1.5, 0.8, 1, 0.5, 3.6],
              },
              {
                name: 'Đang xử lý',
                data: [2.3, 1.3, 1, 0.5, 0.3, 0.5, 0.3, 1.3],
              },
            ],
            chart: {
              type: 'bar',
              height: 450,
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
