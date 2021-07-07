<template>
  <vue-perfect-scrollbar
    :settings="perfectScrollbarSettings"
    class="todo-task-list-wrapper list-group scroll-area"
  >
    <!-- <NetView /> -->
    <div class="box-header-bc-mxh d-flex align-items-center">
      <div class="title-header w-50">
        Đồng Nai
      </div>
      <div class="filter-bc-mxh d-flex justify-content-end w-50">
        <button
          v-for="(item, key) in dashboardItems"
          :key="key"
          :class="{
            'btn outline-primary-custom': true,
            active: activeDashboard === item.name ? true : false,
          }"
          @click="setDashboard(item.name)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <div class="box-static-mxh row m-0 w-100 mt-2 mb-3">
      <div
        v-for="(item, key) in boxStatic"
        :key="key"
        class="item_box col-sm-4 col-xl-2 d-flex align-items-center"
      >
        <div class="image-box">
          <img :src="item.image">
        </div>
        <div class="box-value">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="value-box">
            <animated-number
              :value="getDashboardData(key)"
              :format-value="formatNumber"
              :duration="1000"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="box-content-mxh row w-100 m-0">
      <div class="netview-list col-md-7">
        <ListNetView />
      </div>
      <div class="chart-netview col-md-5">
        <chartNetView />
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>
<script>
// eslint-disable-next-line import/extensions
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import AnimatedNumber from 'animated-number-vue'
// eslint-disable-next-line import/extensions
import ListNetView from './ListNetView'
// eslint-disable-next-line import/extensions
import chartNetView from './chartNetView'
// eslint-disable-next-line import/extensions
// import NetView from './NetView'

export default {
  name: 'BaoChiMangXaHoi',
  components: {
    // NetView,
    VuePerfectScrollbar,
    AnimatedNumber,
    ListNetView,
    chartNetView,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      dashboardItems: [
        { name: 'today', label: 'Hôm nay', value: [235, 47, 154, 0, 0, 34] },
        {
          name: 'yesterday',
          label: 'Hôm qua',
          value: [1.284, 583, 566, 0, 0, 135],
        },
        {
          name: '7days',
          label: '7 ngày trước',
          value: [9.568, 4738, 3816, 0, 0, 1014],
        },
        {
          name: '30days',
          label: '30 ngày trước',
          value: [41.502, 20637, 16723, 0, 0, 4142],
        },
      ],
      activeDashboard: 'today',
      boxStatic: [
        {
          image: require('@/assets/images/baochi/total.png'),
          name: 'Tổng tin',
        },
        {
          image: require('@/assets/images/baochi/social-media.png'),
          name: 'Mạng xã hội',
        },
        {
          image: require('@/assets/images/baochi/news.png'),
          name: 'Báo chí',
        },
        {
          image: require('@/assets/images/baochi/forum.png'),
          name: 'Forum',
        },
        {
          image: require('@/assets/images/baochi/blog.png'),
          name: 'Blog',
        },
        {
          image: require('@/assets/images/baochi/others.png'),
          name: 'Nguồn khác',
          number: 235,
        },
      ],
      dashboardCurent: {},
    }
  },
  computed: {
    currentDashboard() {
      return (
        this.dashboardItems.find(item => item.name === this.activeDashboard)
          .value || []
      )
    },
  },
  created() {
  },
  methods: {
    setDashboard(name) {
      this.activeDashboard = name
    },
    getDashboardData(index) {
      return this.currentDashboard[index]
    },
    formatNumber: number => `${number.toFixed(0)}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
  },
}
</script>
<style lang="scss">
.baochi-mangxahoi {
  .todo-task-list-wrapper {
    position: relative;
    height: 890px;
  }
  .box-header-bc-mxh {
    .title-header {
      font-size: 24px;
      font-weight: 600;
    }
    .filter-bc-mxh {
      button {
        &.active {
          color: #fff;
          background-color: #5a8dee;
        }
      }
    }
  }
  .box-static-mxh{
    .item_box{
      background-color: #fff;
      border-right: 1px solid #eaf3fd;
      padding: 30px 20px;
      height: 135px;
      .image-box{
        width: 45px;
        height: 45px;
        margin-right: 15px;
        img{
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      }
      .box-value{
        .name{
          font-size: 16px;
        }
        .value-box{
            font-size: 20px;
            font-weight: 600;
        }
      }
    }
  }
}
</style>
