<template>
  <div class="box-product-meetings flex-column position-static">
    <div
      v-if="!ListMeetingSECTION.length > 0"
      class="d-flex justify-content-center align-items-center pb-5 position-static box-contents-product-meetings"
    >
      <span>Không có chương trình họp</span>
    </div>
    <div
      v-else
      class="box-contents-product-meetings d-flex flex-column pb-5 position-static"
    >
      <ChuongTrinhHopChild
        v-for="(item, idx) in ListMeetingSECTION"
        :key="idx"
        :item="item"
        @PostIdDeteleSection="getIdSection"
        @PostActionEdit="getActionEdit"
      />
    </div>
    <div class="w-100 d-flex justify-content-center pb-1 position-absolute pos-bottom-1 bg-t-light">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="actionThemChuongTrinh"
      >
        <feather-icon
          icon="FilePlusIcon"
          class="mr-50"
        />
        Thêm chương trình họp
      </b-button>
    </div>
    <actionThemChuongTrinh />
    <ConfirmDeleteModal
      :message="'Bạn có muốn xóa chương trình họp này'"
      @isCheckConfirmDelete="actonConfirmDelete"
    />
  </div>
</template>
<script >
/* eslint-disable */
import Ripple from 'vue-ripple-directive'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { apiDeleteSection } from '@/api/hop/indexNew'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import { HTML_BE } from '@/configs/config'

export default ({
  name: 'ChuongTrinhHop',
  directives: {
    Ripple,
  },
  components: {
    actionThemChuongTrinh: () => import('./actionHop/actionThemChuongTrinh.vue'),
    actionBinhLuan: () => import('./actionHop/actionBinhLuan/actionBinhLuan.vue'),
    ChuongTrinhHopChild: () => import('./ChuongTrinhHopChild.vue'),
    ConfirmDeleteModal: () => import('@/@core/components-custom/modal-Confirm-Delete/ConfirmDeleteModal.vue')
  },
  data(){
    return{
      isDelete: false,
      idSection: '',
      arrCheckShowCTH: [],
    }
  },
  computed: {
    ...mapGetters({
      DetailMeeting: 'hop/DetailMeeting',
      ListMeetingSECTION: 'hop/ListMeetingSECTION',
    }),
  },
  created() {
    this.reloadDataSection()
  },
  mounted(){
    this.setShowCTH()
  },
  methods: {
    reloadDataSection(){
      this.$store.dispatch('hop/getDetailMeetingSection', { id: this.DetailMeeting.id })
    },

    getActionEdit(val_dataEdit){
      this.$store.dispatch('hop/actionEditSection', val_dataEdit)
      this.$bvModal.show('modal-them-chuong-trinh-hop')
    },

    actonConfirmDelete(val) {

      if(!val){
        return
      }

      apiDeleteSection({ id: this.idSection})
      .then(data => {
        if(data.succeeded){
          this.reloadDataSection()
          this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Thêm mới',
                icon: 'BellIcon',
                variant: 'success',
                text: `Xóa chương trình họp thành công.`,
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
              variant: 'success',
              text: `${err}.`,
            },
          })
      })
    },
    getIdSection(valId_Section) {
      this.$bvModal.show('template-confirm-delete')

      this.idSection = valId_Section

    },
    downloadFIle(filename) {
      // window.open(`${HTML_BE}FileUpload/LichHop_PhienHop/${filename}`)
      window.open(filename)
    },
    actionThemChuongTrinh() {
      this.$bvModal.show('modal-them-chuong-trinh-hop')
    },
    actionThoiGian(start, end) {
      if (!end) {
        end = start
      }

      const tmp_start = this.formatDate(start).split(' ')
      const tmp_end = this.formatDate(end).split(' ')

      if (tmp_start[0] == tmp_end[0]) { // nếu cùng ngày
        return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[1]}`
      }
      return `${tmp_start[0]} ${tmp_start[1]} - ${tmp_end[0]} ${tmp_end[1]}`
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY HH:mm')
      }
      return ''
    },
    setShowCTH(){
      for(var idx in this.ListMeetingSECTION){
        console.log("ListMeetingSECTION: ", idx);
        this.arrCheckShowCTH.push(false)
      }
      console.log("arrCheckShowCTH: ", this.arrCheckShowCTH)
    },
    actionShowCTH(idx){
      this.arrCheckShowCTH[idx] = !this.arrCheckShowCTH[idx]
      console.log(idx, this.arrCheckShowCTH[idx])
    },
    returnResultCheck(idx){
      return this.arrCheckShowCTH[idx]
    },
  },
})

</script>
<style scoped lang="scss">
.box-product-meetings{
    display: flex;
    align-content: center;
    justify-content: start;
    padding: 1rem;


    .box-contents-product-meetings{
        width: 100%;
        height: 43vh;
        overflow-y: auto;


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
</style>
