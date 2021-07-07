<template>
  <div
    style="height: inherit"
    class="ket-noi-cls"
  >
    <div
      class="body-content-overlay"
      :class="{ show: mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">
        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area p-2"
      >
        <div class="scroll-per">
          <!-- Sự kiện -->
          <div>
            <!-- Chung -->
            <BoxSKChung
              v-if="TabChoose == 1"
              :type-id="TabChoose"
              @:choose-item="chooseItem($event)"
            />

            <!-- Phát động, Tham dự, Được mời -->
            <BoxSKBase
              v-if="TabChoose == 2 || TabChoose == 3 || TabChoose == 4"
              :type-id="TabChoose"
              @:choose-item="chooseItem($event)"
            />
          </div>

          <!-- Kết nối -->
          <div>
            <BoxTochuc
              v-if="
                TabChoose == 5 ||
                  TabChoose == 6 ||
                  TabChoose == 7 ||
                  TabChoose == 8
              "
              :type-id="TabChoose"
            />
          </div>

          <!-- Detail box -->
          <div>
            <BoxDetail v-if="TabChoose == 0" />
          </div>
          <!-- Cms Form -->
          <div>
            <CmsForm
              v-if="TabChoose == 9"
              @tab-choose="tabChoose"
            />
          </div>
        </div>
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <KetNoiLeftSibar
        :class="{ show: mqShallShowLeftSidebar }"
        :tab-choose="TabChoose"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
        @tab-choose="tabChoose($event)"
      />
    </portal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import KetNoiLeftSibar from './KetNoiLeftSibar.vue'
import BoxSKChung from './components/BoxSKChung.vue'
import BoxSKBase from './components/BoxSKBase.vue'
import BoxTochuc from './components/BoxTochuc.vue'
import BoxDetail from './components/BoxDetail.vue'
import CmsForm from './cms/CmsForm.vue'

export default {
  name: 'KetNoi',
  components: {
    VuePerfectScrollbar,
    KetNoiLeftSibar,
    BoxSKChung,
    BoxSKBase,
    BoxTochuc,
    BoxDetail,
    CmsForm,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      TabChoose: 1,
    }
  },
  created() {
    this.$eventBus.$on('show-detail-ketnoi', data => {
      console.log(data)
      this.TabChoose = 0
    })
  },
  methods: {
    tabChoose(e) {
      this.TabChoose = e
    },
  },
}
</script>
<style lang="scss">
.ket-noi {
  .ket-noi-cls {
    background: #ffffff;
    border: 1px solid rgba(71, 95, 123, 0.2);
    box-sizing: border-box;
    border-radius: 0px 6px 6px 0px;
    border-left: unset;
  }

  .todo-app-list {
    height: 100%;
  }
  .ps-container {
    height: 100%;
  }
  .scroll-per {
    height: 100%;
  }
}
</style>
