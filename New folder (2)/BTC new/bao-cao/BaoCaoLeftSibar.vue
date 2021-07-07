<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu report-app-menu">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area"
          >
            <ul class="baocao-task-list list-bao-cao p-0 m-0">
              <li
                v-for="(item, key) in listReport"
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
                  <div class="name-parent">
                    {{ item.name }}
                  </div>
                </div>
                <div
                  v-show="item.key == idActive"
                  class="child-report"
                >
                  <ul
                    v-if="item.childs && item.childs.length > 0"
                    class="mt-0"
                  >
                    <li
                      v-for="(item1, key1) in item.childs"
                      :key="key1"
                    >
                      <div
                        :class="{
                          'item d-flex align-items-center': true,
                          active: item1.key == idSubActive,
                        }"
                        @click="eventChild(item.key, item1)"
                      >
                        <div class="name">
                          {{ item1.name }}
                        </div>
                        <!-- <div class="count-item d-flex justify-content-end">
                          <label class="count">
                            {{ item1.count }}
                          </label>
                        </div> -->
                      </div>
                      <div
                        v-if="item1.childs && item1.childs.length > 0 && item1.key == idSubActive"
                        class="child-lv-3"
                      >
                        <ul class="mt-0">
                          <li
                            v-for="(item2, key2) in item1.childs"
                            :key="key2"
                          >
                            <div
                              :class="{
                                'item d-flex align-items-center': true,
                                active: item2.key == idSubActive2,
                              }"
                              @click="eventChild2(item.key, item1, item2)"
                            >
                              <div class="name">
                                {{ item2.name }}
                              </div>
                              <!-- <div
                                class="count-item d-flex justify-content-end"
                              >
                                <label class="count">
                                  {{ item2.count }}
                                </label>
                              </div> -->
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </vue-perfect-scrollbar>
          <div class="text-center btn-open-hop-phan">
            <b-button
              variant="primary"
              @click="
                openUrl('http://bnv-baocao.chinhquyendientu.vn/')
              "
            >
              Báo cáo điện tử
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import listData from './data_report_new.json'

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      idActive: 'CaNhan',
      idSubActive: '',
      listReport: listData,
      listChildReport: [],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      idSubActive2: '',
    }
  },
  created() {
    const form = {
      key_parent: 'CaNhan',
      key_child: '',
      key_child_2: '',
      dataLink: {},
    }
    this.$eventBus.$emit('data-report', form)
  },
  methods: {
    openUrl(url) {
      window.open(url, '_blank')
    },
    showChildReport(item) {
      this.idActive = item.key
      this.idSubActive2 = ''
      if (item.childs && item.childs.length > 0) {
        this.eventChild(item.key, item.childs[0])
      } else {
        this.idSubActive = ''
        const form = {
          key_parent: item.key,
          key_child: '',
          key_child_2: '',
          dataLink: item,
        }
        this.$eventBus.$emit('data-report', form)
      }
    },
    eventChild(keyParent, item) {
      this.idActive = keyParent
      this.idSubActive = item.key
      if (item.childs && item.childs.length > 0) {
        this.idSubActive2 = item.childs[0].key
        const form = {
          key_parent: keyParent,
          key_child: item.key,
          key_child_2: item.childs[0].key,
          dataLink: item.childs[0],
        }
        this.$eventBus.$emit('data-report', form)
      } else {
        const form = {
          key_parent: keyParent,
          key_child: item.key,
          key_child_2: '',
          dataLink: item,
        }
        this.idSubActive2 = ''
        this.$eventBus.$emit('data-report', form)
      }
    },
    eventChild2(keyParent, item1, item2) {
      this.idActive = keyParent
      this.idSubActive = item1.key
      this.idSubActive2 = item2.key
      const form = {
        key_parent: keyParent,
        key_child: item1.key,
        key_child_2: item2.key,
        dataLink: item2,
      }
      localStorage.setItem('covidDP', JSON.stringify(item2))
      this.$eventBus.$emit('data-report', form)
    },
  },
}
</script>

<style lang="scss">
.report-app-menu {
  .baocao-task-list {
    li {
      list-style: none;
      font-size: 14px;
      .name-parent {
        font-weight: 600;
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
            fill: #5a8dee;
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
  .sidebar-menu-list {
    position: relative;
    padding: 10px 0;
    height: calc(100% - 50px) !important;
  }
  .btn-open-hop-phan{
    button{
      width: 60%
    }
  }
}
</style>
