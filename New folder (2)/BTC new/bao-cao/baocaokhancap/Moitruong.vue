<template>
  <div class="w-100 h-100 p-2 iframe-bc">
    <iframe
      class="inner iframeAP"
      src="https://app.powerbi.com/view?r=eyJrIjoiMmZmYTc2NWUtYmM1Ni00ZThmLWI3ODEtYzhjYjRhMWYzYTNiIiwidCI6IjY4ZTQxNzUxLTgwZDMtNDE4My1hZjdiLWE1YzQyMTJiZGZlNSIsImMiOjEwfQ%3D%3D"
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
    .iframe-bc{
        min-height: 700px;
      iframe{
        min-height: 700px;
      }
    }
</style>
