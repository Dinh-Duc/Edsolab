<template>
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{ show: mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list report-list">
      <!-- App Searchbar Header -->
      <div
        v-if="keyParent === 'BaoCaoKhanCap' && keyChild === 'TongHop'"
        class="app-fixed-search- d-flex align-items-center"
      >
        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>
        <div class="bar-top-report d-flex align-items-center w-100">
          <div class="button-date col-md-3">
            <b-button variant="outline-primary">
              Hôm nay
            </b-button>
          </div>
          <div
            class="form_date d-flex align-items-center col-md-6 justify-content-center"
          >
            <div class="svg-prev-bc">
              <feather-icon
                icon="ChevronLeftIcon"
                size="20"
              />
            </div>
            <div class="text-date mx-2">
              {{ date }}
            </div>
            <div class="svg-next-bc">
              <feather-icon
                icon="ChevronRightIcon"
                size="20"
              />
            </div>
          </div>
          <div class="button-group-date col-md-3 d-flex justify-content-end">
            <b-button-group>
              <b-button variant="outline-primary">
                Ngày
              </b-button>
              <b-button variant="outline-primary">
                Tuần
              </b-button>
              <b-button variant="outline-primary">
                Tháng
              </b-button>
            </b-button-group>
          </div>
        </div>
      </div>

      <!-- bao cao ca nhan -->
      <div
        v-if="keyParent == 'CaNhan'"
        class="bccn bg-white"
      >
        <BaoCaoCaNhan
          v-if="keyParent == 'CaNhan1'"
          :key_data="keyChild"
        />
        <BaoCaoCaNhan2 v-if="keyParent == 'CaNhan'" />
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        v-else
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area"
      >
        <BaoCaoKhanCap
          v-if="keyParent == 'BaoCaoKhanCap'"
          :key-data="keyChild"
          :key-data2="keyChild2"
          :data-item="dataLink"
        />
        <BaoCaoChinhPhu
          v-else-if="keyParent == 'BCCP'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <BaoCaoSoBanNganh
          v-else-if="keyParent == 'BC_SBN'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <BaoCaoDiaPhuong
          v-else-if="keyParent == 'BCDP'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <TinhTrangNhanBaoCao
          v-else-if="keyParent == 'TTNhanBC'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <BaoCaoChung
          v-else-if="keyParent == 'BCCHUNG'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <BaoCaoCapTinh
          v-else-if="keyParent == 'BCAOCAPTINH'"
          :key-data="keyChild"
          :data-item="dataLink"
        />
        <BaoCaoTongHop
          v-else-if="keyParent == 'BAOCAOTONGHOP'"
        />
        <BaoCaoNoiVue
          v-else-if="keyParent === 'BCTBNV' && keyChild === 'BCTBNV_1'"
          :data-item="dataLink"
        />
        <BaoCaoNganHangNhaNuoc
          v-else-if="keyParent === 'BCNHNN'"
          :data-item="dataLink"
        />
        <BC
          v-else
          :data-item="dataLink"
        />
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <bao-cao-left-sibar
        :class="{ show: mqShallShowLeftSidebar }"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import BaoCaoLeftSibar from './BaoCaoLeftSibar.vue'
import BaoCaoCaNhan from './BaoCaoCaNhan.vue'
import BaoCaoCaNhan2 from './BaoCaoCaNhan2.vue'
import BaoCaoKhanCap from './baocaokhancap/BaoCaoKhanCap.vue'
import BaoCaoChinhPhu from './baocaochinhphu/BaoCaoChinhPhu.vue'
import BaoCaoSoBanNganh from './baocaosobannganh/BaoCaoSoBanNganh.vue'
import BaoCaoDiaPhuong from './baocaodiaphuong/BaoCaoDiaPhuong.vue'
import TinhTrangNhanBaoCao from './TinhTrangNhanBaoCao.vue'
import BaoCaoChung from './baocaochung/BaoCaoChung.vue'
import BaoCaoCapTinh from './baocaocaptinh/BaoCaoCapTinh.vue'
import BaoCaoNoiVue from './bao-cao-noi-vu/BaoCaoTongHopBoNoiVu.vue'
import BaoCaoTongHop from './baocaotonghop.vue'
import BaoCaoNganHangNhaNuoc from './baoCaoNganHangNhaNuoc'
import BC from './_bc.vue'

export default {
  components: {
    BaoCaoLeftSibar,
    VuePerfectScrollbar,
    BaoCaoCaNhan,
    BaoCaoCaNhan2,
    BaoCaoKhanCap,
    BaoCaoChinhPhu,
    BaoCaoSoBanNganh,
    BaoCaoDiaPhuong,
    TinhTrangNhanBaoCao,
    BaoCaoChung,
    BaoCaoCapTinh,
    BaoCaoNoiVue,
    BC,
    BaoCaoTongHop,
    BaoCaoNganHangNhaNuoc,
  },
  data() {
    return {
      mqShallShowLeftSidebar: false,
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      date: '',
      keyParent: '',
      keyChild: '',
      keyChild2: '',
      dataLink: '',
    }
  },
  created() {
    const dateNow = new Date()
    this.date = `${dateNow.getDate()} Tháng ${dateNow.getMonth()
      + 1} ${dateNow.getFullYear()}`

    this.$eventBus.$on('data-report', data => {
      console.log('BaoCao.vue 194: ', data)
      this.keyParent = ''
      this.keyChild = ''
      this.keyChild2 = ''
      this.dataLink = ''
      setTimeout(() => {
        this.keyParent = data.key_parent
        this.keyChild = data.key_child
        this.keyChild2 = data.key_child_2
        this.dataLink = data.dataLink
      })
    })
  },
}
</script>

<style lang="scss">
@import '~@core/scss/base/pages/app-todo.scss';
.report-list {
  .text-date {
    font-weight: 600;
  }
  .app-fixed-search- {
    background: #fff;
    padding: 1em;
    box-shadow: 0 2px 8px #192a460f, 0 8px 16px #192a460f;
  }

  .ps-container.todo-task-list-wrapper.list-group {
    background-color: unset;
    padding: 0 1em;
  }

  .iframe-report {
    min-height: 720px;
  }
  .card {
    border: 1px solid rgba(71, 95, 123, 0.2);
    margin-bottom: 2rem;
    // -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    box-shadow: none;
    .apexcharts-menu-icon {
      display: none;
    }
    .card-title {
      font-size: 20px;
      font-weight: 600;
    }
    .body-chart-data {
      padding: 0;
    }
    .apexcharts-legend-text {
      font-family: 'Mulish', Arial, 'Montserrat', serif !important;
      font-weight: 500 !important;
      font-size: 14px !important;
      .tspan {
        font-family: 'Mulish', Arial, 'Montserrat', serif !important;
      }
    }
    .apexcharts-text {
      font-family: 'Mulish', Arial, 'Montserrat', serif !important;
      font-weight: 600;
      .tspan {
        font-family: 'Mulish', Arial, 'Montserrat', serif !important;
        font-size: 14px !important;
      }
    }
    text {
      &.highcharts-credits {
        display: none;
      }
    }
    .apexcharts-datalabels {
      text {
        font-family: 'Mulish', Arial, 'Montserrat', serif !important;
      }
    }
    .highcharts-legend-item {
      text {
        font-family: 'Mulish', Arial, 'Montserrat', serif !important;
        font-weight: 600;
      }
    }
  }
}
.draggable-task-handle {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  cursor: move;
  .todo-task-list .todo-item:hover & {
    visibility: visible;
  }
}
.bccn.bg-white {
  width: 100%;
  float: left;
  height: 100%;
  background: unset !important;
}
</style>
