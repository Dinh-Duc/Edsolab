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
        { name: 'Báo cáo các chỉ tiêu liên quan đến tỷ lệ khả năng chi trả' },
        { name: 'Báo cáo tài sản có tính thanh khoản cao' },
        { name: 'Báo cáo thanh khoản theo thời gian đến hạn' },
        { name: 'Báo cáo dòng tiền ra' },
        { name: 'Báo cáo dòng tiền vào' },
        { name: 'Báo cáo các chỉ tiêu liên quan đến dư nợ cho vay so với tổng tiền gửi' },
        { name: 'Báo cáo các chỉ tiêu xác định tỷ lệ tối đa nguồn vốn ngắn hạn được sử dụng để cho vay trung và dài hạn' },
        { name: 'Báo cáo tài sản có rủi ro riêng lẻ' },
        { name: 'Báo cáo tài sản có rủi ro hợp nhất' },
        { name: 'Báo cáo vốn tự có riêng lẻ' },
        { name: 'Báo cáo vốn tự có hợp nhất' },
        { name: 'Báo cáo giá trị thực của vốn điều lệ, vốn được cấp' },
        { name: 'Báo cáo về cấp tín dụng đối với một khách hàng, một khách hàng và người có liên quan' },
        { name: 'Báo cáo về cấp tín dụng đối với các đối tượng thuộc Điều 126 và Điều 127 Luật Các tổ chức tín dụng 2010' },
        { name: 'Báo cáo dư nợ và số dư tiền gửi của các khách hàng lớn nhất' },
        { name: 'Báo cáo thông tin về khách hàng' },
        { name: 'Báo cáo thông tin về khoản cấp tín dụng' },
        { name: 'Báo cáo tình hình xử lý tài sản bảo đảm' },
        { name: 'Báo cáo thông tin về bảo lãnh' },
        { name: 'Báo cáo số tiền phải trả và phải thu từ các bên liên quan' },
        { name: 'Báo cáo số dư tài khoản các khoản phải thu của các tổ chức tín dụng' },
        { name: 'Báo cáo rủi ro tiền tệ' },
        { name: 'Báo cáo rủi ro thanh khoản' },
        { name: 'Báo cáo rủi ro lãi suất' },
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
