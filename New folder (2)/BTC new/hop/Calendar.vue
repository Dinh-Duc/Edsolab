<template>
  <div class="app-calendar overflow-hidden border shadow-none mb-0 hop-calendar">
    <div class="flex">
      <!-- Sidebar -->
      <div
        class="app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{ show: isCalendarOverlaySidebarActive }"
      >
        <calendar-sidebar
          :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive"
          :is-event-handler-add-active.sync="isEventHandlerAddActive"
          :events="ListEvents"
          :calendar-api="calendarApi"
          @changeTitle="title = $event"
          @typeView="typeView = $event"
          @timeSelect="timeSelect = $event"
        />
      </div>

      <!-- Calendar -->
      <div
        v-show="isDetail"
        class="position-relative flex-1"
      >
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
          <div class="summary-calendar d-flex align-items-center space-x-28">
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
          <div
            v-if="typeView === 'list'"
            class="head-table-custom"
          >
            <div class="hop-head">
              <div class="box-time mg-text-16">
                THỜI GIAN
              </div>
              <div class="box-noidung mg-text-16">
                NỘI DUNG
              </div>
              <div class="box-thanhphan mg-text-16">
                THÀNH PHẦN
              </div>
              <div class="box-loai mg-text-16">
                LOẠI
              </div>
              <!-- <div class="box-loai mg-text-16">
                TRẠNG THÁI
              </div> -->
              <div class="box-trangthai" />
            </div>
          </div>
          <full-calendar
            ref="refCalendar"
            :options="config"
            class="full-calendar flex-1"
          >
            <template #moreLinkContent="{ num }">
              +{{ num }} lịch họp
            </template>
            <template #noEventsContent>
              Không có lịch họp!
            </template>
            <template #eventContent="{ event, view }">
              <div
                v-if="
                  typeView === 'list' ||
                    view.type === 'listDay' ||
                    view.type === 'listWeek' ||
                    view.type === 'listMonth'
                "
                class="box-noidung cursor-pointer"
                @click="viewEvent(event)"
              >
                <div class="row-thoigian">
                  {{ actionThoiGian(event.start, event.end) }}
                </div>
                <div class="row-noidung">
                  {{ event.extendedProps.description }}
                </div>
                <div class="row-thanhphan">
                  {{ event.extendedProps.data.canBoChuTri.hoTen }} - {{ event.extendedProps.data.canBoChuTri.chucVu }}
                </div>
                <div class="row-loai mg-10">
                  <div
                    class="box-loai"
                    :class="event.extendedProps.data.hinhThucHop == 'Họp trực tuyến'?'color-tructuyen':'color-tructiep'"
                  >
                    {{ event.extendedProps.data.hinhThucHop }}
                  </div>
                </div>
                <div class="row-trangthai">
                  <div class="box-trangthai">
                    {{ event.extendedProps.data.trangThai }}
                  </div>
                </div>
                <!-- {{ event }} {{ view }} -->
              </div>
              <div v-else>
                <div
                  class="cursor-pointer"
                  @click="viewEvent(event)"
                >
                  {{ event.title }}
                </div>
              </div>
            </template>
          </full-calendar>
        </div>
      </div>
      <div
        v-show="!isDetail"
        class="position-relative flex-1"
      >
        <DetailHop
          v-if="eventDetail"
          :event-detail-child="eventDetail"
          @btn-rollback="checkRollBack"
        />
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />
      <!-- <calendar-event-handler
        v-model="isEventHandlerSidebarActive"
        :event="event"
        :clear-event-data="clearEventData"
        @remove-event="removeEvent"
        @add-event="addEvent"
        @update-event="updateEvent"
      /> -->

      <b-modal
        id="modal-event-add"
        title="Tạo lịch họp"
        centered
        no-close-on-backdrop
        scrollable
        size="lg"
        modal-class="modal-calendar custom-form-model-dn"
        @hidden="isEventHandlerAddActive = false"
      >
        <template #modal-footer>
          <div
            class="flex items-center space-x-18 custom-bottom-model-button"
            @click="isCreateEvent = !isCreateEvent"
          >
            <div
              class="cursor-pointer btn btn-primary flex items-center button-custom-model"
            >
              Gửi duyệt
            </div>
          </div>
        </template>

        <FormAddEvent :is-create-event-child="isCreateEvent" />
      </b-modal>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { mapGetters } from 'vuex'
import moment from 'moment'

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info',
}

export default {
  components: {
    FullCalendar,
    CalendarSidebar: () => import('./calendar-sidebar/CalendarSidebar'),
    FormAddEvent: () => import('./FormAddEvent'),
    DetailHop: () => import('./DetailHop/DetailHop.vue'),
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
      isCreateEvent: false,
      isDetail: true,
      listcalendar: [],
      isActiveSearch: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      typeView: 'list',
      timeSelect: 'month',
      title: '',
      paramPayload: {
        ID_DonVi: 2,
        ID_CanBo: 349,
        Loai: -1,
        page: 1,
        pageSize: 20,
        orderBy: 'ThoiGian',
        orderType: false,
        dateFrom: moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
        dateTo: moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
      },
      calendarApi: null,
      fields: [
        {
          key: 'time',
          label: 'thời gian',
        },
        {
          key: 'NoiDung',
          label: 'Nội dung',
        },
        {
          key: 'ThanhPhan',
          label: 'Thành phần',
        },
        {
          key: 'type',
          label: 'Loại',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
      ],
      calendars: [],
      eventDetail: undefined,
      isEventHandlerAddActive: false,
      isCalendarOverlaySidebarActive: false,
      isEventHandlerSidebarActive: false,
    }
  },
  computed: {
    ...mapGetters({
      ListEvents: 'hop/ListEvents',
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
        headerToolbar: {
          start: 'today prev title next',
          center: '',
          end: 'list,grid listDay,listWeek,listMonth,timeGridDay,timeGridWeek,dayGridMonth',
        },
        buttonText: {
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
        },
        allDayText: 'Cả ngày',
        allDayContent: false,
        displayEventTime: false,
        titleFormat: {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        },
        dayHeaders: true,
        firstDay: 1,
        dayHeaderFormat: {
          weekday: 'long',
          omitCommas: false,
        },
        locale: 'vi',
        events: this.ListEvents,
        editable: true,
        eventResizableFromStart: true,
        dragScroll: true,
        dayMaxEvents: 2,
        navLinks: true,
        eventClassNames({
          event: calendarEvent,
        }) {
          // eslint-disable-next-line no-underscore-dangle
          const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
          return [
            `bg-light-${colorName}`,
          ]
        },
        customButtons: {
          list: {
            text: '',
            click() {
              document.querySelector('.fc-timeGridDay-button').style.display = 'none'
              document.querySelector('.fc-timeGridWeek-button').style.display = 'none'
              document.querySelector('.fc-dayGridMonth-button').style.display = 'none'
              document.querySelector('.fc-listDay-button').style.display = 'block'
              document.querySelector('.fc-listWeek-button').style.display = 'block'
              document.querySelector('.fc-listMonth-button').style.display = 'block'
              const typeView = this.calendarApi.view.type
              switch (typeView) {
                case 'timeGridDay': {
                  this.calendarApi.changeView('listDay')
                  break
                }
                case 'timeGridWeek': {
                  this.calendarApi.changeView('listWeek')
                  break
                }
                default: {
                  this.calendarApi.changeView('listMonth')
                  break
                }
              }
            },
          },
          grid: {
            text: '',
            click() {
              document.querySelector('.fc-listDay-button').style.display = 'none'
              document.querySelector('.fc-listWeek-button').style.display = 'none'
              document.querySelector('.fc-listMonth-button').style.display = 'none'
              document.querySelector('.fc-timeGridDay-button').style.display = 'block'
              document.querySelector('.fc-timeGridWeek-button').style.display = 'block'
              document.querySelector('.fc-dayGridMonth-button').style.display = 'block'
              // calendarApi.changeView('dayGridMonth') // timeGridDay timeGridWeek dayGridMonth
              const typeView = this.calendarApi.view.type
              switch (typeView) {
                case 'listDay': {
                  this.calendarApi.changeView('timeGridDay')
                  break
                }
                case 'listWeek': {
                  this.calendarApi.changeView('timeGridWeek')
                  break
                }
                default: {
                  this.calendarApi.changeView('dayGridMonth')
                  break
                }
              }
            },
          },
          // sidebar: {
          //   text: 'sidebar',
          //   click() {
          //     this.isCalendarOverlaySidebarActive.value = !this.isCalendarOverlaySidebarActive.value
          //   },
          // },
        },
        direction: 'ltr',
        rerenderDelay: 350,
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
    isEventHandlerAddActive: {
      handler(val) {
        if (val) {
          this.$bvModal.show('modal-event-add')
        }
      },
    },
  },
  created() {
    this.$store.dispatch('hop/getListEvents', this.paramPayload)
  },
  mounted() {
    this.calendarApi = this.$refs.refCalendar.getApi()

    this.$nextTick(() => {
      const btnlist = document.querySelector('.fc-list-button')
      const btngrid = document.querySelector('.fc-grid-button')
      btnlist.addEventListener('click', () => {
        btnlist.classList.add('fc-button-active')
        btngrid.classList.remove('fc-button-active')
      })
      btngrid.addEventListener('click', () => {
        btngrid.classList.add('fc-button-active')
        btnlist.classList.remove('fc-button-active')
      })
      btnlist.classList.add('fc-button-active')
      document.querySelector('.fc-timeGridDay-button').style.display = 'none'
      document.querySelector('.fc-timeGridWeek-button').style.display = 'none'
      document.querySelector('.fc-dayGridMonth-button').style.display = 'none'
      const listButton = document.querySelector('.fc-list-button')
      const gridButton = document.querySelector('.fc-grid-button')
      listButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 11.5H0.5C0.367392 11.5 0.240215 11.5527 0.146447 11.6464C0.0526784 11.7402 0 11.8674 0 12L0 14C0 14.1326 0.0526784 14.2598 0.146447 14.3536C0.240215 14.4473 0.367392 14.5 0.5 14.5H2.5C2.63261 14.5 2.75979 14.4473 2.85355 14.3536C2.94732 14.2598 3 14.1326 3 14V12C3 11.8674 2.94732 11.7402 2.85355 11.6464C2.75979 11.5527 2.63261 11.5 2.5 11.5ZM2.5 1.5H0.5C0.367392 1.5 0.240215 1.55268 0.146447 1.64645C0.0526784 1.74021 0 1.86739 0 2L0 4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H2.5C2.63261 4.5 2.75979 4.44732 2.85355 4.35355C2.94732 4.25979 3 4.13261 3 4V2C3 1.86739 2.94732 1.74021 2.85355 1.64645C2.75979 1.55268 2.63261 1.5 2.5 1.5ZM2.5 6.5H0.5C0.367392 6.5 0.240215 6.55268 0.146447 6.64645C0.0526784 6.74021 0 6.86739 0 7L0 9C0 9.13261 0.0526784 9.25979 0.146447 9.35355C0.240215 9.44732 0.367392 9.5 0.5 9.5H2.5C2.63261 9.5 2.75979 9.44732 2.85355 9.35355C2.94732 9.25979 3 9.13261 3 9V7C3 6.86739 2.94732 6.74021 2.85355 6.64645C2.75979 6.55268 2.63261 6.5 2.5 6.5ZM15.5 12H5.5C5.36739 12 5.24021 12.0527 5.14645 12.1464C5.05268 12.2402 5 12.3674 5 12.5V13.5C5 13.6326 5.05268 13.7598 5.14645 13.8536C5.24021 13.9473 5.36739 14 5.5 14H15.5C15.6326 14 15.7598 13.9473 15.8536 13.8536C15.9473 13.7598 16 13.6326 16 13.5V12.5C16 12.3674 15.9473 12.2402 15.8536 12.1464C15.7598 12.0527 15.6326 12 15.5 12ZM15.5 2H5.5C5.36739 2 5.24021 2.05268 5.14645 2.14645C5.05268 2.24021 5 2.36739 5 2.5V3.5C5 3.63261 5.05268 3.75979 5.14645 3.85355C5.24021 3.94732 5.36739 4 5.5 4H15.5C15.6326 4 15.7598 3.94732 15.8536 3.85355C15.9473 3.75979 16 3.63261 16 3.5V2.5C16 2.36739 15.9473 2.24021 15.8536 2.14645C15.7598 2.05268 15.6326 2 15.5 2ZM15.5 7H5.5C5.36739 7 5.24021 7.05268 5.14645 7.14645C5.05268 7.24021 5 7.36739 5 7.5V8.5C5 8.63261 5.05268 8.75979 5.14645 8.85355C5.24021 8.94732 5.36739 9 5.5 9H15.5C15.6326 9 15.7598 8.94732 15.8536 8.85355C15.9473 8.75979 16 8.63261 16 8.5V7.5C16 7.36739 15.9473 7.24021 15.8536 7.14645C15.7598 7.05268 15.6326 7 15.5 7Z" fill="currentColor"/>
        </svg>
        `
      gridButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34504 4.79156H4.45723C4.79481 4.79156 5.06852 4.51825 5.06852 4.18067V0.611109C5.06852 0.273493 4.79481 0 4.45723 0H3.34504C3.00742 0 2.73375 0.273493 2.73375 0.611109V4.18067C2.73375 4.51825 3.00742 4.79156 3.34504 4.79156ZM16.0343 4.18165V2.00425C16.8943 2.03017 17.601 2.7418 17.601 3.61648V16.3771C17.601 17.2667 16.8773 18.0001 15.9875 18.0001H1.61341C0.722283 18.0001 0 17.2682 0 16.3771V3.61648C0 2.7418 0.706686 2.03017 1.56669 2.00425V4.18165C1.56669 5.16581 2.36505 5.95889 3.34902 5.95889H4.47364C5.45757 5.95889 6.26651 5.16581 6.26651 4.18165V1.99643H11.3344V4.18165C11.3344 5.16581 12.1434 5.95889 13.1275 5.95889H14.2519C15.2359 5.95889 16.0343 5.16581 16.0343 4.18165ZM14.8145 16.28C15.1998 16.28 15.5121 15.9675 15.5121 15.5824L15.512 8.99113C15.512 8.60587 15.1998 8.29344 14.8145 8.29344H2.75569C2.37039 8.29344 2.05818 8.60587 2.05818 8.99113V15.5824C2.05818 15.9675 2.37043 16.28 2.75569 16.28H14.8145ZM6.3586 9.93049C6.3586 9.705 6.17571 9.52233 5.95004 9.52233H4.52432C4.29891 9.52233 4.11598 9.705 4.11598 9.93049V11.356C4.11598 11.5818 4.29891 11.7646 4.52432 11.7646H5.95004C6.17571 11.7646 6.3586 11.5818 6.3586 11.356V9.93049ZM9.92167 9.93049C9.92167 9.705 9.73874 9.52233 9.51352 9.52233H8.08762C7.86221 9.52233 7.67928 9.705 7.67928 9.93049V11.356C7.67928 11.5818 7.86221 11.7646 8.08762 11.7646H9.51352C9.73874 11.7646 9.92167 11.5818 9.92167 11.356V9.93049ZM13.0766 9.52233C13.302 9.52233 13.485 9.705 13.485 9.93049V11.356C13.485 11.5818 13.302 11.7646 13.0766 11.7646H11.6509C11.4252 11.7646 11.2423 11.5818 11.2423 11.356V9.93049C11.2423 9.705 11.4252 9.52233 11.6509 9.52233H13.0766ZM6.3586 13.494C6.3586 13.2681 6.17571 13.0856 5.95004 13.0856H4.52432C4.29891 13.0856 4.11598 13.2681 4.11598 13.494V14.9193C4.11598 15.1449 4.29891 15.3276 4.52432 15.3276H5.95004C6.17571 15.3276 6.3586 15.1448 6.3586 14.9193V13.494ZM9.51352 13.0856C9.73874 13.0856 9.92167 13.2681 9.92167 13.494V14.9193C9.92167 15.1448 9.73874 15.3276 9.51352 15.3276H8.08762C7.86221 15.3276 7.67928 15.1449 7.67928 14.9193V13.494C7.67928 13.2681 7.86221 13.0856 8.08762 13.0856H9.51352ZM13.485 13.494C13.485 13.2681 13.302 13.0856 13.0768 13.0856H11.6509C11.4252 13.0856 11.2423 13.2681 11.2423 13.494V14.9193C11.2423 15.1449 11.4252 15.3276 11.6509 15.3276H13.0768C13.302 15.3276 13.485 15.1448 13.485 14.9193V13.494ZM14.2254 4.79156H13.1132C12.7756 4.79156 12.5019 4.51825 12.5019 4.18067V0.611109C12.5019 0.273493 12.7756 0 13.1132 0H14.2254C14.5628 0 14.8365 0.273493 14.8364 0.611109V4.18067C14.8364 4.51825 14.5627 4.79156 14.2254 4.79156Z" fill="currentColor"/>
        </svg>
        `
      this.calendarApi = this.$refs.refCalendar.getApi()
      this.title = this.calendarApi.view.title
    })
  },
  methods: {
    checkRollBack(val, event) {
      this.isDetail = val
      this.eventDetail = event
    },
    actionThoiGian(start, end) {
      if (!end) {
        end = start
      }

      const tmp_start = this.formatDate(start).split(' ')
      const tmp_end = this.formatDate(end).split(' ')

      if (tmp_start[0] == tmp_end[0]) { // nếu cùng ngày
        return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[1]}`
      }
      return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[0]} ${tmp_end[1]}`
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
      return ''
    },
    onEventDrop({ event }) {
      console.log(event)
    },
    onEventResize({ event }) {
      console.log(event)
    },
    onEventClick({ event }) {
      console.log(event)
    },
    onDateClick(info) {
      console.log(info)
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
      this.updateHop()
    },
    calendarPrev() {
      this.calendarApi.prev()
      this.title = this.calendarApi.view.title
      this.updateHop()
    },
    calendarNext() {
      this.calendarApi.next()
      this.title = this.calendarApi.view.title
      this.updateHop()
    },
    updateHop(){
      this.paramPayload.dateFrom =  moment(String(this.calendarApi.getDate())).subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
      this.paramPayload.dateTo =  moment(String(this.calendarApi.getDate())).subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
      this.$store.dispatch('hop/getListEvents', this.paramPayload)
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
            console.log(event)
          }
        })
        .catch()
    },
    viewEvent(event) {
      this.eventDetail = event
      // this.$bvModal.show('modal-event-detail')
      this.isDetail = !this.isDetail
    },
    AddEvent() {
      this.$bvModal.show('modal-event-add')
    },
    // eslint-disable-next-line no-unused-vars
    onClickRow(data) {
      // console.log(data)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
.hop-calendar{
  .fc-list-day-cushion{
    display: none !important;
  }

  .fc-list-day{
    display: none !important;
  }

}

.custom-bottom-model-button{
    .button-custom-model{
        height: 36px !important;
    }
  }
  .custom-form-model-dn{
    .modal-header{
      margin-bottom: 10px;
      svg{
        width: 14px;
      }
    }
    .modal-body{
      max-height: 665px;
      &:hover {
        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #f2f2f2;
        }
      }
      &::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        background-color: #fff;
      }
    }
    .modal-footer{
      padding: 10px 30px 20px !important;
    }
  }

  .head-table-custom{
    margin-left: 1.3rem;
    margin-right: 1.3rem;

    .hop-head{
      line-height: 3.3rem;
      display: flex;
      width: 100%;
      font-weight: 600;
      background-color: #EAEEF5;
      color: #40566F;
      text-align: left;
      vertical-align: middle;

      .mg-text-16{
        margin-left: 0.86rem;
      }

      .box-time{
        width: 20%;
      }

      .box-noidung{
        width: 35%;
      }

      .box-thanhphan{
        width: 25%;
      }
      .box-loai{
        width: 10%;
      }
      .box-trangthai{
        width: 10%;
      }
    }
  }

  .fc-list-event-graphic{
    display: none !important;
  }

  .fc-view{
    margin-left: 1.4rem;
    margin-right: 1.4rem;

    .box-noidung{
      width: 100%;
      display: flex;

      .row-thoigian{
        width: 20%;
      }

      .row-noidung{
        width: 35%;
      }

      .row-thanhphan{
        width: 25%;
      }
      .row-loai{
        width: 10%;
      }
      .row-trangthai{
        width: 10%;
      }

      .box-loai{
        width: 100%;
        line-height: 2rem;
        font-size: 1rem;
        color: #FFF;
        text-align: center;
        border-radius: 2rem;
        vertical-align: middle;
      }

      .color-tructuyen{
        background-color: #FF9F43;
      }

      .color-tructiep{
        background-color: #28C76F;
      }

      .color-hop{
        background-color: #28C76F;
      }

      .mg-10{
        margin-left: 1rem;
        margin-right: 1rem;
      }

      .box-trangthai{
        width: 100%;
        line-height: 2rem;
        font-size: 1rem;
        background: rgba(234, 84, 85, 0.1);
        border-radius: 2rem;
        text-align: center;
        border-radius: 2rem;
        vertical-align: middle;
        color: #EA5455;
      }
    }
  }
</style>
