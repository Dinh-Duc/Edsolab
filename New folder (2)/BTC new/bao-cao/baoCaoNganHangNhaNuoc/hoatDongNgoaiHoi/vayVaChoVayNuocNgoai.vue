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
        { name: 'Báo cáo tình hình vay trả nợ nước ngoài ngắn hạn' },
        { name: 'Báo cáo tình hình vay trả nợ nước ngoài trung, dài hạn' },
        {
          name:
            'Báo cáo tình hình vay trả nợ nước ngoài trung, dài hạn theo loại đồng tiền vay',
        },
        {
          name: ' Báo cáo tình hình cho vay và thu hồi vợ nước ngoài ngắn hạn',
        },
        {
          name:
            ' Báo cáo tình hình cho vay và thu hồi vợ nước ngoài trung, dài hạn',
        },
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
