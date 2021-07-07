<template>
  <b-modal
    id="dang-ky-boc-bang"
    centered
    :hide-footer="true"
    @show="renderData()"
  >
    <b-form>
      <b-form-group label="Chọn cán bộ nói *">
        <v-select
          v-model="requestData.danhSachCanBo"
          multiple
          :options="canBoOptions"
          label="label"
          :reduce="t => t.code"
        />
      </b-form-group>
      <b-form-group label="Chọn máy ghi âm *">
        <b-form-select
          v-model="agentSelected"
          :options="agentOptions"
        />
      </b-form-group>
      <b-form-group label="Tiêu đề cuộc họp">
        <b-form-input
          v-model="requestData.title"
          :placeholder="item.title"
        />
      </b-form-group>
    </b-form>
    <div class="text-center">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="dangKyHopTrucTuyen()"
      >
        Đăng ký
      </b-button>
    </div>
  </b-modal>
</template>
<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import { apiGetAllAgent, apiDangKyCuocHopBocBang } from '@/api/hop'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
    showBocBangTab: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      canBoOptions: [],
      agentOptions: [],
      agentSelected: {},
      requestData: {
        danhSachCanBo: [],
        accessToken: null,
        agentId: null,
        agentName: null,
        title: null,
        lichHopId: this.item.id,
      },
    }
  },
  computed: {
    ...mapGetters({
      ListTPThamGia: 'hop/ListTPThamGia',
    }),
  },
  watch: {
    ListTPThamGia(val) {
      this.canBoOptions.length = 0
      val.map(item => {
        let label = ''
        if (!this.stringIsNullOrEmpty(item.tenCanBo)) {
          label += `${item.tenCanBo} - `
        }
        this.canBoOptions.push({
          label: `${label}${item.tenDonVi}`,
          code: item,
        })
        return null
      })
    },
    agentSelected(val) {
      this.requestData.agentId = val.agent_id
      this.requestData.agentName = val.name
    },
  },
  methods: {
    renderData() {
      // console.log(this.item)
      this.$store.dispatch('hop/getListTPThamGia', { id: this.item.id })
      apiGetAllAgent({
        accessToken: localStorage.getItem('token_hop_truc_tuyen'),
      })
        .then(({ data }) => {
          this.agentOptions.length = 0
          const json = JSON.parse(data)
          json.data.map(item => {
            this.agentOptions.push({
              value: item,
              text: item.name,
            })
            return null
          })
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Thông báo',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Lỗi khi tìm thông tin agent. Vui lòng thử lại sau!',
            },
          })
          this.$bvModal.hide('dang-ky-boc-bang')
        })
    },
    stringIsNullOrEmpty(text) {
      return text === '' || text === null
    },
    dangKyHopTrucTuyen() {
      this.requestData.accessToken = localStorage.getItem(
        'token_hop_truc_tuyen',
      )
      if (this.stringIsNullOrEmpty(this.requestData.title)) {
        this.requestData.title = this.item.title
      }
      apiDangKyCuocHopBocBang(this.requestData)
        .then(response => {
          if (response.data == null) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Thông báo',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: response.message,
              },
            })
            return
          }
          this.$bvModal.hide('dang-ky-boc-bang')

          this.showBocBangTab()

          // reset data
          this.requestData = {
            danhSachCanBo: [],
            accessToken: null,
            agentId: null,
            agentName: null,
            title: null,
            lichHopId: this.item.id,
          }
          this.agentSelected = {}
          //
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss"></style>
