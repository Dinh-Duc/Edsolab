<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-dbdt">
          <div class="find-db add-task">
            <b-form-input
              v-model="keySearch"
              placeholder="Nhập đơn vị"
            />
          </div>
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area pb-3 pt-0"
          >
            <div class="menu-left px-2">
              <div class="result">
                <ul
                  v-if="filteredList.length > 0"
                  class="parent"
                >
                  <li
                    v-for="(item, key) in filteredList"
                    :key="key"
                  >
                    <div
                      :class="{
                        'item d-flex align-items-center': true,
                        active: item.id == activeParent,
                      }"
                      @click="showChildReport(item)"
                    >
                      <div class="name-parent">
                        {{ item.tenDonVi }}
                      </div>
                    </div>
                    <div
                      v-if="item.id == activeParent || keySearch.length > 0"
                      class="box-child"
                    >
                      <ul
                        v-if="item.childs.length > 0"
                        class="child-menu"
                      >
                        <li
                          v-for="(item1, key1) in item.childs"
                          :key="key1"
                        >
                          <div
                            :class="{
                              'item d-flex align-items-center': true,
                              active: item1.id == activeChild,
                            }"
                            @click="eventChild(item, item1)"
                          >
                            <div class="name">
                              {{ item1.tenDonVi }}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
  props: {},
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      donvi: '',
      activeParent: '',
      activeChild: '',
      showDataMenu: [],
      keySearch: '',
      listDataDv: [],
    }
  },
  computed: {
    filteredList() {
      if (this.listDataDv && this.listDataDv.length > 0) {
        const units = this.listDataDv.filter(item => item.level === 1)
        const lv1 = units
        units.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.childs = this.listDataDv.filter(e => e.iD_DonVi_Cha === item.id)
        })
        if (this.keySearch.length > 0) {
          const dataunitList = this.listDataDv.filter(item => {
            const textcovert = this.bodauTiengViet(item.tenDonVi.toLowerCase())
            return textcovert.includes(
              this.bodauTiengViet(this.keySearch.toLowerCase()),
            )
          })
          const dataParent = dataunitList.filter(item => item.level === 1)
          const dataChild = dataunitList.filter(item => item.level === 2)
          lv1.forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.childs = dataChild.filter(e => e.iD_DonVi_Cha === item.id)
          })

          const showData = []
          // eslint-disable-next-line array-callback-return
          lv1.map(item => {
            if (item.childs.length > 0) {
              showData.push(item)
            }
          })
          const data = dataParent.concat(showData)
          return data
        }
        return units
      }
      return []
    },
  },
  watch: {},
  created() {
    const params = {
      soCap: 3,
    }
    // eslint-disable-next-line no-undef
    COMMON_GET(`${COMMON_BE}/api/DonVi/all-by-don-vi-cha`, params).then(res => {
      this.listDataDv = res.data
      this.$emit('idDonVi', this.filteredList[0].id)
      this.activeParent = this.filteredList[0].id
    })
  },
  methods: {
    showChildReport(item) {
      this.activeParent = item.id
      if (item.childs && item.childs.length > 0) {
        this.eventChild(item, item.childs[0])
        this.$emit('idDonVi', item.childs[0].id)
      } else {
        this.activeChild = ''
        this.$emit('idDonVi', item.id)
      }
    },
    eventChild(item, item1) {
      this.activeParent = item.id
      this.activeChild = item1.id
      this.$emit('idDonVi', item1.id)
    },
    bodauTiengViet(str) {
      let string = str
      if (string) {
        string = string.toLowerCase()
        string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        string = string.replace(/đ/g, 'd')
        return string
      }
      return string
    },
  },
}
</script>

<style lang="scss">
.danh-ba-dien-tu {
  .sibar-dbdt {
    position: relative;
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
      }
    }
    .sidebar-menu-list {
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
      .child-menu {
        padding-left: 20px !important;
        .item {
          .name {
            width: 100%;
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
      height: calc(100% - 105px) !important;
    }
    .btn-open-hop-phan {
      button {
        width: 60%;
      }
    }
  }
}
</style>
