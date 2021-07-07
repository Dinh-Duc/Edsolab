<template>
  <div>
    <PhongTongHopNoiChinh v-if="!dataItem.href" />
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
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import PhongTongHopNoiChinh from './PhongTongHopNoiChinh'

export default {
  components: {
    PhongTongHopNoiChinh,
  },
  props: {
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
