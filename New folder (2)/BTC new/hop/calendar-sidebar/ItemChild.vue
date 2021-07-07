<template>
  <div
    role="button"
    class="event-sidebarleft align-items-center w-100 pl-2"
  >
    <div
      class="d-flex flex-row align-items-center pl-1 pb-1 w-100"
      :class="{ active: isActiveLeftSideBarHop === dataMenu.id }"
      @click="
        actionGetAndCountDonVI(dataMenu.id)
        $store.dispatch('hop/actionIsActiveLeftSideBarHop', dataMenu.id)
        isActiveShow = !isActiveShow
      "
    >
      <div class="w-10">
        <svg
          v-svg
          symbol="icon-layer"
          size="12 12"
        />
      </div>
      <span class="ml-1">{{ dataMenu.tenDonVi }}</span>

      <b-badge
        pill
        class="ml-auto d-flex justify-content-center align-items-center"
      >
        <span>{{ dataMenu.count }}</span>
      </b-badge>
    </div>
    <div
      v-if="dataDonVi.length > 0 && isActiveShow"
      class="d-flex flex-column"
    >
      <ItemChild
        v-for="item in dataDonVi"
        :key="item.tenDonVi"
        :class="{ active: isActiveLeftSideBarHop === item.id }"
        :data-menu="item"
        action-get-and-count-don-v-i-item-id-
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { listAndCountDonVi } from '@/api/hop/indexNew'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default({
   name: "ItemChild",
   data(){
       return{
           isActiveShow: false,
           paramPayload: {
                CanBoId: '',
                Loai: -1,
                PageIndex: 1,
                PageSize: 15,
                orderBy: 'ThoiGian',
                orderType: false,
                DateStart: moment()
                .subtract(0, 'months')
                .startOf('month')
                .format('YYYY-MM-DD'),
                DateTo: moment()
                .subtract(0, 'months')
                .endOf('month')
                .format('YYYY-MM-DD'),
            },
           dataDonVi: [],
           payload: {
               DonViId: null,
           }
       }
   },
   props: {
       dataMenu: {
           type: Object,
       }
   },
   computed: {
       ...mapGetters({
            isActiveLeftSideBarHop: 'hop/isActiveLeftSideBarHop',
        }),
   },
   methods: {
       actionGetAndCountDonVI(val){

           this.paramPayload.CanBoId = null
           this.paramPayload.Loai = 1
           this.paramPayload.DonViId = val

           this.$store.dispatch('hop/getListEvents', this.paramPayload)

           this.payload.DonViId = val

           listAndCountDonVi(this.payload)
           .then(data => {
               this.dataDonVi = data.data
           })
           .catch(err => {
               console.log(err);
           })
       }
   },
})
</script>
<style scoped>

</style>