<template>
  <div
    class="w-100 h-100 p-2 iframe-bc"
    style="background:#f8f8f8"
  >
    <iframe
      class="inner iframeAP"
      src="https://app.powerbi.com/view?r=eyJrIjoiMTNiZTRlNjgtN2E4Yy00YWY1LTg0ZmEtZGYwYjFkMTE4OTlhIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D"
      frameborder="0"
      width="100%"
      height="100%"
      style="border-radius: 5px"
    />
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
.iframe-bc {
  min-height: 700px;
  iframe{
    min-height: 700px;
  }
}
</style>
