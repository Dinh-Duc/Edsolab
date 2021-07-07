<template>
  <div>
    <iframe
      class="boc-bang-window"
      :src="'http://vione.vais.vn/xac-thuc-khach-xem?meeting_code=' + meetingId"
      title="Cuộc họp trực tuyến"
      allowfullscreen
    />
  </div>
</template>
<script>
import { apiGetLichHopBocBang } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      meetingId: '',
    }
  },
  created() {
    console.log('demo')
    apiGetLichHopBocBang({
      lichHopId: this.item.id,
    }).then(({ data }) => {
      console.log(data)
      if (!data || data.bocBangCode == null) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Thông báo',
            icon: 'CoffeeIcon',
            variant: 'danger',
            text: 'Không tìm thấy cuộc họp',
          },
        })
      }
      this.meetingId = data.bocBangCode
    })
  },
}
</script>
<style>
.boc-bang-window {
  width: 100%;
  height: 34rem;
}
</style>
