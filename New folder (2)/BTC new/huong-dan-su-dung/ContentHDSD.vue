<template>
  <div class="form-data-hdsd">
    <!-- <div class="d-flex align-items-center p-2">
      chưa có dữ liệu
    </div> -->
    <Tree
      v-for="(item, key) in tree"
      :key="key"
      :tree-data="item"
      @node-click="logClick"
    />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Tree from '@core/components-custom/sibarLeftMenu/Tree'

export default {
  components: {
    Tree,
  },
  data() {
    return {
      show: false,
      tree: [
        {
          label: 'A cool folder',
          key: 'item-1',
          childs: [
            {
              label: 'A cool sub-folder 1',
              key: 'item-2',
              childs: [
                { label: 'A cool sub-sub-folder 1', key: 'item-3' },
                { label: 'A cool sub-sub-folder 2', key: 'item-4' },
              ],
            },
            { label: 'This one is not that cool', key: 'item-5' },
          ],
        },
        {
          label: 'A cool folder 1',
          key: 'item-1',
          childs: [
            {
              label: 'A cool sub-folder 1',
              key: 'item-2',
              childs: [
                { label: 'A cool sub-sub-folder 1', key: 'item-3' },
                { label: 'A cool sub-sub-folder 2', key: 'item-4' },
              ],
            },
            { label: 'This one is not that cool', key: 'item-5' },
          ],
        },
      ],
      active: {},
    }
  },
  methods: {
    logClick(node) {
      console.log('Clicked: ', node)
    },
  },
}
</script>
<style lang="scss">
.content-parent-hdsd {
  .tab-content {
    .tab-pane {
      &.active {
        background-color: #fff;
        border-radius: 6px;
        min-height: 100%;
      }
    }
  }
}
</style>
