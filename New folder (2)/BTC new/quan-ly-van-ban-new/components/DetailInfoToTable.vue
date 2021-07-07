<template lang="">
  <div
    v-if="filterDataByKeyActived && filterDataByKeyActived.length"
    class="detail-in-table-prt"
  >
    <div class="child-detail-in-table-prt">
      <b-table
        sticky-header
        striped
        hover
        :items="filterDataByKeyActived"
        :fields="fields"
        :fixed="true"
        :current-page="currentPage"
        @row-clicked="chooseItemInTable"
      />
    </div>
    <!-- <div class="paging-prt">
      <div class="center-paging">
        <b-pagination
          v-if="TotalPage > 0"
          v-model="currentPage"
          :total-rows="TotalItems"
          :first-number="true"
          :last-number="true"
          align="fill"
          size="sm"
          class="my-0"
          @input="changePageAndGetDocs(currentPage)"
        />
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import fakeData from '../data.json'

export default {
  props: {
    changeTab: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'ngayBanHanh',
          label: 'NGÀY BAN HÀNH',
          thClass: 'ngay-ban-hanh',
        },
        {
          key: 'soKyHieu',
          label: 'SỐ/KÝ HIỆU',
          thClass: 'so-ky-hieu',
        },
        {
          key: 'ngayNhan',
          label: 'NGÀY CÓ HIỆU LỰC',
          thClass: 'ngay-nhan',
        },
        {
          key: 'trichYeu',
          label: 'TRÍCH YẾU',
          thClass: 'trich-yeu',
        },
        {
          key: 'coQuanBanHanh',
          label: 'CƠ QUAN BAN HÀNH',
          thClass: 'co-quan-ban-hanh',
        },
        {
          key: 'trangThai',
          label: 'TRẠNG THÁI',
          thClass: 'trang-thai',
        },
      ],
      currentPage: this.$store.state.docsManage.CurrentPage,
      dataJSON: fakeData,
    }
  },
  computed: {
    ...mapGetters([
      'ListDocs',
      'TotalPage',
      'TotalItems',
      'Param',
      'ChangeTab',
      'keyActivedSidebar',
    ]),
    filterDataByKeyActived() {
      const { dataJSON, keyActivedSidebar } = this
      if (dataJSON[keyActivedSidebar]) return dataJSON[keyActivedSidebar]
      if (keyActivedSidebar.includes('DVCM_')) return dataJSON.DVCM
      if (keyActivedSidebar.includes('VNC_')) return dataJSON.VNC
      if (keyActivedSidebar.includes('DVSN_')) return dataJSON.DVSN
      return []
    },
  },
  watch: {
    ChangeTab() {
      if (this.ChangeTab === false || this.ChangeTab === true) this.currentPage = 1
    },
  },
  methods: {
    changePageAndGetDocs(page) {
      const model = {
        DocTypeId: this.Param.loaiVanBan,
        TinhTrang: this.Param.maTinhTrang,
        TrangThai: this.Param.maTrangThai,
        TrangThaiVanBan: this.Param.trangThaiVanBan,
        PageIndex: page,
      }
      console.log(106, model)
      this.$emit('item-page-clicked', model)
    },

    chooseItemInTable(e) {
      this.$emit('choose-item', e)
    },
  },
}
</script>
<style lang="scss">
.docs-manage {
  .table-list-docs {
    width: 100%;
    float: left;
    height: calc(100% - 163px);
  }
  .paging-prt {
    text-align: center;
    width: 100%;
    padding-top: 10px;
    float: left;
  }
  .center-paging {
    width: 600px;
    margin: 0 auto;
  }
  .detail-in-table-prt {
    padding: 0 15px;
    width: 100%;
    float: left;
    padding-top: 10px;
    height: 100%;
  }
  .child-detail-in-table-prt {
    border-radius: 6px;
    border: 1px solid rgba(71, 95, 123, 0.2);
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  .detail-in-table-prt table {
    width: 100%;
    float: left;
    margin: 0;
  }
  .detail-in-table-prt table thead tr th {
    padding: 21px 10px !important;
  }
  th.ngay-nhan {
    width: 10%;
    text-align: center;
  }
  th.so-ky-hieu {
    width: 15%;
    text-align: center;
  }
  th.ngay-ban-hanh {
    width: 13%;
    text-align: center;
  }
  th.trich-yeu {
    width: 28%;
    text-align: center;
  }
  th.co-quan-ban-hanh {
    width: 15%;
    text-align: center;
  }
  th.trang-thai {
    width: 20%;
    text-align: center;
  }

  .detail-in-table-prt .b-table-sticky-header {
    overflow-y: auto;
    max-height: unset;
    margin: 0;
    height: 100%;
  }
  /* width */
  .b-table-sticky-header::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  .b-table-sticky-header::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  .b-table-sticky-header::-webkit-scrollbar-thumb {
    background: rgb(201, 198, 198);
    border-radius: 5px;
  }

  /* Handle on hover */
  .b-table-sticky-header::-webkit-scrollbar-thumb:hover {
    background: rgb(163, 163, 163);
  }
}
</style>
