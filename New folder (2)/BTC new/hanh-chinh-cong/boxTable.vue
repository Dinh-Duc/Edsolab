<template>
  <div
    v-if="data.items && data.items.length > 0"
    class="row"
  >
    <div class="col-lg-12">
      <b-card
        no-body
        class="table-hcc"
      >
        <b-card-body>
          <b-table
            hover
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="data.items"
            :fields="fields"
          >
            <!-- <template #cell(MucDoNghiemTrong)="dataMd">
              <label :class="`status-bc ${colorBadge(dataMd.value)}`">
                {{ dataMd.value }}
              </label>
            </template> -->

            <template #cell(tinhTrang)="dataTT">
              <label :class="`status-bc ${colorBadge(dataTT.value)}`">
                {{ dataTT.value }}
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
import { fields } from './dataFieldsTable.json'

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
      fields,
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
    if (this.data.fields.length === 0) {
      this.fields = fields
    } else {
      this.fields = this.data.fields
    }
  },
  methods: {
    colorBadge(value) {
      let color = ''
      if (value === 'Trung bình') {
        color = 'yellowCustom'
      } else if (value === 'Thấp') {
        color = 'primaryCustom'
      } else if (value === 'Cao') {
        color = 'dangerCustom'
      } else if (value === 'Chờ xử lý') {
        color = 'purpleCustom'
      } else if (value === 'Đã xử lý') {
        color = 'successCustom'
      } else if (value === 'Đang xử lý') {
        color = 'warningCustom'
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
.table-hcc {
  .table-responsive {
    .table {
      min-width: 1100px;
      overflow-x: scroll;
    }

    &::-webkit-scrollbar {
      background-color: #fff;
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: #fff;
    }
    &:hover {
      &::-webkit-scrollbar {
        display: block;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #aaa;
      }
    }
  }
  td {
    .status-bc {
      border-radius: 30px;
      padding: 5px 18px;
      width: 100px;
      text-align: center;
      &.yellowCustom {
        background: rgba(255, 194, 6, 0.1);
        border: 1px solid rgba(255, 194, 6, 0.5);
        color: #ffc206;
      }
      &.dangerCustom {
        background: rgba(227, 22, 22, 0.1);
        border: 1px solid rgba(227, 22, 22, 0.5);
        color: #e31616;
      }
      &.primaryCustom {
        background: rgba(90, 141, 238, 0.1);
        border: 1px solid rgba(90, 141, 238, 0.5);
        color: #5a8dee;
      }
      &.purpleCustom {
        background: rgba(115, 103, 240, 0.1);
        border: 1px solid rgba(115, 103, 240, 0.5);
        color: #7367f0;
      }
      &.warningCustom {
        background: rgba(255, 159, 67, 0.1);
        border: 1px solid rgba(255, 159, 67, 0.5);
        color: #ff9f43;
      }
      &.successCustom {
        background: rgba(40, 199, 111, 0.1);
        border: 1px solid rgba(40, 199, 111, 0.5);
        color: #28c76f;
      }
    }
  }
}
</style>
