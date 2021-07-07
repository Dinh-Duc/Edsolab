<template>
  <div class="app-calendar border overflow-hidden">
    <div class="flex h-full w-full">
      <!-- Sidebar -->
      <div
        class="app-calendar-sidebar"
        :class="{ show: isCalendarOverlaySidebarActive }"
      >
        <calendar-sidebar
          :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive"
          :is-event-handler-type-calendar-active.sync="
            isEventHandlerTypeCalendarActive
          "
          :events="ListEvents"
          :calendar-api="calendarApi"
          @changeTitle="title = $event"
          @typeView="typeView = $event"
          @timeSelect="timeSelect = $event"
        />
      </div>

      <!-- Calendar -->
      <div class="position-relative flex-1">
        <div class="h-full flex flex-column">
          <div class="header-calendar d-flex align-items-center">
            <div
              class="nav-link sidebartoggle-calendar"
              @click="isCalendarOverlaySidebarActive = true"
            >
              <feather-icon
                icon="MenuIcon"
                size="21"
              />
            </div>
            <div
              class="today-button"
              @click="calendarToday"
            >
              Hôm nay
            </div>
            <div class="title-calendar flex items-center">
              <div>{{ title }}</div>
              <div
                class="title-calendar__prev"
                @click="calendarPrev"
              >
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33735 12.5636L1 6.78182L7.33735 1"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                class="title-calendar__next"
                @click="calendarNext"
              >
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.00005 12.5636L7.3374 6.78182L1.00005 1"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              v-show="isActiveSearch"
              class="search-calendar_content flex items-center space-x-10"
            >
              <div
                class="search-calendar_content-wrapper flex items-center border space-x-10 flex-1"
              >
                <div class="search-calendar__btn">
                  <svg
                    v-svg
                    symbol="icon-search"
                    size="20 20"
                  />
                </div>
                <input
                  ref="inputsearch_calendar"
                  placeholder="Tìm kiếm"
                  class="border-none flex-1"
                >
              </div>
              <div
                class="cursor-pointer"
                @click="isActiveSearch = false"
              >
                <svg
                  v-svg
                  symbol="icon-closed"
                  size="16 16"
                />
              </div>
            </div>
            <div class="search-calendar ml-auto">
              <div
                class="search-calendar__btn"
                @click="showSearchCalendar()"
              >
                <svg
                  v-svg
                  symbol="icon-search"
                  size="20 20"
                />
              </div>
            </div>
            <div class="typeview-calendar groupbtn-calendar">
              <div
                class="groupbtn-calendar__item"
                :class="{ active: typeView === 'list' }"
                @click="typeView = 'list'"
              >
                <svg
                  v-svg
                  symbol="icon-list"
                  size="16 16"
                />
              </div>
              <div
                class="groupbtn-calendar__item"
                :class="{ active: typeView === 'grid' }"
                @click="typeView = 'grid'"
              >
                <svg
                  v-svg
                  symbol="icon-grid"
                  size="18 18"
                />
              </div>
            </div>
            <div class="timeview-calendar groupbtn-calendar">
              <div
                class="groupbtn-calendar__item"
                :class="{ active: timeSelect === 'day' }"
                @click="timeSelect = 'day'"
              >
                Ngày
              </div>
              <div
                class="groupbtn-calendar__item"
                :class="{ active: timeSelect === 'week' }"
                @click="timeSelect = 'week'"
              >
                Tuần
              </div>
              <div
                class="groupbtn-calendar__item"
                :class="{ active: timeSelect === 'month' }"
                @click="timeSelect = 'month'"
              >
                Tháng
              </div>
            </div>
          </div>
          <div
            v-if="false"
            class="summary-calendar d-flex align-items-center space-x-28"
          >
            <div class="summary-calendar__item w-3/12">
              <div class="summary-calendar__title">
                Lịch hiện có của đơn vị
              </div>
              <div class="summary-calendar__count">
                8
              </div>
            </div>
            <div class="summary-calendar__item w-3/12">
              <div class="summary-calendar__title">
                Lịch hiện có của cá nhân
              </div>
              <div class="summary-calendar__count">
                10
              </div>
            </div>
            <div class="summary-calendar__item w-3/12">
              <div class="summary-calendar__title">
                Lịch trùng
              </div>
              <div class="summary-calendar__count">
                0
              </div>
            </div>
            <div class="summary-calendar__item w-3/12">
              <div class="summary-calendar__title">
                Lịch sắp tới
              </div>
              <div class="summary-calendar__count">
                1
              </div>
            </div>
          </div>
          <full-calendar
            ref="refCalendar"
            :options="config"
            class="full-calendar flex-1"
          >
            <template #moreLinkContent="{ num }">
              +{{ num }} lịch làm việc
            </template>
            <template #noEventsContent>
              Không có lịch làm việc !
            </template>
            <template #eventContent="{ event, view }">
              <div class="space-y-12">
                <div
                  class="font-bold text-13px flex items-center overflow-hidden"
                >
                  <div class="cursor-pointer whitespace-nowrap">
                    {{ event.title }}
                  </div>
                  <div
                    v-if="
                      view.type === 'listDay' ||
                        view.type === 'listWeek' ||
                        view.type === 'listMonth'
                    "
                    class="event-actions ml-auto"
                  >
                    <div
                      class="cursor-pointer"
                      @click="deleteEvent(event)"
                    >
                      <svg
                        v-svg
                        symbol="icon-delete"
                        size="18 18"
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    view.type === 'listDay' ||
                      view.type === 'listWeek' ||
                      view.type === 'listMonth'
                  "
                  class="space-y-12 event-list-info"
                >
                  <div
                    v-if="event.extendedProps.description"
                    class="space-x-18"
                  >
                    <svg
                      v-svg
                      symbol="icon-union"
                      size="18 12"
                    />
                    <span>{{ event.extendedProps.description }}</span>
                  </div>
                  <div
                    v-if="event.extendedProps.address"
                    class="space-x-18"
                  >
                    <svg
                      v-svg
                      symbol="icon-point-map"
                      size="18 18"
                    />
                    <span>{{ event.extendedProps.address }}</span>
                  </div>
                  <div
                    v-if="event.extendedProps.user"
                    class="space-x-18"
                  >
                    <svg
                      v-svg
                      symbol="icon-user"
                      size="18 12"
                    />
                    <span>{{ event.extendedProps.user }}</span>
                  </div>
                </div>
              </div>
            </template>
          </full-calendar>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />

      <b-modal
        id="modal-choosen-type-calendar"
        centered
        scrollable
        size="lg"
        modal-class="modal-calendar custom-form-model-dn"
        :no-close-on-backdrop="true"
        :draggable="true"
        @hidden="isEventHandlerTypeCalendarActive = false"
      >
        <template #modal-footer>
          <div class="flex items-center space-x-18 custom-bottom-model-button">
            <div
              class="cursor-pointer btn btn-primary flex items-center button-custom-model"
              @click="handlerSteps('select-type')"
            >
              Chọn
            </div>
          </div>
        </template>
        <template #modal-header-close>
          <svg
            v-svg
            symbol="icon-closed"
            size="16 16"
          />
        </template>
        <div class="flex items-center justify-content-between pt-2">
          <b-form-radio
            v-model="typecalendar"
            name="typecalendar"
            value="bfa0c6db-01c5-4836-bc13-4e41fd32108b"
          >
            Lịch làm việc
          </b-form-radio>
          <b-form-radio
            v-model="typecalendar"
            name="typecalendar"
            value="a0602d4e-d4cb-4259-a7ea-0260360852f3"
          >
            Lịch công tác trong nước
          </b-form-radio>
          <b-form-radio
            v-model="typecalendar"
            name="typecalendar"
            value="1cc5fd91-a580-4a2d-bbc5-7ff3c2c3336e"
          >
            Lịch công tác nước ngoài
          </b-form-radio>
          <b-form-radio
            v-model="typecalendar"
            name="typecalendar"
            value="adc8a37f-c8e5-44b5-bcad-8f1cbe4921f7"
          >
            Lịch tiếp dân
          </b-form-radio>
        </div>
      </b-modal>

      <b-modal
        id="modal-event-add"
        scrollable
        size="lg"
        modal-class="modal-calendar custom-form-model-dn"
        :no-close-on-backdrop="true"
        @hidden="hiddenModals()"
      >
        <template #modal-footer>
          <div
            class="flex items-center space-x-18 custom-bottom-model-button m-0"
          >
            <div
              class="cursor-pointer btn btn-default flex items-center button-custom-model"
              @click="
                $bvModal.hide('modal-event-add')
                $bvModal.hide('modal-choosen-type-calendar')
              "
            >
              Hủy
            </div>
            <div
              v-if="stepForm === 'step3'"
              class="cursor-pointer btn btn-primary flex items-center button-custom-model"
              @click="addSchedules(dataForm)"
            >
              Lưu
            </div>
            <div
              v-if="stepForm !== 'step3'"
              class="cursor-pointer btn btn-primary flex items-center button-custom-model"
              @click="nextStep()"
            >
              Chọn
            </div>
          </div>
        </template>
        <template #modal-header-close>
          <svg
            v-svg
            symbol="icon-closed"
            size="16 16"
          />
        </template>
        <FormAddEvent
          v-model="dataForm"
          :step-form.sync="stepForm"
          :events="ListEvents"
          :date-from="dateFrom"
        />
      </b-modal>

      <b-modal
        id="modal-event-detail"
        centered
        scrollable
        size="lg"
        modal-class="modal-calendar"
      >
        <div v-if="eventDetail && eventDetail.title">
          <div class="event-title font-bold">
            {{ eventDetail.title }}
          </div>
          <div class="event-info space-y-12">
            <div class="flex items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-user"
                  size="18 16"
                /><span>Lãnh đạo tham dự:</span>
              </div>
              <div>{{ eventDetail.extendedProps.user }}</div>
            </div>
            <div class="flex items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-group-user"
                  size="18 15"
                /><span>Thành phần tham dự:</span>
              </div>
              <div>
                {{
                  eventDetail.extendedProps.userjoin
                    ? eventDetail.extendedProps.userjoin
                    : 'Chưa xác định'
                }}
              </div>
            </div>
            <div class="flex items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-calendar"
                  size="18 15"
                /><span>Ngày:</span>
              </div>
              <div>{{ eventDetail.start | DayFormat }}</div>
            </div>
            <div class="flex items-center">
              <div class="w-1/2 flex items-center">
                <div class="space-x-10 label">
                  <svg
                    v-svg
                    symbol="icon-clock"
                    size="18 15"
                  /><span>Thời gian bắt đầu:</span>
                </div>
                <div>{{ eventDetail.start | TimeFormat }}</div>
              </div>
              <div class="w-1/2 flex items-center">
                <div class="space-x-10 label">
                  <svg
                    v-svg
                    symbol="icon-clock"
                    size="18 15"
                  /><span>Thời gian kết thúc:</span>
                </div>
                <div>{{ eventDetail.end | TimeFormat }}</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-point-map"
                  size="18 18"
                /><span>Địa điểm:</span>
              </div>
              <div>
                {{
                  eventDetail.extendedProps.address
                    ? eventDetail.extendedProps.address
                    : 'Chưa xác định'
                }}
              </div>
            </div>
            <div class="flex items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-note"
                  size="18 15"
                /><span>Ghi chú:</span>
              </div>
              <div>
                {{
                  eventDetail.extendedProps.description
                    ? eventDetail.extendedProps.description
                    : 'Không có ghi chú'
                }}
              </div>
            </div>
          </div>
        </div>
        <template #modal-footer>
          <div class="flex items-center space-x-18">
            <div
              class="cursor-pointer btn btn-default flex items-center"
              @click="deleteEvent(eventDetail)"
            >
              Xóa
            </div>
            <div class="cursor-pointer btn btn-primary flex items-center">
              Chỉnh sửa
            </div>
          </div>
        </template>
        <template #modal-header-close>
          <svg
            v-svg
            symbol="icon-closed"
            size="16 16"
          />
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { createSchedules, deleteSchedules } from '@/api/calendar'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { mapGetters } from 'vuex'

// const calendarsColor = {
//   Business: 'primary',
//   Holiday: 'success',
//   Personal: 'danger',
//   Family: 'warning',
//   ETC: 'info',
// }

export default {
  components: {
    FullCalendar,
    // eslint-disable-next-line import/extensions
    CalendarSidebar: () => import('./calendar-sidebar/CalendarSidebar'),
    // eslint-disable-next-line import/extensions
    FormAddEvent: () => import('./FormAddEvent'),
  },
  filters: {
    DayFormat(value) {
      if (!value) return ''
      const d = value.getDate()
      const m = value.getMonth() + 1
      const y = value.getFullYear()

      const dateString = `${d <= 9 ? `0${d}` : d}/${m <= 9 ? `0${m}` : m}/${y}`
      return dateString
    },
    TimeFormat(value) {
      if (!value) return 'Chưa xác định'
      const h = value.getHours()
      const m = value.getMinutes()

      const timeString = `${h <= 9 ? `0${h}` : h}:${m <= 9 ? `0${m}` : m}`
      return timeString
    },
  },
  data() {
    return {
      dateFrom: new Date(),
      stepForm: 'step1',
      isActiveSearch: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      typeView: 'list',
      timeSelect: 'month',
      title: '',
      calendarApi: null,
      eventDetail: '',
      isEventHandlerTypeCalendarActive: false,
      isEventHandlerAddActive: false,
      isCalendarOverlaySidebarActive: false,
      isEventHandlerSidebarActive: false,
      typecalendar: 'bfa0c6db-01c5-4836-bc13-4e41fd32108b', // default ID: lịch làm việc
      dataForm: {
        allDay: false,
        title: '',
        typeScheduleId: '',
        dateFrom: '',
        timeFrom: '',
        dateTo: '',
        timeTo: '',
        content: '',
        location: '',
        vehicle: '',
        expectedResults: '',
        results: '',
        status: 3, // Đã duyệt
        rejectReason: '',
        publishSchedule: false,
        tags: '',
        IsLichDonVi: false,
        createdByUserName: 'nguoidung2B',
        createdForUserName: 'nguoidung2B',
        note: '',
        scheduleCoperativeRequest: [
          // {
          //   donViId: 0,
          //   canBoId: 0,
          //   userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          //   userName: 'string',
          //   taskContent: 'string',
          //   scheduleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          //   id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          // },
        ],
        scheduleReminderRequest: {
          reminderDate: '2021-05-25',
          reminderEnd: null,
          reminderTypeId: null,
          reminderTypeValue: 0,
        },
        files: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      ListEvents: 'lichlamviec/ListEvents',
      CalendarPreview: 'lichlamviec/CalendarPreview',
    }),
    config() {
      return {
        ...this.configOptions,
        ...this.eventHandlers,
      }
    },
    configOptions() {
      return {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'listMonth',
        height: '100%',
        headerToolbar: false,
        // headerToolbar: {
        //   start: 'today prev title next',
        //   center: '',
        //   end: 'list,grid listDay,listWeek,listMonth,timeGridDay,timeGridWeek,dayGridMonth',
        // },
        buttonText: {
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
        },
        allDayText: 'Cả ngày',
        titleFormat: {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        },
        dayHeaders: true,
        dayHeaderFormat: {
          weekday: 'long',
          month: 'numeric',
          day: 'numeric',
          omitCommas: false,
        },
        firstDay: 0,
        eventMinHeight: 36,
        expandRows: true,
        locale: 'vi',
        events: this.ListEvents,
        editable: false,
        eventResizableFromStart: true,
        dragScroll: true,
        dayMaxEventRows: 2,
        dayMaxEvents: 2,
        navLinks: true,
        // eventClassNames({
        //   event: calendarEvent,
        // }) {
        //   // eslint-disable-next-line no-underscore-dangle
        //   const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
        //   return [
        //     `bg-light-${colorName}`,
        //   ]
        // },
        direction: 'ltr',
        rerenderDelay: 350,
        views: {
          dayGridMonth: {
            dayHeaderFormat: {
              weekday: 'long',
              omitCommas: false,
            },
          },
        },
      }
    },
    eventHandlers() {
      return {
        dateClick: this.onDateClick,
        eventClick: this.onEventClick,
        eventDrop: this.onEventDrop,
        eventResize: this.onEventDrop,
      }
    },
  },
  watch: {
    timeSelect: {
      handler(val) {
        if (this.typeView === 'grid') {
          switch (val) {
            case 'day': {
              this.calendarApi.changeView('timeGridDay')
              break
            }
            case 'week': {
              this.calendarApi.changeView('timeGridWeek')
              break
            }
            default: {
              this.calendarApi.changeView('dayGridMonth')
              break
            }
          }
        } else {
          switch (val) {
            case 'day': {
              this.calendarApi.changeView('listDay')
              break
            }
            case 'week': {
              this.calendarApi.changeView('listWeek')
              break
            }
            default: {
              this.calendarApi.changeView('listMonth')
              break
            }
          }
        }
        this.title = this.calendarApi.view.title
      },
      deep: true,
    },
    typeView: {
      handler(val) {
        if (val === 'grid') {
          switch (this.timeSelect) {
            case 'day': {
              this.calendarApi.changeView('timeGridDay')
              break
            }
            case 'week': {
              this.calendarApi.changeView('timeGridWeek')
              break
            }
            default: {
              this.calendarApi.changeView('dayGridMonth')
              break
            }
          }
        } else {
          switch (this.timeSelect) {
            case 'day': {
              this.calendarApi.changeView('listDay')
              break
            }
            case 'week': {
              this.calendarApi.changeView('listWeek')
              break
            }
            default: {
              this.calendarApi.changeView('listMonth')
              break
            }
          }
        }
        this.calendarApi.updateSize()
        window.dispatchEvent(new Event('resize'))
      },
    },
    isEventHandlerTypeCalendarActive: {
      handler(val) {
        if (val === true) {
          this.$bvModal.show('modal-choosen-type-calendar')
        } else {
          this.$bvModal.hide('modal-choosen-type-calendar')
        }
      },
    },
    isEventHandlerAddActive: {
      handler(val) {
        if (val === true) {
          this.$bvModal.show('modal-event-add')
        } else {
          this.$bvModal.hide('modal-event-add')
        }
      },
    },
    dataForm: {
      handler(val) {
        if (this.CalendarPreview) {
          const eventDraft = this.CalendarPreview.getEventById('draft-event')
          if (eventDraft) {
            eventDraft.setDates(
              `${val.dateFrom}T${val.timeFrom}`,
              `${val.dateFrom}T${val.timeTo}`,
            )
            if (val.allDay) {
              eventDraft.setAllDay(val.allDay)
              eventDraft.setProp('editable', false)
            } else {
              eventDraft.setProp('editable', true)
              eventDraft.setDates(
                `${val.dateFrom}T${val.timeFrom}`,
                `${val.dateFrom}T${val.timeTo}`,
              )
            }
          }
        }
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('lichlamviec/getListEvents', {
      PageIndex: 1,
      PageSize: 100,
      Status: '1,2,3,4,5',
      StatusNotIn: '6',
    })
  },
  mounted() {
    this.calendarApi = this.$refs.refCalendar.getApi()
    this.title = this.calendarApi.view.title
  },
  methods: {
    onEventDrop({ event }) {
      console.log('onEventDrop', event)
    },
    onEventResize({ event }) {
      console.log('onEventResize', event)
    },
    onEventClick({ event }) {
      this.eventDetail = event
      this.$bvModal.show('modal-event-detail')
    },
    onDateClick(info) {
      if (info.dayEl.className.indexOf('fc-day-past') === -1) {
        this.dateFrom = info.date
        this.$bvModal.show('modal-choosen-type-calendar')
      }
    },
    showSearchCalendar() {
      this.isActiveSearch = true
      this.$nextTick(() => {
        this.focusSearchCalendar()
      })
    },
    focusSearchCalendar() {
      this.$refs.inputsearch_calendar.focus()
    },
    calendarToday() {
      this.calendarApi.today()
      this.title = this.calendarApi.view.title
    },
    calendarPrev() {
      this.calendarApi.prev()
      this.title = this.calendarApi.view.title
    },
    calendarNext() {
      this.calendarApi.next()
      this.title = this.calendarApi.view.title
    },
    deleteEvent(event) {
      this.$bvModal
        .msgBoxConfirm('Bạn có chắc chắn muốn xóa lịch làm việc này?', {
          size: 'md',
          okVariant: 'primary',
          okTitle: 'Đồng ý',
          cancelTitle: 'Không',
          centered: true,
          footerClass: 'footer-confirm',
        })
        .then(value => {
          if (value) {
            console.log('event', event)
            const param = {
              scheduleId: event.id,
              statusId: 6,
            }
            deleteSchedules(param)
              .then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    variant: 'success',
                    icon: 'BellIcon',
                    text: 'Đã xóa thành công',
                  },
                })
                this.$store.dispatch('lichlamviec/getListEvents', {
                  PageIndex: 1,
                  PageSize: 100,
                  Status: '1,2,3,4,5',
                  StatusNotIn: '6',
                })
                this.$bvModal.hide('modal-event-detail')
              })
              .catch(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    variant: 'warning',
                    icon: 'BellIcon',
                    text: 'Bạn không thể xóa lịch này',
                  },
                })
              })
          }
        })
        .catch()
    },
    addSchedules(params) {
      // eslint-disable-next-line no-param-reassign
      params.dateTo = params.dateFrom
      createSchedules(params)
        .then(() => {
          this.$store.dispatch('lichlamviec/getListEvents', {
            PageIndex: 1,
            PageSize: 100,
            Status: '1,2,3,4,5',
            StatusNotIn: '6',
          })
          this.$bvModal.hide('modal-event-add')
        })
        .catch(error => {
          console.log('Error add calendar', error)
        })
    },
    handlerSteps(step) {
      switch (step) {
        case 'step1': {
          break
        }
        case 'step2': {
          break
        }
        case 'step3': {
          break
        }
        case 'step4': {
          break
        }
        default: {
          this.isEventHandlerAddActive = true
          this.isEventHandlerTypeCalendarActive = false
          this.dataForm.typeScheduleId = this.typecalendar
          break
        }
      }
      this.$bvModal.hide('modal-choosen-type-calendar')
    },
    nextStep() {
      if (this.stepForm === 'step1') {
        this.stepForm = 'step2'
      } else if (this.stepForm === 'step2') {
        this.stepForm = 'step3'
      }
    },
    hiddenModals() {
      this.$bvModal.hide('modal-choosen-type-calendar')
      this.isEventHandlerAddActive = false
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
.custom-bottom-model-button {
  .button-custom-model {
    height: 36px !important;
  }
}
.custom-form-model-dn {
  .modal-header {
    margin-bottom: 10px;
    svg {
      width: 14px;
    }
  }
  .modal-body {
    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #f2f2f2;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: #fff;
    }
  }
}
</style>
