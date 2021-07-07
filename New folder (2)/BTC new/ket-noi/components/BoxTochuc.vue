<template>
  <div class="box-tochuc-info">
    <div
      v-for="(item, index) in ListData"
      :key="index"
      class="elm-tochuc"
    >
      <!-- image -->
      <div class="avt-tochuc">
        <img
          :style="index === 1 ? 'width: 90%' : ''"
          :src="item.Avatar"
          alt=""
        >
      </div>

      <!-- Thông tin -->
      <div class="info-tochuc">
        <div class="elm-info-tc">
          <div class="mini-image-info">
            <img
              src="@/assets/images/KetNoi/kn-house.svg"
              alt=""
            >
          </div>
          <span>{{ item.Name }}</span>
        </div>
        <div class="elm-info-tc">
          <div class="mini-image-info">
            <img
              src="@/assets/images/KetNoi/kn-location.svg"
              alt=""
            >
          </div>
          <span>{{ item.Address }}</span>
        </div>
        <div class="elm-info-tc">
          <div class="mini-image-info">
            <img
              src="@/assets/images/KetNoi/kn-phone.svg"
              alt=""
            >
          </div>
          <span>{{ item.Phone }}</span>
        </div>
        <div class="elm-info-tc">
          <div class="mini-image-info">
            <img
              src="@/assets/images/KetNoi/kn-mail.svg"
              alt=""
            >
          </div>
          <span>{{ item.Mail }}</span>
        </div>
        <div class="elm-info-tc">
          <div class="mini-image-info">
            <img
              src="@/assets/images/KetNoi/kn-fax.svg"
              alt=""
            >
          </div>
          <span>{{ item.Fax }}</span>
        </div>
        <div
          class="elm-info-tc"
          style="cursor: pointer"
          @click="linkVideo(item.Name)"
        >
          <feather-icon
            icon="VideoIcon"
            size="20"
          />
          Họp trực tuyến
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from '../data/Data'

export default {
  props: {
    typeId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      Data: [],
    }
  },
  computed: {
    ListData() {
      if (this.typeId === 5 || this.typeId === 6) {
        return this.Data.find(x => x.Id === 1).List
      }
      if (this.typeId === 7 || this.typeId === 8) {
        return this.Data.find(x => x.Id === 2).List
      }
      return []
    },
  },
  created() {
    this.Data = data.dataKN
  },
  methods: {
    linkVideo(name) {
      const name1 = this.string_to_slug(name)
      window.open(`https://call.chinhquyendientu.vn/UBND-DN-HOP-${name1}`)
    },

    string_to_slug(str) {
      let newstr = ''
      const AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
      ]
      for (let i = 0; i < AccentsMap.length; i += 1) {
        const re = new RegExp(`[${AccentsMap[i].substr(1)}]`, 'g')
        const char = AccentsMap[i][0]
        newstr = str.replace(re, char)
      }
      return newstr
    },
  },
}
</script>
<style lang="scss">
.ket-noi {
  .box-tochuc-info {
    width: 100%;
    float: left;
  }
  .avt-tochuc {
    height: 100px;
    width: 250px;
    float: left;
    text-align: center;
  }
  .info-tochuc {
    width: calc(100% - 250px);
    float: left;
  }
  .elm-info-tc {
    width: 100%;
    float: left;
    margin-bottom: 12px;
  }
  .mini-image-info {
    width: 25px;
    float: left;
  }
  .elm-info-tc span {
    width: calc(100% - 25px);
    float: left;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #626262;
  }
  .elm-tochuc {
    width: 100%;
    float: left;
    margin-bottom: 12px;
    border-bottom: solid 1px;
  }
  .elm-tochuc:last-child {
    border-bottom: unset;
  }
}
</style>
