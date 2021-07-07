<template>
  <div
    style="height: inherit"
    class="content-hcc"
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
        <DashboardHCC v-if="url && url.length > 0" />
        <Detail
          v-if="showDetail"
          :data-item="dataApi"
        />
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <HanhChinhLeftSibar
        :class="{ show: mqShallShowLeftSidebar }"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import HanhChinhLeftSibar from './HanhChinhLeftSibar.vue'
import DashboardHCC from './DashboardHCC.vue'
import Detail from './Detail.vue'

export default {
  name: 'HanhChinhCong',
  components: {
    HanhChinhLeftSibar,
    VuePerfectScrollbar,
    DashboardHCC,
    Detail,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      perfectScrollbarProgess: {
        maxScrollbarLength: 30,
      },
      progress: 29,
      url: '',
      dataProgress: [
        {
          value: 10,
          color: '#28a745',
          status: 'Đã xử lý',
        },
        {
          value: 6,
          color: '#ffc107',
          status: 'Chờ xử lý',
        },
        {
          value: 13,
          color: '#17a2b8',
          status: 'Đang xử lý',
        },
      ],
      dataStatus: [
        {
          name: 'Trong hạn',
          value: 8,
          color: '#991EF9',
        },
        {
          name: 'Đến hạn',
          value: 14,
          color: '#06c270',
        },
        {
          name: 'Quá hạn',
          value: 7,
          color: '#ff2929',
        },
      ],
      boxTable: {},
      dataHoSo: [
        {
          name: 'Sở Tài chính',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Kế hoạch và Đầu tư',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Nông nghiệp và Phát triển Nông thôn',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Công thương',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Xây dựng',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Giao thông vận tải',
          value: 1,
          max: 10,
        },
        {
          name: 'Sở Tài nguyên và Môi trường',
          value: 1,
          max: 1,
        },
        {
          name: 'Sở Khoa học và Công nghệ',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Giáo dục và Đào tạo',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Y tế',
          value: 2,
          max: 2,
        },
        {
          name: 'Sở Văn hóa - Thể thao và Du lịch',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Lao động - Thương binh và Xã hội',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Tư pháp',
          value: 2,
          max: 2,
        },
        {
          name: 'Sở Thông tin và Truyền thông',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Nội vụ',
          value: 0,
          max: 1,
        },
        {
          name: 'Sở Ngoại vụ',
          value: 0,
          max: 1,
        },
        {
          name: 'Thanh tra tỉnh',
          value: 0,
          max: 1,
        },
        {
          name: 'Ban quản lý khu công nghệ cao',
          value: 0,
          max: 1,
        },
        {
          name: 'Ban quản lý các khu công nghiệp Đồng Nai',
          value: 0,
          max: 1,
        },
        {
          name: 'Ban Dân tộc',
          value: 0,
          max: 1,
        },
      ],
      dataApi: {},
      showDetail: false,
    }
  },
  created() {
    this.$eventBus.$on('data-hcc', data => {
      setTimeout(() => {
        this.dataApi = {}
        this.dataApi = data.dataApi
        this.url = data.url
        if (data.url && data.url.length > 0) {
          this.showDetail = false
        } else {
          this.showDetail = true
        }
      })
    })
  },
}
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.content-hcc {
  .ps__rail-x{
    display: none !important;
  }

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
      .DAXULY {
        background: #28a745;
      }
      .CHOXULY {
        background-color: #ffc107;
      }
      .DANGXULY {
        background-color: #17a2b8;
      }
    }
    .label-progress-hcc {
      width: 15px;
      height: 15px;
      margin-right: 8px;
      &.DAXULY {
        background: #28a745;
      }
      &.CHOXULY {
        background-color: #ffc107;
      }
      &.DANGXULY {
        background-color: #17a2b8;
      }
    }
    .status-hc {
      .TRONGHAN {
        color: #991ef9;
      }
      .DENHAN {
        color: #06c270;
      }
      .QUAHAN {
        color: #ff2929;
      }
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
        display: none;
      }
      &:hover {
        &::-webkit-scrollbar {
          display: block;
        }
      }
      &::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #aaa;
      }
    }
  }
}
.dark-layout {
  .hanh-chinh-cong {
    .data-chart-elm {
      background-color: var(--dark-table-header-background);
    }
    .title-hcc, .title-box-chart {
      color: var(--dark-color);
    }
    tspan, title {
      color: #fff !important;
    }
  }
}
</style>
