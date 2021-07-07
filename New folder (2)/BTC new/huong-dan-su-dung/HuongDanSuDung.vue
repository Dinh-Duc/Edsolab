<template>
  <div
    style="height: inherit"
    class="content-hdsd"
  >
    <div
      class="body-content-overlay"
      :class="{ show: mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center border-bottom-0">
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
        Chưa có dữ liệu
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <SibarLeftHDSD
        :class="{ show: mqShallShowLeftSidebar }"
        @activeBox="activeBox"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import SibarLeftHDSD from './SibarLeftHDSD.vue'

export default {
  components: {
    SibarLeftHDSD,
    VuePerfectScrollbar,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
    }
  },
  created() {},
  methods: {
    activeBox(key) {
      console.log('EMIT: line 64 in HuongDanSuDung.vue', key)
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.content-hdsd {
  section.ps-container {
    height: 100% !important;
  }
}
</style>
