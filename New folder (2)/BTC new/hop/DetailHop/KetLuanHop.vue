<template>
  <div class="box-ketluanhop">
    <div class="ketluanhop-head">
      Kết luận
    </div>
    <div class="ketluanhop-body">
      <div class="box-left">
        <b-table
          small
          class="table-ketluanhop"
          :fields="fields"
          :items="items"
          responsive="sm"
        >
          <!-- A virtual column -->
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template #cell(order_status)="data">
            <b-badge
              pill
              :variant="data.value.variant"
            >
              {{ data.value.status }}
            </b-badge>
          </template>

          <template #cell(chi_dao)="data">
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
    <div class="ketluanhop-body">
      <div class="box-bottom-left">
        <div class="btn-nhacthuchien">
          Nhắc thực hiện
        </div>
      </div>
      <div class="box-bottom-right">
        <div
          class="btn-ketluancuochop"
          @click="openGuiKetLuanCuocHop"
        >
          Gửi kết luận cuộc họp
        </div>
      </div>
    </div>
    <b-modal
      id="modal-guiketluancuochop"
      hide-header="true"
      ok-only
      cancel-variant="outline-secondary"
      ok-title="Gửi đi"
      centered
      title=""
    >
      <div class="title-guiketluancuochop">
        Họp bầu cử ĐBQH khóa XV đơn vị số 03
      </div>
      <b-form class="from-guiketluancuochop">
        <b-form-group>
          <label for="noi_dung">Nội dung:</label>
          <b-form-input
            id="noi_dung"
            class="box-contents-klch"
            type="text"
            placeholder="Nhập nội dung"
          />
        </b-form-group>
        <b-form-group label="Tài liệu đính kèm">
          <b-input-group class="group-file-input-dn">
            <b-form-file
              v-model="file"
              placeholder="Thả file word (.docx, .doc, .txt)"
              class="custom-file-input-dn"
            />
            <b-input-group-append is-text>
              <svg
                width="11"
                height="21"
                viewBox="0 0 11 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 4.77275V15.75C9.5 17.8596 7.70998 19.5682 5.5 19.5682C3.29003 19.5682 1.49996 17.8596 1.49996 15.75V3.81817C1.49996 2.5009 2.61995 1.43182 3.99995 1.43182C5.37995 1.43182 6.49999 2.5009 6.49999 3.81817V13.8409C6.49999 14.3659 6.055 14.7954 5.5 14.7954C4.945 14.7954 4.50001 14.3659 4.50001 13.8409V4.77275H3.00001V13.8409C3.00001 15.1582 4.12 16.2273 5.5 16.2273C6.88 16.2273 7.99999 15.1582 7.99999 13.8409V3.81817C7.99999 1.70865 6.20997 0 4 0C1.79002 0 0 1.70865 0 3.81817V15.75C0 18.6518 2.46502 21 5.5 21C8.53498 21 11 18.6518 11 15.75V4.77275H9.5Z"
                  fill="#B2BCC5"
                />
              </svg>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
export default ({
  name: 'KetLuanHop',
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'STT' },
        // A column that needs custom formatting
        { key: 'noi_dung', label: 'Nội dung kết luận-nhiệm vụ' },
        // A column that needs custom formatting
        { key: 'don_vi_thuc_hien', label: 'đơn vị thực hiện' },
        // A regular column
        { key: 'time_hoan_thanh', label: 'Thời gian hoàn thành' },
        // A virtual column made up from two fields
        { key: 'order_status', label: 'Trạng thái' },
        // A virtual column made up from two fields
        { key: 'chi_dao', label: 'Chỉ đạo' },
      ],
      items: [
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đã xử lý', variant: 'success' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Quá hạn', variant: 'danger' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Quá hạn', variant: 'danger' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Quá hạn', variant: 'danger' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
        {
          noi_dung: 'Thành lập ban chỉ đạo bầu cử',
          don_vi_thuc_hien: 'Ủy ban nhân dân tỉnh',
          order_status: { status: 'Đang xử lý', variant: 'warning' },
          time_hoan_thanh: '22/4/2021',
          chi_dao: '',
        },
      ],
    }
  },
  methods: {
    /* eslint-disable */
    actionChiDao(val) {
      // do something
    },
    openGuiKetLuanCuocHop() {
      this.$bvModal.show('modal-guiketluancuochop')
    },
  },

})
</script>
<style scoped lang='scss'>
.title-guiketluancuochop{
    border-bottom: 1px solid #E7E5EC;
    padding-bottom: 1rem;
}

.from-guiketluancuochop{
    padding-top: 1rem;

    .box-contents-klch{
        height: 8rem;
        overflow-y: auto;
    }
}
.box-ketluanhop{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 37vh;
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

    .ketluanhop-head{
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-weight: 600;
        font-size: 1.2rem;
    }

    .ketluanhop-body{
        display: flex;
        width: 100%;

        padding-bottom: 1rem;

        .row-chidao{
            display: flex;
            align-content: center;
            justify-content: center;
            cursor: pointer;
        }

        .box-left{
            width: 70%;
            height: 33vh;
            margin-right: 0.36rem;

            .table-ketluanhop{
                height: 33vh;
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

        .box-right{
            width: 30%;
            height: 33vh;
            display: flex;
            align-content: center;
            justify-content: center;
            align-content: center;
            vertical-align: middle;

            img{
                height: 33vh !important;
            }
        }

        .box-bottom-left{
            display: flex;
            justify-content: flex-end;
            width: 70%;
            height: 3rem;
            margin-right: 0.36rem;

            .btn-nhacthuchien{
                cursor: pointer;
                line-height: 3rem;
                width: 10rem;
                background: #EA5455;
                border-radius: 0.26rem;
                color: #FFF;
                text-align: center;
                vertical-align: middle;
            }
        }

        .box-bottom-right{
            display: flex;
            justify-content: flex-end;
            width: 30%;
            height: 3rem;
            margin-left: 0.36rem;
            align-content: center;
            vertical-align: middle;

            .btn-ketluancuochop{
                cursor: pointer;
                line-height: 3rem;
                width: 12rem;
                background: #5A8DEE;
                border-radius: 0.26rem;
                color: #FFF;
                text-align: center;
                vertical-align: middle;
            }
        }
    }
}
</style>
