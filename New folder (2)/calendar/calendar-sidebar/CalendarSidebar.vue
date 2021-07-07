<template>
  <div class="sidebar-wrapper">
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scroll-area"
    >
      <div class="sidebar-wrapper__calander">
        <div class="sidebar-calander__actions">
          <div class="sidebar-calander__actions-wrapper">
            <div
              class="d-flex align-items-center justify-content-center add-event space-x-10 cursor-pointer"
              @click="$emit('update:isEventHandlerTypeCalendarActive', true)"
            >
              <svg
                v-svg
                symbol="icon-plus"
                size="12 12"
              />
              <span>Tạo mới</span>
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
                            <div class="count-item d-flex justify-content-end">
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
          <!-- <div
            class="event-filter d-flex align-items-center"
            :class="{ active: filterSelect === 'personal' }"
            @click="filterSelect = 'personal'"
          >
            <svg
              v-svg
              symbol="icon-user"
              size="12 12"
            />
            <span class="ml-1">Lịch của tôi</span>
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
            @click="filterSelect = 'unit'"
          >
            <svg
              v-svg
              symbol="icon-unit"
              size="14 14"
            />
            <span class="ml-1">Lịch đơn vị</span>
            <b-badge
              pill
              class="ml-auto"
            >
              1
            </b-badge>
          </div>
          <div class="mt-2">
            <h5 class="app-label">
              <span class="align-middle">Đơn vị</span>
            </h5>
            <div
              v-for="item in filterUnitEvent"
              :key="item.name"
              class="event-filter d-flex align-items-center"
              :class="{ active: filterSelect === item.id }"
              @click="filterSelect = item.id"
            >
              <svg
                v-svg
                symbol="icon-layer"
                size="12 12"
              />
              <span class="ml-1">{{ item.name }}</span>
              <b-badge
                pill
                class="ml-auto"
              >
                {{ item.count }}
              </b-badge>
            </div>
          </div>
          <div class="mt-2">
            <h5 class="app-label">
              <span class="align-middle">Loại lịch</span>
            </h5>
            <div
              v-for="item in filterTypeEvent"
              :key="item.name"
              class="event-filter d-flex align-items-center"
              :class="{ active: filterSelect === item.id }"
              @click="filterSelect = item.id"
            >
              <svg
                v-svg
                symbol="icon-layer"
                size="12 12"
              />
              <span class="ml-1">{{ item.name }}</span>
              <b-badge
                pill
                class="ml-auto"
              >
                {{ item.count }}
              </b-badge>
            </div>
          </div> -->
        </div>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { BBadge } from 'bootstrap-vue'
import sidebar from './data_sidebar.json'

export default {
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
          name: 'Ủy ban nhân dân',
          id: 'unit_1',
          count: '1',
        },
        {
          name: 'Hội đồng nhân dân',
          id: 'unit_2',
          count: '1',
        },
        {
          name: 'Tỉnh ủy',
          id: 'unit_3',
          count: '1',
        },
        {
          name: 'Sở, Ban, Ngành',
          id: 'unit_4',
          count: '1',
        },
        {
          name: 'Địa phương',
          id: 'unit_5',
          count: '1',
        },
      ],
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
      dataSidebar: sidebar,
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
    },
    eventChild2(keyGrand, keyChild, item) {
      this.idActive = keyGrand
      this.keyActive = keyChild
      this.child2 = item.key
    },
  },
}
</script>

<style lang="scss">
.sidebar-calander__filter {
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
</style>
