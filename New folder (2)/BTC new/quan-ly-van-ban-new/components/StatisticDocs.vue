<template>
  <div class="statistic-prt">
    <div class="title-docs-chart">
      <b>{{ title }}</b>
    </div>
    <div class="list-statistics-detail">
      <div
        v-for="(data, index) in filterFor"
        :key="index"
        class="elm-statistics"
      >
        <span class="title-elm-statistic-doc">{{ data.name }}</span>
        <div class="progress-form">
          <b-progress>
            <b-progress-bar
              :value="Math.floor(data.value / 3)"
              :max="500"
              :style="{ 'background-color': '#EB5757' }"
            >
              <span>{{ Math.floor(data.value / 3) }}</span>
            </b-progress-bar>
          </b-progress>
        </div>
        <p class="total-elm-statistic">
          {{ data.value }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

const fakeData = {
  // den
  /*
   '',
    'Chi nhánh loại 1',
    'Đơn vị sự nghiệp',
    'Chi nhánh nước ngoài',
    'Điểm giao dịch lưu động',
    'Phòng giao dịch',
    'công ty con',
  */
  VBDEN: [
    { name: 'Vụ Ngân sách nhà nước', value: 220 },
    { name: 'Vụ Đầu tư', value: 310 },
    { name: 'Vụ Tài chính quốc phòng, an ninh, đặc biệt (Vụ I)', value: 140 },
    { name: 'Vụ Tài chính hành chính sự nghiệp', value: 220 },
    { name: 'Vụ Chính sách thuế', value: 300 },
    { name: 'Vụ Tài chính các ngân hàng và tổ chức tài chính', value: 500 },
    { name: 'Vụ Hợp tác quốc tế', value: 450 },
    { name: 'Vụ Pháp chế', value: 220 },
    { name: 'Vụ Tổ chức cán bộ', value: 310 },
    { name: 'Vụ Thi đua - Khen thưởng', value: 140 },
    { name: 'Thanh tra', value: 220 },
    { name: 'Văn phòng', value: 300 },
    { name: 'Cục Quản lý công sản', value: 500 },
    { name: 'Cục Quản lý nợ và tài chính đối ngoại', value: 450 },
    { name: 'Cục Quản lý, giám sát bảo hiểm', value: 220 },
    { name: 'Cục Quản lý, giám sát kế toán, kiểm toán', value: 310 },
    { name: 'Cục Quản lý giá', value: 140 },
    { name: 'Cục Tin học và Thống kê tài chính', value: 220 },
    { name: 'Cục Tài chính doanh nghiệp', value: 300 },
    { name: 'Cục Kế hoạch - Tài chính', value: 500 },
    { name: 'Tổng cục Hải quan', value: 450 },
  ],
  // di
  VBDI: [
    { name: 'Vụ Ngân sách nhà nước', value: 220 },
    { name: 'Vụ Đầu tư', value: 310 },
    { name: 'Vụ Tài chính quốc phòng, an ninh, đặc biệt (Vụ I)', value: 140 },
    { name: 'Vụ Tài chính hành chính sự nghiệp', value: 220 },
    { name: 'Vụ Chính sách thuế', value: 300 },
    { name: 'Vụ Tài chính các ngân hàng và tổ chức tài chính', value: 500 },
    { name: 'Vụ Hợp tác quốc tế', value: 450 },
    { name: 'Vụ Pháp chế', value: 220 },
    { name: 'Vụ Tổ chức cán bộ', value: 310 },
    { name: 'Vụ Thi đua - Khen thưởng', value: 140 },
    { name: 'Thanh tra', value: 220 },
    { name: 'Văn phòng', value: 300 },
    { name: 'Cục Quản lý công sản', value: 500 },
    { name: 'Cục Quản lý nợ và tài chính đối ngoại', value: 450 },
    { name: 'Cục Quản lý, giám sát bảo hiểm', value: 220 },
    { name: 'Cục Quản lý, giám sát kế toán, kiểm toán', value: 310 },
    { name: 'Cục Quản lý giá', value: 140 },
    { name: 'Cục Tin học và Thống kê tài chính', value: 220 },
    { name: 'Cục Tài chính doanh nghiệp', value: 300 },
    { name: 'Cục Kế hoạch - Tài chính', value: 500 },
    { name: 'Tổng cục Hải quan', value: 450 },
  ],
  // Đơn vị chuyên môn
  DVCM: [
    {
      name: 'Ban Tổ chức - Cán bộ',
      value: 200,
    },
    {
      name: 'Ban Kế hoạch - Tài chính',
      value: 250,
    },
    {
      name: 'Ban ứng dụng và triển khai công nghệ',
      value: 100,
    },
    {
      name: 'Ban Hợp tác quốc tế',
      value: 300,
    },
    {
      name: 'Ban kiểm tra',
      value: 240,
    },
    {
      name: 'Văn phòng',
      value: 360,
    },
    {
      name: 'Văn phòng đại diện tại Hồ Chí Minh',
      value: 500,
    },
  ],

  // Viện nghiên cứu
  VNC: [
    {
      name: 'Viện Toán học',
      value: 500,
    },
    {
      name: 'Viện Vật lý',
      value: 522,
    },
    {
      name: 'Viện Hóa học',
      value: 422,
    },
    {
      name: 'Công ty TNHH chứng khoán',
      value: 115,
    },
    {
      name: 'Công ty quản lý nợ và khai thác tài sản',
      value: 222,
    },
    {
      name: 'Viện Sinh thái và tài nguyên sinh vật',
      value: 631,
    },
    {
      name: 'Viện Địa lý',
      value: 242,
    },
    {
      name: 'Viện Địa chất',
      value: 231,
    },
    {
      name: 'Viện Vật lý địa cầu',
      value: 223,
    },
    {
      name: 'Viện Hải dương học',
      value: 541,
    },
    {
      name: 'Viện Tài nguyên và môi trường biển',
      value: 523,
    },
    {
      name: 'Viện Địa chất và địa vật lý biển',
      value: 312,
    },
    {
      name: 'Viện Khoa học năng lượng',
      value: 444,
    },
    {
      name: 'Viện Khoa học vật liệu',
      value: 421,
    },
    {
      name: 'Viện Công nghệ thông tin',
      value: 113,
    },
    {
      name: 'Viện Công nghệ sinh học',
      value: 544,
    },
    {
      name: 'Viện Công nghệ môi trường',
      value: 522,
    },
    {
      name: 'Viện Công nghệ hóa học',
      value: 233,
    },
    {
      name: 'Viện Công nghệ vũ trụ',
      value: 444,
    },
    {
      name: 'Công ty quản lý nợ và khai thác tài sản và tin học ứng dụng',
      value: 622,
    },
    {
      name: 'Viện Sinh học nhiệt đới',
      value: 642,
    },
    {
      name: 'Viện Kỹ thuật nhiệt đới',
      value: 512,
    },
    {
      name: 'Viện Khoa học vật liệu ứng dụng',
      value: 415,
    },
    {
      name: 'Viện Nghiên cứu và ứng dụng công nghệ Nha Trang',
      value: 983,
    },
    {
      name: 'Viện Hóa sinh biển',
      value: 478,
    },
    {
      name: 'Trung tâm vũ trụ Việt Nam',
      value: 398,
    },
    {
      name: 'Viện Nghiên cứu khoa học Tây Nguyên',
      value: 782,
    },
    {
      name: 'Viên Nghiên cứu hệ Gen',
      value: 567,
    },
    {
      name: 'Viện Vật lý TP HCM',
      value: 587,
    },
    {
      name: 'Nghiên cứu khoa học miền trung',
      value: 782,
    },
    {
      name: 'Địa lý tài nguyên TP HCM',
      value: 798,
    },
    {
      name: 'Viện Sinh thái học miền Nam',
      value: 578,
    },
  ],

  // Đơn vị sự nghiệp
  DVSN: [
    {
      name: 'Nhà xuất bản Khoa học tự nhiên và công nghệ',
      value: 430,
    },
    {
      name: 'Bảo tàng thiên nhiên Việt Nam',
      value: 1200,
    },
    {
      name: 'Trung tâm Thông tin - Tư liệu',
      value: 300,
    },
    {
      name: 'Trung tâm Tin học và tính toán',
      value: 200,
    },
    {
      name: 'Trung tâm phát triển công nghệ cao',
      value: 300,
    },
    {
      name: 'Học viện Khoa học và công nghệ',
      value: 400,
    },
    {
      name: 'Trường Đại học Khoa học và Công nghệ Hà Nội',
      value: 100,
    },
    {
      name: 'Trung tân Nghiên cứu và chuyển giao công nghệ',
      value: 500,
    },
  ],
}
export default {
  name: 'StatisticDocs',
  props: {
    title: {
      type: String,
      default: '',
    },
    forVB: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['keyActivedSidebar']),
    filterFor() {
      // xử lý thống kê văn bản chưa hoàn thành của đơn vị
      if (this.keyActivedSidebar.includes('DVCM')) return fakeData.DVCM
      if (this.keyActivedSidebar.includes('VNC')) return fakeData.VNC
      if (this.keyActivedSidebar.includes('DVSN')) return fakeData.DVSN
      if (this.keyActivedSidebar.includes('VBDI')) return fakeData.VBDI
      return fakeData.VBDEN
      // if (this.forVB) {
      //   if (this.forVB === 'VBDEN') return fakeData.DepartmentMiss
      //   return fakeData.DepartmentMiss2
      // }
      // if (this.keyActivedSidebar.includes('VBDEN')) return fakeData.DepartmentMiss
      // return fakeData.DepartmentMiss2
    },
  },
}
</script>
<style lang="scss" scoped>
.docs-manage {
  .statistic-prt {
    width: 100%;
    height: 100%;
    float: left;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 8px 12px 0px 12px;
  }
  .progress {
    height: 15px;
    border-radius: 3px !important;
  }
  .progress-bar {
    border-radius: 3px !important;
  }
  .statistic-prt .progress .progress-bar:last-child {
    border-top-right-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
  }
  .progress-form {
    width: calc(100% - 240px);
    float: left;
  }
  .list-statistics-detail {
    width: 100%;
    float: left;
  }
  .preview-prt-statistic .statistic-prt {
    overflow-y: auto !important;
    padding-bottom: 10px;
  }
  /* width */
  .preview-prt-statistic .statistic-prt::-webkit-scrollbar {
    width: 10px;
    border-radius: 20px !important;
  }

  /* Track */
  .preview-prt-statistic .statistic-prt::-webkit-scrollbar-track {
    background: white;
    border-radius: 10px;
  }

  /* Handle */
  .preview-prt-statistic .statistic-prt::-webkit-scrollbar-thumb {
    background: rgb(201, 198, 198);
    border-radius: 10px !important;
  }

  /* Handle on hover */
  .preview-prt-statistic .statistic-prt::-webkit-scrollbar-thumb:hover {
    background: rgb(163, 163, 163);
    border-radius: 10px !important;
  }
  .elm-statistics {
    margin-top: 10px;
    width: 100%;
    float: left;
  }
  .title-elm-statistic-doc {
    width: 175px;
    float: left;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: #4f4f4f;
  }
  .statistic-prt .bg-danger {
    background: #eb5757;
    border-radius: 3px !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
  }
  .progress-bar span {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px;
    color: #ffffff;
  }

  /* Mới */
  .title-docs-chart {
    width: 100%;
    float: left;
    border-bottom: 1px solid #828282;
    b {
      width: 100%;
      float: left;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
      padding-bottom: 1px;
    }
  }
  .total-elm-statistic {
    margin: 0 !important;
    width: 65px;
    padding-left: 30px;
    float: left;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: #4f4f4f;
    padding-top: 3px;
  }
}
</style>
