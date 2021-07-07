<template>
  <div v-if="dataJSON">
    <div class="row">
      <div class="col-md-6">
        <b-card class="box-hcc box-border-ml-left">
          <div
            v-if="dataJSON.dataProgress && dataJSON.dataProgress.length"
            class="progress-list"
          >
            <div class="mb-1 text-center">
              <span class="title-progress-hcc">Ý kiến người dân</span>
            </div>
            <b-progress
              class="mt-2"
              :max="dataJSON.progress"
            >
              <b-progress-bar
                v-for="(item, index) in dataJSON.dataProgress"
                :key="index"
                :style="`background: ${item.color}`"
                :value="item.value"
              >
                <span class="cursor-pointer nut-progress-bar">
                  {{ item.value }}</span>
              </b-progress-bar>
            </b-progress>
            <b-row class="mx-0 my-2">
              <b-col
                v-for="(item, index) in dataJSON.dataProgress"
                :key="index"
                xl="3"
                lg="12"
                sm="12"
                class="px-0 d-flex -align-items-center"
              >
                <div
                  class="label-progress-hcc"
                  :style="`background: ${item.color}`"
                />
                <div>{{ item.status }}</div>
              </b-col>
            </b-row>
            <div
              v-if="dataJSON.dataStatus && dataJSON.dataStatus.length"
              class="border-top progress-status-hc d-flex align-items-center justify-content-center"
            >
              <div
                v-for="(item, index) in dataJSON.dataStatus"
                :key="index"
                class="status-hc mr-2 py-1"
              >
                <div class="cursor-pointer">
                  <span :style="`color: ${item.color}`">{{ item.value }} </span><span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </div>
      <div class="col-md-6">
        <b-card class="box-hcc box-hs box-border-ml-left">
          <div
            v-if="dataJSON.dataHoSo && dataJSON.dataHoSo.length"
            class="progress-list"
          >
            <div class="mb-1 text-center">
              <span
                class="title-progress-hcc"
              >Thống kê hồ sơ chưa xử lý theo đơn vị</span>
            </div>
            <b-row
              v-for="(item, index) in dataJSON.dataHoSo"
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
        </b-card>
      </div>
      <div
        v-if="dataJSON.dataTable"
        class="col-md-12"
      >
        <BoxTable :data="dataJSON.dataTable" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BoxTable from './BoxTable'
import DATA from './data.json'

export default {
  components: {
    BoxTable,
  },
  data() {
    return {
      dataJSON: null,
    }
  },
   created() {
    if(window.keyChildYKND) this.dataJSON = DATA[keyChildYKND]
    else this.dataJSON = null
    this.$eventBus.$on('y-kien-nguoi-dan', data => {
      console.log(126, data)
      setTimeout(() => {
        this.dataJSON = DATA[data.keyChild]
      })
    })
  },
}
</script>
