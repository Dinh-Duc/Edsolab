<template>
  <div>
    <b-modal
      id="modal-event-detail"
      centered
      scrollable
      size="md"
      modal-class="modal-calendar"
      :hide-footer="true"
    >
      <div v-if="eventDetail">
        <div class="event-info space-y-12">
          <div class="d-flex flex-wrap items-center">
            <div class="w_35 mr_10 d-flex flex-wrap items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-calendar"
                  size="18 15"
                /><span>Ngày bắt đầu:</span>
              </div>
              <div>{{ eventDetail.start | DayFormat }}</div>
            </div>
            <div class="w_35 mr-20 d-flex flex-wrap items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-calendar"
                  size="18 15"
                /><span>Ngày kết thúc:</span>
              </div>
              <div>{{ eventDetail.end | DayFormat }}</div>
            </div>
          </div>
          <div class="d-flex flex-wrap items-center">
            <div class="w_35 mr_10 d-flex flex-wrap items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-clock"
                  size="18 15"
                /><span>Thời gian bắt đầu:</span>
              </div>
              <div>{{ eventDetail.start | TimeFormat }}</div>
            </div>
            <div class="w_35 mr_20 d-flex flex-wrap items-center">
              <div class="space-x-10 label">
                <svg
                  v-svg
                  symbol="icon-clock"
                  size="18 15"
                /><span>Thời gian kết thúc:</span>
              </div>
              <div>{{ eventDetail.end | TimeFormat }}</div>
            </div>
            <div class="w_45 d-flex flex-wrap items-center space-x-10 mt-1">
              <div class="space-x-10 label w-auto">
                <svg
                  v-svg
                  symbol="icon-point-map"
                  size="18 18"
                /><span>Địa điểm:</span>
              </div>
              <div>
                {{ infoEvent.address ? infoEvent.address : 'Chưa xác định' }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap">
            <div class="space-x-10 label">
              <svg
                v-svg
                symbol="icon-note"
                size="18 15"
              /><span>Nội dung công việc:</span>
            </div>
            <div>
              {{
                eventDetail.extendedProps.description
                  ? eventDetail.extendedProps.description
                  : 'Không có ghi chú'
              }}
            </div>
          </div>
          <div
            v-if="infoEvent.scheduleType !== 'Schedule'"
            class="d-flex flex-wrap"
          >
            <div class="space-x-10 label">
              <svg
                v-svg
                symbol="icon-typehop"
                size="18 15"
              /><span>Hình thức họp:</span>
            </div>
            <div>{{ infoEvent.hopTrucTuyen ? 'Họp trực tuyến' : 'Họp trực tiếp' }}</div>
          </div>
          <div class="d-flex flex-wrap">
            <div class="space-x-10 label">
              <svg
                v-svg
                symbol="icon-user"
                size="18 15"
              /><span>Cán bộ chủ trì:</span>
            </div>
            <div v-if="infoEvent.canBoChuTri">
              {{ infoEvent.canBoChuTri.hoTen ? infoEvent.canBoChuTri.hoTen : '' }}
              -
              {{ infoEvent.canBoChuTri.chucVu ? infoEvent.canBoChuTri.chucVu : '' }}
            </div>
          </div>
          <div
            v-if="
              detail && detail.scheduleCoperatives &&
                detail.scheduleCoperatives.length > 0
            "
            class="list-coperatives mt-2"
          >
            <b-table
              hover
              responsive
              :items="detail.scheduleCoperatives"
              :fields="coperativeRequestfields"
            >
              <template #cell(Stt)="dataStt">
                {{ dataStt.index + 1 }}
              </template>
              <template #cell(action)="row">
                <div
                  class="action-btn cursor-pointer"
                  @click="() => removeUnitCooperation(row.item.userId)"
                >
                  <svg
                    v-svg
                    symbol="icon-closed"
                    size="16 16"
                  />
                </div>
              </template>
            </b-table>
          </div>
        </div>
        <div class="list-status-event mt-2">
          <div
            v-if="
              infoEvent.canBoDangKi.id === userInfo.id && infoEvent.status !== 3 && infoEvent.scheduleType === 'Schedule'
            "
            class="flex items-center space-x-10 justify-end"
          >
            <div
              class="btn btn-success"
              @click="approvedEvent(eventDetail)"
            >
              {{ isApproved ? 'Đã duyệt' : 'Duyệt' }}
            </div>
            <div
              class="btn btn-danger"
              @click="rejectedEvent(eventDetail)"
            >
              Không duyệt
            </div>
          </div>
          <div
            v-if="infoEvent.scheduleType !== 'Schedule'"
            class="flex items-center space-x-10 justify-center"
          >
            <div
              class="btn btn-success"
              @click="$router.push('apps/hop?id='+ eventDetail.id)"
            >
              Xem chi tiết
            </div>
          </div>
        </div>
        <div
          v-if="infoEvent.scheduleCoperatives.length > 0 && isInvite"
          class="mt-2"
        >
          <div class="flex items-center space-x-10 justify-end">
            <div class="btn btn-success">
              Tham gia
            </div>
            <div class="btn btn-danger">
              Không tham gia
            </div>
            <div class="btn btn-warning">
              Có thể tham gia
            </div>
          </div>
        </div>
      </div>
      <template #modal-header>
        <div class="flex items-center w-full">
          <div
            v-if="eventDetail.title"
            class="event-title font-bold mr-auto"
          >
            {{ eventDetail.title }}
          </div>
          <div class="actions-top-event flex items-center">
            <div
              id="note-calendar"
              class="actions-top-event__item flex items-center justify-center"
              @click="openNote()"
            >
              <svg
                v-svg
                symbol="icon-note-1"
                size="18 18"
              />
              <b-tooltip
                triggers="hover"
                :target="'note-calendar'"
                :title="'Ghi chú'"
                :delay="{ show: 500, hide: 50 }"
              />
            </div>
            <div
              v-if="isOwner"
              id="send-mail"
              class="actions-top-event__item flex items-center justify-center mr-10"
              @click="openSendMail()"
            >
              <svg
                v-svg
                symbol="icon-message"
                size="18 18"
              />
              <b-tooltip
                triggers="hover"
                :target="'send-mail'"
                :title="'Gửi mail cho khách mời'"
                :delay="{ show: 500, hide: 50 }"
              />
            </div>
            <div
              v-if="isOwner && infoEvent.status === 3"
              id="revoked-calendar"
              class="actions-top-event__item flex items-center justify-center mr-10"
              @click="revokedEvent(eventDetail)"
            >
              <feather-icon
                icon="CornerUpLeftIcon"
                size="18"
              />
              <b-tooltip
                triggers="hover"
                :target="'revoked-calendar'"
                :title="'Thu hồi'"
                :delay="{ show: 500, hide: 50 }"
              />
            </div>
            <div
              v-if="isOwner"
              id="delete-calendar"
              class="actions-top-event__item flex items-center justify-center mr-10"
              @click="deleteEvent(eventDetail)"
            >
              <svg
                v-svg
                symbol="icon-delete"
                size="18 18"
              />
              <b-tooltip
                triggers="hover"
                :target="'delete-calendar'"
                :title="'Xóa lịch'"
                :delay="{ show: 500, hide: 50 }"
              />
            </div>
            <div
              v-if="allowEdit"
              id="edit-calendar"
              class="actions-top-event__item flex items-center justify-center mr-10"
              @click="editEvent(eventDetail)"
            >
              <feather-icon
                icon="EditIcon"
                size="18"
              />
              <b-tooltip
                triggers="hover"
                :target="'edit-calendar'"
                :title="'Sửa lịch'"
                :delay="{ show: 500, hide: 50 }"
              />
            </div>
            <button
              id="closed-calendar"
              type="button"
              aria-label="Close"
              class="close"
              @click="$bvModal.hide('modal-event-detail')"
            >
              <svg
                v-svg
                symbol="icon-closed"
                size="16 16"
              />
              <b-tooltip
                triggers="hover"
                :target="'closed-calendar'"
                :title="'Đóng'"
                :delay="{ show: 500, hide: 50 }"
              />
            </button>
          </div>
        </div>
      </template>
    </b-modal>

    <b-modal
      id="event-note-modal"
      centered
      scrollable
      size="md"
      modal-class="modal-addnote-event"
    >
      <b-form-group>
        <b-form-textarea
          placeholder="Nội dung..."
          rows="3"
        />
      </b-form-group>
      <template #modal-header>
        Ghi chú
      </template>
      <template #modal-footer>
        <div class="flex items-center space-x-18">
          <div
            class="cursor-pointer btn btn-danger flex items-center"
            @click="$bvModal.hide('event-note-modal')"
          >
            Hủy
          </div>
          <div class="cursor-pointer btn btn-success flex items-center">
            Gửi
          </div>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="event-sendmail-modal"
      centered
      scrollable
      size="md"
      modal-class="modal-sendmail-event"
    >
      <div>
        <b-form-group>
          <b-form-checkbox>
            Người tham gia
          </b-form-checkbox>
          <b-form-checkbox>
            Người không tham gia
          </b-form-checkbox>
          <b-form-checkbox>
            Người chưa phản hồi
          </b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <b-form-tags
            v-model="participants"
            no-outer-focus
            placeholder="Thêm người tham dự..."
          >
            <template
              v-slot="{
                tags,
                inputAttrs,
                inputHandlers,
                tagVariant,
                removeTag,
              }"
            >
              <div
                v-if="tags && tags.length > 0"
                class="d-inline-block"
              >
                <b-form-tag
                  v-for="tag in tags"
                  :key="tag"
                  :title="tag"
                  :variant="tagVariant"
                  @remove="removeTag(tag)"
                >
                  <span class="space-x-5">
                    <svg
                      v-svg
                      symbol="icon-person"
                      size="20 20"
                    />
                    <span>{{ tag }}</span>
                  </span>
                </b-form-tag>
              </div>
              <b-input-group>
                <b-form-input
                  v-bind="inputAttrs"
                  class="form-control"
                  v-on="inputHandlers"
                />
              </b-input-group>
            </template>
          </b-form-tags>
        </b-form-group>
        <b-form-group label="Tiêu đề tin nhắn">
          <b-form-input placeholder="Tiêu đề tin nhắn..." />
        </b-form-group>
        <b-form-group label="Tin nhắn">
          <b-form-textarea
            placeholder="Nội dung..."
            rows="3"
          />
        </b-form-group>
      </div>
      <template #modal-header>
        Nhắn tin
      </template>
      <template #modal-footer>
        <div class="flex items-center space-x-18">
          <div
            class="cursor-pointer btn btn-danger flex items-center"
            @click="$bvModal.hide('event-sendmail-modal')"
          >
            Hủy
          </div>
          <div
            class="cursor-pointer btn btn-success flex items-center"
            @click="$bvModal.hide('event-sendmail-modal')"
          >
            Gửi
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import {
  deleteSchedules,
  revokedSchedules,
  rejectedSchedules,
  approvedSchedules,
  detailSchedules,
} from '@/api/calendar'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailEvent',
  filters: {
    DayFormat(value) {
      if (!value) return 'Chưa xác định'
      return moment(value).format('DD/MM/YYYY')
    },
    TimeFormat(value) {
      if (!value) return 'Chưa xác định'
      return moment(value).format('HH:mm')
    },
  },
  props: {
    eventDetail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      participants: [],
      coperativeRequestfields: [
        {
          key: 'Stt',
          label: 'STT',
          class: 'table-stt',
        },
        {
          key: 'tenDonVi',
          label: 'ĐƠN VỊ PHỐI HỢP',
        },
        {
          key: 'userName',
          label: 'NGƯỜI PHỐI HỢP',
        },
        {
          key: 'taskContent',
          label: 'NỘI DUNG CHI TIẾT CÔNG VIỆC',
        },
      ],
      isApproved: false,
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
      detail: 'lichlamviec/CalendarDetail',
    }),
    infoEvent() {
      return this.eventDetail.extendedProps
    },
    isInvite() {
      const idCurrentUser = this.userInfo.id
      if (
        this.infoEvent.scheduleCoperatives.some(e => e.userId === idCurrentUser)
      ) {
        return true
      }
      return false
    },
    isOwner() {
      const idCurrentUser = this.userInfo.id
      if (this.infoEvent.createBy.id === idCurrentUser) {
        return true
      }
      return false
    },
    allowEdit() {
      const idCurrentUser = this.userInfo.id
      // const statusAllow = [1, 2, 3, 4, 5] // nháp, gửi duyệt, từ chối duyệt, thu hồi
      if (
        this.infoEvent.createBy.id === idCurrentUser // người tạo lịch
        && this.infoEvent.status !== 6
        && moment(this.infoEvent.start).valueOf() - moment().valueOf()
          > 60 * 60 * 1000 // sửa lịch trước khi bắt đầu 1 hour
      ) {
        return true
      }
      return false
    },
  },
  methods: {
    openNote() {
      this.$bvModal.show('event-note-modal')
    },
    openSendMail() {
      this.$bvModal.show('event-sendmail-modal')
    },
    revokedEvent(event) {
      this.$bvModal
        .msgBoxConfirm('Bạn có chắc chắn muốn thu hồi lịch làm việc này?', {
          size: 'md',
          okVariant: 'primary',
          okTitle: 'Đồng ý',
          cancelTitle: 'Không',
          centered: true,
          footerClass: 'footer-confirm',
        })
        .then(value => {
          if (value) {
            revokedSchedules(event.id).then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  variant: 'success',
                  icon: 'BellIcon',
                  text: 'Đã thu hồi thành công',
                },
              })
              this.$store.dispatch('lichlamviec/getListEvents', {
                PageIndex: 1,
                PageSize: 100,
                Status: '1,2,3,4,5',
              })
            })
          }
        })
        .catch()
    },
    deleteEvent(event) {
      this.$bvModal
        .msgBoxConfirm('Bạn có chắc chắn muốn xóa lịch làm việc này?', {
          size: 'md',
          okVariant: 'primary',
          okTitle: 'Đồng ý',
          cancelTitle: 'Không',
          centered: true,
          footerClass: 'footer-confirm',
        })
        .then(value => {
          if (value) {
            if (event.id === 3) {
              revokedSchedules(event.id).then(() => {
                deleteSchedules(event.id)
                  .then(() => {
                    this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        variant: 'success',
                        icon: 'BellIcon',
                        text: 'Đã xóa thành công',
                      },
                    })
                    this.$store.dispatch('lichlamviec/getListEvents', {
                      PageIndex: 1,
                      PageSize: 100,
                      Status: '1,2,3,4,5',
                    })
                    this.$bvModal.hide('modal-event-detail')
                  })
                  .catch(() => {
                    this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        variant: 'warning',
                        icon: 'BellIcon',
                        text: 'Bạn không thể xóa lịch này',
                      },
                    })
                  })
              })
            } else {
              deleteSchedules(event.id)
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      variant: 'success',
                      icon: 'BellIcon',
                      text: 'Đã xóa thành công',
                    },
                  })
                  this.$store.dispatch('lichlamviec/getListEvents', {
                    PageIndex: 1,
                    PageSize: 100,
                    Status: '1,2,3,4,5',
                  })
                  this.$bvModal.hide('modal-event-detail')
                })
                .catch(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      variant: 'warning',
                      icon: 'BellIcon',
                      text: 'Bạn không thể xóa lịch này',
                    },
                  })
                })
            }
          }
        })
        .catch()
    },
    approvedEvent(event) {
      if (!this.isApproved) {
        approvedSchedules(event.id).then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              variant: 'success',
              icon: 'BellIcon',
              text: 'Đã duyệt thành công',
            },
          })
          this.isApproved = true
          this.$store.dispatch('lichlamviec/getListEvents', {
            PageIndex: 1,
            PageSize: 100,
            Status: '1,2,3,4,5',
          })
        })
      }
    },
    rejectedEvent(event) {
      rejectedSchedules(event.id).then(() => {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            variant: 'success',
            icon: 'BellIcon',
            text: 'Đã không duyệt thành công',
          },
        })
        this.$store.dispatch('lichlamviec/getListEvents', {
          PageIndex: 1,
          PageSize: 100,
          Status: '1,2,3,4,5',
        })
      })
    },
    editEvent(event) {
      detailSchedules(event.id).then(res => {
        const model = res.data.data
        model.createdByUserName = model.createBy.userName.replace(/\s/g, '')
        model.createdForUserName = model.canBoDangKi.userName.replace(/\s/g, '')
        model.scheduleCoperativeRequest = model.scheduleCoperatives
        model.scheduleReminderRequest = model.scheduleReminder
        model.strFiles = ''
        model.dateTo = moment(model.dateTo).format('YYYY-MM-DD')
        this.$emit('eventedit', model)
        this.$emit('isedit', true)
        this.$emit('datefrom', new Date(model.dateFrom))
        this.$bvModal.hide('modal-event-detail')
        this.$bvModal.show('modal-event-add')
      })
    },
  },
}
</script>
<style lang="scss">
.dark-layout {
  #modal-event-detail .list-coperatives {
    border: 1px solid rgba(999, 999, 999, 0.3);
  }
}
</style>
