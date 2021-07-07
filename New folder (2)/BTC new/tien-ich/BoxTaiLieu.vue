<template>
  <div class="box-dich mt-2">
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
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M7.49997 8.55044C7.23114 8.55044 6.96235 8.44779 6.75739 8.24294L0.307713 1.79319C-0.102571 1.38291 -0.102571 0.717706 0.307713 0.307588C0.71783 -0.102529 1.3829 -0.102529 1.79322 0.307588L7.49997 6.01468L13.2068 0.307788C13.617 -0.10233 14.2821 -0.10233 14.6921 0.307788C15.1026 0.717905 15.1026 1.38311 14.6921 1.79339L8.24256 8.24313C8.0375 8.44803 7.76871 8.55044 7.49997 8.55044Z"
                fill="#727E8C"
              />
            </svg>
          </li>
        </ul>
      </div>
      <div class="col-md-6 box-text p-0">
        <ul>
          <li class="icon-cd">
            <svg
              width="30"
              height="21"
              viewBox="0 0 30 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.61013 0.24043L0.696399 5.15416C0.373987 5.47657 0.373987 5.99488 0.696399 6.31729L5.61013 11.2269C5.93254 11.5494 6.45085 11.5494 6.77326 11.2269C7.09567 10.9045 7.09567 10.3862 6.77326 10.0638L3.2757 6.56624L17.6741 6.56624C18.1352 6.56624 18.5066 6.19486 18.5066 5.73369C18.5066 5.27251 18.1352 4.90113 17.6741 4.90113L3.2757 4.90113L6.77326 1.40356C7.09567 1.08115 7.09567 0.562842 6.77326 0.24043C6.45493 -0.0819817 5.93254 -0.0819817 5.61013 0.24043Z"
                fill="#727E8C"
              />
              <path
                d="M23.2264 8.77168C22.904 9.09409 22.904 9.6124 23.2264 9.93481L26.724 13.4324H12.3256C11.8644 13.4324 11.493 13.8038 11.493 14.2649C11.493 14.7261 11.8644 15.0975 12.3256 15.0975H26.724L23.2264 18.5951C22.904 18.9175 22.904 19.4358 23.2264 19.7582C23.5488 20.0806 24.0671 20.0806 24.3895 19.7582L29.3033 14.8445C29.6257 14.522 29.6257 14.0037 29.3033 13.6813L24.3895 8.7676C24.0671 8.44927 23.5447 8.44927 23.2264 8.77168Z"
                fill="#727E8C"
              />
            </svg>
          </li>
          <li>
            Việt
          </li>
          <li>
            Anh
          </li>
          <li class="icon">
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M7.49997 8.55044C7.23114 8.55044 6.96235 8.44779 6.75739 8.24294L0.307713 1.79319C-0.102571 1.38291 -0.102571 0.717706 0.307713 0.307588C0.71783 -0.102529 1.3829 -0.102529 1.79322 0.307588L7.49997 6.01468L13.2068 0.307788C13.617 -0.10233 14.2821 -0.10233 14.6921 0.307788C15.1026 0.717905 15.1026 1.38311 14.6921 1.79339L8.24256 8.24313C8.0375 8.44803 7.76871 8.55044 7.49997 8.55044Z"
                fill="#727E8C"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <!-- quy code -->
    <div ref="dragArea">
      <div
        v-if="file"
        style="padding: 2em"
      >
        <div class="file-uploaded">
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
        <div style="text-align: right; margin-top: 1.5em">
          <b-button variant="primary">
            Translate
          </b-button>
        </div>
      </div>

      <div
        v-else
        class="row m-0 p-0 box-upload"
      >
        <div class="box-upload w-100">
          <div class="title-box-upload mt-3 mb-1">
            Chọn tài liệu
          </div>
          <p class="mb-2 text-p">
            Tải lên tệp .doc, .docx, .odf, .pdf, .ppt, .pptx, .ps, .rtf, .txt,
            .xls hoặc .xlsx
          </p>
          <div class="button-upload-file-gg positon-relative">
            <b-button variant="primary">
              <label>
                Tìm tệp trên máy tính của bạn
                <input
                  type="file"
                  hidden
                  @change="previewFiles"
                >
              </label>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    }
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
    previewFiles(e) {
      this.file = e.target.files?.[0]
    },
    convertSize(size) {
      if (typeof size !== 'number') return ''
      if (size < 1024) return `${size} byte`
      if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`
      if (size < 1024 * 1024 * 1024) return `${Math.ceil(size / (1024 * 1024))} MB`
      return `${Math.ceil(size / (1024 * 1024 * 1024))} GB`
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
    .box-upload {
      min-height: 250px;
      text-align: center;
      .title-box-upload {
        font-size: 25px;
        font-weight: bold;
      }
      .text-p {
        font-size: 18px;
        color: #727e8c;
      }
      .button-upload-file-gg {
        font-size: 16px;
        cursor: pointer;
        label {
          cursor: pointer;
          font-size: 16px;
          color: #fff;
        }
      }
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
}
</style>
