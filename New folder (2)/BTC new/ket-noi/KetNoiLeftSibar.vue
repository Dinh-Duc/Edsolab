<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-hcc">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area py-2"
          >
            <div class="create-event-btn">
              <button @click="createdEvent()">
                <feather-icon
                  icon="PlusIcon"
                  size="16"
                />
                Tạo sự kiện
              </button>
            </div>
            <div class="menu-ket-noi">
              <ul class="hcc-task-list">
                <li
                  v-for="(item, key) in MenuData"
                  :key="key"
                  class="hcc-item"
                >
                  <b class="tile-menu-box">{{ item.Name }}</b>
                  <ul>
                    <li
                      v-for="(itemChild, key1) in item.Child"
                      :key="key1"
                      @click="chooseFilter(itemChild)"
                    >
                      <div
                        class="data-li-elm"
                      >
                        <span
                          :class="{
                            'text-active': textChoose === itemChild.Key,
                          }"
                        >{{ itemChild.Name }}</span>
                        <p
                          :class="{
                            'count-ative': textChoose === itemChild.Key,
                          }"
                        >
                          {{ itemChild.Total }}
                        </p>
                      </div>
                      <div
                        :class="{ 'line-active': textChoose === itemChild.Key }"
                      />
                    </li>
                  </ul>
                </li>
              </ul>
              <ul>
                <CmsKetNoi @open-cms-form="openCmsForm" />
              </ul>
            </div>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-event-add1"
      centered
      scrollable
      size="lg"
      modal-class="modal-calendar custom-form-model-dn custom-ketnoi-pop"
    >
      <CreateOrUpdatePop />
    </b-modal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import menuData from './data/Menu.json'
import CreateOrUpdatePop from './components/CreateOrUpdatePop.vue'
import CmsKetNoi from './cms/CmsKetNoi.vue'

export default {
  components: {
    VuePerfectScrollbar,
    CreateOrUpdatePop,
    CmsKetNoi,
  },
  props: {
    tabChoose: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      MenuData: menuData,
      textChoose: 'sk_Chung',
    }
  },
  methods: {
    chooseFilter(data) {
      if (data.Key === 'kn_qt_quocTe') {
        this.textChoose = 'kn_qt_cacToChuc'
        this.textChoose = data.Key
      } else if (data.Key === 'kn_tn_trongNuoc') {
        this.textChoose = 'kn_tn_chinhPhu'
        this.textChoose = data.Key
      } else {
        this.textChoose = data.Key
      }
      this.$emit('tab-choose', data.Id)
    },
    openCmsForm(val) {
      this.$emit('tab-choose', val)
    },
    createdEvent() {
      this.$bvModal.show('modal-event-add1')
    },
  },
}
</script>
<style lang="scss">
.ket-noi {
  .sidebar-left {
    width: 300px;
    float: left;
    background: white;
    border: 1px solid rgba(71, 95, 123, 0.2);
    box-sizing: border-box;
    border-radius: 6px 0px 0px 6px;
  }
  .create-event-btn {
    width: 100%;
    float: left;
    text-align: center;
  }
  .create-event-btn button {
    width: 260px;
    background: rgba(90, 141, 238, 0.1) !important;
    border-radius: 6px;
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #5a8dee;
    border: unset;
  }
  .menu-ket-noi {
    width: 100%;
    float: left;
  }
  .tile-menu-box {
    width: 100%;
    float: left;
    margin-top: 25px;
  }
  .menu-ket-noi ul {
    width: 100%;
    float: left;
    padding: 0 20px !important;
  }
  .menu-ket-noi ul li {
    width: 100%;
    float: left;
    padding: 0;
    list-style: none;
    position: relative;
  }
  .menu-ket-noi ul li .data-li-elm {
    width: 100%;
    float: left;
    height: 34px;
    padding-top: 8px;
    cursor: pointer;
  }
  .line-active {
    height: 34px;
    width: 3px;
    background: #5a8dee;
    border-radius: 1.5px;
    position: absolute;
    left: -40px;
  }
  .bold-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #40566f;
  }
  .data-li-elm p {
    float: right;
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    background: #e6eefc;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    color: #5a8dee;
    padding-top: 3px;
    text-align: center;
  }
  .text-active {
    color: #5a8dee;
  }
  .count-ative {
    background: #5a8dee !important;
    color: white !important;
  }
}
</style>
