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
        { name: 'Báo cáo thông tin về chi nhánh, công ty con, công ty liên kết hoạt động trong nước và nước ngoài của tổ chức tín dụng' },
        { name: 'Báo cáo giao dịch vốn giữa ngân hàng mẹ và từng chi nhánh, công ty con, công ty liên kết ở nước ngoài' },
        { name: 'Báo cáo quan hệ tài chính giữa tổ chức tín dụng và từng chi nhánh, công ty con, công ty liên kết ở nước ngoài' },
        { name: 'Báo cáo quan hệ tài chính giữa tổ chức tín dụng và từng chi nhánh, công ty con, công ty liên kết ở nước ngoài' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết (không phải là ngân hàng, công ty tài chính, công ty cho thuê tài chính) ở nước ngoài của tổ chức tín dụng Việt Nam' },
        { name: 'Báo cáo phân loại nợ của các chi nhánh, công ty con, công ty liên kết (là tổ chức tín dụng) hoạt động ở nước ngoài của các tổ chức tín dụng Việt Nam' },
        { name: 'Báo cáo cho vay, đầu tư, góp vốn đối với khách hàng lớn của chi nhánh, công ty con, công ty liên kết ở nước ngoài' },
        { name: 'Báo cáo quan hệ tài chính giữa tổ chức tín dụng và từng công ty con, công ty liên kết trong nước' },
        { name: 'Báo cáo quan hệ tài chính giữa tổ chức tín dụng và từng công ty con, công ty liên kết trong nước' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết (không phải là ngân hàng, công ty tài chính, công ty cho thuê tài chính, công ty chứng khoán, công ty quản lý quỹ, công ty bảo hiểm) trong nước của tổ chức tín dụng' },
        { name: 'Báo cáo một số chỉ tiêu tài sản của các công ty con, công ty liên kết (không phải là ngân hàng, công ty tài chính, công ty cho thuê tài chính, công ty chứng khoán, công ty quản lý quỹ, công ty bảo hiểm) trong nước của tổ chức tín dụng' },
        { name: 'Báo cáo một số chỉ tiêu kết quả hoạt động kinh doanh của các công ty con, công ty liên kết (không phải là ngân hàng, công ty tài chính, công ty cho thuê tài chính, công ty chứng khoán, công ty quản lý quỹ, công ty bảo hiểm) trong nước của tổ chức tín dụng' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty chứng khoán' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty chứng khoán' },
        { name: 'Báo cáo một số chỉ tiêu tài sản của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty chứng khoán' },
        { name: 'Báo cáo một số chỉ tiêu kết quả hoạt động kinh doanh của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty chứng khoán' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty quản lý quỹ' },
        { name: 'Báo cáo một số chỉ tiêu tài sản của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty quản lý quỹ' },
        { name: 'Báo cáo một số chỉ tiêu kết quả hoạt động kinh doanh của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty quản lý quỹ' },
        { name: 'Báo cáo một số chỉ tiêu nguồn vốn của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty bảo hiểm' },
        { name: 'Báo cáo một số chỉ tiêu tài sản của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty bảo hiểm' },
        { name: 'Báo cáo một số chỉ tiêu kết quả hoạt động kinh doanh của các công ty con, công ty liên kết trong nước của tổ chức tín dụng là công ty bảo hiểm' },
        { name: 'Báo cáo thu nhập và chi phí phát sinh từ giao dịch với các bên liên quan' },
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
