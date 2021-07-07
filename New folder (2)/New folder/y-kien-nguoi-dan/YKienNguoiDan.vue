<template>
  <div
    style="height: inherit"
    class="content-y-kien-nguoidan"
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
        <TongQuan v-if="keyParent == 'TONGQUAN'" />
        <Detail v-if="keyParent != 'TONGQUAN' && keyChild" />
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <SibarLeftYKienNguoiDan
        :class="{ show: mqShallShowLeftSidebar }"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import SibarLeftYKienNguoiDan from './SibarLeftYKienNguoiDan.vue'
import Detail from './Detail.vue'
import TongQuan from './TongQuan.vue'

export default {
  name: 'YKienNguoiDan',
  components: {
    SibarLeftYKienNguoiDan,
    VuePerfectScrollbar,
    Detail,
    TongQuan,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      keyParent: '',
      keyChild: '',
    }
  },
  created() {
    this.$eventBus.$on('y-kien-nguoi-dan', data => {
      this.keyParent = data.key
      this.keyChild = data.keyChild
      window.keyChildYKND = data.keyChild
    })
  },
}
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.y-kien-nguoi-dan {
  .todo-task-list-wrapper {
    height: 100% !important;
  }
  .app-fixed-search {
    border-bottom: 0 !important;
  }
  .card {
    border: 1px solid rgba(71, 95, 123, 0.2);
  }
  .progress-list {
    .title-progress-hcc {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .box-hcc {
    .progress {
      height: 30px;
      border-radius: 5px;
      .progress-bar:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .label-progress-hcc {
      width: 15px;
      height: 15px;
      margin-right: 8px;
    }
  }
  .box-hcc {
    .card-body {
      height: 233px;
      overflow: hidden;
    }
  }
  .box-hs {
    .card-body {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        background-color: #fff;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        background-color: #fff;
      }
      &:hover {
        &::-webkit-scrollbar {
          display: block;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #aaa;
        }
      }
      // &::-webkit-scrollbar {
      //   width: 8px;
      //   background-color: #f5f5f5;
      // }
      // &::-webkit-scrollbar-thumb {
      //   border-radius: 8px;
      //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      //   background-color: #aaa;
      // }
    }
  }
}
</style>
