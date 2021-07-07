<template>
  <div class="calendar-su-kien">
    <FullCalendar
      ref="refCalendar"
      :options="calendarOptions"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: false,
        allDayText: 'Cả ngày',
        events: [
          {
            title: 'Lịch họp số 1',
            start: '2021-05-19 08:20:20',
            end: '2021-05-19 12:20:21',
          },
          {
            title: 'Lịch họp số 2',
            start: '2021-05-19 07:20:20',
            end: '2021-05-19 09:20:21',
          },
        ],
      },
    }
  },
  mounted() {
    const calendarApi = this.$refs.refCalendar.getApi()
    setTimeout(() => {
      calendarApi.updateSize()
    }, 50)
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
.calendar-su-kien {
  width: 100%;
  float: left;
  margin-top: 35px;
}
.custom-ketnoi-pop {
  .modal-header {
    background: white !important;
    display: none;
  }
  .modal-footer {
    display: none;
  }
}
</style>
