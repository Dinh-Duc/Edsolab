<template>
  <b-modal
    id="modal-cho-y-kien"
    cancel-variant="outline-secondary"
    centered
    no-close-on-backdrop
    size="lg"
    :hide-footer="true"
    title="Thêm ý kiến"
  >
    <div v-if="!DetailMeeting.canBoChuTriInfo" />
    <div
      v-else
      class="d-flex flex-column justify-content-center"
    >
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          phiên họp:
        </div>
        <div class="col-md-9">
          <v-select
            ref="selectTimeFrom"
            v-model="dataInsert.meetingSectionId"
            :clearable="false"
            label="tieuDe"
            :options="ListMeetingSECTION"
            :reduce="option => option.id"
            class="w-100"
            @search:focus="focusTimeFrom"
          />
        </div>
      </div>
      <div class="pb-1 w-100 d-flex flex-row justify-content-center align-items-center">
        <div class="pr-1 col-md-3">
          Nội dung câu hỏi:
        </div>
        <div class="col-md-9 d-flex align-items-center">
          <b-form-textarea
            v-model="dataInsert.content"
            placeholder="Nhập nội dung câu hỏi"
            rows="3"
          />
        </div>
      </div>

      <div class="d-flex flex-column justify-content-center">
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
      </div>
      <div class="d-flex flex-row justify-content-start align-items-center pl-1 pt-1">
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
          @click="actionInsertQuestion"
        >
          <feather-icon
            icon="PlusCircleIcon"
            class="mr-50"
          />
          Thêm
        </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import { createQuestionMeetingSection, createMeetingFileDoc } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default ({
  name: 'ActionChoYKien',
  directives: {
    Ripple,
  },
  components: {
    vSelect,
  },
  data() {
    return {
      dataInsert: {
      },
      dataFiles: [],
      dataInsertFiles: {
        entityId: '',
        entityType: 2,
        entityName: 'LichHop_PhienHop',
      },
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
      ListMeetingSECTION: 'hop/ListMeetingSECTION',
    }),
  },
  created() {
    this.$store.dispatch('hop/getDetailMeetingSection', { id: this.DetailMeeting.id })
  },
  methods: {
    actionThongbao(mes, status) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-center',
        props: {
          title: 'Thêm mới ý kiến ',
          icon: 'BellIcon',
          variant: status,
          text: mes,
        },
      })
    },
    actionInsertQuestion() {
      this.dataInsert.meetingScheduleId = this.DetailMeeting.id

      const form_data = new FormData()

      for (const item in this.dataFiles) {
        form_data.append('files', this.dataFiles[item])
      }

      createQuestionMeetingSection(this.dataInsert)
        .then(data => {
          if (data.data.succeeded) {
          // Kèm theo files
            if (this.dataFiles.length > 0) {
              this.dataInsertFiles.entityId = data.data.id
              createMeetingFileDoc(this.dataInsertFiles, form_data)
                .then(data => {
                  if (data.data.succeeded) {
                    this.actionThongbao('Thêm ý kiến thành công', 'success')
                    this.$bvModal.hide('modal-cho-y-kien')
                  } else {
                    this.actionThongbao('Thêm thất bại', 'danger')
                  }
                })
                .catch(err => {
                  this.actionThongbao(err, 'danger')
                })
            } else {
              this.actionThongbao('Thêm ý kiến thành công', 'success')
              this.$bvModal.hide('modal-cho-y-kien')
            }
            this.$store.dispatch('hop/getDetailMeetingSection', { id: this.DetailMeeting.id })
          }
        })
        .catch(err => {
          this.actionThongbao(err, 'danger')
        })
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
