<template>
  <div class="meetings-settings">
    <div class="header-settings">
      Cài đặt cuộc họp
    </div>
    <div class="container-settings">
      <div class="box-settings">
        <div class="header">
          Kết nối Google Meeting
        </div>
        <div class="contents" />
      </div>
      <div class="box-settings">
        <div
          class="header"
          @click="openSettings('zoom')"
        >
          Kết nối Zoom
          <span v-if="checkOpenSettings.zoom"><feather-icon icon="ChevronDownIcon" /></span>
          <span v-else><feather-icon icon="ChevronRightIcon" /></span>
        </div>
        <div class="contents">
          <div v-show="checkOpenSettings.zoom">
            <div class="group-item">
              <label for="userName">Tên tài khoản:</label>
              <input
                v-model="dataSettingsZoom.userName"
                type="text"
              >
            </div>
            <div class="group-item">
              <label for="meetingNumber">Nhập phòng họp:</label>
              <input
                v-model.number="dataSettingsZoom.meetingNumber"
                type="number"
              >
            </div>
            <div class="group-item">
              <label for="passWord">Mật khẩu:</label>
              <input
                v-model="dataSettingsZoom.passWord"
                type="text"
              >
            </div>
            <b-button
              variant="primary btn-call-video"
              block
              @click="saveZoom()"
            >
              Lưu
            </b-button>
          </div>
        </div>
      </div>
      <div class="box-settings">
        <div class="header">
          Kết nối MS Teams
        </div>
        <div class="contents" />
      </div>
    </div>
  </div>
</template>
<script>

export default ({
  name: 'MeetingSettings',
  data() {
    return {
      dataSettingsZoom: {
        meetingNumber: '3720191514',
        passWord: 'Ryi8w6',
        userName: 'Vue.js',
      },
      checkOpenSettings: {
        ggmt: false,
        zoom: false,
        msteam: false,
      },
    }
  },
  methods: {
    openSettings(val) {
      switch (val) {
        case 'ggmt':
          this.checkOpenSettings.ggmt = !this.checkOpenSettings.ggmt
          break
        case 'zoom':
          this.checkOpenSettings.zoom = !this.checkOpenSettings.zoom
          break
        case 'msteam':
          this.checkOpenSettings.msteam = !this.checkOpenSettings.msteam
          break
        default:
          break
      }
    },
    saveZoom() {
      this.$cookie.set('meetingNumber', this.dataSettingsZoom.meetingNumber, 30)
      this.$cookie.set('passWord', this.dataSettingsZoom.passWord, 30)
      this.$cookie.set('userName', this.dataSettingsZoom.userName, 30)
    },
  },
})
</script>
<style scoped lang="scss">
.meetings-settings{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: start;
    padding: 1.2rem;
    height: 100%;
    width: 100%;
    background: #FFF;

    .header-settings {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .container-settings {
        padding-top: 1.2rem;
        padding-left: 1rem;

        .box-settings {
            padding: 0.11rem;
            cursor: pointer;

            .header {
                font-weight: 500;
                border-bottom: 0.16rem solid #E0E0E0;

            }
            .contents {
                padding: 1rem;
                max-width: 35%;

                .group-item {
                    display: flex;
                    align-content: center;
                    justify-content: space-between;
                    padding: 1rem;

                    label{
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }

}
</style>
