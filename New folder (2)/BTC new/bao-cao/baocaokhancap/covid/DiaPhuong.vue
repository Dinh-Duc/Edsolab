<template>
  <div class="w-100 h-100 p-2 iframe-bc">
    <iframe
      class="inner iframeAP"
      :src="srcLink"
      frameborder="0"
      width="100%"
      height="100%"
      style="border-radius: 5px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcLink: '',
    }
  },
  mounted() {
    const covidDP = JSON.parse(localStorage.getItem('covidDP'))

    this.srcLink = covidDP.href
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
