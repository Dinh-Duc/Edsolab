<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div
    style="height: inherit"
    class="doc-manage-prt"
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
      <Dashboard v-if="DocTypeId === 0" />
      <DocsPreview
        v-if="DocTypeId === 1 || DocTypeId === 2"
        :doctype="DocTypeId"
      />
    </div>

    <!-- Task Handler -->

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <TodoLeftSidebar
        :data-chart="DataCountChart"
        :class="{ show: mqShallShowLeftSidebar }"
        @tab-docs-selected="getDocsByFilter($event)"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TodoLeftSidebar from './TodoLeftSidebar.vue'
import Dashboard from './Dashboard.vue'
import DocsPreview from './DocsPreview.vue'

export default {
  name: 'DocsManage',
  components: {
    TodoLeftSidebar,
    Dashboard,
    DocsPreview,
  },
  data() {
    return {
      // 0: Tất cả, 1: Văn bản đến, 2: Văn bản đi
      DocTypeId: 0,
      ParamAll: {
        maTinhTrang: '',
        maTrangThai: '',
        loaiVanBan: -1,
        pageIndex: 1,
        pageSize: 20,
      },
      ChangeTab: false,
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      DataCountChart: null,
    }
  },
  computed: mapGetters(['Go_Total', 'DataChartNumber']),
  created() {
    /* this.$store.dispatch('getTotalDocs') */
    /* this.$store.dispatch('getDocs', this.ParamAll) */
  },
  methods: {
    getDocsByFilter(e) {
      this.DocTypeId = e.DocTypeId

      const param = {
        maTinhTrang: e.TinhTrang.toString(),
        maTrangThai: e.TrangThai.toString(),
        trangThaiVanBan: e.TrangThaiVanBan,
        loaiVanBan: e.DocTypeId,
        pageIndex: e.PageIndex,
        pageSize: 20,
      }

      this.$store.dispatch('getDocs', param)
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.docs-manage {
   .app-fixed-search {
    border-bottom: 0 !important;
    display: none !important;
  }
  .doc-manage-prt {
    background: #ffffff;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-left: unset;
    padding: 10px 0;
    height: 100%;
  }
  .content-right {
    width: calc(100% - 300px);
    float: left;
  }
  .fix-padding-docs {
    padding: 0;
    height: 100%;
  }
  .todo-app-list {
    height: 100%;
  }
  .ps-container {
    height: 100%;
  }
}
</style>
