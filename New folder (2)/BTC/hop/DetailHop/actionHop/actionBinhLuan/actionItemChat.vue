<template>
  <div class="d-flex flex-column justify-content-start">
    <div
      :id="idEL"
      class="d-flex flex-column position-relative mt-1 pr-5 p-1 text-left box-comment-y-kien"
    >
      <div>
        <b-avatar
          badge
          badge-variant="success"
          badge-offset="-0.5em"
          class="mr-1"
        />
        <b>{{ data.canBoHoTen }}</b>
      </div>
      <div class="mt-1 ml-1 d-flex flex-column">
        <div>{{ data.content }}</div>
        <div
          v-for="(file_item, idx) in data.files"
          :key="idx"
          class="d-flex flex-column justify-content-start"
        >
          <div
            role="button"
            class="download-link"
            @click="downloadFile(file_item.path)"
          >
            {{ file_item.name }}
          </div>
        </div>
      </div>
      <div class="box-statistic-comment position-absolute">
        <!-- <b-badge variant="light-warning">
                    15
                </b-badge> -->
      </div>
    </div>
    <div class="d-flex flex-row ml-1">
      <!-- <div class="pr-1">Like</div> -->
      <div class="pr-1">
        {{ formatDateAgo(data.createdAt) }}
      </div>
      <div
        role="button"
        class="pr-1"
        @click="actionShowRep(data.id)"
      >
        Trả lời
      </div>
    </div>
    <div
      v-if="isActiveMes == data.id"
      class="pr-1 ml-1 d-flex"
    >
      <b-form-input
        ref="inputRep"
        v-model="dataInsert.content"
        placeholder="Nhập bình luận"
        @keyup.enter="actionRepQuestion"
      />
      <b-button
        v-ripple.400="'rgba(40, 199, 111, 0.15)'"
        variant="flat-success"
        class="btn-icon"
        @click="actionRepQuestion"
      >
        <feather-icon icon="SendIcon" />
      </b-button>
    </div>
    <div
      v-if="data.questionAnswer && data.questionAnswer.length"
      class="pl-2"
    >
      <div
        v-if="isActiveHideMes"
        role="button"
        class="mt-1"
      >
        <div
          class="d-flex align-items-center"
          @click="
            isActiveHideMes = false
            $store.dispatch('hop/actionIsActiveMes', '')
          "
        >
          <feather-icon
            icon="CornerDownRightIcon"
            class="mr-50"
          />
          <span>{{ data.questionAnswer.length }} phản hồi</span>
        </div>
      </div>
      <actionItemChat
        v-for="(item, idx) in data.questionAnswer"
        v-else
        :key="idx"
        :data="item"
        :id-cap2="item.questionId"
        :id-e-l="`box_comment_child_${item.questionId}_${idx}`"
        @actionShowListMes="catchShowListMes"
      />
      <div
        v-if="!isActiveHideMes"
        role="button"
        class="mt-1"
      >
        <div
          class="d-flex align-items-center"
          @click="catchActionHideListMes"
        >
          <feather-icon
            icon="CornerLeftUpIcon"
            class="mr-50"
          />
          <span>Ẩn bớt</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { USER_DATA } from '@/configs/config'
import { createResponsiveMeetingSection } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'moment/locale/vi'
// without this line it didn't work
moment.locale('vi')

export default {
  name: 'ActionItemChat',
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    idCap2: {
      type: String,
      default: null,
    },
    idEL: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dataInsert: {
        meetingScheduleId: '',
        meetingSectionId: '',
        questionId: '',
        canBoId: '',
        content: '',
      },
      text: '',
      isActiveHideMes: true,
    }
  },
  computed: {
    ...mapGetters({
      isActiveMes: 'hop/isActiveMes',
      DetailMeeting: 'hop/DetailMeeting',
    }),
  },
  created() {
    this.getCanBoDangKyId()
  },
  updated() {
    if (this.data.questionAnswer) {
      const element = document.getElementById(
        `box_comment_child_${this.idCap2}_${this.data.questionAnswer.length
          - 1}`,
      )
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  },
  methods: {
    downloadFile(link) {
      window.open(link)
    },
    actionShowRep(val) {
      this.$store.dispatch('hop/actionIsActiveMes', val)
      this.$emit('actionShowListMes', false)
      this.isActiveHideMes = false
      this.$nextTick(() => this.$refs.inputRep.focus())
    },
    formatDateAgo(val) {
      return moment(val).fromNow()
    },
    catchActionHideListMes() {
      if (!this.isActiveHideMes) {
        this.isActiveHideMes = true
        this.$emit('actionShowListMes', true)
        this.$store.dispatch('hop/actionIsActiveMes', '')
      } else {
        this.$store.dispatch('hop/actionIsActiveMes', '')
        this.isActiveHideMes = true
        this.$emit('actionShowListMes', true)
      }
    },
    catchShowListMes(val) {
      this.isActiveHideMes = val
    },
    actionRepQuestion() {
      this.dataInsert.meetingScheduleId = this.DetailMeeting.id
      this.dataInsert.meetingSectionId = this.data.meetingSectionId
      this.dataInsert.questionId = this.idCap2
      if (!this.dataInsert.content) {
        return
      }
      createResponsiveMeetingSection(this.dataInsert)
        .then(data => {
          console.log(data)
          if (data.data.succeeded) {
            this.actionThongbao('Thành công', 'success')
            this.$store.dispatch('hop/getDetailMeetingSection', {
              id: this.DetailMeeting.id,
            })
          } else {
            this.actionThongbao('Thất bại', 'danger')
          }
        })
        .catch(err => {
          this.actionThongbao(err, 'danger')
        })
      this.dataInsert.content = ''
      this.clearCacheInsert()
    },
    getCanBoDangKyId() {
      const info = JSON.parse(localStorage.getItem(USER_DATA))
      this.dataInsert.canBoId = info.id
    },
    clearCacheInsert() {
      this.dataInsert = {}
      this.getCanBoDangKyId()
    },
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
  },
}
</script>
<style scoped></style>
