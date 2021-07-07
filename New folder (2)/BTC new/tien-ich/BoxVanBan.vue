<template>
  <b-form
    ref="form"
    class="box-dich mt-2"
    @submit="dichVanBan"
  >
    <div class="row m-0 p-0">
      <div class="col-md-6 box-text p-0">
        <ul>
          <li>
            Phát hiện ngôn ngữ
          </li>
          <li>
            Anh
          </li>
          <li>
            Việt
          </li>
          <li class="icon">
            <img
              :src="require('@/assets/images/tienich/down.svg')"
              alt="icon down"
            >
          </li>
        </ul>
      </div>
      <div class="col-md-6 box-text p-0">
        <ul>
          <li class="icon-cd">
            <img
              :src="require('@/assets/images/tienich/chuyendoi.svg')"
              alt="icon chuyen doi"
            >
          </li>
          <li>
            Việt
          </li>
          <li>
            Anh
          </li>
          <li class="icon">
            <img
              :src="require('@/assets/images/tienich/down.svg')"
              alt="icon down"
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col-md-6 input-text-gg p-0 border-right">
        <div class="input position-relative">
          <b-form-textarea
            v-model="vanBan"
            rows="9"
            no-resize
            placeholder="Nhập văn bản"
            @keypress="submit"
          />
          <div class="icon-gn">
            <img
              :src="require('@/assets/images/tienich/record-small.svg')"
              alt="icon"
            >
          </div>
          <div class="count-text">
            0/5000
          </div>
        </div>
      </div>
      <div class="col-md-6 input-text-gg p-0">
        <b-form-textarea
          v-model="banDich"
          placeholder="Bản dịch"
          rows="9"
          no-resize
          disabled
          @keypress="submit"
        />
      </div>
    </div>
    <div class="d-flex content-center">
      <b-overlay :show="showLoading">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="success"
        >
          <!-- <img width="30px" src="@/assets/icons/dich-arrow.svg" alt="Dịch" /> -->
          Dịch
        </b-button>
      </b-overlay>
    </div>
  </b-form>
</template>

<script>
import apiDichVanBan from '@/api/translate'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  data() {
    return {
      vanBan: '',
      banDich: '',
      showLoading: false,
    }
  },
  methods: {
    submit(e) {
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault()
        this.dichVanBan(null)
      }
    },
    dichVanBan(event) {
      if (event != null) event.preventDefault()
      this.showLoading = true
      apiDichVanBan({
        q: this.vanBan,
        target: 'vi',
        source: 'en',
      }).then(({ data }) => {
        this.banDich = data.translations[0].translatedText
        this.showLoading = false
      })
    },
  },
}
</script>

<style lang="scss">
.content-tien-ich {
  .box-dich {
    border: 1px solid #ddd;
    border-radius: 6px;
    .box-text {
      border-bottom: 1px solid #ddd;
      ul {
        li {
          display: inline-block;
          padding: 10px 15px;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: 500;
        }
        .icon-cd {
          position: relative;
          left: -30px;
        }
      }
    }
    .input-text-gg {
      textarea {
        width: 100%;
        border: 0;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        font-size: 20px;
        &:focus {
          box-shadow: none;
        }
        &:disabled {
          background: #fff;
        }
      }
      .icon-gn {
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
      .count-text {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: rgba(114, 126, 140, 0.5);
      }
    }
  }
}
.dark-layout {
  .content-tien-ich .box-dich .input-text-gg textarea:disabled {
    background: unset;
  }
}
.content-center {
  justify-content: center;
}
</style>
