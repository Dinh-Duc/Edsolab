<template>
  <div class="box-tailieucuatoi">
    <b-table
      small
      class="table-tailieucuatoi"
      :fields="fields"
      :items="ListMeetingFile"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(index)="item">
        {{ item.index + 1 }}
      </template>

      <template #cell(entityName)="{item}">
        <b-link
          class="link"
          @click="actionDownloadFile(item.entityName.path)"
        >
          {{ item.entityName.name }}
        </b-link>
      </template>

      <template #cell(thaoTac)="{item}">
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
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="$bvModal.show('modal-them-tai-lieu')"
      >
        <feather-icon
          icon="FilePlusIcon"
          class="mr-50"
        />
        <span class="align-middle">Thêm tài liệu cuộc họp</span>
      </b-button>
    </div>
    <actionThemTaiLieu />
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
import Ripple from 'vue-ripple-directive'
import { mapGetters } from 'vuex'
import { apiRemoveFile } from '@/api/hop'

export default {
  name: 'TaiLieuCuocHop',
  components: {
    actionThemTaiLieu: () => import('./actionHop/actionThemTaiLieu.vue'),
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      deleteId: '',
      fields: [
        { key: 'index', label: 'STT', thClass: 'w_5' },
        { key: 'entityName', label: 'TÊN tài liệu', thClass: 'w_35' },
        { key: 'ten_can_bo_da_xem', label: 'TÊN CÁN BỘ đã xem', thClass: 'w_25' },
        { key: 'ten_can_bo_chua_xem', label: 'TÊN CÁN BỘ chưa xem', thClass: 'w_25' },
        { key: 'thaoTac', label: 'THAO TÁC', thClass: 'w_10' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
      ListMeetingFile: 'hop/ListMeetingFile',
    }),
  },
  created() {
    console.log(this.ListMeetingFile)
    this.$store.dispatch('hop/getListMeetingFile', {
      id: this.DetailMeeting.id,
    })
  },
  methods: {
    actionDownloadFile(path) {
      window.open(path)
    },
    showConfirmDelete(id) {
      this.$bvModal.show('confirm-delete')
      this.deleteId = id
    },
    removeFile() {
      apiRemoveFile(this.deleteId).finally(() => {
        this.$bvModal.hide('confirm-delete')
        this.$store.dispatch('hop/getListMeetingFile', {
          id: this.DetailMeeting.id,
        })
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
    height: 36vh;
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
    .link {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
