<template>
  <div>
    <BaseBreadCrumb :active-item="MENU_ROUTE_NAME" />
    <QuanTracComponent />
  </div>
</template>

<script>
/* eslint-disable */

import BaseBreadCrumb from '@/components/common/BaseBreadCrumb'
import QuanTracComponent from '@/components/pages/cctv/QuanTrac.vue'
import { MENU_ROUTE_NAME } from '@/constants/constants'
export default {
  name: 'QuanTrac',
  components: {
    BaseBreadCrumb,
    QuanTracComponent,
  },
  data() {
    return {
      MENU_ROUTE_NAME: MENU_ROUTE_NAME.CCTV.QUAN_TRAC,
    }
  },
  created() {
    this.$store.dispatch('common/setPageTitle', MENU_ROUTE_NAME.CCTV.QUAN_TRAC)
  },
  mounted() {},
}
</script>

<style scoped lang="scss"></style>
