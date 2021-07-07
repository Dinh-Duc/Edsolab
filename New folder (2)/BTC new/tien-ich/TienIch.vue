<template>
  <div class="content-tien-ich">
    <div class="action-vb d-flex justify-content-center pt-3">
      <b-button
        variant="primary-custom"
        :class="`mr-2 ${activeButton == 1 ? 'active' : ''}`"
        @click="activeButton = 1"
      >
        Chuyển giọng nói thành văn bản
      </b-button>
      <b-button
        variant="primary-custom"
        :class="`mr-2 ${activeButton == 2 ? 'active' : ''}`"
        @click="activeButton = 2"
      >
        Chuyển văn bản thành giọng nói
      </b-button>
      <b-button
        variant="primary-custom"
        :class="`${activeButton == 3 ? 'active' : ''}`"
        @click="activeButton = 3"
      >
        Phiên dịch tự động
      </b-button>
    </div>
    <div class="content-action-doc-vb">
      <ChuyenGiongNoiThanhVanBan v-if="activeButton == 1" />
      <ChuyenVanBanThanhGiongNoi v-if="activeButton == 2" />
      <PhienDichTuDong v-if="activeButton == 3" />
    </div>
    <!-- <div class="bottom-tien-ich mt-3">
      <ul>
        <li>
          <div class="icon">
            <img :src="require('@/assets/images/tienich/lichsutienich.svg')">
            <div class="text">
              Lịch sử
            </div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img :src="require('@/assets/images/tienich/daluu.svg')">

            <div class="text">
              Đã lưu
            </div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img :src="require('@/assets/images/tienich/donggop.svg')">

            <div class="text">
              Đóng góp
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import ChuyenGiongNoiThanhVanBan from './ChuyenGiongNoiThanhVanBan'
// eslint-disable-next-line import/extensions
import ChuyenVanBanThanhGiongNoi from './ChuyenVanBanThanhGiongNoi'
// eslint-disable-next-line import/extensions
import PhienDichTuDong from './PhienDichTuDong'

export default {
  components: {
    ChuyenGiongNoiThanhVanBan,
    ChuyenVanBanThanhGiongNoi,
    PhienDichTuDong,
  },
  data() {
    return {
      activeButton: 1,
    }
  },
}
</script>

<style lang="scss">
.doc-van-ban {
  .content-body {
    background-color: #fff;
    min-height: 800px;
    border-radius: 6px;
    .action-vb {
      .btn-primary-custom {
        background-color: rgba(90, 141, 238, 0.1);
        border: 1px solid rgba(90, 141, 238, 0.1);
        font-size: 18px;
        font-weight: 500;
        color: #5a8dee;
        &.active {
          background: #5a8dee;
          color: #fff;
        }
      }
    }
    .bottom-tien-ich {
      ul {
        display: flex;
        justify-content: center;
        li {
          display: inline-block;
          cursor: pointer;
          padding: 20px;
          text-align: center;
          .text {
            margin-top: 10px;
            font-size: 16px;
            color: #727E8C;
          }
        }
      }
    }
  }
}

.dark-layout {
  .doc-van-ban {
    .content-body {
      background: unset;
    }
  }
  .bottom-tien-ich {
    .icon {
      circle {
        fill: #283046;
      }
    }
  }
}

</style>
