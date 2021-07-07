<template>
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
</template>

<script>
export default {
  props: {
    keyData: String,
    dataItem: Object,
  },
  created() {
    console.log('data item', this.dataItem)
  },
}
</script>
<style lang="scss">
.iframe-bc {
  min-height: 700px;
}
</style>
