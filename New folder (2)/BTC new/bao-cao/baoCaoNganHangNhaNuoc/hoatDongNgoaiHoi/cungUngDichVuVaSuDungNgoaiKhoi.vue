<template>
  <div class="wrap-content_25-06">
    <div
      v-for="(i, key) in listData"
      :key="key"
      class="item"
    >
      <img :src="iconFile">
      <p v-text="i.name" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      iconFile: require('@/assets/images/baocao/nhnn_file.svg'),
      listData: [
        { name: 'Báo cáo doanh số thanh toán xuất nhập khẩu hàng hóa, dịch vụ phân theo các loại ngoại tệ' },
        { name: 'Báo cáo doanh số thanh toán xuất nhập khẩu hàng hóa và dịch vụ với các nước có chung biên giới' },
        { name: 'Báo cáo chuyển tiền từ nước ngoài cho các cá nhân Người cư trú của Việt Nam' },
        { name: 'Báo cáo chuyển ngoại tệ ra nước ngoài của Người cư trú là người Việt Nam' },
        { name: 'Báo cáo doanh số xuất nhập khẩu ngoại tệ tiền mặt của các tổ chức tín dụng được phép' },
        { name: 'Báo cáo doanh số mua bán ngoại tệ với VND giữa tổ chức tín dụng và khách hàng' },
        { name: 'Báo cáo doanh số mua, bán ngoại tệ với VND giữa tổ chức tín dụng và khách hàng (quy USD)' },
        { name: 'Báo cáo doanh số mua, bán ngoại tệ tiền mặt với cá nhân' },
        { name: 'Báo cáo doanh số mua, bán ngoại tệ với VND của toàn hệ thống và nhà đầu tư gián tiếp' },
        { name: 'Báo cáo đầu tư tiền gửi tại các ngân hàng nước ngoài' },
        { name: 'Báo cáo về tình hình tiền gửi ở nước ngoài của các ngân hàng thương mại, chi nhánh ngân hàng nước ngoài được phép hoạt động ngoại hối' },
      ],
    }
  },
  mounted() {
    if (window.tag) window.tag.style.background = '#fff'
    if(window.tagBack) window.tagBack.style.display = 'none'
  },
  beforeDestroy() {
    if (window.tag) window.tag.style = ''
    if(window.tagBack) window.tagBack.style = ''
  }
}
</script>

<style></style>

<style lang="scss" scoped>
.wrap-content_25-06 {
  padding-left: 1em;
  .item {
    display: flex;
    align-items: center;
    margin: 1.5em 0;
    p {
      margin: 0;
      margin-left: 1em;
    }
  }
}
</style>
