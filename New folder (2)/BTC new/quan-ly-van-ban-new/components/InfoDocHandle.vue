<template>
  <div class="info-doc-prt">
    <div class="title-docs-chart">
      <b>{{ title }}</b>
    </div>
    <div class="prt-progress">
      <b-progress
        show-progress
        :max="100"
      >
        <b-progress-bar
          style="background: #796EEF"
          :value="filterFor.a"
        />
        <b-progress-bar
          style="background: #FF9F43"
          :value="filterFor.b"
        />
        <b-progress-bar
          style="background: #00CFE8"
          :value="filterFor.c"
        />
        <b-progress-bar
          style="background: #51CD89"
          :value="filterFor.d"
        />
      </b-progress>
    </div>
    <div class="note-progress">
      <div class="note-elm-3">
        <div
          class="elm-square"
          style="background: #796EEF"
        />
        <span>Đã xử lý</span>
      </div>
      <div class="note-elm-3">
        <div
          class="elm-square"
          style="background: #FF9F43"
        />
        <span>Chờ phân xử lý</span>
      </div>
      <div class="note-elm-3">
        <div
          class="elm-square"
          style="background: #00CFE8"
        />
        <span>Chờ xử lý</span>
      </div>
      <div class="note-elm-3">
        <div
          class="elm-square"
          style="background: #51CD89"
        />
        <span>Đang xử lý</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

const fakeData = {
  VBDEN: {
    a: 1000,
    b: 600,
    c: 400,
    d: 1130,
  },
  VBDI: {
    a: 1500,
    b: 1470,
    c: 1100,
    d: 0,
  },
  DVCM: {
    a: 4500,
    b: 2500,
    c: 1610,
    d: 1610,
  },
  VNC: {
    a: 550,
    b: 620,
    c: 200,
    d: 150,
  },
  DVSN: {
    a: 250,
    b: 120,
    c: 300,
    d: 450,
  },
}

export default {
  name: 'InfoDocHandle',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
    dataChart: {
      type: Object,
      default: null,
    },
    typeDocs: {
      type: Number,
      default: null,
    },
    forVB: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['Param', 'keyActivedSidebar']),
    filterFor() {
      if (this.keyActivedSidebar.includes('DVCM')) return fakeData.DVCM
      if (this.keyActivedSidebar.includes('VNC')) return fakeData.VNC
      if (this.keyActivedSidebar.includes('DVSN')) return fakeData.DVSN

      if (this.forVB) {
        if (this.forVB === 'VBDEN') return fakeData.VBDEN
        return fakeData.VBDI
      }
      if (this.keyActivedSidebar.includes('VBDEN')) return fakeData.VBDEN
      return fakeData.VBDI
    },
  },
  methods: {
    getListDocsWithFilter(data) {
      return data
      // const param = {
      //   maTinhTrang: data.tinhTrang.toString(),
      //   maTrangThai: data.trangThai.toString(),
      //   loaiVanBan: this.Param.loaiVanBan,
      //   pageIndex: 1,
      //   pageSize: 20,
      // }
      // this.$store.state.CurrentPage = 1
      // this.$store.dispatch('getDocs', param)
    },
  },
}
</script>
<style lang="scss" scoped>
.docs-manage {
  .info-doc-prt {
    width: 100%;
    float: left;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 8px 12px 0px 12px;
    height: 117px;
    margin-bottom: 8px;
  }
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
  .prt-progress {
    width: 100%;
    float: left;
    padding-top: 13px;
  }
  .progress {
    border-radius: 3px !important;
    width: 100%;
    height: 23px;
  }
  .progress .progress-bar {
    cursor: pointer;
  }
  .progress .progress-bar:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .progress-bar span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
  }
  .note-progress {
    width: 100%;
    float: left;
    padding-top: 20px;
    .note-elm-3 {
      width: 25%;
      float: left;
      .elm-square {
        height: 10px;
        width: 10px;
        float: left;
        vertical-align: middle;
        margin-top: 2px;
      }
      span {
        vertical-align: middle;
        width: calc(100% - 10px);
        float: left;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
        padding-left: 7px;
      }
    }
  }
}
</style>
