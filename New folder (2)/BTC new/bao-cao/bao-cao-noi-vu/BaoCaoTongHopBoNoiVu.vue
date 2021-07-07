<template>
  <div>
    <b-row class="">
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.toChucBienChe" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.toChucPhiChinhPhu" />
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.congChucVienChuc" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.congTacThanhNien" />
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.tonGiaoTinNguong" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.thiDuaKhenThuong" />
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.vanThuLuuTru" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.thanhTra" />
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.chinhQuyenDiaPhuong" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.daoTaoBoiDuong" />
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.tienLuong" />
        </iq-card>
      </b-col>
      <b-col
        xl="6"
        sm="6"
      >
        <iq-card>
          <BaoCaoBoxCommon :data="data.caiCachHanhChinh" />
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
/* eslint-disable */
import IqCard from '@core/components/cards/iq-card.vue'
// eslint-disable-next-line import/extensions
import BaoCaoBoxCommon from './BaoCaoBoxCommon.vue'

export default {
  name: 'BaoCaoTongHopBoNoiVu',
  components: {
    BaoCaoBoxCommon,
    IqCard
  },
  data() {
    return {
      data: {
        toChucBienChe: {
          title: 'Tổ chức biên chế',
          data: [
            {
              name: 'Biên chế công chức Bộ, ngành TƯ',
              value: '106.836',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Biên chế công chức địa phương',
              value: '140.508',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Biên chế sự nghiệp Bộ, ngành TƯ',
              value: '116.698',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Biên chế sự nghiệp địa phương',
              value: '1.666.476',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Cán bộ, công chức cấp xã',
              value: '1.031.851',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Người HĐ không chuyên trách cấp xã',
              value: '171.894',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        congChucVienChuc: {
          title: 'Công chức, viên chức',
          data: [
            {
              name: 'Số biên chế công chức trong các cơ quan, TCHC nhà nước',
              value: '247.344',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số Biên chế sự nghiệp',
              value: '1.783.174',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name:
                'Số lượng CBCC cấp xã và số người hoạt động không chuyên trách ở cấp xã, thôn',
              value: '1.031.851',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        toChucPhiChinhPhu: {
          title: 'Tổ chức phi chính phủ',
          data: [
            {
              name: 'Số lượng hội cho phép thành lập mới',
              value: '53',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00BA63',
            },
            {
              name: 'Số lượng quỹ cho phép thành lập mới',
              value: '22',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00BA63',
            },
            {
              name: 'Số lượng hội, tổ chức bị thu hồi giấy phép',
              value: '2',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#E31616',
            },
            {
              name: 'Số lượng hội, tổ chức bị thu hồi giấy phép',
              value: '2',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số lượng hội, tổ chức bị giải thể',
              value: '2',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#E31616',
            },
          ],
        },
        vanThuLuuTru: {
          title: 'Văn thư Lưu trữ',
          data: [
            {
              name: 'Tổng số văn bản đi',
              value: '290.103',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Tổng số văn bản đến',
              value: '111.8852',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name: 'Số hồ sơ đã lập trong năm',
              value: '1.111.867',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số tài liệu đã chỉnh lý hoàn chỉnh',
              value: '124.516',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        congTacThanhNien: {
          title: 'Công tác Thanh niên',
          data: [
            {
              name: 'Số tri thức trẻ hiện có',
              value: '543',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số tri thức trẻ đã được bố trí công tác',
              value: '506',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name:
                'Tổng số trí thức trẻ được quy hoạch vào các vị trí lãnh đạo, quản lý',
              value: '305',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        thiDuaKhenThuong: {
          title: 'Thi đua - Khen thưởng',
          data: [
            {
              name: 'Số huân chương Hồ Chí Minh',
              value: '6',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số Huân chương Độc lập hạng Nhất',
              value: '19',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số Huân chương Độc lập hạng Nhì',
              value: '54',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name: 'Số Huân chương Độc lập hạng Ba',
              value: '404',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số Huân chương Lao động hạng Nhất',
              value: '307',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số Huân chương Lao động hạng Nhì',
              value: '816',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        tonGiaoTinNguong: {
          title: 'Tôn giáo, Tín ngưỡng',
          data: [
            {
              name: 'Số lượng tôn giáo',
              value: '16',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số lượng tổ chức tôn giáo',
              value: '36',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số lượng tổ chức tôn giáo được cấp giấy HĐTG',
              value: '5',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số lượng chức sắc tôn giáo',
              value: '58.104',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số lượng cơ sở thờ tự',
              value: '29.801',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        thanhTra: {
          title: 'Thanh tra',
          data: [
            {
              name: 'Tổng số lần kiểm tra hành chính',
              value: '48.393',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Tổng số lần kiểm tra chuyên ngành',
              value: '34.242',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Tổng số kết quả thanh tra đã ban hành',
              value: '52.435',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        chinhQuyenDiaPhuong: {
          title: 'Chính quyền địa phương',
          data: [
            {
              name: 'Số lượng đơn vị hành chính cấp tỉnh',
              value: '63',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name: 'Số lượng đơn vị hành chính cấp huyện',
              value: '705',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số lượng đơn vị hành chính cấp xã',
              value: '10.603',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số lượng thôn, tổ dân phố',
              value: '98.455',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Số lượng Đại biểu UBND các cấp',
              value: '1.526',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số lượng Đại biểu HĐND các cấp',
              value: '3.774',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        daoTaoBoiDuong: {
          title: 'Đào tạo, bồi dưỡng cán bộ công chức',
          data: [
            {
              name: 'Số CBCC TƯ được đào tạo bồi dưỡng',
              value: '130.000',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name:
                'Số cán bộ, công chức hành chính cấp tỉnh được đào tạo, bồi dưỡng',
              value: '300',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name:
                'Số cán bộ, công chức hành chính cấp huyện trở lên được đào tạo, bồi dưỡng',
              value: '14.000',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Số cán bộ, công chức cấp xã được đào tạo, bồi dưỡng',
              value: '197.000',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name:
                'Số viên chức trong các đơn vị sự nghiệp công lập trong cả nước được đào tạo, bồi dưỡng',
              value: '1.160.000',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
          ],
        },
        tienLuong: {
          title: 'Tiền lương',
          data: [
            {
              name: 'Tiền lương bình quân năm CBCC cấp tỉnh',
              value: '5,96 tr',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Tiền lương bình quân năm CBCC cấp huyện',
              value: '5,36 tr',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Tiền lương bình quân năm CBCC đơn vị sự nghiệp',
              value: '5,28 tr',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
            {
              name: 'Tiền lương bình quân năm CBCC cấp xã',
              value: '5,17 tr',
              isDownGreen: false,
              isDownRed: false,
              isUp: false,
              color: '#FFA902',
            },
          ],
        },
        caiCachHanhChinh: {
          title: 'Cải cách hành chính',
          data: [
            {
              name: 'Chỉ số trung bình cải cách hành chính (Par Index)',
              value: '81.02%',
              isDownGreen: false,
              isDownRed: true,
              isUp: false,
              color: '#e31616',
            },
            {
              name: 'Chỉ số trung bình cải cách tổ chức bộ máy',
              value: '68.44%',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
            {
              name: 'Chỉ số hài lòng trung bình của người dân (Sipas)',
              value: '79.8%',
              isDownGreen: false,
              isDownRed: false,
              isUp: true,
              color: '#00ba63',
            },
          ],
        },
      },
    }
  },
}
</script>
<style lang="scss"></style>
