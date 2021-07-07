<template>
  <div style="height: 100%">
    <!-- Table -->
    <div
      v-if="CloseTabList"
      style="height: 100%"
    >
      <div class="preview-top-statistic">
        <b-col
          cols="6"
          style="float: left; height: 100%;"
        >
          <div class="preview-infodoc">
            <InfoDocHandle
              :title="filterInfoDoc()"
              :total="Go_Total"
              :data-chart="doctype === 1 ? TinhTrangVBDen : TinhTrangVBDi"
              :type-docs="doctype"
            />
          </div>
        </b-col>
        <b-col
          cols="6"
          style="float: left; height: 100%;"
        >
          <div class="preview-prt-statistic">
            <StatisticDocs :title="filterStatisticDoc()" />
          </div>
        </b-col>
      </div>
      <div class="table-list-docs">
        <DetailInfoToTable
          @item-page-clicked="getDocsByFilter($event)"
          @choose-item="viewDetailDoc($event)"
        />
      </div>
    </div>

    <!-- Detail Doc -->
    <div
      v-else
      style="height: 100%"
    >
      <DocDetail
        :data-detail="DataDetail"
        @back-tab-list="backTapList($event)"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { UrlAPI } from '@/configs/config'
import InfoDocHandle from './components/InfoDocHandle.vue'
import StatisticDocs from './components/StatisticDocs.vue'
import DetailInfoToTable from './components/DetailInfoToTable.vue'
import DocDetail from './components/DocDetail.vue'

export default {
  components: {
    InfoDocHandle,
    StatisticDocs,
    DetailInfoToTable,
    DocDetail,
  },
  props: {
    doctype: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      CurrentPage: 1,
      CloseTabList: true,
      DataDetail: {},
    }
  },
  computed: {
    ...mapGetters([
      'Go_Total',
      'DataChartNumber',
      'TinhTrangVBDen',
      'TinhTrangVBDi',
    ]),
    DocType() {
      return this.doctype
    },
  },
  methods: {
    getDocsByFilter(e) {
      this.DocTypeId = e.DocTypeId
      const param = {
        maTinhTrang: e.TinhTrang.toString(),
        maTrangThai: e.TrangThai.toString(),
        loaiVanBan: e.DocTypeId,
        trangThaiVanBan: e.TrangThaiVanBan,
        pageIndex: e.PageIndex,
        pageSize: 20,
      }

      this.$store.dispatch('getDocs', param)
    },

    backTapList(e) {
      console.log(e)
      this.CloseTabList = true
    },

    viewDetailDoc(e) {
      const param = {
        id: e.id,
      }

      try {
        // eslint-disable-next-line no-undef
        COMMON_GET(
          `${UrlAPI}/api/QuanLyVanBan/chitiet-vanban`,
          param,
        ).then(res => {
          this.DataDetail = {
            TrichYeu: res.trichYeu,
            NgayHanXuLy: res.hanXuLy,
            NguoiSoanThao: res.nguoiSoanThao,
            CoQuanBanHanh: res.coQuanBanHanh,
            SoKyHieu: res.soKyHieu,
            LoaiVanBan:
              // eslint-disable-next-line no-nested-ternary
              res.type === 1
                ? 'Văn bản đến'
                : res.type === 0
                  ? 'Văn bản đi'
                  : '',
          }
          this.CloseTabList = false
        })
      } catch (error) {
        console.log(`viewDetailDoc: ${error}`)
      }
    },
    filterInfoDoc() {
      if (this.doctype === 1) return 'Văn bản đến'
      if (this.doctype === 2) return 'Văn bản đi'
      if (this.doctype === 3) return 'Đơn vị chuyên môn'
      if (this.doctype === 4) return 'Viện nghiên cứu'
      if (this.doctype === 5) return 'Đơn vị sự nghiệp'
      return ''
    },
    filterStatisticDoc() {
      if (this.doctype === 1) return 'Văn bản đến - Thống kê văn bản chưa hoàn thành của đơn vị'
      if (this.doctype === 2) return 'Văn bản đi - Thống kê văn bản chưa hoàn thành của đơn vị'
      if (this.doctype === 3) return 'Đơn vị chuyên môn - Thống kê văn bản chưa hoàn thành của đơn vị'
      if (this.doctype === 4) return 'Viện nghiên cứu - Thống kê văn bản chưa hoàn thành của đơn vị'
      if (this.doctype === 5) return 'Đơn vị sự nghiệp - Thống kê văn bản chưa hoàn thành của đơn vị'
      return ''
    },
  },
}
</script>
<style lang="scss">
.docs-manage {
  .title-docs-chart {
    width: 100%;
    float: left;
    border-bottom: 1px solid #828282;
    b {
      width: 100%;
      float: left;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
      padding-bottom: 1px;
    }
  }
  .preview-prt-statistic {
    height: 125px;
  }
  .preview-top-statistic {
    width: 100%;
    float: left;
  }
  .preview-infodoc {
    width: 100%;
    float: left;
  }
  .preview-infodoc .info-doc-prt {
    margin: 0 !important;
    height: 125px !important;
  }
}
</style>
