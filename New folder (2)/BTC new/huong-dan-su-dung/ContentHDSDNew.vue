<template>
  <div class="form-data-hdsd">
    <app-collapse
      v-if="itemData.length > 0"
      id="faq-payment-qna"
      accordion
      type="margin"
      class="mt-2"
    >
      <app-collapse-item
        v-for="(data, index) in itemData"
        :key="index"
        :title="data.title"
      >
        <div v-html="data.content" />
        <div
          v-if="data.images && data.images.length > 0"
          class="image-box"
        >
          <div class="item-image">
            <b-carousel
              id="carousel-crossfade"
              controls
              indicators
              no-hover-pause
              fade
              :interval="2000"
            >
              <b-carousel-slide
                v-for="(item, key) in data.images"
                :key="key"
                :img-src="require('@/assets/images/hdsd/'+item)"
              />
            </b-carousel>
          </div>
        </div>
      </app-collapse-item>
    </app-collapse>
  </div>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue'

export default {
  components: {
    AppCollapseItem,
    AppCollapse,
    BCarousel,
    BCarouselSlide,
  },
  props: {
    itemData: {
      type: Array,
      default() {
        return []
      },
    },
    listDataSearch: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      show: false,
      img: [],
      tmp: require('@/assets/images/hdsd/llv1.jpg'),
    }
  },
  watch: {
    itemData(val) {
      console.log('val', val)
    },
  },
  methods: {
  },
}
</script>
<style lang="scss">
.content-parent-hdsd {
  .tab-content {
    .tab-pane {
      &.active {
        border-radius: 6px;
        min-height: 100%;
      }
    }
  }
  .image-box{
    display: flex;
    justify-content: center;
    padding: 15px 0;
    .item-image{
      max-width: 70%;
    }
  }
}
</style>
