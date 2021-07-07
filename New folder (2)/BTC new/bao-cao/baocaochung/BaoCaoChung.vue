<template>
  <div>
    <GiaiQuyetThuTucHanhChinh v-if="keyData == 'GIAIQUYETTTHC'" />
    <QuanLyCanBo v-if="keyData == 'QLYCANBO'" />
    <ThongKeLichHop v-if="keyData == 'THONGKELICHHOP'" />
    <TinhHinhThucHienNhiemVu v-if="keyData == 'TINHINHTHNV'" />
    <TinhHinhXuLyVanBan v-if="keyData == 'TINHINHXLVB'" />
    <XuLyYKienNguoiDan v-if="keyData == 'XULYYKND'" />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import GiaiQuyetThuTucHanhChinh from './GiaiQuyetThuTucHanhChinh'
// eslint-disable-next-line import/extensions
import QuanLyCanBo from './QuanLyCanBo'
// eslint-disable-next-line import/extensions
import ThongKeLichHop from './ThongKeLichHop'
// eslint-disable-next-line import/extensions
import TinhHinhThucHienNhiemVu from './TinhHinhThucHienNhiemVu'
// eslint-disable-next-line import/extensions
import TinhHinhXuLyVanBan from './TinhHinhXuLyVanBan'
// eslint-disable-next-line import/extensions
import XuLyYKienNguoiDan from './XuLyYKienNguoiDan'

export default {
  components: {
    GiaiQuyetThuTucHanhChinh,
    QuanLyCanBo,
    ThongKeLichHop,
    TinhHinhThucHienNhiemVu,
    TinhHinhXuLyVanBan,
    XuLyYKienNguoiDan,
  },
  props: {
    keyData: {
      type: String,
      default() {
        return 'SKH_DT'
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
