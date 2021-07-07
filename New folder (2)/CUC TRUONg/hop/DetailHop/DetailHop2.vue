<template>
  <div
    class="app-calendar overflow-hidden border shadow-none mb-0 hop-calendar"
  >
    <div class="flex">
      <!-- Sidebar -->
      <!-- <div
        class="app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{ show: isCalendarOverlaySidebarActive }"
      >
        <calendar-sidebar
          :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive"
          :is-event-handler-add-active.sync="isEventHandlerAddActive"
          :events="ListEvents"
          :calendar-api="calendarApi"
          @changeTitle="title = $event"
          @typeView="typeView = $event"
          @timeSelect="timeSelect = $event"
        />
      </div> -->
      <div class="position-relative flex-1">
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="scroll-area"
        >
          <DetailHop
            :event-detail-child="$route.params.id"
            @btn-rollback="checkRollBack"
          />
        </vue-perfect-scrollbar>
      </div>

      <!-- Sidebar Overlay -->
      <!-- <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />
      <FormAddEvent /> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
    DetailHop: () => import('./DetailHop.vue'),
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar'),
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
    }
  },
  created() {
    console.log(this.$route.params.id)
  },
  methods: {
    checkRollBack() {
      this.$router.push({
        name: 'hop',
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
.hop-calendar {
  .fc-list-day-cushion {
    display: none !important;
  }

  .fc-list-day {
    display: none !important;
  }

  .fc .fc-view-harness {
    min-height: 500px;
  }

  .fc-list-event-graphic {
    display: none !important;
  }
}

.custom-bottom-model-button {
  .button-custom-model {
    height: 36px !important;
  }
}
.custom-form-model-dn {
  .modal-header {
    margin-bottom: 10px;
    svg {
      width: 14px;
    }
  }
  .modal-body {
    max-height: 665px;
    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #f2f2f2;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: #fff;
    }
  }
  .modal-footer {
    padding: 10px 30px 20px !important;
  }
}

.head-table-custom {
  margin-left: 1.3rem;
  margin-right: 1.3rem;

  .hop-head {
    line-height: 3.3rem;
    display: flex;
    width: 100%;
    font-weight: 600;
    background-color: #eaeef5;
    color: #40566f;
    text-align: left;
    vertical-align: middle;

    .mg-text-16 {
      margin-left: 0.86rem;
    }

    .box-time {
      width: 20%;
    }

    .box-noidung {
      width: 35%;
    }

    .box-thanhphan {
      width: 25%;
    }
    .box-loai {
      width: 10%;
    }
    .box-trangthai {
      width: 10%;
    }
  }
}
.fc-view {
  margin-left: 1.4rem;
  margin-right: 1.4rem;

  .box-noidung {
    width: 100%;
    display: flex;

    .row-thoigian {
      width: 20%;
    }

    .row-noidung {
      width: 35%;
      padding-right: 2rem;
    }

    .row-thanhphan {
      width: 25%;
    }
    .row-loai {
      width: 10%;
    }
    .row-trangthai {
      width: 10%;
    }

    .box-loai {
      width: 100%;
      line-height: 2rem;
      font-size: 1rem;
      color: #fff;
      text-align: center;
      border-radius: 2rem;
      vertical-align: middle;
    }

    .color-tructuyen {
      background-color: #ff9f43;
    }

    .color-tructiep {
      background-color: #28c76f;
    }

    .color-hop {
      background-color: #28c76f;
    }

    .mg-10 {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .box-trangthai {
      width: 100%;
      line-height: 2rem;
      font-size: 1rem;
      background: rgba(234, 84, 85, 0.1);
      border-radius: 2rem;
      text-align: center;
      border-radius: 2rem;
      vertical-align: middle;
      color: #ea5455;
    }
  }
}
.dark-layout {
  .hop-calendar {
    .fc-list-table {
      .hop-head {
        color: var(--dark-color) !important;
      }
      * {
        color: var(--dark-color);
      }
    }
  }
}
</style>
