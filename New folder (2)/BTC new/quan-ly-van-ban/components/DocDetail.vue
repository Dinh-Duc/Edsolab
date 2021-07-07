<template>
  <div class="detail-doc">
    <!-- Back list action -->
    <div class="back-page">
      <div
        class="elm-svg"
        @click="backToListTable()"
      >
        <svg
          width="13"
          height="27"
          viewBox="0 0 13 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.843 26.9999C10.5655 27.0008 10.2913 26.9373 10.0406 26.8138C9.78988 26.6903 9.56899 26.5101 9.39417 26.2864L0.422554 14.716C0.149353 14.371 0 13.9382 0 13.4915C0 13.0448 0.149353 12.612 0.422554 12.267L9.70994 0.696635C10.0252 0.302826 10.4783 0.0551736 10.9695 0.00815998C11.4606 -0.0388536 11.9497 0.118622 12.329 0.445944C12.7083 0.773266 12.9469 1.24362 12.9921 1.75354C13.0374 2.26346 12.8857 2.77116 12.5705 3.16497L4.26753 13.5011L12.2918 23.8373C12.519 24.1204 12.6633 24.465 12.7076 24.8306C12.752 25.1961 12.6945 25.5672 12.5421 25.8999C12.3897 26.2326 12.1487 26.513 11.8476 26.7079C11.5464 26.9029 11.1978 27.0042 10.843 26.9999Z"
            fill="#4F4F4F"
          />
        </svg>
      </div>
    </div>

    <!-- Content detail doc -->
    <div class="content-detail">
      <!-- Thông tin chung về văn bản -->
      <div class="elm-content">
        <b class="title-elm">Thông tin chung về văn bản</b>
        <div class="child-info">
          <div class="line-info-child">
            <div class="col-6-custom">
              <span class="custom-span">Đơn vị soạn thảo:</span>
              <p class="custom-p">
                {{ dataDetail.CoQuanBanHanh }}
              </p>
            </div>
            <div class="col-6-custom">
              <span class="custom-span">Người soạn thảo:</span>
              <p class="custom-p">
                {{
                  dataDetail.NguoiSoanThao
                    ? dataDetail.NguoiSoanThao
                    : 'Không có'
                }}
              </p>
            </div>
          </div>
          <div class="line-info-child">
            <div class="col-6-custom">
              <span class="custom-span">Loại văn bản:</span>
              <p class="custom-p">
                {{ dataDetail.LoaiVanBan }}
              </p>
            </div>
            <div class="col-6-custom">
              <span class="custom-span">Ký hiệu:</span>
              <p class="custom-p">
                {{ dataDetail.SoKyHieu }}
              </p>
            </div>
          </div>
          <div class="line-info-child">
            <div class="col-6-custom">
              <span class="custom-span">Trích yếu:</span>
              <p class="custom-p">
                {{ dataDetail.TrichYeu }}
              </p>
            </div>
          </div>
          <div class="line-info-child">
            <div class="col-6-custom">
              <span class="custom-span">Ngày hạn xử lý:</span>
              <p class="custom-p">
                {{ dataDetail.NgayHanXuLy }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Đơn vị trong hệ thống -->
      <div class="elm-content">
        <b class="title-elm">Đơn vị trong hệ thống</b>
        <div class="child-info margin-custom-table">
          <b-table
            sticky-header
            striped
            hover
            :items="items_DVTrongHeThong"
            :fields="fields_DVTrongHeThong"
            :fixed="true"
          />
        </div>
      </div>

      <!-- Đơn vị ngoài hệ thống -->
      <div class="elm-content">
        <b class="title-elm">Đơn vị ngoài hệ thống</b>
        <div class="child-info margin-custom-table">
          <b-table
            sticky-header
            striped
            hover
            :items="items_DVNgoaiHeThong"
            :fields="fields_DVNgoaiHeThong"
            :fixed="true"
          />
        </div>
      </div>

      <!-- Thông tin thêm -->
      <div class="more-info-detail">
        <div class="more-line">
          <div class="col-6-custom">
            <span class="custom-span">Số bản:</span>
            <p class="custom-p">
              12
            </p>
          </div>
          <div class="col-6-custom">
            <span class="custom-span">Độ khẩn:</span>
            <p class="custom-p">
              Bình thường
            </p>
          </div>
        </div>
        <div class="more-line">
          <div class="col-sm-4">
            <span class="title-more">Văn bản trả lời:</span>
            <div class="checkbox-act">
              <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                value="accepted"
              />
            </div>
          </div>
          <div class="col-sm-4">
            <span class="title-more">Văn bản QPPL:</span>
            <div class="checkbox-act">
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-2"
                value="accepted"
              />
            </div>
          </div>
          <div class="col-sm-4">
            <span class="title-more">Văn bản chỉ đạo:</span>
            <div class="checkbox-act">
              <b-form-checkbox
                id="checkbox-3"
                name="checkbox-3"
                value="accepted"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Người theo dõi -->
      <div class="elm-content">
        <b class="title-elm">Người theo dõi</b>
        <div class="child-info margin-custom-table">
          <b-table
            sticky-header
            striped
            hover
            :items="items_NguoiTheoDoiVB"
            :fields="fields_NguoiTheoDoiVB"
            :fixed="true"
          />
        </div>
      </div>

      <!-- Thông tin ký duyệt -->
      <div class="elm-content">
        <b class="title-elm">Thông tin ký duyệt</b>
        <div class="child-info margin-custom-table">
          <b-table
            sticky-header
            striped
            hover
            :items="[]"
            :fields="fields_ThongTinKyDuyet"
            :fixed="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataDetail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      fields_DVTrongHeThong: [
        {
          key: 'STT',
          label: 'STT',
          thClass: 'Custom-STT',
        },
        {
          key: 'TenDonViNhan',
          label: 'TÊN ĐƠN VỊ NHẬN',
          thClass: 'DVTrongHeThong-TenDVNhan',
        },
        {
          key: 'PhaiGuiBanGiay',
          label: 'PHẢI GỬI BẢN GIẤY',
          thClass: 'DVTrongHeThong-GuiBanGiay',
        },
      ],
      fields_DVNgoaiHeThong: [
        {
          key: 'STT',
          label: 'STT',
          thClass: 'Custom-STT',
        },
        {
          key: 'TenDonViNhan',
          label: 'TÊN ĐƠN VỊ NHẬN',
          thClass: 'DVNgoaiHeThong-TenDVNhan',
        },
        {
          key: 'TrangThai',
          label: 'TRẠNG THÁI',
          thClass: 'DVNgoaiHeThong-TrangThai',
        },
        {
          key: 'PhaiGuiBanGiay',
          label: 'PHẢI GỬI BẢN GIẤY',
          thClass: 'DVNgoaiHeThong-GuiBanGiay',
        },
      ],
      fields_NguoiTheoDoiVB: [
        {
          key: 'STT',
          label: 'STT',
          thClass: 'Custom-STT',
        },
        {
          key: 'HoVaTen',
          label: 'HỌ VÀ TÊN',
          thClass: 'NguoiTheoDoiVB-HoVaTen',
        },
        {
          key: 'DONVI',
          label: 'ĐƠN VỊ',
          thClass: 'NguoiTheoDoiVB-DonVi',
        },
        {
          key: 'VaiTro',
          label: 'VAI TRÒ',
          thClass: 'NguoiTheoDoiVB-VaiTro',
        },
        {
          key: 'BanHanh',
          label: 'BAN HÀNH',
          thClass: 'NguoiTheoDoiVB-BanHanh',
        },
      ],
      fields_ThongTinKyDuyet: [
        {
          key: 'STT',
          label: 'STT',
          thClass: 'Custom-STT',
        },
        {
          key: 'HoVaTen',
          label: 'HỌ VÀ TÊN',
          thClass: 'ThongTinKyDuyet-HoVaTen',
        },
        {
          key: 'DonVi',
          label: 'ĐƠN VỊ',
          thClass: 'ThongTinKyDuyet-DonVi',
        },
      ],

      items_DVTrongHeThong: [
        /* {
          STT: 1,
          TenDonViNhan: 'Trung tâm tin học',
          PhaiGuiBanGiay: 'Có',
        },
        {
          STT: 2,
          TenDonViNhan: 'Trung tâm toán học',
          PhaiGuiBanGiay: 'Có',
        }, */
      ],
      items_DVNgoaiHeThong: [
        /*  {
          STT: 1,
          TenDonViNhan: 'Thiện',
          TrangThai: 'Done',
          PhaiGuiBanGiay: 'Có',
        }, */
      ],
      items_NguoiTheoDoiVB: [
        /*  {
          STT: 1,
          HoVaTen: 'Nguyễn Văn Thiện',
          DONVI: 'Trung tâm tin học',
          VaiTro: 'Không',
          BanHanh: 'Không',
        },
        {
          STT: 2,
          HoVaTen: 'Hạ Kiều',
          DONVI: 'Trung tâm toán học',
          VaiTro: 'Có',
          BanHanh: '',
        }, */
      ],
      items_ThongTinKyDuyet: [],
    }
  },
  methods: {
    backToListTable() {
      this.$emit('back-tab-list', false)
    },
  },
}
</script>
<style lang="scss">
.docs-manage {
  .detail-doc {
    width: 100%;
    float: left;
    height: 100%;
    padding: 0 10px;
  }
  .back-page {
    width: 100%;
    float: left;
  }
  .content-detail {
    width: 100%;
    float: left;
    height: calc(100% - 27px);
    padding: 10px;
    border-top: 3px solid #f5f5f7;
    margin-top: 15px;
    padding-top: 0;
    overflow-y: scroll;
  }
  .elm-content {
    width: 100%;
    float: left;
    margin-top: 10px;
    .title-elm {
      width: 100%;
      float: left;
      font-weight: 900;
      margin-top: 5px;
    }
  }
  .child-info {
    width: 100%;
    float: left;
  }
  .line-info-child {
    width: 100%;
    float: left;
    margin-top: 15px;
  }
  .col-6-custom {
    width: 50%;
    float: left;
    padding-right: 30px;
  }
  .col-6-custom .custom-span {
    width: 200px;
    float: left;
  }
  .col-6-custom .custom-p {
    width: calc(100% - 200px);
    float: left;
    margin: 0;
  }
  .margin-custom-table {
    margin-top: 5px;
  }
  .more-info-detail {
    width: 100%;
    float: left;
  }
  .more-line {
    width: 100%;
    float: left;
    margin-top: 10px;
  }
  .more-line .col-sm-4 {
    float: left;
  }
  .more-line .col-sm-4:first-child {
    padding-left: 0;
  }
  .more-line .col-sm-4:last-child {
    padding-right: 0;
  }
  .title-more {
    width: 150px;
    float: left;
  }
  .checkbox-act {
    width: calc(100% - 150px);
    float: left;
  }
  .elm-svg {
    width: 20px;
    float: left;
    cursor: pointer;
  }
  .Custom-STT {
    width: 7%;
  }
  .DVTrongHeThong-TenDVNhan {
    width: 46%;
  }
  .DVTrongHeThong-GuiBanGiay {
    width: 47%;
  }
  .DVNgoaiHeThong-TenDVNhan {
    width: 43%;
  }
  .DVNgoaiHeThong-GuiBanGiay {
    width: 25%;
  }
  .DVNgoaiHeThong-TrangThai {
    width: 25%;
  }
  .NguoiTheoDoiVB-HoVaTen {
    width: 23%;
  }
  .NguoiTheoDoiVB-BanHanh {
    width: 20%;
  }
  .NguoiTheoDoiVB-VaiTro {
    width: 20%;
  }
  .NguoiTheoDoiVB-DonVi {
    width: 30%;
  }
  .ThongTinKyDuyet-HoVaTen {
    width: 33%;
  }
  /* width */
  .content-detail::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  .content-detail::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  .content-detail::-webkit-scrollbar-thumb {
    background: rgb(201, 198, 198);
    border-radius: 5px;
  }

  /* Handle on hover */
  .content-detail::-webkit-scrollbar-thumb:hover {
    background: rgb(163, 163, 163);
  }
}
</style>
