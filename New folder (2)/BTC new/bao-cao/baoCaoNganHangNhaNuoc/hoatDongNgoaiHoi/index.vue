<template>
  <div class="hoat-dong-ngoai-hoi-hash-canifha">
    <div
      v-if="!showComponent"
      class="list-hd"
    >
      <div
        v-for="(item, key) in listReport"
        :key="key"
        class="item"
        @click="
          keyActived = item.key
          showComponent = true
        "
      >
        <div
          class="wrap-icon"
          :style="`background: ${item.color}`"
        >
          <img :src="item.icon">
        </div>
        <p>{{ item.title }}</p>
      </div>
    </div>
    <div v-else>
      <b-button
        variant="outline-primary"
        style="margin: 1em 0"
        @click="showComponent = false"
      >
        Quay lại
      </b-button>
      <VayVaChoVayNuocNgoai v-if="keyActived == 'key_1'" />
      <CungUngDichVu v-else-if="keyActived == 'key_2'" />
      <TyGia v-else-if="keyActived == 'key_3'" />
      <HoatDongKinhDoanhVang v-else-if="keyActived == 'key_4'" />
      <div v-else>
        Chưa có dữ liệu
      </div>
    </div>
    <!-- <img :src="listSvg[0]"> -->
  </div>
</template>

<script>
/* eslint-disable */
import CungUngDichVu from './cungUngDichVuVaSuDungNgoaiKhoi.vue'
import TyGia from './tyGia.vue'
import HoatDongKinhDoanhVang from './hoatDongKinhDoanhVang.vue'
import VayVaChoVayNuocNgoai from './vayVaChoVayNuocNgoai.vue'

export default {
  components: {
    CungUngDichVu,
    TyGia,
    HoatDongKinhDoanhVang,
    VayVaChoVayNuocNgoai,
  },
  data() {
    return {
      showComponent: false,
      listReport: [
        {
          key: 'key_1',
          icon: require('@/assets/images/baocao/nhnn_hoatdongngoaikhoi_vay-va-cho-vay-nuoc-ngoai.svg'),
          title: 'vay và cho vay nước ngoài',
        },
        {
          key: 'key_2',
          icon: require('@/assets/images/baocao/nhnn_hoatdongngoaikhoi_cungungdichvuvasudungngoaihoi.svg'),
          title: 'Cung ứng dịch vụ và sử dụng ngoại hối',
        },
        {
          key: 'key_3',
          icon: require('@/assets/images/baocao/nhnn_hoatdongngoaikhoi_tygia.svg'),
          title: 'Tỷ giá',
        },
        {
          key: 'key_4',
          icon: require('@/assets/images/baocao/nhnn_hoatdongngoaikhoi_hoat-dong-kinh-doanh-vang.svg'),
          title: 'Hoạt động kinh doanh vàng',
        },
      ],
      keyActived: '',
    }
  }
}
</script>

<style lang="scss">
.hoat-dong-ngoai-hoi-hash-canifha {
  height: 100%;

  .list-hd {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1em;
    .item {
      background: #fff;
      width: calc(50% - 20px);
      margin: 10px;
      padding: 10px 0 10px 30px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 18px -4px #8e9baa1a;
      display: flex;
      align-items: center;
      &:hover {
        box-shadow: 0 4px 18px -4px #00000026;
        cursor: pointer;
      }
      .wrap-icon {
        border-radius: 50%;
        margin-right: 10px;
      }
      p {
        margin: 0;
        font-weight: 600;
      }
    }
  }
}
</style>
