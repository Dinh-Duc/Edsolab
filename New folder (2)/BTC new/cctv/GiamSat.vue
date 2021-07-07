<template>
  <div>
    <div class="row summe-block">
      <b-col
        xl="3"
        md="6"
        class="mb-16 mb-md-10"
      >
        <div class="small-box bg-gradient-1">
          <div class="inner small-box__title">
            <h3>20</h3>
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
            <h3>5</h3>
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
            <h3>8</h3>
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
            <h3>7</h3>
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
    </div>
    <div class="row mt-10">
      <b-col
        xl="3"
        md="6"
      >
        <div class="light-box h-full p-25">
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
                class="mb-15"
              >
                <div
                  class="pl-20 py-2 floor-name"
                  :class="{ active: floorActive.floorId == item.floorId }"
                  @click="setActiveFloor(item)"
                >
                  {{ item.description }}
                </div>
                <div
                  v-if="
                    item.cameras.length > 0 &&
                      floorActive.floorId == item.floorId
                  "
                  class="list-cam pl-20"
                >
                  <div
                    v-for="cam in item.cameras"
                    :key="cam.id"
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
        md="6"
      >
        <div class="search-box bg-white radius-sm mb-20">
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
          class="light-box content-pagecam d-flex align-items-center justify-content-center overflow-hidden"
        >
          <div
            v-if="floorActive && Object.keys(floorActive).length > 0"
            class="position-relative"
          >
            Giam Sat
          </div>
          <span v-else>Chưa có nội dung</span>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vSelect from 'vue-select'

import { MENU_ROUTE_NAME } from '@/constants/constants'
export default {
  name: 'GiamSat',
  metaInfo: {
    title: 'CCTV - Giám sát | Trung tâm điều hành ' + ENV_PROJECT_NAME,
  },
  components: {
    vSelect
  },
  data() {
    return {
      countCamActive: {},
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
    }
  },
  created() {
    this.$store.dispatch('common/setPageTitle', MENU_ROUTE_NAME.CCTV.GIAM_SAT)
  },
}
</script>
