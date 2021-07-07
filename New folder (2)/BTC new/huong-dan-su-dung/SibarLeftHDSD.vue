<template>
  <div class="sidebar-left hdsd">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu sibar-hdsd">
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area py-2"
          >
            <!-- <div class="menu-left px-2"> -->
            <div
              v-for="(i, key) in navMenuItems"
              :key="key"
              :class="currentComponentActived === key ? 'active' : ''"
              class="box-component"
              @click="currentComponentActived = key, $emit('activeBox', key)"
            >
              <img
                :src="i.icon"
                alt="icon"
              >
              <span>
                {{ i.label }}
              </span>
            </div>
            <!-- </div> -->
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
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      donvi: '',
      currentComponentActived: 0,
      navMenuItems: [
        {
          label: 'Báo cáo',
          icon: require('@/assets/images/icons/menu_baocao.svg'),
        },
        {
          label: 'Lịch làm việc',
          icon: require('@/assets/images/icons/menu_lichlamviec.svg'),
        },
        {
          label: 'Họp',
          icon: require('@/assets/images/icons/menu_hop.svg'),
        },
        {
          label: 'Quản lý nhiệm vụ',
          icon: require('@/assets/images/icons/menu_quanlynhiemvu.svg'),
        },
        {
          label: 'Hành chính công',
          icon: require('@/assets/images/icons/menu_hanhchinhcong.svg'),
        },
        {
          label: 'Ý kiến người dân',
          icon: require('@/assets/images/icons/menu_ykiennguoidan.svg'),
        },
        {
          label: 'Quản lý văn bản',
          icon: require('@/assets/images/icons/menu_quanlyvanban.svg'),
        },
        {
          label: 'Báo chí - Mạng xã hội',
          icon: require('@/assets/images/icons/menu_baochi_mangxahoi.svg'),
        },
        {
          label: 'CCTV & Cảm biến',
          icon: require('@/assets/images/icons/menu_cctv_cambien.svg'),
        },
        {
          label: 'Kết nối',
          icon: require('@/assets/images/icons/menu_ketnoi.svg'),
        },
        {
          label: 'Tương tác nội bộ',
          icon: require('@/assets/images/icons/menu_tuongtacnoibo.svg'),
        },
        {
          label: 'Tiện ích',
          icon: require('@/assets/images/icons/menu_tienich.svg'),
        },
        {
          label: 'Danh bạ điện tử',
          icon: require('@/assets/images/icons/danhba.svg'),
        },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss">
.sidebar-left.hdsd {
  background: #fff;
  .sidebar-content {
    height: 100%;
    .sibar-hdsd {
      height: 100%;

      .sidebar-menu-list {
        height: 100%!important;
        padding: 1em;
        .box-component {
          text-align: left;
          padding: 1em .5em;
          margin-bottom: .2em;
          border-radius: 0.5em;
          transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);
          span {
            margin-left: 1em;
            font-weight: 600;
          }

          &.active ,
          &:hover {
            background: #5A8DEE;
            cursor: pointer;
            padding-left: 1em;
            color: white;
            img {
              filter: brightness(400%);
            }
          }
        }
      }
    }
  }
}
</style>
