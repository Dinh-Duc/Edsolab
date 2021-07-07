<template>
  <div
    v-if="data.length > 0"
    class="row"
  >
    <div
      v-for="(item, key) in data"
      :key="key"
      :class="`col-md-${colStatic} box-static-bc`"
    >
      <b-card no-body>
        <b-card-body class="d-flex align-items-center">
          <div class="icon-bc">
            <b-avatar
              :variant="`light-${item.boxColor}`"
              size="66"
            >
              <div v-html="item.icon" />
            </b-avatar>
          </div>

          <div :class="`truncate pl-${colStatic == 4 ? 3 : '1'}`">
            <div class="number">
              {{ item.count }}
            </div>
            <div class="name">
              {{ item.title }}
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
// import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    // StatisticCardHorizontal,
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    colStatic: {
      type: Number,
      default() {
        return 4
      },
    },
  },
  created() {
    // console.log(this.data)
  },
}
</script>

<style lang="scss">
.box-static-bc {
  .truncate {
    .number {
      font-size: 22px;
      font-weight: 600;
    }
    .name {
      font-size: 16px;
    }
    &.pl-10px{
      padding-left: 10px;
    }
  }
  .icon-bc {
    .badge-light-info1 {
      background-color: #ebf5fe;
    }
  }
  .card {
    height: 108px;
    overflow: hidden;
  }
}
</style>
