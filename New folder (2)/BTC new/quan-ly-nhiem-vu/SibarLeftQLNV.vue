<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-quan-ly-nhiem-vu">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area py-2"
          >
            <ul class="baocao-task-list menu-lam p-0 m-0">
              <li
                v-for="(item, key) in listNv"
                :key="key"
                class="baocao-item"
              >
                <div
                  :class="{
                    'item d-flex align-items-center': true,
                    active: item.key == keyParentActive,
                  }"
                  @click="showChildReport(item)"
                >
                  <div
                    v-if="item.icon_class"
                    class="icon"
                  >
                    <feather-icon
                      class="mr-1"
                      :icon="item.icon_class"
                      size="14"
                    />
                  </div>
                  <div class="name-parent">
                    {{ item.title }}
                  </div>
                  <div
                    v-if="item.show_total"
                    class="count-item d-flex justify-content-end"
                  >
                    <label class="count">
                      {{ item.total }}
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
                          active: item1.key == keyChild1Active,
                        }"
                        @click="eventChild(item.key, item1)"
                      >
                        <div
                          v-if="item1.icon_class"
                          class="icon"
                        >
                          <feather-icon
                            class="mr-1"
                            :icon="item1.icon_class"
                            size="14"
                          />
                        </div>
                        <div class="name">
                          {{ item1.title }}
                        </div>
                        <div
                          v-if="item1.show_total"
                          class="count-item d-flex justify-content-end"
                        >
                          <label class="count">
                            {{ item1.total }}
                          </label>
                        </div>
                      </div>
                      <div
                        v-if="
                          item1.childs &&
                            item1.childs.length > 0 &&
                            item1.key == keyChild1Active
                        "
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
                                active: item2.key == keyChild2Active,
                              }"
                              @click="eventChild2(item.key, item1, item2)"
                            >
                              <div class="name">
                                {{ item2.title }}
                              </div>
                              <div
                                v-if="item2.show_total"
                                class="count-item d-flex justify-content-end"
                              >
                                <label class="count">
                                  {{ item2.total }}
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
          </vue-perfect-scrollbar>
          <div class="text-center btn-open-hop-phan">
            <b-button
              variant="primary"
              @click="openUrl('')"
            >
              Xử lý nhiệm vụ
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { generateUrl } from '@/api/quan-ly-nhiem-vu'
import datajson from './dataJson.json'

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      keyParentActive: 'TONGQUAN',
      keyChild1Active: '',
      listNv: datajson,
      keyChild2Active: '',
    }
  },
  created() {
    const form = {
      keyParent: 'TONGQUAN',
      keyChild1: '',
      keyChild2: '',
      dataItem: {},
    }
    this.$emit('dataMenu', form)
  },
  methods: {
    actionGenerateUrl() {
      generateUrl()
        .then(data => {
          if (data.statusCode === 200 && data.succeeded) {
            window.open(`${data.data.url}/redirect?otp=${data.data.key}`)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openUrl(url) {
      window.open(url, '_blank')
    },
    showChildReport(item) {
      this.keyParentActive = item.key
      if (item.childs && item.childs.length > 0) {
        this.eventChild(item.key, item.childs[0])
      } else {
        this.keyChild1Active = ''
        this.keyChild2Active = ''
        const form = {
          keyParent: item.key,
          keyChild1: '',
          keyChild2: '',
          dataItem: item.data,
        }
        this.$emit('dataMenu', form)
      }
    },
    eventChild(keyParent, item) {
      this.keyParentActive = keyParent
      this.keyChild1Active = item.key
      if (item.childs && item.childs.length > 0) {
        this.keyChild2Active = item.childs[0].key
        const form = {
          keyParent,
          keyChild1: item.key,
          keyChild2: item.childs[0].key,
          dataItem: item.childs[0].data,
        }
        this.$emit('dataMenu', form)
      } else {
        this.keyChild2Active = ''
        const form = {
          keyParent,
          keyChild1: item.key,
          keyChild2: '',
          dataItem: item.data,
        }
        this.$emit('dataMenu', form)
      }
    },
    eventChild2(keyParent, item1, item2) {
      this.keyParentActive = keyParent
      this.keyChild1Active = item1.key
      this.keyChild2Active = item2.key
      const form = {
        keyParent,
        keyChild1: item1.key,
        keyChild2: item2.key,
        dataItem: item2.data,
      }
      this.$emit('dataMenu', form)
    },
  },
}
</script>

<style lang="scss">
@import './sibarleft.scss';
.sibar-quan-ly-nhiem-vu {
  .sidebar-menu-list {
    position: relative;
    padding: 10px 0;
    height: calc(100% - 50px) !important;
  }
  .btn-open-hop-phan {
    button {
      width: 60%;
    }
  }
}
</style>
