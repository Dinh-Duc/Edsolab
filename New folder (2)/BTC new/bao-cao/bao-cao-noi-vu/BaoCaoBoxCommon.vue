<template>
  <div class="cs-bc-wrap">
    <div class="title">
      {{ data.title }}
    </div>
    <b-row class="mx-0 bc-scroll">
      <b-col
        v-for="(item, index) in data.data"
        :key="index"
        sm="6"
        class="mt-2"
      >
        <div class="mini-box">
          <div class="mini-title">
            {{ item.name }}
          </div>
          <div class="count">
            <div
              class="number"
              :style="{ color: item.color }"
            >
              {{ item.value }}
            </div>
            <img
              v-if="item.isUp"
              class="cs-img"
              src="../../../../assets/images/bo-noi-vu/up-ic.png"
              alt=""
            >
            <img
              v-if="item.isDownRed"
              class="cs-img"
              src="../../../../assets/images/bo-noi-vu/down-ic.png"
              alt=""
            >
            <img
              v-if="item.isDownGreen"
              class="cs-img"
              src="../../../../assets/images/bo-noi-vu/down-green-ic.png"
              alt=""
            >
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'BaoCaoBoxCommon',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss">
.cs-bc-wrap {
  padding: 15px 5px;

  .bc-scroll {
    max-height: 200px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(163, 175, 189, 0.3);
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 175, 189, 0);
      border-radius: 20px;
    }
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  .mini-box {
    border-radius: 5px;
    background: #f3f3f3;
    padding: 10px;
    .mini-title {
      text-align: left;
      font-size: 15px;
    }
    .count {
      display: flex;
      align-items: center;
      .number {
        font-weight: 800;
        font-size: 28px;
      }

      .cs-img {
        margin-left: auto;
        width: 20px;
        height: 22px;
      }
    }
  }
}
</style>
