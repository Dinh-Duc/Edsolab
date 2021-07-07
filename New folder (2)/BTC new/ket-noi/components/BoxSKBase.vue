<template>
  <div class="box-sk-base">
    <b-col
      v-for="(item, index) in ListItem"
      :key="index"
      cols="3"
    >
      <BoxData
        :data-item="item"
        :type-item="typeId"
        @click="chooseItem(item)"
      />
    </b-col>
  </div>
</template>
<script>
import BoxData from './BoxData.vue'
import data from '../data/Data'

export default {
  name: 'BoxSKBase',
  components: {
    BoxData,
  },
  props: {
    typeId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ListItem: [],
    }
  },
  created() {
    this.ListItem = data.data
  },
  methods: {
    chooseItem(item) {
      this.$emit('choose-item', item)
    },
  },
}
</script>
<style lang="scss">
.ket-noi {
  .box-sk-base {
    width: 100%;
    float: left;
    .col-3 {
      float: left;
    }
  }
}
</style>
