<template>
  <div id="giam-sat-bao-dam-an-toan-hoat-dong-hash-0709">
    <div
      v-if="!showComponent"
      class="list-hd"
    >
      <div
        v-for="(item, key) in listReport"
        :key="key"
        class="item"
        @click="openView(item)"
      >
        <div
          class="wrap-icon"
          :style="`background: ${item.color}`"
        >
          <img :src="item.icon">
        </div>
        <p>{{ item.title }}</p>
        <span class="item-collapse">
          <feather-icon
            v-if="item.children && item.children.length"
            :style="`transition: all .3s; transform: rotate(${showChildren !== item.key ? 0 : 180}deg)`"
            icon="ChevronUpIcon"
            size="12"
          />
        </span>
        <div
          v-if="item.children && item.children.length && showChildren === item.key"
          class="item-children"
        >
          <p
            v-for="i in item.children"
            :key="i.key"
            @click="openViewFromChild(i)"
            v-text="i.title"
          />
        </div>
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
      <GopVonMuaCoPhan v-if="keyActived === 'key_1'" />
      <GiamSatAnToanHoatDongCuaToChucTinDung v-else-if="keyActived === 'key_2'" />
      <ThongTinQuanLyGiamSat v-else-if="keyActived === 'key_3'" />
      <CongTyCon v-else-if="keyActived === 'key_3.1'" />
      <QuyTinDungNhanDan v-else-if="keyActived === 'key_3.2'" />
      <div v-else>
        Chưa có dữ liệu
      </div>
    </div>
    <!-- <img :src="listSvg[0]"> -->
  </div>
</template>

<script>
/* eslint-disable */
import GopVonMuaCoPhan from './gopVonMuaCoPhan.vue'
import GiamSatAnToanHoatDongCuaToChucTinDung from './giamSatAnToanHoatDongCuaToChucTinDung.vue'
import ThongTinQuanLyGiamSat from './thongTinQuanLyGiamSat.vue'
import CongTyCon from './blablaCongTyCon.vue'
import QuyTinDungNhanDan from './quyTinDungNhanDan.vue'

export default {
  components: {
    GopVonMuaCoPhan,
    GiamSatAnToanHoatDongCuaToChucTinDung,
    ThongTinQuanLyGiamSat,
    CongTyCon,
    QuyTinDungNhanDan,
  },
  data() {
    return {
      showComponent: false,
      showChildren: '',
      listReport: [
        {
          key: 'key_1',
          icon: require('@/assets/images/baocao/nhnn_gop-von-mua-co-phan.svg'),
          title: 'Góp vốn, mua cổ phần',
        },
        {
          key: 'key_2',
          icon: require('@/assets/images/baocao/nhnn_giam-sat-an-toan-hoat-dong-cua-to-chuc-tin-dung.svg'),
          title: 'Giám sát an toàn hoạt động của tổ chức tín dụng',
        },
        {
          key: 'key_3',
          icon: require('@/assets/images/baocao/nhnn_thong-tin-quan-ly-giam-sat.svg'),
          title: 'Thông tin quản lý, giám sát',
          children: [
            {
              key: 'key_3.1',
              title: 'Tổ chức tín dụng có chi nhánh, công ty con, công ty liên kết',
            },
            {
              key: 'key_3.2',
              title: 'Quỹ tín dụng nhân dân',
            },
          ],
        },
      ],
      keyActived: '',
    }
  },
  methods: {
    openView(item) {
      // nếu có phần tử con
      if (item.children && item.children.length) {
        if(item.key === this.showChildren) return this.showChildren = ''
        this.showChildren = item.key
      } else {
        this.keyActived = item.key
        this.showComponent = true
      }
    },
    openViewFromChild(item) {
      this.keyActived = item.key
      this.showComponent = true
    }
  },
}
</script>

<style lang="scss">
#giam-sat-bao-dam-an-toan-hoat-dong-hash-0709 {
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
      flex-wrap: wrap;

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
      .item-collapse {
        flex-grow: 1;
        text-align: right;
        padding-right: 1em;
      }
      .item-children {
        width: 100%;
        flex-grow: 1;
        p {
          text-align: left;
          margin: 10px 20px 0 0;
          padding-top: 10px;
          border-top: thin solid #3333333b;
          opacity: .8;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
