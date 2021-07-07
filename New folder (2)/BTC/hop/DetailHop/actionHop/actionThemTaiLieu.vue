<template>
  <b-modal
    id="modal-them-tai-lieu"
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Thêm tài liệu cuộc họp"
    @hide="actionClearData"
  >
    <div class="d-flex flex-column justify-content-center">
      <div class="d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-4">
          Để file tại đây:
        </div>
        <div class="col-md-8">
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
      <div
        class="d-flex flex-row justify-content-start align-items-center pl-1 pt-1"
      >
        <div class="d-flex flex-column w-100">
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
      </div>
      <div class="pt-1 d-flex justify-content-center">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="success"
          @click="actionPostFile"
        >
          <feather-icon icon="FilePlusIcon" />
          Thêm
        </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { createMeetingFileDoc } from '@/api/hop'
import { mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'ActionThemTaiLieu',
  directives: {
    Ripple,
  },
  data() {
    return {
      dataInsert: {
        entityId: '',
        entityType: 2,
        entityName: 'LichHop',
      },
      dataFiles: [],
      name_doc: '',
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
    }),
  },
  /* eslint-disable */
  methods: {
    actionValidate (){
      return this.dataFiles.length == 0?true:false
    },
    actionClearData() {
      this.dataInsert = {
        entityId: '',
        entityType: 2,
        entityName: 'LichHop',
      }
      this.dataFiles = []
    },
    actionRemoveFile(filename) {
      let idx = -1
      this.dataFiles.forEach((item, index) => {
        if (item.name === filename) {
          idx = index
        }
      })

      if (idx > -1) {
        this.dataFiles.splice(idx, 1)
      }
    },
    actionPostFile() {
      if(this.actionValidate()){
        this.$toast({
          component: ToastificationContent,
          position: 'top-center',
          props: {
            title: 'Thêm mới',
            icon: 'BellIcon',
            variant: 'warning',
            text: `Vui lòng chọn file để tải lên.`,
          },
        })

        return
      }

      this.dataInsert.entityId = this.DetailMeeting.id

      const formData = new FormData()

      this.dataFiles.map(item => {
        formData.append('files', item)
        return null
      })
      console.log(this.dataInsert)
      createMeetingFileDoc(this.dataInsert, formData)
        .then(data => {
          console.log(data)
          if (data.data.succeeded) {
            this.$store.dispatch('hop/getListMeetingFile', {
              id: this.DetailMeeting.id,
            })
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Thêm mới',
                icon: 'BellIcon',
                variant: 'success',
                text: `${data.data.message}.`,
              },
            })
            this.actionClearData()
            this.$bvModal.hide('modal-them-tai-lieu')
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Thêm mới',
              icon: 'BellIcon',
              variant: 'success',
              text: `${err}.`,
            },
          })
        })
    },
  },
}
</script>
<style scoped></style>
