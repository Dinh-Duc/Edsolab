<template>
  <div class="bd-camera">
    <div class="row w-100">
      <div class="col-md-6 image-info">
        <img
          :src="image1"
          alt="Anh 1"
        >
      </div>
      <div class="col-md-6">
        <div class="list-cam">
          <div class="item d-flex">
            <div class="name">
              Địa điểm:
            </div>
            <div class="text">
              Đường trên cao Phạm Văn Linh
            </div>
          </div>
          <div class="item d-flex">
            <div class="name">
              Camera:
            </div>
            <div class="text">
              Camera PTZ - Trên cao
            </div>
          </div>
        </div>
        <div class="list-image-cam">
          <div
            v-for="(item, key) in listImage"
            :key="key"
            class="item"
          >
            <img
              :src="item"
              alt="anh camera"
            >
            <div
              class="icon"
              @click="showChuyenVien()"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.8"
                  x="0.200195"
                  y="0.212891"
                  width="16.0635"
                  height="16.0635"
                  fill="#272727"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.2149 5.2606L7.7364 6.73191L6.73244 7.73588L5.26063 6.21487L4.21601 7.43469L4.21601 4.22852L7.43421 4.22852L6.2149 5.2606ZM11.2031 10.2739L12.2477 9.05409V12.2603H9.0295L10.2488 11.2282L8.72731 9.75687L9.73127 8.7529L11.2031 10.2739ZM5.24789 10.2614L6.7192 8.73985L7.72316 9.74382L6.20216 11.2156L7.42197 12.2603H4.21582V9.04204L5.24789 10.2614ZM10.2612 5.27314L9.04136 4.22852H12.2475V7.44674L11.2154 6.22742L9.74413 7.74893L8.74017 6.74496L10.2612 5.27314Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row image-bd">
      <img
        :src="imageBd"
        alt="image bd"
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image1: require('@/assets/images/cctv/bd_camera_1.png'),
      listImage: [
        require('@/assets/images/cctv/list_camera1.png'),
        require('@/assets/images/cctv/list_camera2.png'),
        require('@/assets/images/cctv/list_camera3.png'),
        require('@/assets/images/cctv/list_camera4.png'),
        require('@/assets/images/cctv/list_camera5.png'),
        require('@/assets/images/cctv/list_camera6.png'),
        require('@/assets/images/cctv/list_camera7.png'),
        require('@/assets/images/cctv/list_camera8.png'),
      ],
      imageBd: require('@/assets/images/cctv/ban_do.png'),
    }
  },
  methods: {
    showChuyenVien() {
      this.$router.push('/apps/cctv-cam-bien-moi/chuyen-vien')
    },
  },
}
</script>

<style lang="scss">
.bd-camera {
  .image-info {
    img {
      width: 100%;
    }
  }
  .list-cam {
    .item {
      font-size: 18px;
      padding-bottom: 10px;
      .name {
        font-weight: bold;
      }
      .text {
        color: #757575;
      }
    }
  }
  .list-image-cam {
    margin-top: 95px;
    .item {
      float: left;
      padding: 10px;
      cursor: pointer;
      position: relative;
      img {
        width: 120px;
        height: 58px;
        object-fit: cover;
      }
      .icon{
        position: absolute;
        top: 10px;
        right: 13px;
      }
    }
  }
  .image-bd {
    margin: 0;
    padding-top: 10px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
