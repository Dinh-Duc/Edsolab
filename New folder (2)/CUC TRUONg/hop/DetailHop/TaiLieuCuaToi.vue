<template>
  <div class="box-tailieucuatoi">
    <b-table
      small
      class="table-tailieucuatoi"
      :fields="danhSachFile.fields"
      :items="danhSachFile.items"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(stt)="item">
        {{ item.index + 1 }}
      </template>
      <template #cell(entityName)="{item}">
        <b-link
          class="link"
          :href="item.path"
          target="_blank"
        >
          {{ item.name }}
        </b-link>
      </template>
      <template #cell(hanhDong)="{item}">
        <b-button
          variant="gradient-danger"
          class="btn-icon"
          @click="showConfirmDelete(item.id)"
        >
          <feather-icon icon="XCircleIcon" />
        </b-button>
      </template>
    </b-table>
    <div class="d-flex justify-content-center pb-1">
      <b-button
        variant="success"
        @click="$bvModal.show('modal-them-tai-lieu')"
      >
        <feather-icon
          icon="FilePlusIcon"
          class="mr-50"
        />
        <span class="align-middle">Thêm tài liệu của tôi</span>
      </b-button>
    </div>
    <actionThemTaiLieuCuaToi :render="render" />
    <b-modal
      id="confirm-delete"
      centered
      :hide-header="true"
      :hide-footer="true"
      size="sm"
      :show="false"
    >
      <template #default="{ hide }">
        <p>Bạn có chắc muốn xóa!</p>
        <div class="text-right">
          <b-button
            class="mr-1"
            variant="outline-danger"
            @click="hide()"
          >
            Hủy
          </b-button>
          <b-button
            variant="danger"
            @click="removeFile()"
          >
            Xóa
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { apiDanhSachTaiLieuCuaToi, apiRemoveFile } from '@/api/hop'

export default {
  name: 'TaiLieuCuocHop',
  components: {
    actionThemTaiLieuCuaToi: () => import('./actionHop/actionThemTaiLieuCuaToi.vue'),
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      danhSachFile: {
        fields: [
          { key: 'stt', label: 'STT' },
          { key: 'entityName', label: 'TÊN TÀI LIỆU' },
          { key: 'hanhDong', label: 'HÀNH ĐỘNG' },
        ],
        items: [],
      },
      deleteId: '',
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      apiDanhSachTaiLieuCuaToi({
        keyword: '',
        lichHopId: this.id,
        userId: JSON.parse(localStorage.getItem('userData')).id,
        pageIndex: 1,
        pageSize: 20,
      }).then(({ data }) => {
        this.danhSachFile.items = data.items
      })
    },
    showConfirmDelete(id) {
      this.$bvModal.show('confirm-delete')
      this.deleteId = id
    },
    removeFile() {
      apiRemoveFile(this.deleteId).finally(() => {
        this.$bvModal.hide('confirm-delete')
        this.render()
      })
    },
  },
}
</script>
<style scoped lang="scss">
.box-tailieucuatoi {
  padding: 1rem;
  height: 47vh;

  .table-tailieucuatoi {
    height: 38vh;
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
    .btn-remove {
      &:hover {
        fill: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
