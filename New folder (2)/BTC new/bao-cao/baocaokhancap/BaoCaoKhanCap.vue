<template>
  <div>
    <TongHop v-if="keyData == 'TongHop'" />
    <TinhHinhCoVid
      v-if="keyData == 'Covid'"
      :key-child="keyData2"
    />
    <AnNinhTratTuXaHoi v-if="keyData == 'ANNINHTTXH'" />
    <Moitruong v-if="keyData == 'MOITRUONG'" />
    <TruyenThongMXH v-if="keyData == 'MXH_BC'" />
  </div>
</template>

<script>
import TongHop from './TongHop.vue'
import TinhHinhCoVid from './covid/TinhHinhCoVid.vue'
import AnNinhTratTuXaHoi from './AnNinhTratTuXaHoi.vue'
import Moitruong from './Moitruong.vue'
import TruyenThongMXH from './TruyenThongMXH.vue'

export default {
  components: {
    TongHop,
    TinhHinhCoVid,
    AnNinhTratTuXaHoi,
    Moitruong,
    TruyenThongMXH,
  },
  props: {
    keyData: {
      type: String,
      default() {
        return ''
      },
    },
    keyData2: {
      type: String,
      default() {
        return ''
      },
    },
  },
  watch: {
    keyData() {
    },
  },
}
</script>

<style lang="scss" scoped></style>
