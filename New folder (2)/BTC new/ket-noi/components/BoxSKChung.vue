<template>
  <div>
    <!-- Tiêu biểu -->
    <div class="elm-box-chung">
      <b class="title-box">Tiêu biểu</b>
      <div class="list-databox">
        <b-col
          v-for="(item, index) in ListItem"
          :key="index"
          cols="4"
        >
          <BoxData
            v-if="index <= 2"
            :data-item="item"
            :type-item="1"
          />
        </b-col>
      </div>
    </div>

    <!-- Phát động -->
    <div class="elm-box-chung">
      <b class="title-box">Phát động</b>
      <div class="list-databox" />
      <b-col
        v-for="(item, index) in ListItem"
        :key="index"
        cols="3"
      >
        <BoxData
          v-if="index <= 3"
          :data-item="item"
          :type-item="2"
        />
      </b-col>
    </div>

    <!-- Tham dự -->
    <div class="elm-box-chung">
      <b class="title-box">Tham dự</b>
      <div class="list-databox">
        <b-col
          v-for="(item, index) in ListItem"
          :key="index"
          cols="3"
        >
          <BoxData
            v-if="index <= 3"
            :data-item="item"
            :type-item="3"
          />
        </b-col>
      </div>
    </div>

    <!-- Được mời -->
    <div class="elm-box-chung">
      <b class="title-box">Được mời</b>
      <div class="list-databox">
        <b-col
          v-for="(item, index) in ListItem"
          :key="index"
          cols="3"
        >
          <BoxData
            v-if="index <= 3"
            :data-item="item"
            :type-item="4"
          />
        </b-col>
      </div>
    </div>
  </div>
</template>
<script>
import BoxData from './BoxData.vue'
import data from '../data/Data'

export default {
  name: 'BoxSKChung',
  components: {
    BoxData,
  },
  data() {
    return {
      ListItem: [],
    }
  },
  created() {
    this.ListItem = data.data
  },
}
</script>
<style lang="scss">
.ket-noi {
  .elm-box-chung {
    width: 100%;
    float: left;
  }
  .elm-box-chung .col-3,
  .elm-box-chung .col-4 {
    float: left;
  }
  .elm-box-chung .col-4 .image-box {
    height: 250px;
    img {
      width: 100%;
      height: 250px;
    }
  }
  .title-box {
    width: 100%;
    float: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-transform: uppercase;
    color: #40566f;
    margin-bottom: 20px;
  }
  .list-databox {
    width: 100%;
    float: left;
  }
}
</style>
