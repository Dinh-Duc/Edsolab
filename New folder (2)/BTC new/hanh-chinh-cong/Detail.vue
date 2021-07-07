<template>
  <div>
    <b-row
      v-if="!dataItem.notshowPro"
    >
      <b-col xl="6">
        <b-card class="box-hcc box-border-ml-left">
          <div class="progress-list">
            <div class="mb-1 text-center">
              <span class="title-progress-hcc">Hồ sơ</span>
            </div>
            <b-progress
              class="mt-2"
              :max="dataItem.hoso.max_process"
            >
              <b-progress-bar
                v-for="(item, index) in dataItem.hoso.data_hs"
                :key="index"
                :class="item.key"
                :value="item.value"
              >
                <span class="cursor-pointer nut-progress-bar">
                  {{ item.value }}</span>
              </b-progress-bar>
            </b-progress>
            <b-row class="mx-0 my-2">
              <b-col
                v-for="(item, index) in dataItem.hoso.data_hs"
                :key="index"
                xl="4"
                lg="12"
                sm="12"
                class="px-0 d-flex -align-items-center"
              >
                <div :class="`label-progress-hcc ${item.key}`" />
                <div>{{ item.text }}</div>
              </b-col>
            </b-row>
            <div
              class="border-top progress-status-hc d-flex align-items-center justify-content-center"
            >
              <div
                v-for="(item, index) in dataItem.hoso.status"
                :key="index"
                class="status-hc mr-2 py-1"
              >
                <div class="cursor-pointer">
                  <span :class="item.key">{{ item.value }} </span><span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col xl="6">
        <b-card class="box-hcc d-flex justify-content-center">
          <div class="progress-list">
            <div class="mb-1 text-center">
              <span
                class="title-progress-hcc"
              >Thống kê hồ sơ chưa xử lý theo đơn vị</span>
            </div>
            <div class="mh-t-180 style-scroll--t pt-1 pb-1">
              <b-row
                v-for="(item, index) in dataItem.thongke"
                :key="index"
                class="mb-2"
              >
                <b-col
                  xl="4"
                  sm="6"
                >
                  {{ item.name }}
                </b-col>
                <b-col
                  xl="8"
                  sm="6"
                >
                  <b-progress
                    class="height-30"
                    :value="item.value"
                    :max="item.max"
                    variant="danger"
                    show-value
                  />
                </b-col>
              </b-row>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <boxTable :data="dataItem.boxTable" />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import boxTable from './boxTable'

export default {
  components: {
    boxTable,
  },
  props: {
    dataItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      showProgess: true,
    }
  },
  created() {
  },
  methods: {},
}
</script>
