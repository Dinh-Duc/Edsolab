<template>
  <div class="d-flex flex-column w-100 box-child">
    <div
      role="button"
      class="d-flex meetings-head font-weight-bold pt-1"
      @click="isShow = !isShow"
    >
      <div class="col-md-9">
        <span>{{ item.tieuDe }}</span>
      </div>
      <div class="col-md-3">
        <div
          v-if="isShow"
          class="d-flex flex-row pl-5"
        >
          <span class="font-size-14">Thu gọn</span>
          <feather-icon
            icon="ChevronDownIcon"
            class="ml-50 size-icon-28"
          />
        </div>
        <div
          v-else
          class="d-flex flex-row pl-5"
        >
          <span class="font-size-14">Xem thêm</span>
          <feather-icon
            icon="ChevronRightIcon"
            class="ml-50 size-icon-28"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isShow"
      class="d-flex flex-row w-100 box-loop-cth"
    >
      <div class="row-meetings col-11">
        <div class="row-meetings-content">
          <div class="box-left">
            Thời gian:
          </div>
          <div class="box-right">
            {{ actionThoiGian(item.thoiGian_BatDau, item.thoiGian_KetThuc) }}
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Người phụ trách:
          </div>
          <div class="box-right">
            {{ item.canBoHoTen }} - {{ item.chucVu }} - {{ item.tenDonVi }}
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Nội dung:
          </div>
          <div class="box-right">
            {{ item.noiDung }}
          </div>
        </div>
        <div class="row-meetings-content">
          <div class="box-left">
            Tài liệu:
          </div>
          <div class="box-right box-link-doc">
            <div v-if="!item.files.length > 0">
              Không có tài liệu
            </div>
            <div
              v-else
              class="d-flex flex-column"
            >
              <div
                v-for="(itemFile, idx) in item.files"
                :key="idx"
                @click="downloadFIle(itemFile.path)"
              >
                {{ itemFile.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="row-meetings-content w-100">
          <div class="box-left">
            Câu hỏi:
          </div>
          <div class="box-right w-100">
            <actionBinhLuan :list-quest="item.questionList" />
          </div>
        </div>
      </div>
      <div class="col-1 d-flex flex-column pt-2">
        <div class="w-100">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="info"
            class="btn-icon"
            @click="$emit('PostActionEdit', item)"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
        </div>
        <div class="w-100 pt-1">
          <b-button
            variant="gradient-danger"
            class="btn-icon"
            @click="$emit('PostIdDeteleSection', item.id)"
          >
            <feather-icon icon="XCircleIcon" />
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
import Ripple from 'vue-ripple-directive'

export default ({
  name: 'ChuongTrinhHopChild',
  directives: {
    Ripple,
  },
  components: {
    actionBinhLuan: () => import('./actionHop/actionBinhLuan/actionBinhLuan.vue'),
  },
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: true,
      isDelete: false,
    }
  },
  methods: {
    downloadFIle(filename) {
      // window.open(`${HTML_BE}FileUpload/LichHop_PhienHop/${filename}`)
      window.open(filename)
    },
    actionThoiGian(start, end) {
      if (!end) {
        end = start
      }

      const tmp_start = this.formatDate(start).split(' ')
      const tmp_end = this.formatDate(end).split(' ')

      if (tmp_start[0] == tmp_end[0]) { // nếu cùng ngày
        return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[1]}`
      }
      return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[0]} ${tmp_end[1]}`
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY HH:mm')
      }
      return ''
    },
  },
})
</script>
<style scoped lang="scss">
.box-child{
    .meetings-head{
      font-weight: 600;
      font-size: 1.2rem;
    }

    .box-loop-cth{
        height: auto;
        border-bottom: 1px solid rgba(71, 95, 123, 0.2);
    }

    .row-meetings{

        .row-meetings-content{
            display: flex;
            padding-top: 0.56rem;
            padding-bottom: 0.56rem;

            .box-left{
                width: 10rem;
            }

            .box-link-doc{
                cursor: pointer;
                color: #5A8DEE;
            }
        }
    }
}

</style>
