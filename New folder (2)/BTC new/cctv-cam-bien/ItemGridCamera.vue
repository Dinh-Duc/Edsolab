<template>
  <div
    class="item-cam radius-xxs bg-white overflow-hidden border-solid border-1 border-gray h-full"
  >
    <div class="cam-thumbnail">
      <img
        :src="imageFix"
        class="img-fluid"
        :alt="infoCam.camName"
      >
      <div class="group-hover d-flex align-items-center space-x-16">
        <div
          class="mr-auto cursor-pointer"
          @click="fullScreen()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Play Skip Forward</title>
            <path
              d="M400 64a16 16 0 00-16 16v136.43L151.23 77.11a35.13 35.13 0 00-35.77-.44C103.46 83.47 96 96.63 96 111v290c0 14.37 7.46 27.53 19.46 34.33a35.14 35.14 0 0035.77-.45L384 295.57V432a16 16 0 0032 0V80a16 16 0 00-16-16z"
            />
          </svg>
        </div>
        <div class="cursor-pointer mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Copy</title>
            <rect
              x="128"
              y="128"
              width="336"
              height="336"
              rx="57"
              ry="57"
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
            />
            <path
              d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg>
        </div>
        <div
          class="cursor-pointer"
          @click="fullScreen()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Expand</title>
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M432 320v112H320M421.8 421.77L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320M90.23 421.8L208 304"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="box-name-cam text-lg">
      <div class="cam-name font-semibold">
        {{ infoCam.camName }}
      </div>
      <div class="cam-station text-base">
        {{ infoCam.description }}
      </div>
    </div>

    <fs
      ref="fullscreen"
      @change="fullscreenChange()"
    >
      <img
        v-if="isLoadingCam === false"
        id="motionCam"
        :src="infoCam.camUrl"
        class="img-fluid"
      >
      <!-- <span class="fullcam-name">{{ infoCam.name }}</span> -->
    </fs>
  </div>
</template>
<script>
export default {
  name: 'ItemGridCamera',
  props: {
    infoCam: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      fullscreen: false,
      isLoadingCam: true,
      imageFix: require('@/assets/images/cctv/camp.jpg'),
    }
  },
  created() {},
  methods: {
    fullScreen() {
      this.$refs.fullscreen.toggle({
        wrap: false,
        callback: this.fullscreenChange,
      })
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
      this.isLoadingCam = !this.isLoadingCam
    },
  },
}
</script>
