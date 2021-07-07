<template>
  <div class="sidebar-wrapper">
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scroll-area"
    >
      <div class="sidebar-wrapper__calander">
        <div class="sidebar-calander__actions">
          <div class="sidebar-calander__actions-wrapper">
            <b-button
              class="d-flex align-items-center justify-content-center add-event space-x-10 cursor-pointer"
              @click="openAddModal()"
            >
              <svg
                v-svg
                symbol="icon-plus"
                size="12 12"
              />
              <span>Tạo mới</span>
            </b-button>
          </div>
          <div>
            <v-calendar
              ref="view-calendar"
              is-range
              is-expanded
              :attributes="attrs"
              :masks="masks"
              :first-day-of-week="2"
              trim-weeks
              locale="vi"
              title-position="left"
              :disable-page-swipe="false"
              @dayclick="onDayClick"
            />
          </div>
        </div>
        <div class="sidebar-calander__find flex items-center">
          <div class="absolute sidebar-calander__find-btn cursor-pointer text-main"><svg
            v-svg
            symbol="icon-search"
            size="20 20"
          /></div>
          <input
            v-model="search_user"
            class="w-full"
            placeholder=" "
          >
        </div>
        <div class="sidebar-calander__filter">
          <div
            class="event-filter d-flex align-items-center"
            :class="{ active: isActiveLeftSideBarLich === 'personal' }"
            @click="$store.dispatch('lichlamviec/actionIsActiveLeftSideBarLich', 'personal'); actionLeftSideBar('personal')"
          >
            <svg
              v-svg
              symbol="icon-user"
              size="12 12"
            />
            <span class="ml-1">Lịch của tôi</span>
            <b-badge
              v-if="scheduleCount"
              pill
              class="ml-auto"
            >
              {{ scheduleCount.countScheduleCaNhan }}
            </b-badge>
          </div>
          <div
            class="event-filter d-flex align-items-center"
            :class="{ active: isActiveLeftSideBarLich === 'unit' }"
            @click="$store.dispatch('lichlamviec/actionIsActiveLeftSideBarLich', 'unit'); actionLeftSideBar('unit')"
          >
            <svg
              v-svg
              symbol="icon-unit"
              size="14 14"
            />
            <span class="ml-1">Lịch đơn vị</span>
            <b-badge
              v-if="scheduleCount"
              pill
              class="ml-auto"
            >
              {{ scheduleCount.countScheduleDonVi }}
            </b-badge>
          </div>
          <div class="mt-2">
            <h5
              class="app-label cursor-pointer d-flex align-items-center"
              @click="showUnit = !showUnit"
            >
              <span class="align-middle mr-auto">Đơn vị</span>
              <svg
                v-if="showUnit"
                v-svg
                symbol="icon-down-arrow"
                size="12 12"
              />
              <svg
                v-else
                v-svg
                symbol="icon-up-arrow"
                size="12 12"
              />
            </h5>
            <div
              v-if="showUnit"
              class="box-donvi-hop align-items-center justify-content-start d-flex flex-column w-100 pr-2"
            >
              <ItemChild
                v-for="item in filterUnitEvent"
                :key="item.tenDonVi"
                :class="{ active: isActiveLeftSideBarLich === item.id }"
                :data-menu="item"
              />
            </div>
          </div>
          <div class="mt-2">
            <h5
              class="app-label cursor-pointer d-flex align-items-center"
              @click="showType = !showType"
            >
              <span class="align-middle mr-auto">Loại lịch</span>
              <svg
                v-if="showType"
                v-svg
                symbol="icon-down-arrow"
                size="12 12"
              />
              <svg
                v-else
                v-svg
                symbol="icon-up-arrow"
                size="12 12"
              />
            </h5>
            <div v-if="showType">
              <div
                v-for="item in filterTypeEvent"
                :key="item.name"
                class="event-filter d-flex align-items-center"
                :class="{ active: filterSelect === item.id }"
                @click="filterSelect = item.id; openCommingsoon()"
              >
                <svg
                  v-svg
                  symbol="icon-layer"
                  size="12 12"
                />
                <span class="ml-1">{{ item.name }}</span>
                <b-badge
                  pill
                  class="ml-auto hidden hide"
                >
                  {{ item.count }}
                </b-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
/* eslint-disable */
import {
  BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import { USER_DATA } from '@/configs/config.js'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { getLeftSideBar } from '@/api/calendar/indexNew'
import { mapGetters } from 'vuex'

export default {
  components: {
    BBadge,
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar'),
    ItemChild: () => import('./ItemChild.vue'),
  },
  directives: {
    Ripple,
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      require: true,
    },
    isEventHandlerAddActive: {
      type: Boolean,
      default: false,
    },
    events: {
      type: Array,
      default: null,
    },
    calendarApi: {
      type: Object,
      default: null,
    },
    openAddModal: {
      type: Function,
      default: null,
    },
    scheduleCount: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showUnit: true,
      showType: true,
      paramPayload: {
        DateFrom: moment().startOf('month').format('YYYY-MM-DD'),
        DateTo: moment().endOf('month').format('YYYY-MM-DD'),
        CanBoId: JSON.parse(localStorage.getItem(USER_DATA)).id.toString(),
        DonViId: null,
        Type: -1,
        PageIndex: 1,
        PageSize: 1000,
      },
      perfectScrollbarSettings: {
        // maxScrollbarLength: 150,
      },
      masks: {
        title: 'MMMM, YYYY',
      },
      search_user: '',
      filterSelect: 'personal',
      filterUnitEvent: [],
      filterTypeEvent: [
        {
          name: 'Làm việc',
          id: 'type_1',
          count: '1',
        },
        {
          name: 'Công tác',
          id: 'type_2',
          count: '1',
        },
        {
          name: 'Tiếp dân',
          id: 'type_3',
          count: '1',
        },
      ],
    }
  },
  created() {
    this.getCountDonVi()
  },
  computed: {
    ...mapGetters({
        isActiveLeftSideBarLich: 'lichlamviec/isActiveLeftSideBarLich',
    }),
    markdates() {
      // eslint-disable-next-line no-var
      var arrDate = []
      this.events.forEach(item => {
        arrDate.push(item.end)
        arrDate.push(item.start)
      })
      return arrDate
    },
    attrs() {
      return [
        {
          key: 'today',
          highlight: {
            color: 'red',
            style: {
              background: '#5A8DEE',
              color: 'white',
            },
          },
          dates: new Date(),
        },
        {
          dot: {
            style: {
              backgroundColor: '#46D68C',
            },
          },
          dates: this.markdates,
        },
      ]
    },
  },
  methods: {
    actionLeftSideBar(val){
      switch(val){
        case 'personal':
          this.actionGetPersonal()
          break
        case 'unit':
          this.actionGetUnit()
          break
        default:
          return
      }

    },
    actionGetPersonal(){
      const tmp_payload = Object.assign({}, this.paramPayload)
      tmp_payload.Type = -1
      tmp_payload.DonViId = null
      tmp_payload.CanBoId = JSON.parse(localStorage.getItem(USER_DATA)).id.toString()
      this.filterSchedule(tmp_payload)
    },
    actionGetUnit(){
      const tmp_payload = Object.assign({}, this.paramPayload)
      tmp_payload.DonViId = JSON.parse(localStorage.getItem(USER_DATA)).donViTrucThuoc.id.toString()
      tmp_payload.Type = 1
      tmp_payload.CanBoId = null
      this.filterSchedule(tmp_payload)
    },
    filterSchedule(val) {
      this.$store.dispatch('lichlamviec/getListEvents', val)
    },
    getCountDonVi() {
      const payload = { DonViId: null }
      getLeftSideBar(payload).then(data => {
        if(data.succeeded){
          if(data.data.length > 0){
            const payloadChild = {
              DonViId: data.data[0].id
            }
            getLeftSideBar(payloadChild).then(data => {
              if(data.succeeded){
                this.filterUnitEvent = data.data
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onDayClick(day) {
      this.calendarApi.gotoDate(day.id)
      if (this.calendarApi.view.type.indexOf('list') !== -1) {
        this.calendarApi.changeView('listDay')
        this.$emit('typeView', 'list')
      } else {
        this.calendarApi.changeView('timeGridDay')
        this.$emit('typeView', 'grid')
      }
      this.$emit('changeTitle', this.calendarApi.view.title)
      this.$emit('timeSelect', 'day')
      moment().isSame(day.id, 'day') ? this.$emit('activeToday', true) : this.$emit('activeToday', false)
    },
    openCommingsoon() {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          variant: 'warning',
          icon: 'BellIcon',
          text: 'Chức năng đang được phát triển',
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .add-event{
    background-color: rgba(90, 141, 238, 0.1) !important;
    border: none;
    color: #5A8DEE !important;
    width: 100%;
  }
</style>
