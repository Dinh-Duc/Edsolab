<template>
  <div class="sidebar-wrapper calendarSidebar">
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scroll-area"
    >
      <div class="sidebar-wrapper__calander">
        <div class="sidebar-calander__actions">
          <div class="sidebar-calander__actions-wrapper">
            <div
              class="d-flex align-items-center justify-content-center add-event space-x-10 cursor-pointer"
              @click="$emit('update:isEventHandlerAddActive', true)"
            >
              <svg
                v-svg
                symbol="icon-plus"
                size="12 12"
              />
              <span>Đăng ký</span>
            </div>
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
          <div
            class="absolute sidebar-calander__find-btn cursor-pointer text-main"
          >
            <svg
              v-svg
              symbol="icon-search"
              size="20 20"
            />
          </div>
          <input
            v-model="search_user"
            class="w-full"
            placeholder="Tìm theo người"
          >
        </div>
        <div class="sidebar-calander__filter">
          <div
            class="event-filter d-flex align-items-center"
            :class="{ active: filterSelect === 'personal' }"
            @click="filterSelect = 'personal',keyActive = '', child2 = ''"
          >
            <svg
              v-svg
              symbol="icon-user"
              size="12 12"
            />
            <span class="ml-1">Lịch họp của tôi</span>
            <b-badge
              pill
              class="ml-auto"
            >
              1
            </b-badge>
          </div>
          <div
            class="event-filter d-flex align-items-center"
            :class="{ active: filterSelect === 'unit' }"
            @click="filterSelect = 'unit', keyActive = '', child2 = ''"
          >
            <svg
              v-svg
              symbol="icon-unit"
              size="14 14"
            />
            <span class="ml-1">Đơn vị</span>
            <b-badge
              pill
              class="ml-auto"
            >
              1
            </b-badge>
          </div>
          <div class="mt-2">
            <ul class="baocao-task-list list-y-kien-nguoi-dan p-0 m-0">
              <li
                v-for="(item, key) in dataSidebar"
                :key="key"
                class="baocao-item"
              >
                <div
                  :class="{
                    'item d-flex align-items-center': true,
                    active: item.key == idActive,
                  }"
                  @click="showChildReport(item)"
                >
                  <div
                    v-if="item.icon"
                    class="icon"
                  >
                    <feather-icon
                      class="mr-1"
                      :icon="item.icon"
                      size="14"
                    />
                  </div>
                  <div class="name-parent">
                    {{ item.title }}
                  </div>
                  <div
                    v-if="item.count > 0"
                    class="count-item d-flex justify-content-end"
                  >
                    <label class="count">
                      {{ item.count }}
                    </label>
                  </div>
                </div>
                <div class="child-report">
                  <ul
                    v-if="item.childs && item.childs.length > 0"
                    class="mt-0 pl-2"
                  >
                    <li
                      v-for="(item1, key1) in item.childs"
                      :key="key1"
                    >
                      <div
                        :class="{
                          'item d-flex align-items-center': true,
                          active: item1.key == keyActive,
                        }"
                        @click="eventChild(item.key, item1)"
                      >
                        <div
                          v-if="item1.icon"
                          class="icon"
                        >
                          <feather-icon
                            class="mr-1"
                            :icon="item1.icon"
                            size="14"
                          />
                        </div>
                        <div class="name">
                          {{ item1.title }}
                        </div>
                        <div class="count-item d-flex justify-content-end">
                          <label class="count">
                            {{ item1.count }}
                          </label>
                        </div>
                      </div>
                      <div
                        v-if="item1.childs.length"
                        class="children_2"
                      >
                        <ul>
                          <li
                            v-for="i in item1.childs"
                            :key="i.key"
                          >
                            <div
                              :class="{
                                'item d-flex align-items-center': true,
                                active: i.key == child2,
                              }"
                              @click="eventChild2(item.key, item1.key, i)"
                            >
                              <div
                                v-if="i.icon"
                                class="icon"
                              >
                                <feather-icon
                                  class="mr-1"
                                  :icon="i.icon"
                                  size="14"
                                />
                              </div>
                              <div class="name">
                                {{ i.title }}
                              </div>
                              <div
                                class="count-item d-flex justify-content-end"
                              >
                                <label class="count">
                                  {{ i.count }}
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-2">
            <h5 class="app-label">
              <span class="align-middle">Phòng họp trực tuyến</span>
            </h5>
            <div
              v-for="item in sidebarHopTrucTuyen"
              :key="item.name"
              class="event-filter d-flex align-items-center"
              :class="{ active: filterSelect === item.id }"
              @click="
                filterSelect = item.id
                openPhongHop(item.link)
              "
            >
              <svg
                v-svg
                symbol="icon-layer"
                size="12 12"
              />
              <span class="ml-1">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { BBadge } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useCalendarSidebar from './useCalendarSidebar'

export default {
  directives: {
    Ripple,
  },
  components: {
    BBadge,
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar'),
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
  },
  data() {
    return {
      showUnit: true,
      showType: true,
      activeDate: undefined,
      perfectScrollbarSettings: {
        // maxScrollbarLength: 150,
      },
      masks: {
        title: 'MMMM, YYYY',
      },
      search_user: '',
      filterSelect: 'personal',
      filterUnitEvent: [
        {
          name: 'Lãnh đạo Bộ',
          id: 'unit_1',
          count: '1',
        },
        {
          name: 'Đơn vị hành chính',
          id: 'unit_2',
          count: '1',
          childs: [],
        },
        {
          name: 'Đơn vị sự nghiệp',
          id: 'unit_3',
          count: '1',
        },
      ],
      sidebarHopTrucTuyen: [
        {
          name: 'Họp giao ban tháng',
          id: 'type_1',
          count: '1',
          link:
            'https://call.chinhquyendientu.vn/UBND-DN-HOP-thuong-truc-tinh-uy',
        },
        // {
        //   name: 'Họp thường trực Đảng ủy (7/7)',
        //   id: 'type_2',
        //   count: '1',
        //   link:
        //     'https://call.chinhquyendientu.vn/UBND-DN-HOP-thuong-truc-uy-ban',
        // },
        {
          name: 'Họp BCĐ phòng chống covid (16/19)',
          id: 'type_3',
          count: '1',
          link:
            'https://call.chinhquyendientu.vn/UBND-DN-HOP-bcd-phong-chong-covid',
        },
      ],
      dataSidebar: [
        {
          title: 'Đơn vị',
          key: 'DONVI',
          count: 0,
          childs: [
            {
              title: 'Lãnh đạo Bộ',
              key: 'LANHDAOBO',
              count: 20,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Đơn vị hành chính',
              key: 'DONVIHANHCHINH',
              count: 15,
              childs: [
                {
                  title: 'Vụ ngân sách Nhà nước',
                  key: 'VUNGANSACHNHANUOC',
                  count: 5,
                },
                {
                  title: 'Vụ Đầu tư',
                  key: 'VUDAOTU',
                  count: 5,
                },
                {
                  title: 'Vụ Tài chính quốc phòng, an ninh, đặc biệt (Vụ I)',
                  key: 'VUTAICHINHQUOCPHONG',
                  count: 5,
                },
                {
                  title: 'Vụ Tài chính hành chính sự nghiệp',
                  key: 'VUTAICHINHSUNGHIEP',
                  count: 5,
                },
                {
                  title: 'Vụ Chính sách thuế',
                  key: 'VUTAICHINHTHUE',
                  count: 5,
                },
                {
                  title: 'Vụ Tài chính các ngân hàng và tổ chức tài chính',
                  key: '12',
                  count: 5,
                },
                {
                  title: 'Cục quản lý, giám sát kế toán, kiểm toán',
                  key: '13',
                  count: 5,
                },
                {
                  title: 'Vụ Hợp tác quốc tế',
                  key: '14',
                  count: 5,
                },
                {
                  title: 'Vụ Pháp chế',
                  key: '15',
                  count: 5,
                },
                {
                  title: 'Cục Kế hoạch - Tài chính',
                  key: '16',
                  count: 5,
                },
                {
                  title: 'Vụ Tổ chức cán bộ',
                  key: '17',
                  count: 5,
                },
                {
                  title: 'Vụ Thi đua - Khen thưởng',
                  key: '18',
                  count: 5,
                },
                {
                  title: 'Thanh tra',
                  key: '19',
                  count: 5,
                },
                {
                  title: 'Văn Phòng',
                  key: '20',
                  count: 5,
                },
                {
                  title: 'Cục Quản lý công sản',
                  key: '21',
                  count: 5,
                },
                {
                  title: 'Cục Tài chính doanh nghiệp',
                  key: '22',
                  count: 5,
                },
                {
                  title: 'Cục Quản lý nợ và Tài chính đối ngoại',
                  key: '23',
                  count: 5,
                },
                {
                  title: 'Cục Quản lý, giám sát bảo hiểm',
                  key: '24',
                  count: 5,
                },
                {
                  title: 'Cục Quản lý giá',
                  key: '25',
                  count: 5,
                },
                {
                  title: 'Cục Tin học và Thống kê tài chính',
                  key: '26',
                  count: 5,
                },
                {
                  title: 'Tổng cục Thuế',
                  key: '27',
                  count: 5,
                },
                {
                  title: 'Tổng cục Hải quan',
                  key: '28',
                  count: 5,
                },
                {
                  title: 'Tổng cục Dự trữ Nhà nước',
                  key: '29',
                  count: 5,
                },
                {
                  title: 'Kho bạc Nhà nước',
                  key: '30',
                  count: 5,
                },
                {
                  title: 'Ủy ban Chứng khoán Nhà nước',
                  key: '31',
                  count: 5,
                },
              ],
              icon: 'LayersIcon',
            },
            {
              title: 'Đơn vị sự nghiệp',
              key: '32',
              count: 0,
              icon: 'LayersIcon',
              childs: [
                {
                  title: 'Viện Chiến lược và Chính sách tài chính',
                  key: '33',
                  count: 1,
                },
                {
                  title: 'Thời báo Tài chính Việt Nam',
                  key: '34',
                  count: 1,
                },
                {
                  title: 'Tạp chí Tài chính',
                  key: '35',
                  count: 1,
                },
                {
                  title: 'Trường Bồi dưỡng cán bộ tài chính',
                  key: '36',
                  count: 1,
                },
                {
                  title: 'Nhà xuất bản Tài chính',
                  key: '37',
                  count: 1,
                },
                {
                  title: 'Học Viện Tài chính',
                  key: '38',
                  count: 1,
                },
                {
                  title: 'Trường Đại học Tài chính - Marketing',
                  key: '39',
                  count: 1,
                },
                {
                  title: 'Trường Đại học TC - KT',
                  key: '40',
                  count: 1,
                },
                {
                  title:
                    'Trường Đại học TC-QTKDViện Chiến lược và Chính sách tài chính',
                  key: '41',
                  count: 1,
                },
                {
                  title: 'Thời báo Tài chính Việt Nam',
                  key: '42',
                  count: 1,
                },
                {
                  title: 'Tạp chí Tài chính',
                  key: '43',
                  count: 1,
                },
                {
                  title: 'Trường Bồi dưỡng cán bộ tài chính',
                  key: '44',
                  count: 1,
                },
                {
                  title: 'Nhà xuất bản Tài chính',
                  key: '45',
                  count: 1,
                },
                {
                  title: 'Học Viện Tài chính',
                  key: '46',
                  count: 1,
                },
                {
                  title: 'Trường Đại học Tài chính - Marketing',
                  key: '47',
                  count: 1,
                },
                {
                  title: 'Trường Đại học TC - KT',
                  key: '48',
                  count: 1,
                },
                {
                  title: 'Trường Đại học TC-QTKD',
                  key: '49',
                  count: 1,
                },
              ],
            },
          ],
          icon: '',
        },
      ],
      idActive: 'LICHCUATOI',
      keyActive: '',
      child2: '',
    }
  },
  computed: {
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
    openPhongHop(link) {
      window.open(link)
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
    },
    showChildReport(item) {
      this.idActive = item.key
      this.keyActive = item.childs && item.childs.length > 0 ? item.childs[0].key : ''
    },
    eventChild(keyParent, item) {
      this.idActive = keyParent
      this.keyActive = item.key
      this.child2 = ''

      this.filterSelect = ''
    },
    eventChild2(keyGrand, keyChild, item) {
      this.idActive = keyGrand
      this.keyActive = keyChild
      this.child2 = item.key

      this.filterSelect = ''
    },
  },
  setup() {
    const {
      calendarOptions,
      selectedCalendars,
      checkAll,
    } = useCalendarSidebar()

    return {
      calendarOptions,
      selectedCalendars,
      checkAll,
    }
  },
}
</script>
<style lang="scss">
.calendarSidebar {

  .height-sidebar {
    height: 37vh;
  }
  .sidebar-calander__filter {
    span.badge {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .baocao-task-list {
      li {
        list-style: none;
        font-size: 14px;
        .name-parent {
          font-weight: 600;
          width: 100%;
        }
      }
      .item {
        padding: 8px 15px;
        cursor: pointer;
        font-size: 16px;
        .icon {
          width: 25px;
        }
        &.active {
          color: #5a8dee;
          border-left: 2px solid #5a8dee;
          .count-item {
            .count {
              background: #5a8dee;
              color: #fff;
            }
          }
        }
        .count-item {
          width: 13%;
          .count {
            background: #e6eefc;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e6eefc;
            border-radius: 2px;
            font-size: 12px;
            color: #5a8dee;
          }
        }
      }
      .child-report {
        .item {
          padding-left: 0;
          .name {
            width: 100%;
          }
          .count-item {
            width: 13%;
            .count {
              background: #e6eefc;
              width: 25px;
              height: 25px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #e6eefc;
              border-radius: 2px;
              font-size: 12px;
              color: #5a8dee;
            }
          }
          &.active {
            border-left: 0;
            svg {
              color: #5a8dee;
            }
            .count-item {
              .count {
                background: #5a8dee;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
