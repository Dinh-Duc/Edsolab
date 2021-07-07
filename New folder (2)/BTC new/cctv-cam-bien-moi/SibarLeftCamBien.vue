<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-cctv">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area py-2"
          >
            <ul class="baocao-task-list list-y-kien-nguoi-dan p-0 m-0">
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
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      listReport: [
        {
          title: 'Tổng quan',
          key: 'TONGQUAN',
          count: 1,
          childs: [],
          icon: 'GridIcon',
        },
        {
          title: 'Báo cáo thống kê theo lĩnh vực',
          key: 'BAOCAOTKTHEOLV',
          count: 0,
          childs: [
            {
              title: 'Vi phạm giao thông',
              key: 'VPGT',
              count: 1,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Tài nguyên & Môi trường',
              key: 'TNMT',
              count: 1,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Y tế',
              key: 'YTE',
              count: 1,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'An ninh trật tự',
              key: 'ANTT',
              count: 1,
              childs: [],
              icon: 'LayersIcon',
            },
          ],
          icon: '',
        },
        {
          title: 'CCTV',
          key: 'CCTV',
          count: 0,
          childs: [
            {
              title: 'Bản đồ camera',
              key: 'BDCAMERA',
              count: 1,
              childs: [],
              icon: 'LayersIcon',
            },
          ],
          icon: '',
          dataApi: [],
        },
      ],
      idActive: 'TONGQUAN',
      keyActive: '',
      dataApi: [],
      dataShow: [],
    }
  },
  created() {
    const form = {
      key: 'TONGQUAN',
      keyChild: '',
    }
    this.$eventBus.$emit('cctv', form)
  },
  methods: {
    showChildReport(item) {
      this.idActive = item.key
      if (item.childs && item.childs.length > 0) {
        this.keyActive = item.childs[0].key
        const form = {
          key: item.key,
          keyChild: item.childs[0].key,
        }
        this.$eventBus.$emit('cctv', form)
      } else {
        const form = {
          key: item.key,
          keyChild: '',
        }
        this.keyActive = ''
        this.$eventBus.$emit('cctv', form)
      }
    },
    eventChild(keyParent, item) {
      this.idActive = keyParent
      this.keyActive = item.key
      const form = {
        key: keyParent,
        keyChild: item.key,
      }
      this.$eventBus.$emit('cctv', form)
    },
  },
}
</script>

<style lang="scss">
.sibar-cctv {
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
