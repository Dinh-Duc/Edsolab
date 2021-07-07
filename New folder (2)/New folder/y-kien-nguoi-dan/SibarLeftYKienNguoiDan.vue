<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-y-kien-nguoidan">
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
                          {{ item1.title }}
                        </div>
                        <!-- <div class="count-item d-flex justify-content-end">
                          <label class="count">
                            {{ item1.count }}
                          </label>
                        </div> -->
                      </div>
                      <div
                        v-if="item1.childs && item1.childs.length > 0"
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
                                {{ item2.title }}
                              </div>
                              <div class="count-item">
                                <label class="count">
                                  {{ item2.count }}
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
              @click="
                openUrl('http://bnv-pakn.chinhquyendientu.vn/')
              "
            >
              Ý kiến người dân
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UrlAPI } from '@/configs/config'
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
          title: 'Cơ quan xử lý',
          key: 'COQUANXULY',
          count: 0,
          childs: [
            {
              title: 'Đơn vị hành chính',
              key: 'DONVIHANHCHINH',
              count: 67,
              icon: 'LayersIcon',
              childs: [
                {
                  title: 'Vụ Tổ chức - Biên chế',
                  key: 'DVHC_VTCBC',
                  count: 67,
                  icon: 'LayersIcon',
                  childs: [],
                },
                {
                  title: 'Vụ Tiền lương',
                  key: 'DVHC_VTL',
                  count: 67,
                  icon: 'LayersIcon',
                  childs: [],
                },
                {
                  title: 'Vụ Hợp tác quốc tế',
                  key: 'DVHC_VHTQT',
                  count: 67,
                  icon: 'LayersIcon',
                  childs: [],
                },
                {
                  title: 'Cục Văn thư và Lưu trữ nhà nước',
                  key: 'DVHC_CVTVLTNN',
                  count: 67,
                  icon: 'LayersIcon',
                  childs: [],
                },
                {
                  title: 'Vụ Chính quyền địa phương',
                  key: 'DVHC_VCQDP',
                  count: 67,
                  icon: 'LayersIcon',
                  childs: [],
                },
              ],
            },
          ],
          icon: '',
        },
        {
          title: 'Tình Trạng',
          key: 'TinhTrang',
          count: 0,
          childs: [
            {
              title: 'Chờ xử lý',
              key: 'CHOXULY',
              count: 200,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Đang xử lý',
              key: 'DANGXULY',
              count: 120,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Đã xử lý',
              key: 'DAXULY',
              count: 310,
              childs: [],
              icon: 'LayersIcon',
            },
            {
              title: 'Quá hạn xử lý',
              key: 'QUAHANXULY',
              count: 150,
              childs: [],
              icon: 'LayersIcon',
            },
          ],
          icon: '',
          dataApi: [],
        },
      ],
      idActive: 'TONGQUAN', // active để show child
      keyActive: '',
      idSubActive: '',
      idSubActive2: '',
      dataApi: [],
      dataShow: [],
    }
  },
  created() {
    const form = {
      key: 'TONGQUAN',
      keyChild: '',
    }

    // eslint-disable-next-line no-undef
    COMMON_GET(
      `${UrlAPI}/api/YKienNguoiDan/chitiet-xuly-thaido-congchuc`,
      {},
    ).then(res => {
      this.dataApi = res.data
    })
    this.$eventBus.$emit('y-kien-nguoi-dan', form)
  },
  methods: {
    openUrl(url) {
      window.open(url, '_blank')
    },
    showChildReport(item) {
      this.idActive = item.key
      if (item.childs && item.childs.length > 0) {
        this.idSubActive = item.childs[0].key
        if (item.childs[0].childs && item.childs[0].childs.length > 0) {
          this.idSubActive2 = item.childs[0].childs[0].key
        }
        const form = {
          key: item.key,
          keyChild: item.childs[0].key,
        }
        window.keyChildYKND = item.childs[0].key
        this.$eventBus.$emit('y-kien-nguoi-dan', form)
      } else {
        const form = {
          key: item.key,
          keyChild: '',
        }
        this.$eventBus.$emit('y-kien-nguoi-dan', form)
      }
    },
    eventChild(keyParent, item) {
      this.idActive = keyParent
      this.idSubActive = item.key
      if (item.childs && item.childs.length > 0) {
        this.idSubActive2 = item.childs[0].key
      } else {
        this.idSubActive2 = ''
      }
      this.formatData(item.key)
      const form = {
        key: keyParent,
        keyChild: item.key,
      }
      this.$eventBus.$emit('y-kien-nguoi-dan', form)
    },
    eventChild2(keyParent, item1, item2) {
      this.idActive = keyParent
      this.idSubActive = item1.key
      this.idSubActive2 = item2.key
      const form = {
        keyParent,
        keyChild: item1.key,
        keyChild2: item2.key,
        dataLink: item2,
      }
      this.$eventBus.$emit('y-kien-nguoi-dan', form)
    },
    formatData(key) {
      if (key === 'CHOXULY') {
        this.dataShow = []
        // this.dataApi.map(item => {
        //   if(item.trangthai === '')
        // })
      } else if (key === 'DANGXULY') {
        console.log(12)
      } else if (key === 'DAXULY') {
        console.log(12)
      } else if (key === 'QUAHANXULY') {
        console.log(12)
      } else if (key === 'VPUBNDTINH') {
        console.log(12)
      } else if (key === 'SOBANNGANH') {
        console.log(12)
      } else if (key === 'DIAPHUONG') {
        console.log(12)
      } else if (key === 'TONGQUAN') {
        console.log(1212)
      }
    },
  },
}
</script>

<style lang="scss">
.sibar-y-kien-nguoidan {
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
  .btn-open-hop-phan {
    button {
      width: 60%;
    }
  }
}
</style>
