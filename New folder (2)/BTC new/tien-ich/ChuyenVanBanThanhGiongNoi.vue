<template>
  <div class="content-tien-ich mt-2 p-2">
    <div class="from-vb-giongnoi">
      <b-form-textarea
        id="textarea-rows"
        v-model="textArea"
        rows="10"
      />
    </div>
    <div class="row select-gn mt-2">
      <div class="col-md-5 input-select-custom d-flex align-items-center">
        <div class="text">
          Giọng nói
        </div>
        <div class="input-select-gn">
          <v-select
            v-model="selected"
            label="title"
            :options="option"
            @selected="selectOption"
          />
        </div>
      </div>
      <div
        class="col-md-5 input-select-custom d-flex d-flex align-items-center"
      >
        <div class="text">
          Chất lượng giọng
        </div>
        <div class="input-select-kbs">
          <v-select
            v-model="selected1"
            label="title"
            :options="option1"
          />
        </div>
      </div>
      <div
        class="col-md-2 button-doc d-flex align-items-center justify-content-end"
      >
        <b-button
          variant="primary"
          @click="DocNgay()"
        >
          Đọc ngay
        </b-button>
      </div>
    </div>
    <div
      ref="dragArea"
      class="row mt-2 m-0 p-0"
    >
      <div
        v-if="file"
        class="file-uploaded"
      >
        <feather-icon
          icon="FileIcon"
          size="50"
        />
        <div class="info">
          <p>{{ file.name }}</p>
          <span>{{ convertSize(file.size) }}</span>
        </div>

        <b-button
          variant="flat-success"
          class="btn-icon"
          style="color: #40566f"
          @click="file = null"
        >
          <feather-icon
            icon="XCircleIcon"
            size="30"
          />
        </b-button>
      </div>
      <!-- <label
        v-if="!file"
        class="col-md-12 input-file-dvb"
      >
        <div
          id="text-input"
          class="text"
        >
          Thả file word (.docx, .doc, .txt) hoặc nhấn
          <span class="text-bold">vào đây</span> để tải file lên
          <span class="icon ml-2">
            <img
              :src="require('@/assets/images/tienich/upload.svg')"
              alt="icon"
            >
          </span>
        </div>
        <input
          id="input-file-vb"
          type="file"
          class="input-file-custom"
          hidden
          @change="previewFiles"
        >
      </label> -->
    </div>
    <div class="loading-void">
      <transition name="fade">
        <div
          v-show="loading"
          class="popup"
        >
          <div class="inner">
            <Loading />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
// eslint-disable-next-line import/extensions
import Loading from '@core/components-custom/loading/Loading'

export default {
  components: {
    vSelect,
    Loading,
  },
  data() {
    return {
      selected: { title: 'Nữ miền Bắc (Liên)' },
      selected1: {
        title: '128kbps',
      },
      option: [
        { title: 'Nữ miền Bắc (Liên)' },
        { title: 'Nam miền Bắc (Hiếu)' },
        { title: 'Nữ miền Bắc (Hồng Hà)' },
        { title: 'Nữ miền Nam (Ái Hoa)' },
        { title: 'Nữ miền Nam (Minh Nguyệt)' },
      ],
      option1: [{ title: '8kbs' }, { title: '64kbs' }, { title: '128kbs' }],
      textArea: '',
      file: null,
      file2: null,
      voiceID: 'north_female_lien',
      isShowMessage: false,
      loading: false,
    }
  },
  watch: {
    selected() {
      this.selectOption()
    },
  },
  mounted() {
    this.$refs.dragArea.ondragover = () => false
    this.$refs.dragArea.ondragend = () => false
    this.$refs.dragArea.ondrop = e => {
      if (!e.dataTransfer.files.length) return
      this.file = e.dataTransfer.files?.[0]
      e.preventDefault()
    }
  },
  methods: {
    DocNgay() {
      if (this.textArea.length === 0) {
        this.$swal({
          title: 'Cảnh báo!',
          text: ' Bạn chưa nhập text văn bản',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-warning',
          },
          buttonsStyling: false,
        })
      } else {
        this.loading = true
        // ---------- doc text free --------------
        // const utterance = new SpeechSynthesisUtterance(this.textArea)
        // window.speechSynthesis.speak(utterance)

        // doc text mat phi tubekit
        // const params = {
        //   voiceServer: 'ttsvnpro',
        //   voiceID: this.voiceID,
        //   voiceSpeed: 0,
        //   text: this.textArea,
        // }
        // axios.defaults.headers.post.apikey = 'CaHasAndFT01egYdpRFCNkoGfYaYewwa'
        // axios.defaults.headers.post['Content-Type'] = 'application/json'
        // axios
        //   .post('https://www.tubekit.win/api/v1/tts/synthesize', params)
        //   .then(res => {
        //     if (res.data.audioData) {
        //       this.audioData(`data:audio/wav;base64,${res.data.audioData}`)
        //     }
        //   })

        //  Tích hợp bên VAIS
        const params = {
          text: this.textArea.replace(/(\r\n|\n|\r)/gm, ''),
          voiceTone: this.voiceID,
        }
        // eslint-disable-next-line no-undef
        COMMON_POST(
          // eslint-disable-next-line no-undef
          `${URLAPI}/api/TichHop/chuyen-vanban-sang-giongnoi`,
          params,
        ).then(res => {
          if (res.audio_url) {
            const audio = new Audio(res.audio_url)
            audio.play()
          }
          this.loading = false
        })
      }
    },

    audioData(src) {
      const df = document.createDocumentFragment()
      const snd = new Audio(src)
      df.appendChild(snd)
      snd.addEventListener('ended', () => {
        df.removeChild(snd)
      })
      snd.play()
      return snd
    },

    previewFiles(event) {
      const fileUpload = event.target.files?.[0]
      const nameFile = fileUpload.name.split('.').pop() || ''
      if (nameFile === 'txt' || nameFile === 'docx' || nameFile === 'doc') {
        console.log('goi api len backend để trả về nội dung')
        this.file = fileUpload
      } else {
        this.$swal({
          title: 'Cảnh báo!',
          text: ' File bạn tải lên không đúng định dạng',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-warning',
          },
          buttonsStyling: false,
        })
      }
    },
    convertSize(size) {
      if (typeof size !== 'number') return ''
      if (size < 1024) return `${size} byte`
      if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`
      if (size < 1024 * 1024 * 1024) return `${Math.ceil(size / (1024 * 1024))} MB`
      return `${Math.ceil(size / (1024 * 1024 * 1024))} GB`
    },
    selectOption() {
      if (this.selected.title === 'Nữ miền Bắc (Liên)') {
        this.voiceID = 'north_female_lien'
      } else if (this.selected.title === 'Nam miền Bắc (Hiếu)') {
        this.voiceID = 'north_male_hieu'
      } else if (this.selected.title === 'Nữ miền Bắc (Hồng Hà)') {
        this.voiceID = 'north_female_hongha'
      } else if (this.selected.title === 'Nữ miền Nam (Ái Hoa)') {
        this.voiceID = 'south_female_aihoa'
      } else if (this.selected.title === 'Nữ miền Nam (Minh Nguyệt)') {
        this.voiceID = 'south_female_minhnguyet'
      }
    },
  },
}
</script>

<style lang="scss">
.content-tien-ich {
  .select-gn {
    .input-select-custom {
      .text {
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
      }
      .input-select-gn {
        width: 65%;
        .vs__clear {
          display: none !important;
        }
      }
      .input-select-kbs {
        width: 45%;
        .vs__clear {
          display: none !important;
        }
      }
    }
  }
  .button-doc {
    button {
      width: 200px;
    }
  }
  .input-file-dvb {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border: 1px dashed #ddd;
    font-size: 16px;
    cursor: pointer;
    position: relative;
    .text {
      .text-bold {
        font-weight: bold;
      }
    }
    .input-file-custom {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      // visibility: hidden;
      z-index: 9;
    }
  }
  .file-uploaded {
    padding: 1em;
    width: 100%;
    display: flex;
    align-items: center;

    background: #eee;

    .info {
      padding: 1em 1.2em;
      flex-grow: 1;
      p {
        margin: 0 0 0.4em 0;
        font-weight: bold;
        font-size: 1.5em;
      }
    }
  }
  .loading-void {
    .popup {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #00000070;
      z-index: 99;
      .inner {
        width: 100%;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .lds-roller div:after {
          background: #fff !important;
        }
      }
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.15s;
    }
  }
}
</style>
