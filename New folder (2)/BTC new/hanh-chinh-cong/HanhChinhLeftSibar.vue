<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-hcc">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area py-2"
          >
            <ul class="hcc-task-list p-0 m-0">
              <li
                v-for="(item, key) in listReport"
                :key="key"
                class="hcc-item"
              >
                <div
                  :class="{
                    'item d-flex align-items-center': true,
                    active: item.id == idActive,
                  }"
                  @click="showChildReport(item)"
                >
                  <div class="icon">
                    <feather-icon
                      class="mr-1"
                      :icon="item.icon"
                      size="14"
                    />
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
                <div
                  v-show="item.id == idActive"
                  class="child-hcc"
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
                          active: item1.key == keyActive,
                        }"
                        @click="eventChild(item1)"
                      >
                        <div class="icon">
                          <feather-icon
                            icon="CircleIcon"
                            class="mr-1"
                            size="10"
                          />
                        </div>
                        <div class="name">
                          {{ item1.name }}
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
import dataHcc from './data_hc.json'

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      listReport: dataHcc,
      idActive: 1,
      keyActive: '',
    }
  },
  created() {
    const form = {
      boxTable: this.listReport[0].boxTable,
      url: this.listReport[0].url,
    }
    this.$eventBus.$emit('data-hcc', form)
  },
  methods: {
    showChildReport(item) {
      this.idActive = item.id
      if (item.childs && item.childs.length > 0) {
        this.keyActive = item.childs[0].key
        const form = {
          dataApi: item.childs[0].dataApi ? item.childs[0].dataApi : {},
        }
        console.log('form', form)
        this.$eventBus.$emit('data-hcc', form)
      } else {
        const form = {
          dataApi: item.dataApi ? item.dataApi : {},
          url: item.url ? item.url : '',
        }
        this.$eventBus.$emit('data-hcc', form)
      }
    },
    eventChild(item) {
      this.keyActive = item.key
      const form = {
        dataApi: item.dataApi ? item.dataApi : {},
        url: item.url ? item.url : '',
      }
      this.$eventBus.$emit('data-hcc', form)
    },
  },
}
</script>

<style lang="scss">
.sibar-hcc {
  ul {
    li {
      list-style: none;
      font-size: 14px;
    }
    .item {
      padding: 8px 15px;
      cursor: pointer;
      .icon {
        width: 25px;
      }
      &.active {
        color: #5a8dee;
        border-left: 2px solid #5a8dee;
      }
    }
    .child-hcc {
      .item {
        &.active {
          border-left: 0;
          svg {
            color: #5a8dee;
            fill: #5a8dee;
          }
        }
      }
    }
  }
}
</style>
