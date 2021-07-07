<template>
  <div class="row m-0 form-event-dn">
    <div class="col-md-12">
      <b-form-group label="Thời gian *">
        <div class="flex space-x-10 items-start">
          <div class="flex-1 space-y-12">
            <div class="flex items-center space-x-10">
              <div class="flex-1">
                <flat-pickr
                  v-model="dataform.dateFrom"
                  placeholder="YYYY-MM-DD"
                  class="form-control"
                  :config="configDate"
                />
              </div>
              <v-select
                v-if="dataform.allDay"
                ref="selectTimeFrom"
                v-model="repeat"
                :clearable="false"
                label="title"
                :options="optionsNumberDayRepeat"
                :reduce="option => option.value"
                class="select-field"
              />
              <v-select
                v-if="!dataform.allDay"
                ref="selectTimeFrom"
                v-model="dataform.timeFrom"
                :clearable="false"
                label="title"
                :options="optionsTime"
                :reduce="option => option.value"
                class="select-field"
                @search:focus="focusTimeFrom"
              />
              <span v-if="!dataform.allDay && isShowDateTo == false">đến</span>
              <v-select
                v-if="!dataform.allDay && isShowDateTo == false"
                ref="selectTimeTo"
                v-model="dataform.timeTo"
                :clearable="false"
                :searchable="true"
                label="title"
                :options="optionsTime"
                :reduce="option => option.value"
                class="select-field select-field-timeto"
                @search:focus="focusTimeTo"
              >
                <template #footer>
                  <div
                    class="advance-timeto cursor-pointer"
                    @click="isShowDateTo = true"
                  >
                    Tùy chọn
                  </div>
                </template>
              </v-select>
            </div>
            <div
              v-if="dataform.allDay && dayRepeat > 1 || isShowDateTo"
              class="flex items-center space-x-10"
            >
              <div class="flex-1">
                <flat-pickr
                  v-model="dataform.dateTo"
                  placeholder="YYYY-MM-DD"
                  class="form-control"
                  :config="configDate"
                />
              </div>
              <v-select
                v-if="!dataform.allDay"
                ref="selectTimeTo"
                v-model="dataform.timeTo"
                :clearable="false"
                :searchable="true"
                label="title"
                :options="optionsTime"
                :reduce="option => option.value"
                class="select-field select-field-timeto"
                @search:focus="focusTimeTo"
              />
            </div>
          </div>
          <div
            v-if="false"
            class="flex items-center space-x-5 justify-content-end block-allday"
          >
            <span class="font-weight-bold nowrap">Cả ngày</span>
            <b-form-checkbox
              v-model="dataform.allDay"
              name="is-vertical-menu-collapsed"
              class="mr-0"
              switch
              inline
            />
          </div>
        </div>
      </b-form-group>
    </div>
    <div class="col-md-6">
      <b-form-group label="Địa điểm *">
        <b-form-input
          v-model="dataform.location"
          placeholder="Nhập địa điểm... "
        />
      </b-form-group>
    </div>
    <div class="col-md-6">
      <b-form-group label="Tài liệu đính kèm">
        <b-input-group class="group-file-input-dn">
          <b-form-file
            placeholder="Thả file word (.docx, .doc, .txt)"
            class="custom-file-input-dn"
          />
          <b-input-group-append is-text>
            <svg
              width="11"
              height="21"
              viewBox="0 0 11 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 4.77275V15.75C9.5 17.8596 7.70998 19.5682 5.5 19.5682C3.29003 19.5682 1.49996 17.8596 1.49996 15.75V3.81817C1.49996 2.5009 2.61995 1.43182 3.99995 1.43182C5.37995 1.43182 6.49999 2.5009 6.49999 3.81817V13.8409C6.49999 14.3659 6.055 14.7954 5.5 14.7954C4.945 14.7954 4.50001 14.3659 4.50001 13.8409V4.77275H3.00001V13.8409C3.00001 15.1582 4.12 16.2273 5.5 16.2273C6.88 16.2273 7.99999 15.1582 7.99999 13.8409V3.81817C7.99999 1.70865 6.20997 0 4 0C1.79002 0 0 1.70865 0 3.81817V15.75C0 18.6518 2.46502 21 5.5 21C8.53498 21 11 18.6518 11 15.75V4.77275H9.5Z"
                fill="#B2BCC5"
              />
            </svg>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div class="col-md-12 m-0">
      <div class="d-flex align-items-center mb-1">
        <div>
          <b-form-checkbox
            v-model="checkbox1"
            value="A"
          >
            Tạo lịch cho lãnh đạo
          </b-form-checkbox>
        </div>
        <div class="col-md-6">
          <b-form-input placeholder="Nhập tên người lãnh đạo" />
        </div>
        <div class="ml-auto">
          <b-form-checkbox v-model="dataform.publishSchedule">
            Công khai lịch
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <div class="col-md-12 flex mt-2">
      <div
        class="cursor-pointer btn btn-outline-primary flex items-center mb-1"
        @click="showAddUnit = !showAddUnit"
      >
        Thêm đơn vị phối hợp
      </div>
    </div>
    <div
      v-if="showAddUnit"
      class="col-md-12"
    >
      <div class="row">
        <div class="col-md-6">
          <b-form-group label="Đơn vị phối hợp">
            <v-select
              ref="selectdvPhoiHop"
              v-model="dvPhoiHop"
              :clearable="false"
              label="title"
              :options="listUnit"
              :reduce="option => option.value"
            >
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  placeholder="Chọn đơn vị phối hợp"
                  :required="!dvPhoiHop"
                  v-bind="attributes"
                  v-on="events"
                >
              </template>
              <template #no-options>
                Không có đơn vị phù hợp
              </template>
            </v-select>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group label="Người phối hợp">
            <v-select
              ref="selectUserUnit"
              v-model="nPhoiHop"
              :clearable="false"
              label="title"
              :options="listUser"
              :reduce="option => option.value"
            >
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  placeholder="Tên người phối hợp"
                  :required="!nPhoiHop"
                  v-bind="attributes"
                  v-on="events"
                >
              </template>
              <template #no-options>
                Không có nhân viên phù hợp
              </template>
            </v-select>
          </b-form-group>
        </div>
        <div class="col-md-12">
          <b-form-group label="Nội dung chi tiết công việc cần phối hợp *">
            <b-form-textarea
              placeholder="Chi tiết công việc cần phối hợp"
              rows="3"
            />
          </b-form-group>
        </div>
      </div>
      <div class="flex justify-end">
        <div
          class="cursor-pointer btn btn-outline-primary flex items-center"
        >
          Thêm
        </div>
      </div>
    </div>
    <div
      v-if="coperativeRequest && coperativeRequest.lenght > 0"
      class="col-md-12 mt-1"
    >
      <b-table
        hover
        responsive
        :items="dataTable.items"
        :fields="dataTable.fields"
      >
        <template #cell(Stt)="dataStt">
          {{ dataStt.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { getListUnit, getUserInUnit } from '@/api/calendar'
// import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
// eslint-disable-next-line import/extensions
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'

export default {
  components: {
    vSelect,
    flatPickr,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    dayRepeat: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isShowDateTo: false,
      configDate: {
        enableTime: false,
        time_24hr: false,
        allowInput: true,
        dateFormat: 'Y-m-d',
        defaultDate: new Date(),
        minDate: 'today',
        locale: Vietnamese,
      },
      showAddUnit: false,
      listUnit: [],
      listUser: [],
      coperativeRequest: [],
      dvPhoiHop: '',
      nPhoiHop: '',
      checkbox1: 'A',
      checkbox2: '',
      file: [],
      dataTable: {
        fields: [
          {
            key: 'Stt',
            label: 'STT',
            sortable: false,
          },
          {
            key: 'DVPH',
            label: 'ĐƠN VỊ PHỐI HỢP',
            sortable: false,
          },
          {
            key: 'NPH',
            label: 'NGƯỜI PHỐI HỢP',
            sortable: false,
          },
          {
            key: 'NDCV',
            label: 'NỘI DUNG CHI TIẾT CÔNG VIỆC',
            sortable: false,
          },
        ],
        items: [
          {
            DVPH: 'Sở tài chính',
            NPH: 'Nguyễn Văn Dũng',
            NDCV: 'Kế hoạch tài chính năm 2021- ngành giáo dục',
          },
          {
            DVPH: 'Sở tài chính',
            NPH: 'Nguyễn Văn Dũng',
            NDCV: 'Kế hoạch tài chính năm 2021- ngành giáo dục',
          },
        ],
      },
    }
  },
  computed: {
    dataform: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    optionsTime() {
      // eslint-disable-next-line no-var
      var arrTime = []
      for (let i = 0; i < 24; i += 1) {
        if (i < 10) {
          arrTime.push({ id: i, title: `0${i}:00`, value: `0${i}:00` })
          arrTime.push({ id: i + 0.5, title: `0${i}:30`, value: `0${i}:30` })
        } else {
          arrTime.push({ id: i, title: `${i}:00`, value: `${i}:00` })
          arrTime.push({ id: i + 0.5, title: `${i}:30`, value: `${i}:30` })
        }
      }
      return arrTime
    },
    optionsNumberDayRepeat() {
      return [
        {
          title: '1 ngày',
          value: 1,
        },
        {
          title: '2 ngày',
          value: 2,
        },
        {
          title: '3 ngày',
          value: 3,
        },
        {
          title: '4 ngày',
          value: 4,
        },
        {
          title: '5 ngày',
          value: 5,
        },
        {
          title: '6 ngày',
          value: 6,
        },
      ]
    },
    repeat: {
      get() {
        return this.dayRepeat
      },
      set(value) {
        this.$emit('changeDayRepeat', value)
      },
    },
  },
  watch: {
    dvPhoiHop: {
      handler(val) {
        this.getUserByUnit(val)
        this.nPhoiHop = ''
      },
      deep: true,
    },
  },
  created() {
    getListUnit(true).then(({ data }) => {
      this.listUnit = data.data.map(item => ({
        value: item.id,
        title: item.tenDonVi,
      }))
    })
    // this.getUserByUnit(this.dvPhoiHop)
  },
  methods: {
    focusTimeFrom() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeFrom.$el.querySelector('.vs__dropdown-menu .vs__dropdown-option--selected')
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
    focusTimeTo() {
      this.$nextTick(() => {
        const optionActive = this.$refs.selectTimeTo.$el.querySelector('.vs__dropdown-menu .vs__dropdown-option--selected')
        if (optionActive) {
          optionActive.scrollIntoView()
        }
      })
    },
    getUserByUnit(idUnit) {
      getUserInUnit(idUnit).then(({ data }) => {
        this.listUser = data.data.map(item => ({
          value: item.userId,
          title: item.userName,
        }))
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.form-event-dn {
  .custom-file-input-dn {
    .custom-file-label {
      border-top-left-radius: 0.357rem !important;
      border-bottom-left-radius: 0.357rem !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
      &::after {
        display: none !important;
      }
    }
  }
  .group-file-input-dn {
    .input-group-append {
      .input-group-text {
        padding: 0.438rem 0.6em !important;
      }
    }
  }
}
</style>
