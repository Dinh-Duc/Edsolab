<template>
  <b-card>
    <p class="title text-center">
      Thêm kịch bản cho bot chat
    </p>
    <b-form>
      <b-form-group label="Câu hỏi *">
        <b-form-input placeholder="Nhập câu hỏi" />
      </b-form-group>
      <b-form-group label="Nhập câu trả lời *">
        <b-form-textarea
          rows="6"
          placeholder="Nhập câu trả lời"
        />
      </b-form-group>
      <b-form-group label="Cấp cha">
        <b-form-select :options="parentOptions" />
      </b-form-group>
      <div class="form-footer text-center">
        <b-button
          variant="outline-primary"
          class="mr-1"
        >
          Đóng
        </b-button>
        <b-button variant="primary">
          Thêm mới
        </b-button>
      </div>
    </b-form>
    <vue-tree-list
      :model="treeData"
      default-tree-node-name="new node"
      default-leaf-node-name="new leaf"
      :default-expanded="false"
      @click="onClick"
      @change-name="onChangeName"
      @delete-node="onDel"
      @add-node="onAddNode"
    >
      <!-- <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}
          <span class="muted">#{{ slotProps.model.id }}</span>
        </span>
      </template> -->
      <svg
        slot="treeNodeIcon"
        class="mr-1"
        height="18px"
        viewBox="0 0 512 512"
        width="18px"
      >
        <path
          d="m367.398438 231.898438c0 8.285156-6.714844 15-15 15-8.28125 0-15-6.714844-15-15 0-8.28125 6.71875-15 15-15 8.285156 0 15 6.71875 15 15zm0 0"
        />
        <path
          d="m352.382812 72.300781c-30.449218 0-55.148437 24.640625-55.148437 55.148438v.019531c0 8.28125 6.714844 14.992188 15 14.992188s15-6.726563 15-15.011719c0-13.867188 11.214844-25.148438 25.167969-25.148438 13.875 0 25.164062 11.289063 25.164062 25.167969 0 13.875-11.289062 25.164062-25.164062 25.164062-8.285156 0-15 6.71875-15 15v16.066407c0 8.285156 6.714844 15 15 15 8.28125 0 15-6.714844 15-15v-3.136719c23.152344-6.550781 40.164062-27.875 40.164062-53.09375 0-30.421875-24.746094-55.167969-55.183594-55.167969zm0 0"
        />
        <path
          d="m143.9375 382.8125c18.640625-14.515625 30.664062-37.148438 30.664062-62.546875 0-43.707031-35.5625-79.265625-79.269531-79.265625s-79.265625 35.558594-79.265625 79.265625c0 25.398437 12.023438 48.03125 30.660156 62.546875-26.304687 15.648438-46.726562 45.203125-46.726562 82.054688v32.132812c0 8.285156 6.714844 15 15 15h160.667969c8.28125 0 15-6.714844 15-15v-32.132812c0-36.84375-20.417969-66.402344-46.730469-82.054688zm-97.871094-62.546875c0-27.164063 22.101563-49.265625 49.269532-49.265625 27.164062 0 49.265624 22.101562 49.265624 49.265625 0 27.167969-22.101562 49.269531-49.265624 49.269531-27.167969 0-49.269532-22.101562-49.269532-49.269531zm114.601563 161.734375h-130.667969v-17.132812c0-36.085938 29.195312-65.332032 65.332031-65.332032 36.085938 0 65.332031 29.195313 65.332031 65.332032v17.132812zm0 0"
        />
        <path
          d="m448.800781 0h-192.800781c-34.90625 0-63.199219 28.242188-63.199219 63.199219v289.199219c0 12.269531 14.070313 19.445312 24 12l60.265625-45.199219h171.734375c34.90625 0 63.199219-28.242188 63.199219-63.199219v-192.800781c0-34.90625-28.242188-63.199219-63.199219-63.199219zm33.199219 256c0 18.351562-14.839844 33.199219-33.199219 33.199219h-176.734375c-3.246094 0-6.402344 1.054687-9 3l-40.265625 30.199219v-259.199219c0-18.351563 14.839844-33.199219 33.199219-33.199219h192.800781c18.351563 0 33.199219 14.839844 33.199219 33.199219zm0 0"
        />
      </svg>
      <img
        slot="leafNodeIcon"
        width="18px"
        height="18px"
        class="mr-1"
        src="@/assets/icons/conversation.svg"
        alt=""
      >
      <!-- <span
        slot="addTreeNodeIcon"
        class="icon"
      >+</span>
      <span
        slot="addLeafNodeIcon"
        class="icon"
      >+</span>
      <span
        slot="editNodeIcon"
        class="icon"
      >E</span>
      <span
        slot="delNodeIcon"
        class="icon"
      >-</span>
      <span
        slot="leafNodeIcon"
        class="icon"
      >🍃</span> -->
    </vue-tree-list>
    <div v-if="botScripts.items.length > 0">
      <!-- <b-table
        class="mt-1"
        :fields="botScripts.fields"
        :items="botScripts.items"
      /> -->
      <!-- <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="20"
        use-router
        class="mb-0"
        align="right"
      /> -->
    </div>
  </b-card>
</template>
<script>
import { apiLayDanhSachBotScript } from '@/api/tuong-tac-noi-bo'
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'

export default {
  components: {
    VueTreeList,
  },
  data() {
    return {
      parentOptions: [],
      botScripts: {
        fields: [],
        items: [],
      },
      treeData: new Tree([
        {
          name: 'Node 1',
          addLeafNodeDisabled: true,
          id: 0,
          pid: 0,
        },
      ]),
    }
  },
  watch: {
    treeData(val) {
      console.log('treedata', val)
    },
  },
  created() {
    apiLayDanhSachBotScript({
      keyword: '',
      parrentId: '',
      pageIndex: 1,
      pageSize: 20,
    }).then(response => {
      this.botScripts.items = response.pageData
    })
  },
  methods: {
    onDel(node) {
      console.log(node)
      node.remove()
    },

    onChangeName(params) {
      console.log(params)
    },

    onAddNode(params) {
      console.log(params)
    },

    onClick(params) {
      console.log(params)
    },

    addNode() {
      const node = new TreeNode({ name: 'new node', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },
  },
}
</script>
<style lang="scss">
.bot-script {
  .title {
    font-size: 20px;
    text-transform: uppercase;
  }
}
</style>
