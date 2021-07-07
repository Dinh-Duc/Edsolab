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
        { name: 'Báo cáo góp vốn, mua cổ phần của tổ chức tín dụng vào các doanh nghiệp' },
        { name: 'Báo cáo góp vốn, mua cổ phần của tổ chức tín dụng và công ty con, công ty liên kết vào một doanh nghiệp' },
        { name: 'Báo cáo các khoản đầu tư góp vốn dài hạn của công ty con' },
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
