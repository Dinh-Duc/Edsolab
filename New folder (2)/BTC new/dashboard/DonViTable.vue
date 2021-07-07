<template>
  <b-card
    v-if="tableData"
    no-body
    class="card-company-table"
    @click="$router.push('/lich-lam-viec')"
  >
    <b-table
      :items="tableData"
      responsive
      :fields="fields"
      class="mb-0"
    >
      <!-- company -->
      <template
        #cell(company)="data"
        class="column-1-dash"
      >
        <div class="d-flex align-items-center">
          <b-avatar
            rounded
            size="32"
            variant="light-company"
          >
            <b-img
              :src="data.item.avatarImg"
              alt="avatar img"
            /></b-avatar>
          <div style="padding-left: 30px">
            <div class="font-weight-bolder">
              {{ data.item.title }}
            </div>
            <div class="font-small-2 text-muted">
              {{ data.item.subtitle }}
            </div>
          </div>
        </div>
      </template>

      <!-- views -->
      <template #cell(views)="data">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder mb-25">{{
            data.item.viewTitle
          }}</span>
        </div>
      </template>

      <!-- category -->
      <template
        #cell(category)="data"
        class="column-2-dash"
      >
        <span class="total-people-dash2">+{{ data.item.totalPeople }}</span>

        <b-avatar-group size="35px" style="float: right">
          <b-avatar
            v-for="(avatar, index) in data.item.avatarTitle"
            :key="index"
            :src="avatar"
            class="pull-up"
          />
        </b-avatar-group>
        <!-- <div
          class="d-flex align-items-center"
          style="float: right"
        >
          <div
            v-for="imgDash in data.item.avatarTitle"
            :key="imgDash"
            class="img-table-dash2"
          >
            <b-img :src="imgDash" />
          </div>
        </div> -->
      </template>

      <!-- revenue -->
      <!-- <template #cell(revenue)="data">
        {{ data.item.revenue }}
      </template> -->

      <!-- sales -->
      <!--  <template #cell(sales)="data">
        <div class="d-flex align-items-center">
          <span class="font-weight-bolder mr-1">{{ data.item.sales+'%' }}</span>
          <feather-icon
            :icon="data.item.loss ? 'TrendingDownIcon':'TrendingUpIcon'"
            :class="data.item.loss ? 'text-danger':'text-success'"
          />
        </div>
      </template> -->
    </b-table>
  </b-card>
</template>

<script>
import {
  BCard, BTable, BAvatar, BImg, BAvatarGroup,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg,
    BAvatarGroup,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        { key: 'company', label: 'Lịch làm việc' },
        { key: 'views', label: '' },
        { key: 'category', label: 'Hôm nay 27/04/2021' },
        /* { key: 'revenue', label: 'CHỜ XỬ LÝ' },
        { key: 'sales', label: 'SO SÁNH' }, */
      ],
    }
  },
  created() {
    const date = new Date()
    this.fields[2].label = `Hôm nay ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
.total-people-dash2 {
  float: right;
  width: 45px;
  text-align: right;
  padding-top: 5px;
  font-weight: 500;
  font-size: 19.439px;
  line-height: 24px;
  color: #5e5873;
}
</style>
