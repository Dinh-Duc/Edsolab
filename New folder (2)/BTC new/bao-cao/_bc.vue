<template>
  <div class="w-100 h-100 py-2 iframe-bc">
    <div v-if="listImages[dataItem.image]">
      <img
        :src="listImages[dataItem.image]"
        style="width: 100%"
      >
    </div>
    <iframe
      v-else-if="typeof dataItem === 'object' && dataItem.href"
      class="inner iframeAP"
      :src="dataItem.href"
      frameborder="0"
      width="100%"
      height="100%"
      style="border-radius: 5px"
    />
    <div v-else>
      Chưa có dữ liệu
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['dataItem'],
  data() {
    return {
      listImages: {
        bctq: require('@/assets/images/baocao/bao-cao-tong-quan.png'),
        bctts: require('@/assets/images/baocao/bao-cao-tong-tai-san.png'),
        bcnptvvcsh: require('@/assets/images/baocao/bao-cao-no-phai-tra.png'),
        bcblvck: require('@/assets/images/baocao/bao-cao-bao-lanh-va-cam-ket.png'),
        bckqhdkdhn: require('@/assets/images/baocao/bao-cao-ket-qua-hoat-dong-kinh-doanh.png'),
        bclctthn: require('@/assets/images/baocao/bao-cao-luu-chuyen-tien-te-hop-nhat.png'),
      },
    }
  },
}
</script>
<style lang="scss">
.iframe-bc {
  min-height: 700px;
}
</style>
