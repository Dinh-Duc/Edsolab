<template>
  <div class="BCNHNN_hash_class_0709">
    <div
      v-show="!showComponent"
      class="list-report"
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
    <div v-show="showComponent">
      <b-button
        id="back-hash-0001"
        variant="outline-primary"
        @click="showComponent = false"
      >
        Quay lại
      </b-button>
      <DauTuDoiVoiNenKinhTe v-if="keyActived === 'key_1'" />
      <HuyDongVon v-else-if="keyActived === 'key_2'" />
      <LaiSuat v-else-if="keyActived === 'key_3'" />
      <ThanhToanVaNganQuy v-else-if="keyActived === 'key_4'" />
      <HoatDongNgoaiHoi v-else-if="keyActived === 'key_5'" />
      <ThiTruongTienTe v-else-if="keyActived === 'key_6'" />
      <GiamSatBaoDamAnToanHoatDong v-else-if="keyActived === 'key_7'" />
      <BaoCaoTaiChinh v-else-if="keyActived === 'key_8'" />
      <div v-else>
        Không tìm thấy dữ liệu
      </div>
    </div>
    <!-- <img :src="listSvg[0]"> -->
  </div>
</template>

<script>
/* eslint-disable */
import BaoCaoTaiChinh from './BaoCaoTaiChinh.vue'
import GiamSatBaoDamAnToanHoatDong from './giamSatBaoDamAnToanHoatDong/index.vue'
import HoatDongNgoaiHoi from './hoatDongNgoaiHoi/index.vue'
import HuyDongVon from './huyDongVon.vue'
import LaiSuat from './laiSuat.vue'
import ThanhToanVaNganQuy from './thanhToanVaNganQuy.vue'
import DauTuDoiVoiNenKinhTe from './dauTuDoiVoiNenKinhTe.vue'
import ThiTruongTienTe from './thiTruongTienTe.vue'
export default {
  data() {
    return {
      showComponent: false,
      listReport: [
        {
          key: 'key_1',
          icon: require('@/assets/images/baocao/nhnn_dau-tu-doi-voi-nen-kinh-te.svg'),
          title: 'Đầu tư đối với nền kinh tế',
          color: '#E7FFDC',
        },
        {
          key: 'key_8',
          icon: require('@/assets/images/baocao/nhnn_bao-cao-tai-chinh.svg'),
          title: 'Báo cáo tài chính',
          color: 'FFEDED',
        },
        {
          key: 'key_4',
          icon: require('@/assets/images/baocao/nhnn_thanh-toan-va-ngan-quy.svg'),
          title: 'Thanh toán và ngân quỹ',
          color: '#DEF7FF',
        },

        {
          key: 'key_5',
          icon: require('@/assets/images/baocao/nhnn_hoat-dong-ngoai-hoi.svg'),
          title: 'Hoạt động ngoại hối',
          color: '#FEFFD9',
        },
        {
          key: 'key_7',
          icon: require('@/assets/images/baocao/nhnn_giam-sat-bao-dam-an-toan-hoat-dong.svg'),
          title: 'Giám sát, bảo đảm an toàn hoạt động',
          color: '#EAF0FF',
        },
        {
          key: 'key_2',
          icon: require('@/assets/images/baocao/nhnn_huy-dong-von.svg'),
          title: 'Huy động vốn',
          color: '#E9F8FF',
        },
        {
          key: 'key_3',
          icon: require('@/assets/images/baocao/nhnn_lai-suat.svg'),
          title: 'Lãi suất',
          color: '#FFEDF0',
        },
        {
          key: 'key_6',
          icon: require('@/assets/images/baocao/nhnn_thi-truong-tien-te.svg'),
          title: 'Thị trường tiền tệ',
          color: '#E2FFEE',
        },
      ],
      keyActived: '',
    }
  },
  components: {
    BaoCaoTaiChinh,
    DauTuDoiVoiNenKinhTe,
    GiamSatBaoDamAnToanHoatDong,
    HoatDongNgoaiHoi,
    HuyDongVon,
    LaiSuat,
    ThanhToanVaNganQuy,
    ThiTruongTienTe,
  },
  mounted() {
    let tag = document.querySelector('.todo-app-list.report-list')
    let tagBack = document.querySelector('button#back-hash-0001')
    window.tag = tag
    window.tagBack = tagBack
  },
}
</script>

<style lang="scss">
.BCNHNN_hash_class_0709 {
  height: 100%;
  #back-hash-0001 {
    margin: 1em 0;
  }
  .list-report {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1em;
    .item {
      background: #fff;
      width: calc(25% - 20px);
      margin: 10px;
      padding: 10px 5px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 18px -4px #8e9baa1a;

      &:hover {
        box-shadow: 0 4px 18px -4px #00000026;
        cursor: pointer;
      }
      .wrap-icon {
        width: fit-content;
        margin: 15px auto;
        border-radius: 50%;
        padding: 10px;
      }
    }
  }
}
</style>
