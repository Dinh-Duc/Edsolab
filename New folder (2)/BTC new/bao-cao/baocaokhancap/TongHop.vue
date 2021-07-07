<template>
  <div>
    <b-row style="padding-top: 1em; margin-top: 1em">
      <b-col
        v-for="(item, index) in boxItems"
        :key="index"
        class="d-flex"
        lg="4"
        md="6"
      >
        <iq-card class="flex-fill">
          <template v-slot:body>
            <div
              class="d-flex align-items-center justify-content-between text-right"
            >
              <div
                :class="'icon iq-icon-box rounded-circle bg-' + item.boxColor"
                style="padding: .75em;"
              >
                <feather-icon
                  style="color: white"
                  :icon="item.iconClass"
                  size="22"
                />
              </div>
              <div>
                <p class="mb-0 fz-18 title">
                  {{ item.title }}
                </p>
                <span
                  :class="
                    'text-' +
                      item.boxColor +
                      ' mb-0 counter d-inline-block w-100 fz-24 bold mt-10 soLieu'
                  "
                >
                  {{ item.count }}
                </span>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col
        lg="6"
        md="6"
      >
        <iq-card>
          <div class="cs-tt-title">
            Thống kê tình trạng xử lý
          </div>
          <BasePieChart
            :height="350"
            :chart-data="pieChartData"
          />
        </iq-card> </b-col><b-col
        lg="6"
        md="6"
      >
        <iq-card>
          <div class="cs-tt-title">
            Thống kê báo cáo khẩn theo lĩnh vực
          </div>
          <BaseColumnBarChart
            :series="dataBarChart"
            :categories="categoriesBar"
            :height="350"
            :colors="['#F2AE00']"
          />
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import BasePieChart from '@core/components/charts/echart/BasePieChart.vue'
import BaseColumnBarChart from '@core/components/charts/echart/BaseColumnBarChart.vue'
import IqCard from '@core/components/cards/iq-card.vue'
import moment from 'moment'

export default {
  name: 'TinhHuongKhanCap',
  components: {
    BaseColumnBarChart,
    BasePieChart,
    IqCard,
  },
  data() {
    return {
      categoriesBar: [
        ' Lĩnh vực Toán học',
        ' Lĩnh vực Vật lý',
        ' Lĩnh vực Hóa học',
        ' Lĩnh vực Sinh học',
        ' Lĩnh vực Công nghệ sinh học',
        ' Lĩnh vực Công nghệ thông tin',
        ' Lĩnh vực Điện tử, tự động hóa',
        ' Lĩnh vực Công nghệ vũ trụ',
        ' Lĩnh vực Khoa học vật liệu',
        ' Lĩnh vực Đa dạng sinh học và các chất có hoạt tính sinh học',
        ' Lĩnh vực Khoa học trái đất',
        ' Lĩnh vực Khoa học và công nghệ biển',
        ' Lĩnh vực Môi trường và năng lượng',
        ' Lĩnh vực Dự báo, phòng, chống và giảm nhẹ thiên tai',
      ],
      dataBarChart: [
        {
          data: [19, 5, 18, 12, 17, 20, 9, 26, 15, 5, 30, 25, 20, 15],
        },
      ],
      pieChartData: [
        {
          name: 'Đã xử lý đúng hạn',
          y: 74,
          color: '#05FBB7',
        },
        {
          name: 'Đã xử lý quá hạn',
          y: 15,
          color: '#7B00FD',
        },
        {
          name: 'Chưa xử lý',
          y: 11,
          color: '#FFA902',
        },
      ],
      boxItems: [
        {
          title: 'Số báo cáo khẩn',
          count: 236,
          iconClass: 'AlertTriangleIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Toán học',
          count: 19,
          iconClass: 'UsersIcon',
          boxColor: 'success',
        },
        {
          title: 'Lĩnh vực Vật lý',
          count: 5,
          iconClass: 'GlobeIcon',
          boxColor: 'danger',
        },
        {
          title: 'Lĩnh vực Hóa học',
          count: 18,
          iconClass: 'DollarSignIcon',
          boxColor: 'warning',
        },
        {
          title: 'Lĩnh vực Sinh học',
          count: 12,
          iconClass: 'CheckIcon',
          boxColor: 'info',
        },
        {
          title: 'Lĩnh vực Công nghệ thông tin',
          count: 17,
          iconClass: 'PocketIcon',
          boxColor: 'secondary',
        },
        {
          title: 'Lĩnh vực Công nghệ sinh học',
          count: 20,
          iconClass: 'EditIcon',
          boxColor: 'warning',
        },
        {
          title: 'Lĩnh vực Điện tử, tự động hóa',
          count: 9,
          iconClass: 'BookOpenIcon',
          boxColor: 'info',
        },
        {
          title: 'Lĩnh vực Công nghệ vũ trụ',
          count: 26,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Khoa học vật liệu',
          count: 15,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Đa dạng sinh học và các chất có hoạt tính sinh học',
          count: 5,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Khoa học trái đất',
          count: 30,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Khoa học và công nghệ biển',
          count: 25,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Môi trường và năng lượng',
          count: 20,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
        {
          title: 'Lĩnh vực Dự báo, phòng, chống và giảm nhẹ thiên tai',
          count: 15,
          iconClass: 'PenToolIcon',
          boxColor: 'primary',
        },
      ],
      duongDayNongTrongNgay: {
        title: 'Số cuộc gọi đường dây nóng trong ngày',
        element: 'DuongDayNongTrongNgay',
        type: 'line',
        bodyData: {
          colors: ['#6A539D', '#F8961E', '#45AA8D'],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          series: [
            {
              name: '113',
              data: [0, 3, 6, 10, 15, 23, 30],
            },
            {
              name: '114',
              data: [0, 4, 23, 29, 38, 55, 69],
            },
            {
              name: '115',
              data: [1, 24, 34, 45, 58, 83, 119],
            },
          ],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: [
              '12:00 SA',
              '02:00 CH',
              '04:00 CH',
              '06:00 CH',
              '08:00 CH',
              '10:00 CH',
              '12:00 CH',
            ],
          },
        },
      },
      thoiGianTBPhanUngKhanCap: {
        title: 'Thời gian trung bình phản ứng với tình huống khẩn cấp',
        element: 'TBPhanUngKhanCap',
        type: 'bar',
        bodyData: {
          colors: ['#6A539D'],
          chart: {
            height: 350,
            type: 'bar',
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
            offsetX: -17,
            formatter(val) {
              return `${val} phút`
            },
          },
          series: [
            {
              data: [1.71, 1.63, 1.63, 1.62, 1.58],
            },
          ],
          xaxis: {
            categories: [
              'Hỏa hoạn/Cúp điện',
              'Sự cố y tế',
              'Tai nạn trẻ em',
              'Sự cố môi trường',
              'Sự cố giao thông',
            ],
          },
        },
      },
      mucDoNghiemTrong: {
        title: 'Mức độ nghiêm trọng của tình huống',
        element: 'MucDoNghiemTrong',
        type: 'bar',
        bodyData: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top',
              },
              columnWidth: '50%',
              distributed: true,
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: 0,
          },
          series: [
            {
              data: [52, 48, 44],
            },
          ],
          colors: ['#02B863', '#FDB602', '#FE0000'],
          xaxis: {
            categories: ['Thấp', 'Trung bình', 'Cao'],
          },
        },
      },
      thoiGianTBCoMatTaiHT: {
        title: 'Thời gian trung bình đội xử lý có mặt tại hiện trường',
        element: 'ThoiGianTBCoMatTaiHT',
        type: 'bar',
        bodyData: {
          colors: ['#70A48C'],
          chart: {
            height: 350,
            type: 'bar',
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
            offsetX: -15,
            formatter(val) {
              return `${val} phút`
            },
          },
          series: [
            {
              data: [10.64, 10.33, 10.2, 9.98, 9.68],
            },
          ],
          xaxis: {
            categories: [
              'Sự cố môi trường',
              'Sự cố giao thông',
              'Tai nạn trẻ em',
              'Sự cố y tế',
              'Hỏa hoạn/Cúp điện',
            ],
          },
        },
      },
      fields: [
        {
          key: 'Date',
          label: 'Ngày phát sinh',
          sortable: false,
          formatter: val => moment(val).format('DD/MM/YYYY'),
        },
        {
          key: 'NoiDung',
          label: 'Tình huống khẩn cấp',
          sortable: false,
        },
        {
          key: 'MucDoNghiemTrong',
          label: 'Mức độ nghiêm trọng',
          sortable: false,
          tdClass: val => {
            let cl = 'text-success'
            if (val === 'Cao') cl = 'text-danger'
            if (val === 'Trung bình') cl = 'text-warning'
            return cl
          },
        },
        {
          key: 'TinhTrangXuLy',
          label: 'Tình trạng xử lý',
          sortable: false,
        },
      ],
      items: [
        {
          ID: 1,
          ThoiGian: 0.22916666666666666,
          Date: '2021-04-20T00:00:00',
          NoiDung: 'Tai nạn giao thông tại thành phố Biên Hòa',
          MucDoNghiemTrong: 'Trung bình',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 2,
          ThoiGian: 0.21875,
          Date: '2021-04-20T00:00:00',
          NoiDung:
            'Sập tường công trình xây dựng nhà xưởng Công ty cổ phần AV Healthcare',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 3,
          ThoiGian: 0.2152777777777778,
          Date: '2021-04-19T00:00:00',
          NoiDung: 'Vỡ đường ống nước thải',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 4,
          ThoiGian: 0.20833333333333334,
          Date: '2021-04-09T00:00:00',
          NoiDung:
            'Bắt khẩn cấp nhóm đối tượng trong chuyên án buôn lậu, sản xuất, tiêu thụ xăng giả quy mô lớn',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 5,
          ThoiGian: 0.20833333333333334,
          Date: '2021-04-09T00:00:00',
          NoiDung:
            'Bắt khẩn cấp nhóm trộm nghiện ma túy thuê taxi, ô tô tự lái đi trộm cắp liên tỉnh',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 6,
          ThoiGian: 0.22916666666666666,
          Date: '2021-04-14T00:00:00',
          NoiDung: 'Kiểm tra đối tượng tàng trữ trái phép chất ma túy',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 7,
          ThoiGian: 0.2222222222222222,
          Date: '2021-04-20T00:00:00',
          NoiDung: 'Bắt khẩn cấp đối tượng cướp giật tài sản',
          MucDoNghiemTrong: 'Trung bình',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 8,
          ThoiGian: 0.2222222222222222,
          Date: '2021-04-20T00:00:00',
          NoiDung: 'Triệt xóa tụ điểm đá gà ăn tiền',
          MucDoNghiemTrong: 'Trung bình',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 9,
          ThoiGian: 0.2222222222222222,
          Date: '2021-04-20T00:00:00',
          NoiDung: 'Triệt phá tụ điểm đánh bạc ăn tiền',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 10,
          ThoiGian: 0.20833333333333334,
          Date: '2021-04-07T00:00:00',
          NoiDung:
            'Xử lý cơ sở để chất thải nguy hại ngoài trời gây ô nhiễm môi trường',
          MucDoNghiemTrong: 'Trung bình',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 11,
          ThoiGian: 0.20833333333333334,
          Date: '2021-04-10T00:00:00',
          NoiDung: 'Xử lý cơ sở kinh doanh sản xuất mỹ phẩm giả quy mô lớn',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 12,
          ThoiGian: 0.18055555555555555,
          Date: '2021-04-06T00:00:00',
          NoiDung: 'Xử lý nhóm đối tượng tụ tập đánh bạc trong quán karaoke',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 13,
          ThoiGian: 0.20833333333333334,
          Date: '2021-04-19T00:00:00',
          NoiDung: 'Bắt khẩn cấp đối tượng trộm cắp tài sản',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 14,
          ThoiGian: 0.22916666666666666,
          Date: '2021-04-20T00:00:00',
          NoiDung: '\nXử lý sản phẩm nhập lậu',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 15,
          ThoiGian: 0.15277777777777776,
          Date: '2021-04-19T00:00:00',
          NoiDung: 'Xử lý đối tượng cho vay nặng lãi',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 16,
          ThoiGian: 0.2152777777777778,
          Date: '2021-04-15T00:00:00',
          NoiDung: 'Xử lý đối tượng vận chuyển pháo nổ',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 17,
          ThoiGian: 0.25,
          Date: '2021-04-19T00:00:00',
          NoiDung: 'Sự cố đèn tín hiệu giao thông',
          MucDoNghiemTrong: 'Thấp',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 18,
          ThoiGian: 0.2604166666666667,
          Date: '2021-04-18T00:00:00',
          NoiDung: 'Xử lý bắt cóc trẻ em tại huyện Cẩm Mỹ',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đang xử lý',
        },
        {
          ID: 19,
          ThoiGian: 0.1875,
          Date: '2021-04-06T00:00:00',
          NoiDung:
            'Ngăn chặn nhóm thanh niên mang mã tấu đi giải quyết mâu thuẫn',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Đã xử lý',
        },
        {
          ID: 20,
          ThoiGian: 0.25,
          Date: '2021-04-20T00:00:00',
          NoiDung: 'Xử lý trường hợp đốt pháo trái phép huyện Nhơn Trạch',
          MucDoNghiemTrong: 'Trung bình',
          TinhTrangXuLy: 'Chưa xử lý',
        },
        {
          ID: 21,
          ThoiGian: 0.19791666666666666,
          Date: '2021-04-20T00:00:00',
          NoiDung:
            'Kiểm tra đối tượng tổ chức, sử dụng trái phép chất ma túy tại khu nhà trọ huyện Trảng Bom',
          MucDoNghiemTrong: 'Cao',
          TinhTrangXuLy: 'Chưa xử lý',
        },
      ],
    }
  },
  methods: {
    // rowOnClick (item) {
    //   console.log(item)
    // },
    getClassTinhChat(data) {
      let cl = ''
      switch (data.value) {
        case 'Cao': {
          cl = 'danger'
          break
        }
        case 'Trung bình': {
          cl = 'warning'
          break
        }
        default: {
          cl = 'success'
          break
        }
      }
      return cl
    },
    getClassTinhTrang(data) {
      let cl = ''
      switch (data.value) {
        case 'Đã xử lý': {
          cl = 'success'
          break
        }
        case 'Đang xử lý': {
          cl = 'secondary'
          break
        }
        default: {
          cl = 'primary'
          break
        }
      }
      return cl
    },
  },
}
</script>
<style lang="scss">
.cs-tt-title {
  text-align: center;
  font-size: 18px;
}
tr:focus {
  outline: none;
}
.TinhHuongKhanCap tr {
  cursor: pointer;
}
.b-table-sticky-header {
  max-height: 600px;
}
.flex-fill {
  .title {
    font-size: 18px;
  }
  .soLieu {
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
  }

  .text-secondary {
    color: #ff7a29 !important;
  }
}
</style>
<style lang="scss" scoped>
.todo-app-list.report-list {
  section.todo-task-list-wrapper.list-group {
    background: #fff;
  }
}
</style>
