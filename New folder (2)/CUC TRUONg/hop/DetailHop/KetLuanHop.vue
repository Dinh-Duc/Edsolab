<template>
  <div class="box-ketluanhop">
    <div class="ketluanhop-head d-flex flex-wrap">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        class=""
        variant="primary"
        @click="$bvModal.show('them-nhiem-vu')"
      >
        Thêm nhiệm vụ
      </b-button>
      <ActionThemNhiemVu
        :item="item"
        :render="render"
      />
    </div>
    <div class="ketluanhop-body">
      <div class="box-left">
        <b-overlay :show="isShowOverlay">
          <b-table
            small
            class="table-ketluanhop"
            :fields="ketLuanHop.fields"
            :items="ketLuanHop.items"
            responsive="sm"
          >
            <!-- A virtual column -->
            <template #cell(STT)="item">
              {{ item.index + 1 }}
            </template>

            <template #cell(thoiGianHoanThanh)="{item}">
              {{ moment(item.thoiGianHoanThanh).format('DD/MM/YYYY') }}
            </template>

            <template #cell(trangThai)="{item}">
              <b-badge
                pill
                variant="success"
              >
                {{ trangThai[item.trangThai] }}
              </b-badge>
            </template>

            <template #cell(chiDao)="data">
              <div
                class="row-chidao"
                @click="actionChiDao(data)"
              >
                <img
                  src="@/assets/icons/hop-chidao.svg"
                  alt=""
                >
              </div>
            </template>
          </b-table>
        </b-overlay>
      </div>
      <div class="box-right">
        <!-- <span>Không có file đính kèm</span> -->
        <b-img
          src="@/assets/images/hop/templatefilework.png"
          fluid
          alt=""
        />
      </div>
    </div>
    <div class="d-flex w-100 pt-1">
      <div class="col-md-9">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
        >
          Nhắc thực hiện
        </b-button>
      </div>
      <div class="col-md-3">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="success"
          @click="$bvModal.show('modal-guiketluancuochop')"
        >
          Gửi kết luận họp
        </b-button>
        <ActionGuiKetLuanHop />
      </div>
    </div>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { apiDanhSachKetLuanHop } from '@/api/hop'
import moment from 'moment'
import ActionGuiKetLuanHop from './actionHop/actionGuiKetLuanHop.vue'
import ActionThemNhiemVu from './actionHop/actionThemNhiemVu.vue'

export default {
  name: 'KetLuanHop',
  components: {
    ActionGuiKetLuanHop,
    ActionThemNhiemVu,
  },
  directives: {
    Ripple,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      moment,
      isShowOverlay: false,
      ketLuanHop: {
        fields: [
          {
            key: 'STT',
            label: 'STT',
          },
          {
            key: 'noiDung',
            label: 'NỘI DUNG KẾT LUẬN-NHIỆM VỤ',
          },
          {
            key: 'donViThucHien',
            label: 'ĐƠN VỊ THỰC HIỆN',
          },
          {
            key: 'thoiGianHoanThanh',
            label: 'THỜI GIAN HOÀN THÀNH',
          },
          {
            key: 'trangThai',
            label: 'TRẠNG THÁI',
          },
          {
            key: 'loaiNhiemVu',
            label: 'LOẠI NHIỆM VỤ',
          },
          {
            key: 'chiDao',
            label: 'CHỈ ĐẠO',
          },
        ],
        items: [],
      },
      pagination: {
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
      },
      trangThai: ['Đang xử lý', 'Đã xử lý', 'Quá hạn'],
    }
  },
  created() {
    this.render()
  },
  methods: {
    /* eslint-disable */
    actionChiDao(val) {
      // do something
    },
    openGuiKetLuanCuocHop() {
      this.$bvModal.show('modal-guiketluancuochop')
    },
    render() {
      this.isShowOverlay = true
      apiDanhSachKetLuanHop({
        lichHopId: this.item.id,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      }).then(({ data }) => {
        this.ketLuanHop.items = data.items
        this.pagination = {
          pageIndex: data.PageIndex,
          pageSize: data.PageSize,
          totalPage: data.TotalPage,
        }
      })
      .finally(()=>{
        this.isShowOverlay = false
      })
    },
  },
}
</script>
<style scoped lang="scss">
.title-guiketluancuochop {
  border-bottom: 1px solid #e7e5ec;
  padding-bottom: 1rem;
}

.from-guiketluancuochop {
  padding-top: 1rem;

  .box-contents-klch {
    height: 8rem;
    overflow-y: auto;
  }
}
.box-ketluanhop {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;

  .ketluanhop-head {
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .ketluanhop-body {
    display: flex;
    width: 100%;

    padding-bottom: 1rem;

    .row-chidao {
      display: flex;
      align-content: center;
      justify-content: center;
      cursor: pointer;
    }

    .box-left {
      width: 70%;
      margin-right: 0.36rem;

      .table-ketluanhop {
        height: 28vh;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          background-color: #fff;
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
          background-color: #fff;
        }
        &:hover {
          &::-webkit-scrollbar {
            display: block;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
            background-color: #aaa;
          }
        }
      }
    }

    .box-right {
      width: 30%;
      display: flex;
      align-content: center;
      justify-content: center;
      align-content: center;
      vertical-align: middle;

      img {
        height: 28vh;
      }
    }

    .box-bottom-left {
      display: flex;
      justify-content: flex-end;
      width: 70%;
      height: 3rem;
      margin-right: 0.36rem;

      .btn-nhacthuchien {
        cursor: pointer;
        line-height: 3rem;
        width: 10rem;
        background: #ea5455;
        border-radius: 0.26rem;
        color: #fff;
        text-align: center;
        vertical-align: middle;
      }
    }

    .box-bottom-right {
      display: flex;
      justify-content: flex-end;
      width: 30%;
      height: 3rem;
      margin-left: 0.36rem;
      align-content: center;
      vertical-align: middle;

      .btn-ketluancuochop {
        cursor: pointer;
        line-height: 3rem;
        width: 12rem;
        background: #5a8dee;
        border-radius: 0.26rem;
        color: #fff;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
  .w_57 {
    width: 57%;
  }
}
</style>
