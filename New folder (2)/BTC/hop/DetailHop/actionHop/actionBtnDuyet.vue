<template>
  <b-modal
    id="modal-duyet-phong"
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Duyệt phòng"
  >
    <div v-if="!isLoadingDuyet" />
    <div class="d-flex flex-column">
      <div class="d-flex flex-column">
        <model-select
          v-if="DetailMeeting.statusName !== 'Đã duyệt'"
          v-model="item_room"
          :options="ListMeetingRoom"
          placeholder="Chọn phòng họp"
        />
        <div class="d-flex flex-column mt-1">
          <div>Ghi Chú:</div>
          <b-form-textarea
            v-model="GhiChu"
            placeholder="Nhập nội dung thu hồi hoặc từ chối"
            rows="3"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div
          v-for="(item, idx) in btnActionDuyet"
          :key="idx"
          class="p-1"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            :variant="item.data.variant"
            :class="item.data.class"
            @click="action_Click_Duyet(item.data.name)"
          >
            <feather-icon
              v-if="item.data.type_icon == 'feather'"
              :icon="item.data.icon"
              class="mr-50"
            />
            <img
              v-else
              :src="item.data.icon"
              alt=""
            >
            {{ item.data.name }}
          </b-button>
        </div>
      </div>
    </div>
  </b-modal>

</template>
<script>
/* eslint-disable */
import Ripple from 'vue-ripple-directive'
import { approvedMeetingRoom, recallMeetingRoom } from '@/api/hop'
import { USER_DATA } from '@/configs/config.js'
import { mapGetters } from 'vuex'
import { ModelSelect } from 'vue-search-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default ({
  name: 'ActionBtnDuyet',
  directives: {
    Ripple,
  },
  components: {
    ModelSelect,
  },
  props: {
    btnActionDuyet: {
      type: Array,
    },
  },
  data() {
    return {
      isLoadingDuyet: true,
      canBoDangKyId: null,
      GhiChu: '',
      item_room: {
        value: {},
        text: '',
      },
      listErr: {
        err_room: '',
      },
      payload_approve: {
        ghiChu: '',
        canBoId: null,
        lichHopId: '',
        phongHopId: '',
        trangThaiDuyet: null, // 0: nháp, 1: approve duyệt phòng, 3: thu hồi
      }
    }
  },
  computed: {
    ...mapGetters({
      ListMeetingRoom: 'hop/ListMeetingRoom',
    }),
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
    }),
  },
  created() {
    this.$store.dispatch('hop/getListMeetingRoom', {
      startDate: this.DetailMeeting.dateTimeFrom,
      endDate: this.DetailMeeting.dateTimeTo,
    })
    this.isLoadingDuyet = false

    this.getCanBoDangKyId()
  },
  mounted() {
  },
  methods: {
    /* eslint-disable */
    action_Click_Duyet(name) {
      switch (name) {
        case 'Hủy gửi duyệt':
          this.actionHuyGuiDuyet()
          break
        case 'Thu hồi':
          this.actionThuHoi()
          break
        case 'Chấp nhận duyệt':
          this.actionChapNhanDuyet()
          break
        case 'Từ chối duyệt':
          this.actionTuChoi()
          break
        default:
      }
    },
    actionChapNhanDuyet() {
      this.actionApprovedMeeting()
    },
    actionApprovedMeeting() {
      this.payload_approve.ghiChu = this.GhiChu
      this.payload_approve.canBoId = this.canBoDangKyId
      this.payload_approve.lichHopId = this.DetailMeeting.id
      this.payload_approve.phongHopId = this.item_room.value.Id,
      this.payload_approve.trangThaiDuyet = 2

      approvedMeetingRoom(this.payload_approve)
        .then(data => {
          this.$emit('is-action-duyet', true)
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Đã duyệt phòng thành công',
              icon: 'BellIcon',
              variant: 'success',
              text: `${data.data.message}`,
            },
          })
          this.$bvModal.hide('modal-duyet-phong')
        })
        .catch(err => { console.log(err) })
    },
    actionThuHoi() {
      this.payload_approve.ghiChu = this.GhiChu
      this.payload_approve.canBoId = this.canBoDangKyId
      this.payload_approve.lichHopId = this.DetailMeeting.id
      this.payload_approve.phongHopId = this.item_room.value.Id,
      this.payload_approve.trangThaiDuyet = 5//thu hồi

      recallMeetingRoom(this.payload_approve)
        .then(data => {
          this.$emit('is-action-duyet', true)
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Đã thu hồi thành công',
              icon: 'BellIcon',
              variant: 'success',
              text: `${data.data.message}`,
            },
          })
          this.$bvModal.hide('modal-duyet-phong')
        })
        .catch(err => { console.log(err) })
    },
    actionHuyGuiDuyet() {
      this.payload_approve.ghiChu = this.GhiChu
      this.payload_approve.canBoId = this.canBoDangKyId
      this.payload_approve.lichHopId = this.DetailMeeting.id
      this.payload_approve.phongHopId = this.item_room.value.Id,
      this.payload_approve.trangThaiDuyet = 0//thu hồi

      recallMeetingRoom(this.payload_approve)
        .then(data => {
          console.log('actionHuyGuiDuyet', data)
          this.$emit('is-action-duyet', true)
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Đã hủy gửi duyệt thành công',
              icon: 'BellIcon',
              variant: 'success',
              text: `${data.data.message}`,
            },
          })
          this.$bvModal.hide('modal-duyet-phong')
        })
        .catch(err => { console.log(err) })
    },
    actionTuChoi() {
      this.payload_approve.ghiChu = this.GhiChu
      this.payload_approve.canBoId = this.canBoDangKyId
      this.payload_approve.lichHopId = this.DetailMeeting.id
      this.payload_approve.phongHopId = this.item_room.value.Id,
      this.payload_approve.trangThaiDuyet = 3// Từ chối duyệt

      approvedMeetingRoom(this.payload_approve)
        .then(data => {
          this.$emit('is-action-duyet', true)
          this.$toast({
            component: ToastificationContent,
            position: 'top-center',
            props: {
              title: 'Đã từ chối thành công',
              icon: 'BellIcon',
              variant: 'success',
              text: `${data.data.message}`,
            },
          })
          this.$bvModal.hide('modal-duyet-phong')
        })
        .catch(err => { console.log(err) })
    },
    getCanBoDangKyId(){
      const info = JSON.parse(localStorage.getItem(USER_DATA))
      this.canBoDangKyId = info.id
    },

  },
})
</script>
<style scoped>

</style>
