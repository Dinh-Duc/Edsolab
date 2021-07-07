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
          :schedule-count="scheduleCount"
          :calendar-api="calendarApi"
          :open-add-modal="openAddModal"
          @changeTitle="title = $event"
          @typeView="typeView = $event"
          @timeSelect="timeSelect = $event"
          @activeToday="activeToday = $event"
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
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="outline-secondary"
              class="today-button"
              :class="{'active': activeToday}"
              @click="calendarToday"
            >
              Hôm nay
            </b-button>
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
          <b-overlay
            :show="isLoadingOverlay"
            class="h-full"
          >
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
                    :class="{ 'text-12px': view.type === 'dayGridMonth' }"
                  >
                    <div
                      class="cursor-pointer"
                      :class="{
                        'whitespace-nowrap': view.type === 'dayGridMonth',
                      }"
                      @click="onEventClick(event)"
                    >
                      {{ event.title }}
                    </div>
                    <div
                      v-if="
                        view.type === 'listDay' ||
                          view.type === 'listWeek' ||
                          view.type === 'listMonth'
                      "
                      class="event-actions ml-auto flex items-center space-x-10"
                    >
                      <div
                        id="note-calendar"
                        class="cursor-pointer"
                        @click="openNote(event)"
                      >
                        <svg
                          v-svg
                          symbol="icon-note-1"
                          size="18 18"
                        />
                        <b-tooltip
                          triggers="hover"
                          :target="'note-calendar'"
                          :title="'Ghi chú'"
                          :delay="{ show: 500, hide: 50 }"
                        />
                      </div>
                      <div
                        v-if="isOwner(event)"
                        id="delete-calendar"
                        class="cursor-pointer"
                        @click="deleteEvent(event)"
                      >
                        <svg
                          v-svg
                          symbol="icon-delete"
                          size="18 18"
                        />
                        <b-tooltip
                          triggers="hover"
                          :target="'delete-calendar'"
                          :title="'Xóa lịch'"
                          :delay="{ show: 500, hide: 50 }"
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
                    @click="onEventClick(event)"
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
          </b-overlay>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />

      <!-- Chọn event type -->
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
          <!-- <b-form-radio
            v-model="typecalendar"
            name="typecalendar"
            value="adc8a37f-c8e5-44b5-bcad-8f1cbe4921f7"
          >
            Lịch tiếp dân
          </b-form-radio> -->
        </div>
      </b-modal>

      <!-- Add event -->
      <b-modal
        id="modal-event-add"
        scrollable
        size="lg"
        modal-class="modal-calendar custom-form-model-dn"
        :no-close-on-backdrop="false"
        @hidden="hiddenModals()"
      >
        <template #modal-footer>
          <div
            class="flex items-center space-x-18 custom-bottom-model-button m-0"
          >
            <div
              v-if="stepForm !== 'step1'"
              class="cursor-pointer btn btn-default flex items-center button-custom-model"
              @click="prevStep()"
            >
              Quay lại
            </div>
            <div
              v-if="stepForm === 'step2'"
              class="cursor-pointer btn btn-primary flex items-center button-custom-model"
              @click="saveSchedules(dataForm)"
            >
              Lưu
            </div>
            <div
              v-if="stepForm !== 'step2'"
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
          v-if="isEdit"
          v-model="dataEdit"
          :step-form.sync="stepForm"
          :events="ListEvents"
          :date-from="dateFrom"
          :is-edit="isEdit"
        />
        <FormAddEvent
          v-else
          v-model="dataForm"
          :step-form.sync="stepForm"
          :events="ListEvents"
          :date-from="dateFrom"
          :is-edit="isEdit"
        />
      </b-modal>

      <!-- Detail Event -->
      <DetailEvent
        :event-detail="eventDetail"
        @eventedit="dataEdit = $event"
        @datefrom="dateFrom = $event"
        @isedit="isEdit = $event"
      />

      <!-- Modal note for event -->
      <b-modal
        id="event-note-modal"
        centered
        scrollable
        size="md"
        modal-class="modal-addnote-event"
      >
        <b-form-group>
          <b-form-textarea
            placeholder="Nội dung..."
            rows="3"
          />
        </b-form-group>
        <template #modal-header>
          Ghi chú
        </template>
        <template #modal-footer>
          <div class="flex items-center space-x-18">
            <div
              class="cursor-pointer btn btn-danger flex items-center"
              @click="$bvModal.hide('event-note-modal')"
            >
              Hủy
            </div>
            <div class="cursor-pointer btn btn-success flex items-center">
              Gửi
            </div>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  createSchedules,
  deleteSchedules,
  revokedSchedules,
  updateSchedules,
} from '@/api/calendar/indexNew'
import { ScheduleCount } from '@/api/calendar'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { USER_DATA } from '@/configs/config.js'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'

export default {
  directives: {
    Ripple,
  },
  components: {
    FullCalendar,
    // eslint-disable-next-line import/extensions
    CalendarSidebar: () => import('./calendar-sidebar/CalendarSidebar'),
    // eslint-disable-next-line import/extensions
    FormAddEvent: () => import('./FormAddEvent'),
    // eslint-disable-next-line import/extensions
    DetailEvent: () => import('./DetailEvent'),
  },
  data() {
    return {
      isLoadingOverlay: false,
      isEdit: false,
      dateFrom: new Date(),
      stepForm: 'step1',
      isActiveSearch: false,
      activeToday: false,
      typeView: 'list',
      timeSelect: 'month',
      title: '',
      calendarApi: null,
      eventDetail: null,
      isEventHandlerTypeCalendarActive: false,
      isEventHandlerAddActive: false,
      isCalendarOverlaySidebarActive: false,
      isEventHandlerSidebarActive: false,
      typecalendar: 'bfa0c6db-01c5-4836-bc13-4e41fd32108b', // default ID: lịch làm việc
      dataForm: {
        allDay: false,
        title: '',
        typeScheduleId: 'bfa0c6db-01c5-4836-bc13-4e41fd32108b',
        dateFrom: moment().format('YYYY-MM-DD'),
        timeFrom: '',
        dateTo: moment().format('YYYY-MM-DD'),
        timeTo: '',
        content: '',
        location: '',
        vehicle: '',
        expectedResults: '',
        results: '',
        status: 2, // Gửi duyệt
        rejectReason: '',
        publishSchedule: false,
        tags: '',
        isLichDonVi: false,
        canBoChuTriId: '',
        donViId: '',
        note: '',
        scheduleCoperativeRequest: [],
        scheduleReminderRequest: {
          reminderDate: '2021-05-25',
          reminderEnd: null,
          reminderTypeId: null,
          reminderTypeValue: 0,
        },
        files: '',
      },
      dataEdit: {},
      userData: JSON.parse(localStorage.getItem('userData')),
      scheduleCount: {}
    }
  },
  computed: {
    ...mapGetters({
      ListEvents: 'lichlamviec/ListEvents',
      CalendarPreview: 'lichlamviec/CalendarPreview',
      userInfo: 'auth/userInfo',
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
        slotDuration: '01:00',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        },
        dayHeaders: true,
        dayHeaderFormat: {
          weekday: 'long',
          month: 'numeric',
          day: 'numeric',
          omitCommas: false,
        },
        firstDay: 0,
        eventMinHeight: 40,
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
        // eventClick: this.onEventClick,
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
        if(moment().isSame(this.calendarApi.getDate(), 'day')) {
          this.activeToday = true
        } else {
          this.activeToday = false
        }
        val === 'day' && moment().isSame(this.calendarApi.getDate(), 'day') ? this.activeToday = true : this.activeToday = false
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
          this.$bvModal.show('modal-event-add')
        } else {
          this.$bvModal.hide('modal-event-add')
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
    ListEvents: function(val) {
      this.isLoadingOverlay = false
    }
  },
  created() {
    this.reloadData()
  },
  mounted() {
    this.calendarApi = this.$refs.refCalendar.getApi()
    this.title = this.calendarApi.view.title
  },
  methods: {
    reloadData() {
      this.isLoadingOverlay = true
      this.$store.dispatch('lichlamviec/getListEvents', {
        DateFrom: moment().startOf('month').format('YYYY-MM-DD'),
        DateTo: moment().endOf('month').format('YYYY-MM-DD'),
        CanBoId: JSON.parse(localStorage.getItem(USER_DATA)).id.toString(),
        DonViId: null,
        Type: -1,
        PageIndex: 1,
        PageSize: 1000,
      })
      const params = {
        donviId: JSON.parse(localStorage.getItem(USER_DATA)).donViTrucThuoc.id.toString(),
        canboId: JSON.parse(localStorage.getItem(USER_DATA)).id.toString(),
        dateStart: moment().startOf('month').format('YYYY-MM-DD'),
        dateTo: moment().endOf('month').format('YYYY-MM-DD')
      }
      this.getCountSchedule(params)
    },
    isOwner(event) {
      const idCurrentUser = this.userInfo.id
      if (event.extendedProps.createBy.id === idCurrentUser) {
        return true
      }
      return false
    },
    onEventDrop({ event }) {
      console.log('onEventDrop', event)
    },
    onEventResize({ event }) {
      console.log('onEventResize', event)
    },
    onEventClick(event) {
      this.eventDetail = event
      if(event.extendedProps.scheduleType === 'Schedule') {
        this.$store.dispatch('lichlamviec/getScheduleDetail', {
          id: event.id,
        }).then(() => this.$bvModal.show('modal-event-detail'))
      } else {
        this.$store.dispatch('hop/getDetailMeeting', {
          id: event.id,
        }).then(() => this.$bvModal.show('modal-event-detail'))
      }
      console.log('event detail', event)
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
      this.timeSelect = 'day'
      this.calendarApi.today()
      this.title = this.calendarApi.view.title
      this.activeToday = true
    },
    calendarPrev() {
      this.calendarApi.prev()
      this.title = this.calendarApi.view.title
      if(moment().isSame(this.calendarApi.getDate(), 'day')) {
        this.activeToday = true
      } else {
        this.activeToday = false
      }
    },
    calendarNext() {
      this.calendarApi.next()
      this.title = this.calendarApi.view.title
      if(moment().isSame(this.calendarApi.getDate(), 'day')) {
        this.activeToday = true
      } else {
        this.activeToday = false
      }
    },
    saveSchedules(params) {
      if (this.isEdit) {
        updateSchedules(this.dataEdit).then(() => {
          this.reloadData()
          this.stepForm = 'step1'
          this.$bvModal.hide('modal-event-add')
        })
      } else {
        const dataFormReset = {
          allDay: false,
          title: '',
          typeScheduleId: 'bfa0c6db-01c5-4836-bc13-4e41fd32108b',
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
          createdByUserName: '',
          createdForUserName: undefined,
          note: '',
          scheduleCoperativeRequest: [],
          scheduleReminderRequest: {
            reminderDate: '2021-05-25',
            reminderEnd: null,
            reminderTypeId: null,
            reminderTypeValue: 0,
          },
          files: '',
        }
        /* eslint-disable */
        let datafomat = params
        if(!_.values(params.createdForUserName).some(x => x !== undefined)){
          datafomat.canBoChuTriId = JSON.parse(localStorage.getItem(USER_DATA)).id.toString()
          datafomat.donViId = JSON.parse(localStorage.getItem(USER_DATA)).donViTrucThuoc.id.toString()
          datafomat.status = 3
        }else{
          datafomat.canBoChuTriId = params.createdForUserName.value.CanBoId
          datafomat.donViId = params.createdForUserName.value.iD_DonVi
          if (JSON.parse(localStorage.getItem(USER_DATA)).id.toString() === params.createdForUserName.value.CanBoId) {
            datafomat.status = 3
          }
        }
        // eslint-disable-next-line no-param-reassign
        createSchedules(datafomat)
          .then(() => {
            this.reloadData()
            this.stepForm = 'step1'
            this.$bvModal.hide('modal-event-add')
            this.dataForm = dataFormReset
          })
          .catch(error => {
            console.log('Error add calendar', error)
          })
      }
    },
    handlerSteps(step) {
      switch (step) {
        case 'step1': {
          break
        }
        case 'step2': {
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
      }
    },
    prevStep() {
      if (this.stepForm === 'step2') {
        this.stepForm = 'step1'
      }
    },
    hiddenModals() {
      console.log('demo', this.isEventHandlerAddActive)
      // this.isEventHandlerAddActive = false
      // this.$bvModal.hide('modal-choosen-type-calendar')
    },
    openNote() {
      this.$bvModal.show('event-note-modal')
    },
    deleteEvent(event) {
      console.log('sdsdsds', event)
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
            if (event.extendedProps.status === 3) {
              revokedSchedules(event.id).then(() => {
                deleteSchedules(event.id)
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
                    this.reloadData()
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
              })
            } else {
              deleteSchedules(event.id)
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
                  this.reloadData()
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
          }
        })
        .catch()
    },
    openAddModal() {
      this.$bvModal.show('modal-event-add')
    },
    getCountSchedule(params) {
      ScheduleCount(params).then((res) => {
        this.scheduleCount = res.data.data
      })
    }
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
