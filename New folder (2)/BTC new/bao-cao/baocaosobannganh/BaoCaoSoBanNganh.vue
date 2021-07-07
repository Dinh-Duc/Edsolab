<template>
  <div>
    <!-- <SoKeHoachVaDauTu /> -->
    <div v-if="dataItem.href">
      <div
        class="w-100 h-100 p-2 iframe-bc"
        style="background:#f8f8f8"
      >
        <iframe
          class="inner iframeAP"
          :src="dataItem.href"
          frameborder="0"
          width="100%"
          height="100%"
          style="border-radius: 5px"
        />
      </div>
    </div>
    <div
      v-else
      class="p-2"
    >
      Chưa có dữ liệu
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
// import SoKeHoachVaDauTu from './SoKeHoachVaDauTu'

export default {
  components: {
    // SoKeHoachVaDauTu,
  },
  props: {
    keyData: {
      type: String,
      default() {
        return 'SKH_DT'
      },
    },
    dataItem: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.iframe-bc {
  min-height: 700px;
  iframe {
    min-height: 700px;
  }
}
</style>
