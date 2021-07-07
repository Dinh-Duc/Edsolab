<template>
  <div class="quansattoanha kx">
    <b-row class="summe-block">
      <b-col
        xl="3"
        md="6"
        class="mb-16 mb-md-10"
      >
        <div class="small-box bg-gradient-1">
          <div class="inner small-box__title">
            <h3>
              <animated-number
                :value="SumCam[0] ? SumCam[0].count : 0"
                :format-value="
                  value => {
                    return `${value.toFixed(0)}`
                  }
                "
                :duration="1000"
              />
            </h3>
            <p>Camera<br>đang hoạt động</p>
          </div>
          <div class="icon">
            <svg
              v-svg
              symbol="icon-video"
              size="76 49"
            />
          </div>
        </div>
      </b-col>
      <b-col
        xl="3"
        md="6"
        class="mb-16 mb-md-10"
      >
        <div class="small-box bg-gradient-2">
          <div class="inner small-box__title">
            <h3>
              <animated-number
                :value="SumCam[1] ? SumCam[1].count : 0"
                :format-value="
                  value => {
                    return `${value.toFixed(0)}`
                  }
                "
                :duration="1000"
              />
            </h3>
            <p>Camera<br>ngừng hoạt động</p>
          </div>
          <div class="icon">
            <svg
              v-svg
              symbol="icon-video-disable"
              size="89 67"
            />
          </div>
        </div>
      </b-col>
      <b-col
        xl="3"
        md="6"
        class="mb-16 mb-md-10"
      >
        <div class="small-box bg-gradient-3">
          <div class="inner small-box__title">
            <h3>
              <animated-number
                :value="SumCam[2] ? SumCam[2].count : 0"
                :format-value="
                  value => {
                    return `${value.toFixed(0)}`
                  }
                "
                :duration="1000"
              />
            </h3>
            <p>Số lượt nhận diện<br>cán bộ trong cơ quan</p>
          </div>
          <div class="icon">
            <svg
              v-svg
              symbol="icon-eye"
              size="76 49"
            />
          </div>
        </div>
      </b-col>
      <b-col
        xl="3"
        md="6"
        class="mb-16 mb-md-10"
      >
        <div class="small-box bg-gradient-4">
          <div class="inner small-box__title">
            <h3>
              <animated-number
                :value="SumCam[3] ? SumCam[3].count : 0"
                :format-value="
                  value => {
                    return `${value.toFixed(0)}`
                  }
                "
                :duration="1000"
              />
            </h3>
            <p>Số lượt nhận diện<br>người ngoài cơ quan</p>
          </div>
          <div class="icon">
            <svg
              v-svg
              symbol="icon-eye"
              size="76 49"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="view-cctv row mt-10">
      <b-col
        xl="3"
        md="3"
      >
        <div class="light-box h-full">
          <v-select
            v-model="buildSelected"
            :options="listBuilding"
            :reduce="buildSelected => buildSelected.id"
            label="name"
            class="select-custom"
            placeholder="Chọn khu vực hiển thị"
          />
          <div class="pt-20">
            <div v-if="listFloor.length > 0">
              <div
                v-for="item in listFloor"
                :key="item.id"
                class="mb-15 item-floor"
              >
                <div
                  class="pl-20 py-2 floor-name"
                  :class="{ active: floorActive.floorId == item.floorId }"
                  @click="
                    setActiveFloor(item)
                    isCamDetail = false
                  "
                >
                  {{ item.description }}
                </div>
                <div
                  v-if="
                    item.cameras.length > 0 &&
                      floorActive.floorId == item.floorId
                  "
                  class="list-cam pl-20 d-none d-lg-block"
                >
                  <div
                    v-for="cam in item.cameras"
                    :key="cam.id"
                    :class="{ active: cam.id === isCamActive }"
                    class="item-camera"
                    @click="showCamDetail(cam)"
                  >
                    {{ cam.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center"
            >
              Chưa có thông tin sàn của tòa nhà
            </div>
            <!-- <div v-if="isLoading" class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <span class="ml-2">Đang tải...</span>
            </div> -->
          </div>
        </div>
      </b-col>
      <b-col
        xl="9"
        md="9"
      >
        <div class="search-box bg-white radius-sm mb-20 d-none d-lg-block">
          <div class="input-group">
            <input
              v-model="SearchKey"
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
              aria-label="Tìm kiếm..."
              @keyup.enter="Search(SearchKey)"
            >
            <div class="input-group-prepend">
              <a
                class="input-group-text"
                href="javascript:;"
                @click="Search(SearchKey)"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 14.6667H15.6133L15.24 14.3067C16.5467 12.7867 17.3333 10.8133 17.3333 8.66667C17.3333 3.88 13.4533 0 8.66667 0C3.88 0 0 3.88 0 8.66667C0 13.4533 3.88 17.3333 8.66667 17.3333C10.8133 17.3333 12.7867 16.5467 14.3067 15.24L14.6667 15.6133V16.6667L21.3333 23.32L23.32 21.3333L16.6667 14.6667ZM8.66667 14.6667C5.34667 14.6667 2.66667 11.9867 2.66667 8.66667C2.66667 5.34667 5.34667 2.66667 8.66667 2.66667C11.9867 2.66667 14.6667 5.34667 14.6667 8.66667C14.6667 11.9867 11.9867 14.6667 8.66667 14.6667Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          v-if="isCamDetail == false"
          class="light-box content-pagecam d-flex align-items-center justify-content-center overflow-hidden"
        >
          <div
            v-if="floorActive && Object.keys(floorActive).length > 0"
            class="position-relative"
          >
            <b-img
              id="floor-bg"
              :src="BASE_URL + floorActive.background"
              fluid
              block
            />
            <div
              v-if="showCam"
              class="list-cams position-absolute"
            >
              <div
                v-for="cam in floorActive.cameras"
                :key="cam.id"
                v-b-tooltip.hover
                :title="cam.name"
                class="point-cam d-flex align-items-center justify-content-center cursor-pointer text-white"
                :style="calculateCameraPosition(cam.locationX, cam.locationY)"
                @click="showCamDetail(cam)"
              >
                <svg
                  v-svg
                  symbol="icon-video"
                  size="24 15"
                />
              </div>
            </div>
          </div>
          <span v-else>Chưa có nội dung</span>
        </div>
        <div
          v-else
          class="light-box content-pagecam-detail overflow-hidden"
        >
          <div
            v-if="isLoadingCam == false"
            class="cam-detail"
          >
            <fullscreen
              ref="fullscreen"
              @change="fullscreenChange"
            >
              <div class="actions d-flex align-items-center">
                <span
                  v-if="fullscreen == false"
                  class="action-zoomout cursor-pointer mr-3"
                  @click="isCamDetail = false"
                >
                  <svg
                    v-svg
                    symbol="icon-zoom-out"
                    size="15 15"
                  />
                </span>
                <span
                  class="action-fullscreen cursor-pointer"
                  @click="fullScreen()"
                >
                  <svg
                    v-svg
                    :symbol="[
                      fullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen',
                    ]"
                    size="15 15"
                  />
                </span>
              </div>
              <img
                id="motionCam"
                :src="CamUrl"
                class="img-fluid"
              >
              <span class="cam-name">{{ isCamActiveName }}</span>
            </fullscreen>
          </div>
          <div
            v-else
            class="h-full d-flex align-items-center flex-col justify-content-center"
          >
            <b-spinner class="align-middle" />
            <span class="ml-2">Đang tải...</span>
          </div>
        </div>
      </b-col>
    </div>
  </div>
</template>
<script>
import {
  SearchBuildings,
  getBuilding,
  getCountCameraBuilding,
} from '@/api/cctv'
// import { MENU_ROUTE_NAME } from '@/constants/constants'
import Fullscreen from 'vue-fullscreen'
import AnimatedNumber from 'animated-number-vue'
import vSelect from 'vue-select'

export default {
  metaInfo: {
    title: `CCTV - Giám sát tòa nhà | Trung tâm điều hành ${window.ENV_PROJECT_NAME}`,
  },
  components: {
    Fullscreen,
    AnimatedNumber,
    vSelect,
  },
  data() {
    return {
      SumCam: [],
      SearchKey: '',
      listBuilding: [],
      listFloor: [],
      buildSelected: '',
      isLoading: false,
      floorActive: {},
      bgInfo: {
        width: 0,
        height: 0,
      },
      showCam: false,
      isCamDetail: false,
      isCamActive: '',
      isCamActiveName: '',
      CamUrl: '',
      isLoadingCam: true,
      fullscreen: false,
    }
  },
  computed: {
    BASE_URL() {
      // return DOMAIN_NEWS_DONGNAI
      return 'https://ubndtinhdongnai.chinhquyendientu.vn'
    },
  },
  watch: {
    buildSelected: {
      handler(val) {
        this.getSumCam(val)
        this.getFloors(val)
      },
    },
    bgInfo: {
      handler() {},
      deep: true,
    },
    SumCam: {
      handler() {},
      deep: true,
    },
  },
  created() {
    this.getAllData()
    // this.$store.dispatch(
    //   'common/setPageTitle',
    //   MENU_ROUTE_NAME.CCTV.QUAN_SAT_TOA_NHA,
    // )
  },
  mounted() {
    this.bgInfo = this.getInfoBg()
  },
  methods: {
    getInfoBg() {
      const bgImg = document.getElementById('floor-bg')
      const infoBg = {}
      if (bgImg) {
        infoBg.width = bgImg.naturalWidth
        infoBg.height = bgImg.naturalHeight
      }
      return infoBg
    },
    async getAllData() {
      const filter = {
        keyword: '',
        pageindex: 1,
        pagesize: 10,
      }
      const res = await SearchBuildings(filter)
      const { data, status } = res
      if (status === 200) {
        this.listBuilding = data.pageData.filter(i => i.id && i.name)
        this.listBuilding[0].name = 'Agribank'
        this.buildSelected = this.listBuilding[0].id
        // this.getFloors(this.listBuilding[0].id);
        // this.getSumCam(this.listBuilding[0].id);
      }
    },
    Search(key) {
      console.log(key)
    },
    async getSumCam(buildingId) {
      const res = await getCountCameraBuilding(buildingId)
      const { data, status } = res
      if (status === 200) {
        this.SumCam = data
      } else {
        this.SumCam = []
      }
    },
    async getFloors(id) {
      this.isLoading = true
      const res = await getBuilding(id)
      const { data, status } = res
      if (status === 200) {
        this.isloading = false
        this.listFloor = data.floors
      }
    },
    setActiveFloor(id) {
      this.floorActive = id
      this.showCam = false
      setTimeout(() => {
        this.bgInfo = this.getInfoBg()
        this.showCam = true
      }, 1000)
    },
    calculateCameraPosition(x, y) {
      return `left: ${x}%; top: ${y}%;`
    },
    showCamDetail(cam) {
      this.isLoadingCam = true
      this.isCamDetail = true
      this.isCamActive = cam.id
      this.isCamActiveName = cam.name
      if (cam.code !== '') {
        const fmUrl = 'http://222.252.26.214:8091/camproxy/mjpeg?cameraid=%camID&aspectratio=1'
        this.CamUrl = fmUrl.replace('%camID', cam.code)
        setTimeout(() => {
          this.isLoadingCam = false
        }, 1500)
      } else {
        this.CamUrl = ''
      }
    },
    fullScreen() {
      this.$refs.fullscreen.toggle()
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    },
  },
}
</script>

<style lang="scss">
.quansattoanha.kx {
  .h-full {
    height: 100%;
  }
  .pt-20 {
    padding-top: 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .bg-gradient-1 {
    background: linear-gradient(180deg, #49e3e3 0%, #1ab0b0 100%);
  }
  .bg-gradient-2 {
    background: linear-gradient(180deg, #ff567b 0%, #e61543 100%);
  }
  .bg-gradient-3 {
    background: linear-gradient(180deg, #ff9a76 0%, #ff7443 100%);
  }
  .bg-gradient-4 {
    background: linear-gradient(180deg, #b5abff 0%, #8676fe 100%);
  }

  .summe-block {
    margin-bottom: 2em;
    .icon {
      color: rgba(255, 255, 255, 0.5);
    }
    .small-box {
      padding: 15px;
      border-radius: 16px;
      margin: 1em 0;
      .icon {
        position: absolute;
        z-index: 0;
        font-size: 3rem;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        transition: transform 0.3s linear;
      }
      p {
        font-weight: 600;
        color: white;
        text-transform: initial;
        line-height: 1.27;
        margin-bottom: 0;
      }
      h3 {
        font-size: 35px;
        line-height: 1.257;
        font-weight: bold;
        margin: 0 0 2px;
        color: white;
      }
    }
  }
  .view-cctv {
    .light-box {
      background-color: #ffffff;
      border-radius: 10px;
      &.content-pagecam {
        min-height: calc(9.36px * 100 - 380px);
      }
    }

    .search-box {
      border-radius: 6px;

      .input-group {
        input.form-control {
          border-radius: 10px !important;
          border-color: #fff;
          background-color: #fff;
          font-size: 15px;
          font-weight: 400;
          height: 50px;
          padding-left: 25px;
          z-index: 1;
        }
        .input-group-prepend {
          position: absolute;
          right: 2px;
          top: 1px;
          height: 48px;
          height: calc(100% - 2px);
          z-index: 4;
        }
        .input-group-text {
          border-radius: 10px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          border-color: #fff;
          background-color: #fff;
          color: #a2aebd;
          padding: 0 25px;
          &:hover {
            color: #2e466e;
          }
        }
      }
    }
    .item-floor {
      cursor: pointer;
      .floor-name {
        transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
        padding-left: 0;
      }
      &:hover {
        .floor-name {
          background: #dbdbdbc7;
          border-radius: 8px;
          padding-left: 1em;
        }
      }

      .item-camera {
        padding: .7em 0 .7em 1em;
        margin: .5em 0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
        &:hover {
          padding-left: 2em;
          background: #dbdbdbc7;
        }
      }
    }
  }

  @media (min-width: 1600px) {
    .small-box {
      padding: 30px;
      font-size: 18px;
      h3 {
        font-size: 35px;
      }
      .icon {
        right: 30px;
      }
    }
  }
  @media (min-width: 992px) {
    .view-cctv {
      .light-box {
        padding: 25px;
      }
    }

    .small-box {
      padding: 15px;
      font-size: 16px;
      .icon {
        right: 15px;
      }
      h3 {
        font-size: 28px;
      }
    }
  }
}
</style>
