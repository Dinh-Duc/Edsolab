<template>
  <div
    v-if="data.items && data.items.length > 0"
    class="row"
  >
    <div class="col-lg-12">
      <b-card
        no-body
        class="table-qlnv"
      >
        <b-card-body>
          <b-table
            hover
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="data.items"
            :fields="data.fields"
          >
            <template #cell(STT)="dataStt">
              {{ dataStt.index + 1 }}
            </template>

            <template #cell(TRANGTHAI)="dataTT">
              <label :class="`status-bc ${colorBadge(dataTT.value)}`">
                {{ dataTT.value }}
              </label>
            </template>
            <template #cell(TRANGTHAIXL)="dataTTXL">
              <label :class="`status-bc ${colorBadge(dataTTXL.value)}`">
                {{ dataTTXL.value }}
              </label>
            </template>
            <template #cell(TINHCHAT)="dataTC">
              <label :class="`status-bc ${colorBadge(dataTC.value)}`">
                {{ dataTC.value }}
              </label>
            </template>
          </b-table>
          <b-col
            v-if="totalRows > perPage"
            cols="12"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
            />
          </b-col>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { BCard, BCardBody, BTable } from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BCard,
    BCardBody,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.data.items ? this.data.items.length : 1
  },
  updated() {
    this.totalRows = this.data.items ? this.data.items.length : 1
  },
  methods: {
    colorBadge(value) {
      let color = ''
      if (value === 'Trong hạn') {
        color = 'blueCustom'
      } else if (value === 'Bình thường' || value === 'Thường xuyên') {
        color = 'greenCustom'
      } else if (value === 'Quá hạn' || value === 'Gấp') {
        color = 'dangerCustom'
      } else if (value === 'Chưa xử lý' || value === 'Chưa thực hiện') {
        color = 'purpleCustom'
      } else if (value === 'Đã xử lý' || value === 'Đã hoàn thành') {
        color = 'successCustom'
      } else if (value === 'Đang xử lý' || value === 'Đang thực hiện') {
        color = 'warningCustom'
      } else if (value === 'Quan trọng' || value === 'Đặc thù') {
        color = 'yellowCustom'
      } else {
        color = 'noColor'
      }
      return color
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style lang="scss">
.table-qlnv {
  td {
    .status-bc {
      border-radius: 30px;
      padding: 8px 15px;
      width: 105px;
      height: 38px;
      text-align: center;
      display: flex;
      justify-content:center;
      align-items: center;
      &.blueCustom {
        background: #00CFE8;
        border: 1px solid #00CFE8;
        color: #fff;
      }
      &.greenCustom {
        background: #00E8B0;
        border: 1px solid #00E8B0;
        color: #fff;
      }
      &.dangerCustom {
        background: #EA5455;
        border: 1px solid #EA5455;
        color: #fff;
      }
      &.purpleCustom {
        background: #D7D5E6;
        border: 1px solid #D7D5E6;
        color: #7367F0;
      }
      &.warningCustom {
        background: #E8DCD1;
        border: 1px solid #E8DCD1;
        color: #FF9F43;
      }
      &.successCustom {
        background: #CEE1D6;
        border: 1px solid #CEE1D6;
        color: #28C76F;
      }
      &.yellowCustom {
        background: #EAAE54;
        border: 1px solid #EAAE54;
        color: #fff;
      }
    }
  }
}
</style>
