<template>
  <b-modal
    id="modal-them-chuong-trinh-hop"
    cancel-variant="outline-secondary"
    centered
    no-close-on-backdrop
    size="lg"
    :hide-footer="true"
    title="Thêm chương trình họp"
    @hide="clearCache"
  >
    <div v-if="!ListUser.length > 0 && !DetailMeeting.canBoChuTriInfo" />
    <div
      v-else
      class="d-flex flex-column justify-content-center"
    >
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Phiên họp:
        </div>
        <div class="col-md-9">
          <b-form-input
            v-model="dataInsert.tieuDe"
            placeholder="Nhập phiên họp"
          />
        </div>
      </div>
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Thời gian:
        </div>
        <div class="col-md-9 d-flex align-items-center">
          <input
            v-model="dataInsert.thoiGian_BatDau"
            class="form-control"
            type="time"
          >
          <span class="pl-1 pr-1">Đến</span>
          <input
            v-model="dataInsert.thoiGian_KetThuc"
            class="form-control"
            type="time"
          >
        </div>
      </div>
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Người phụ trách:
        </div>
        <div class="col-md-9">
          <v-select
            ref="selectTimeFrom"
            v-model="item_nguoiphutrach"
            :clearable="false"
            label="text"
            :options="ListUser"
            :reduce="option => option.value"
            class="w-100"
            @search:focus="focusTimeFrom"
          />
        </div>
      </div>
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Nội dung:
        </div>
        <div class="col-md-9">
          <b-form-textarea
            v-model="dataInsert.noiDung"
            placeholder="Nhập nội dung chi tiết công việc"
            rows="3"
          />
        </div>
      </div>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Để file tại đây:
        </div>
        <div class="col-md-9">
          <b-form-file
            v-model="dataFiles"
            multiple
            :state="Boolean(dataFiles)"
            placeholder="Tải lên file tại đây..."
            accept=".doc, .docx, .pdf"
            drop-placeholder="Thả file tại đây..."
          />
        </div>
      </div>
      <div class="d-flex flex-row justify-content-start align-items-center pl-1 pt-1">
        <div class="d-flex flex-column w-100">
          <div v-if="dataFiles.length > 0">
            <span class="color-red">File đã chọn</span>
            <div
              v-for="(item, idx) in dataFiles"
              :key="idx"
              class="d-flex flex-row w-100"
            >
              <div class="pt-1 col-11">
                {{ item.name }}
              </div>
              <div
                role="button"
                class="pt-1 col-1"
                @click="actionRemoveFile(item.name)"
              >
                x
              </div>
            </div>
          </div>

          <div
            v-if="dataFilesEdit.length > 0"
            class="pt-1"
          >
            <span class="color-red">File đã tải lên</span>
            <div
              v-for="(item, idx) in dataFilesEdit"
              :key="idx"
              class="d-flex flex-row w-100"
            >
              <div class="pt-1 col-11">
                {{ item.name }}
              </div>
              <div
                role="button"
                class="pt-1 col-1"
                @click="actionRemoveFileUploaded(item)"
              >
                x
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-1 d-flex justify-content-center">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="success"
          @click="actionCreateMeetingSection"
        >
          <feather-icon icon="FilePlusIcon" />
          Thêm
        </b-button>
      </div>
    </div>
    <ConfirmDeleteModal :Message="'Bạn có muốn xóa file này?'" @isCheckConfirmDelete="actonConfirmDelete" />
  </b-modal>
</template>
<script>
/* eslint-disable */
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { createMeetingFileDoc, createMeetingSection, deleteMeetingFile, updateMeetingSection } from '@/api/hop/indexNew'
import { mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default ({
  name: 'ActionThemChuongTrinh',
  directives: {
    Ripple,
  },
  components: {
    vSelect,
    ConfirmDeleteModal: () => import('@/@core/components-custom/modal-Confirm-Delete/ConfirmDeleteModal.vue'),
  },
  data() {
    return {
      file1: undefined,
      name_doc: '',
      itemDataDelete: {},
      item_nguoiphutrach: {
        text: 'Chọn người phụ trách',
        value: '',
      },
      dataInsertFiles: {
        entityId: '',
        entityType: 2,
        entityName: 'LichHop_PhienHop',
      },
      dataFiles: [],
      dataFilesEdit: [],
      dataInsert: {
        lichHopId: '',
        ThuTu: 1,
        canBoId: 0,
        HoTen: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      ListUser: 'hop/ListUser',
      ListMeetingSECTION: 'hop/ListMeetingSECTION',
      DetailMeeting: 'hop/DetailMeeting',
      EditSECTION: 'hop/EditSECTION',
    }),
  },
  watch: {
    EditSECTION: {
      handler(val){
        if(val){

          if(Object.keys(this.EditSECTION).length === 0) { return }

          this.dataInsert.tieuDe = val.tieuDe
          this.dataInsert.thoiGian_BatDau = val.thoiGian_BatDau.split(' ')[1]
          this.dataInsert.thoiGian_KetThuc = val.thoiGian_KetThuc.split(' ')[1]

          const tmp_nguoiphutrach = this.ListUser.filter(item => item.value.CanBoId === val.canBoId)

          if(tmp_nguoiphutrach.length > 0){
            this.item_nguoiphutrach = tmp_nguoiphutrach[0]
          }

          this.dataInsert.noiDung = val.noiDung

          this.dataFilesEdit.push(...val.files)

          console.log("catch_edit: ", this.dataFilesEdit)

        }
      }
    }
  },
  methods: {
    actionValidation() {
      if(this.dataInsert.tieuDe == '') {return true}
      if(this.dataInsert.noiDung == '') {return true}
      if(this.dataInsert.thoiGian_BatDau == '') {return true}
      if(this.dataInsert.thoiGian_KetThuc == '') {return true}
      if(this.dataInsert.canBoId == '') {return true}
      if(this.dataInsert.lichHopId == '') {return true}

      return false
    },
    actonConfirmDelete(val){
      if(val){
        deleteMeetingFile(this.itemDataDelete.id)
        .then(data => {

          this.actionRemoveFileEdit(this.itemDataDelete.name)

          if(data.succeeded){
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Xóa xong',
                icon: 'BellIcon',
                variant: 'success',
                text: `${data.message}.`,
              },
            })

            this.$bvModal.hide('template-confirm-delete')
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Thêm mới',
              icon: 'BellIcon',
              variant: 'danger',
              text: `${err}.`,
            },
          })
        })
      }
    },
    actionRemoveFileUploaded(item){
      this.itemDataDelete = item

      this.$bvModal.show('template-confirm-delete')

    },
    clearCache() {
      if(this.EditSECTION){
        if(Object.keys(this.EditSECTION).length > 0){
          this.$store.dispatch('hop/getDetailMeetingSection', { id: this.EditSECTION.lichHopId })
        }
      }

      this.dataInsert = {
        lichHopId: '',
        ThuTu: 1,
        canBoId: 0,
        HoTen: '',
      }
      this.dataInsert.tieuDe = ''
      this.dataInsert.thoiGian_BatDau = ''
      this.dataInsert.thoiGian_KetThuc = ''
      this.dataInsert.noiDung = ''

      this.item_nguoiphutrach = {
        text: 'Chọn người phụ trách',
        value: '',
      }

      this.dataFiles = []

      this.dataFilesEdit = []

      this.$store.dispatch('hop/actionEditSection', null)

    },
    actionRemoveFile(filename) {
      let idx = -1
      this.dataFiles.forEach((item, index) => {
        if (item.name == filename) {
          idx = index
        }
      })

      if (idx > -1) {
        this.dataFiles.splice(idx, 1)
      }
    },
    actionRemoveFileEdit(filename) {
      let idx = -1
      this.dataFilesEdit.forEach((item, index) => {
        if (item.name == filename) {
          idx = index
        }
      })

      if (idx > -1) {
        this.dataFilesEdit.splice(idx, 1)
      }
    },
    actionCreateMeetingSection() {
      this.dataInsert.canBoId = this.item_nguoiphutrach.CanBoId
      this.dataInsert.hoTen = this.item_nguoiphutrach.hoTen
      this.dataInsert.lichHopId = this.DetailMeeting.id
      this.dataInsert.thuTu = this.ListMeetingSECTION.length + 1



      const form_data = new FormData()

      for (const item in this.dataFiles) {
        form_data.append('files', this.dataFiles[item])
      }


      if(this.actionValidation()){
        return
      }

      if(this.EditSECTION){
        if(Object.keys(this.EditSECTION).length > 0) {

          this.dataInsert.thuTu = this.EditSECTION.thuTu
          this.dataInsert.id = this.EditSECTION.id

          this.actionPutSection(form_data)
          return
        }
      }

      this.actionPostSection(form_data)

    },
    actionPutSection(dataFormFile) {
      updateMeetingSection(this.dataInsert)
      .then(data => {
          if (data.succeeded) {
            this.dataInsertFiles.entityId = this.dataInsert.id
            createMeetingFileDoc(this.dataInsertFiles, dataFormFile)
              .then(data => {
                if (data.succeeded) {
                  this.$store.dispatch('hop/getDetailMeetingSection', { id: this.DetailMeeting.id })
                  this.clearCache()
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-center',
                    props: {
                      title: 'Chỉnh sửa',
                      icon: 'BellIcon',
                      variant: 'success',
                      text: `${data.message}.`,
                    },
                  })
                  this.$bvModal.hide('modal-them-chuong-trinh-hop')
                }
              })
              .catch(err => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-center',
                  props: {
                    title: 'Chỉnh sửa',
                    icon: 'BellIcon',
                    variant: 'danger',
                    text: `${err}.`,
                  },
                })
              })
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Thêm mới',
              icon: 'BellIcon',
              variant: 'danger',
              text: `${err}.`,
            },
          })
        })
    },
    actionPostSection(dataFormFile) {
      createMeetingSection(this.dataInsert)
        .then(data => {
          if (data.succeeded) {
            this.dataInsertFiles.entityId = data.data.id

            createMeetingFileDoc(this.dataInsertFiles, dataFormFile)
              .then(data2 => {
                console.log("createMeetingFileDoc:", data2)
                if (data2.succeeded) {
                  this.$store.dispatch('hop/getDetailMeetingSection', { id: this.DetailMeeting.id })
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-center',
                    props: {
                      title: 'Thêm mới',
                      icon: 'BellIcon',
                      variant: 'success',
                      text: `${data2.message}.`,
                    },
                  })
                  this.$bvModal.hide('modal-them-chuong-trinh-hop')
                }
              })
              .catch(err => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-center',
                  props: {
                    title: 'Thêm mới',
                    icon: 'BellIcon',
                    variant: 'danger',
                    text: `${err}.`,
                  },
                })
              })


          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Thêm mới',
              icon: 'BellIcon',
              variant: 'danger',
              text: `${err}.`,
            },
          })
        })
    },
    focusTimeFrom() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeFrom.$el.querySelector('.vs__dropdown-menu .vs__dropdown-option--selected')
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
  },

})
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
