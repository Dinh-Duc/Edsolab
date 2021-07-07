<template>
  <div class="form-calendar-dn flex">
    <div>
      <b-row>
        <b-col cols="12">
          <b-form-group label="Nhập tiêu đề *">
            <b-form-input
              v-model="value.title"
              placeholder="Nhập tiêu đề"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          class="button-event mb-1 space-x-10"
        >
          <b-button
            :variant="step === 'step1' ? 'primary' : 'color-custome'"
            @click="selectStep('step1')"
          >
            Sự kiện
          </b-button>
          <b-button
            :variant="step === 'step2' ? 'primary' : 'color-custome'"
            @click="selectStep('step2')"
          >
            Việc cần làm
          </b-button>
          <b-button
            :variant="step === 'step3' ? 'primary' : 'color-custome'"
            @click="selectStep('step3')"
          >
            Lời nhắc
          </b-button>
        </b-col>
        <div
          v-show="step === 'step1'"
          class="w-100"
        >
          <FormEvent
            v-model="value"
            :day-repeat="dayRepeat"
            @changeDayRepeat="dayRepeat = $event"
          />
        </div>
        <div
          v-show="step === 'step2'"
          class="w-100"
        >
          <FormWork v-model="value" />
        </div>
        <div
          v-show="step === 'step3'"
          class="w-100"
        >
          <FormLoiNhac v-model="value" />
        </div>
      </b-row>
    </div>
    <div class="preview-calendar">
      <full-calendar
        ref="refCalendarPreview"
        :options="configCalendar"
        class="full-calendar-preview"
      >
        <template #eventContent="{ event, timeText }">
          <div v-if="event.id==='draft-event'">
            {{ event.end ? timeText : event.title }}
          </div>
          <div v-else>
            {{ event.title }}
          </div>
        </template>
      </full-calendar>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { required, email } from 'vuelidate/lib/validators'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import FormLoiNhac from './FormLoiNhac.vue'
import FormWork from './FormWork.vue'
import FormEvent from './FormEvent.vue'

export default {
  name: 'FormAddEvent',
  components: {
    FormEvent,
    FormWork,
    FormLoiNhac,
    FullCalendar,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    stepForm: {
      type: String,
      default: 'step1',
    },
    events: {
      type: Array,
      required: true,
    },
    dateFrom: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      calendarPreviewApi: null,
      dayRepeat: 1,
    }
  },
  computed: {
    step() {
      return this.stepForm
    },
    configCalendar() {
      const day = new Date()
      const hour = day.getHours()
      const currentHour = `${hour}:00`
      return {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'timeGridDay',
        height: '100%',
        headerToolbar: {
          start: 'title',
          center: '',
          end: 'prev next',
        },
        dayHeaders: false,
        allDayText: '',
        titleFormat: {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        },
        locale: 'vi',
        editable: true,
        dayMaxEvents: 2,
        events: this.eventsold,
        direction: 'ltr',
        rerenderDelay: 250,
        scrollTime: currentHour,
        eventResize: this.onEventResize,
        eventDrop: this.onEventResize,
      }
    },
    eventsold() {
      // eslint-disable-next-line no-var
      var events2 = this.events.map(e => {
        e.backgroundColor = '#e8e8e8'
        e.borderColor = '#e8e8e8'
        e.textColor = '#222222'
        e.color = '#e8e8e8'
        e.overlap = true
        e.editable = false
        e.display = 'background'
        delete e.calendar
        return e
      })
      return events2
    },
    dataform() {
      return this.value
    },
  },
  watch: {
    dayRepeat: {
      handler(val) {
        if (this.calendarPreviewApi) {
          const eventDraft = this.calendarPreviewApi.getEventById('draft-event')
          eventDraft.setProp('title', this.setTitleEventAllday(eventDraft.start, val))
        }
        if (val > 1) {
          this.dataform.dateTo = moment(this.dataform.dateFrom).add(val, 'days').format('YYYY-MM-DD')
        }
      },
    },
  },
  mounted() {
    this.calendarPreviewApi = this.$refs.refCalendarPreview.getApi()
    this.$store.dispatch(
      'lichlamviec/getCalendarPreview',
      this.calendarPreviewApi,
    )
    this.calendarPreviewApi.gotoDate(this.dateFrom)
    this.addEventDraft()
  },
  methods: {
    selectStep(step) {
      this.step = step
      this.$emit('update:stepForm', step)
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onEventResize(info) {
      // eslint-disable-next-line no-underscore-dangle
      if (this.isAnOverlapEvent(this.eventsold, info.event)) {
        info.event.setProp('color', '#eb5f63')
      } else {
        info.event.setProp('color', '#48c471')
      }
      const endTime = `${String(new Date(info.event.end).getHours()).padStart(
        2,
        '0',
      )}:${String(new Date(info.event.end).getMinutes()).padStart(2, '0')}`
      const startTime = `${String(
        new Date(info.event.start).getHours(),
      ).padStart(2, '0')}:${String(
        new Date(info.event.start).getMinutes(),
      ).padStart(2, '0')}`
      this.dataform.timeFrom = startTime
      this.dataform.timeTo = endTime
    },
    convertDate(date, format) {
      const dd = String(date.getDate()).padStart(2, '0')
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const yyyy = date.getFullYear()
      let hour = String(date.getHours()).padStart(2, '0')
      let minutes = '00'
      if (date.getMinutes() > 0 && date.getMinutes() < 30) {
        minutes = '30'
      } else if (date.getMinutes() > 30 && date.getMinutes() <= 59) {
        minutes = '00'
        hour = String(date.getHours() + 1).padStart(2, '0')
      } else {
        minutes = String(date.getMinutes()).padStart(2, '0')
      }
      if (format === 'hh:mm') {
        return `${hour}:${minutes}`
      }
      if (format === 'YYYY-mm-dd') {
        return `${yyyy}-${mm}-${dd}`
      }
      return `${yyyy}-${mm}-${dd}T${hour}:${minutes}`
    },
    convertDateWithFurture(currentTime, furtureTime) {
      const dd = String(furtureTime.getDate()).padStart(2, '0')
      const mm = String(furtureTime.getMonth() + 1).padStart(2, '0')
      const yyyy = furtureTime.getFullYear()
      let hour = String(currentTime.getHours()).padStart(2, '0')
      let minutes = '00'
      if (currentTime.getMinutes() > 0 && currentTime.getMinutes() < 30) {
        minutes = '30'
      } else if (
        currentTime.getMinutes() > 30
        && currentTime.getMinutes() <= 59
      ) {
        minutes = '00'
        hour = String(currentTime.getHours() + 1).padStart(2, '0')
      } else {
        minutes = String(currentTime.getMinutes()).padStart(2, '0')
      }
      return `${yyyy}-${mm}-${dd}T${hour}:${minutes}`
    },
    isAnOverlapEvent(events, eventToCheck) {
      // eslint-disable-next-line no-useless-catch
      try {
        if (eventToCheck.startStr && eventToCheck.endStr) {
          for (let i = 0; i < events.length; i += 1) {
            const eventA = events[i]
            // start-time in between any of the events
            if (
              moment(eventToCheck.startStr).isAfter(eventA.start)
              && moment(eventToCheck.startStr).isBefore(eventA.end)
            ) {
              return true
            }
            // end-time in between any of the events
            if (
              moment(eventToCheck.endStr).isAfter(eventA.start)
              && moment(eventToCheck.endStr).isBefore(eventA.end)
            ) {
              return true
            }
            // any of the events in between/on the start-time and end-time
            if (
              moment(eventToCheck.startStr).isSameOrBefore(eventA.start)
              && moment(eventToCheck.endStr).isSameOrAfter(eventA.end)
            ) {
              return true
            }
          }
          return false
        }
        const error = 'Lỗi check isAnOverlapEvent'
        throw new Error(error)
      } catch (error) {
        throw error
      }
    },
    addEventDraft() {
      const currentTime = new Date()
      const endTime = new Date(currentTime.getTime() + 30 * 60 * 1000)
      this.dataform.dateFrom = this.convertDate(this.dateFrom, 'YYYY-mm-dd')
      this.dataform.timeFrom = this.convertDate(currentTime, 'hh:mm')
      this.dataform.timeTo = this.convertDate(endTime, 'hh:mm')
      const defaultEvent = {
        id: 'draft-event',
        title: moment(this.convertDateWithFurture(currentTime, this.dateFrom)).locale('vi').format('dd D/MM/YYYY'),
        start: this.convertDateWithFurture(currentTime, this.dateFrom),
        end: this.convertDateWithFurture(endTime, this.dateFrom),
        overlap: true,
        color: '#48c471',
        textColor: '#000',
        editable: true,
        allDay: false,
      }
      if (
        this.isAnOverlapEvent(this.eventsold, {
          startStr: this.convertDateWithFurture(currentTime, this.dateFrom),
          endStr: this.convertDateWithFurture(endTime, this.dateFrom),
        })
      ) {
        defaultEvent.color = '#eb5f63'
      }
      this.calendarPreviewApi.addEvent(defaultEvent)
      setTimeout(() => {
        this.calendarPreviewApi.updateSize()
      }, 200)
    },
    setTitleEventAllday(daystart, dayrepeat) {
      if (dayrepeat > 1) {
        return `${moment(daystart).locale('vi').format('dd D/MM/YYYY')} - ${moment(daystart).locale('vi').add(dayrepeat, 'days').format('dd D/MM/YYYY')}`
      }
      return `${moment(daystart).locale('vi').format('dd D/MM/YYYY')}`
    },
  },
  validations: {
    form: {
      title: {
        required,
        email,
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.preview-calendar {
  min-width: 300px;
  margin-top: 30px;
  padding-left: 15px;
}
.form-calendar-dn {
  .btn-color-custome {
    border: 1px solid #eaeef5;
    border-radius: 6px;
    background: #eaeef5;
    outline: none;
    &.active {
      background: #5a8dee;
      border-color: #5a8dee;
      color: #fff;
      outline: none;
    }
  }
}
</style>
