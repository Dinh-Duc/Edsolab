<template>
  <div class="box-tuongtacnoibo">
    <main>
      <h1>Họp trực tuyến</h1>
      <div class="contain-meetings">
        <button>
          Kết nối Google Meeting
        </button>
        <button @click="getSignature">
          Kết nối tới Zoom
        </button>
        <button>
          Kết nối MS Teams
        </button>
      </div>
      <div
        id="zmmtg-root"
        style="display:none"
      />
    </main>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { DOMAIN_FE } from '@/configs/config'

export default ({
  name: 'Meeting',
  data() {
    return {
      apiKey: 'jI0YCC9pTWyY9-iv9k1AhQ',
      ApiSecret: '5KjDE9JZA9RvyctiHp01LObQNdiQ0bDK56Zf',
      leaveUrl: DOMAIN_FE,
      meetingNumber: '3720191514',
      passWord: 'Ryi8w6',
      role: 1,
      signatureEndpoint: 'http://45.117.83.218:8003/api/GetSignature',
      userEmail: '',
      userName: 'Cao Tiến Dũng',
      lang: 'vi-VN',
      file1: undefined,
      file2: undefined,
      file3: undefined,
      file4: undefined,
      file5: undefined,
      file6: undefined,
    }
  },
  mounted() {
    /* eslint-disable */

    // document.getElementById("zmmtg-root").style.display = "Flex"
  },
  created() {
    this.file1 = document.createElement('script')
    this.file2 = document.createElement('script')
    this.file3 = document.createElement('script')
    this.file4 = document.createElement('script')
    this.file5 = document.createElement('script')
    this.file6 = document.createElement('script')
    this.file1.async = true
    this.file2.async = true
    this.file3.async = true
    this.file4.async = true
    this.file5.async = true
    this.file6.async = true
    this.file1.setAttribute('src', 'https://source.zoom.us/1.9.1/lib/vendor/react.min.js')
    this.file2.setAttribute('src', 'https://source.zoom.us/1.9.1/lib/vendor/react-dom.min.js')
    this.file3.setAttribute('src', 'https://source.zoom.us/1.9.1/lib/vendor/redux.min.js')
    this.file4.setAttribute('src', 'https://source.zoom.us/1.9.1/lib/vendor/redux-thunk.min.js')
    this.file5.setAttribute('src', 'https://source.zoom.us/1.9.1/lib/vendor/lodash.min.js')
    this.file6.setAttribute('src', 'https://source.zoom.us/zoom-meeting-1.9.1.min.js')
    document.body.appendChild(this.file1)
    document.body.appendChild(this.file2)
    document.body.appendChild(this.file3)
    document.body.appendChild(this.file4)
    document.body.appendChild(this.file5)
    document.body.appendChild(this.file6)
    // document.getElementById('zmmtg-root').style.display = 'none'
    this.getCookieZoom()
  },
  beforeDestroy(){
    window.ZoomMtg.endMeeting({})
    store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: 'sticky' })
    store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', null)
    document.getElementById('zmmtg-root').style.display = 'none'
    this.file1.parentNode.removeChild(this.file1);
    this.file2.parentNode.removeChild(this.file2);
    this.file3.parentNode.removeChild(this.file3);
    this.file4.parentNode.removeChild(this.file4);
    this.file5.parentNode.removeChild(this.file5);
    this.file6.parentNode.removeChild(this.file6);
  },
  methods: {
    getCookieZoom(){
      this.meetingNumber = this.$cookie.get('meetingNumber')
      this.passWord = this.$cookie.get('passWord')
      this.userName = this.$cookie.get('userName')
      this.saveZoom()
    },
    saveZoom(){
      this.$cookie.set('meetingNumber',this.meetingNumber,30)
      this.$cookie.set('passWord',this.passWord,30)
      this.$cookie.set('userName',this.userName,30)
    },
    getSignature() {
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av')
      window.ZoomMtg.preLoadWasm()
      window.ZoomMtg.prepareJssdk()
      window.ZoomMtg.inMeetingServiceListener('onUserJoin', data => {
        console.log('inMeetingServiceListener onUserJoin', data)
      })
      const payload = {
        MeetingNumber: `${this.meetingNumber}`,
        Role: `${this.role}`,
        ApiKey: this.apiKey,
        ApiSecret: this.ApiSecret,
      }
      /* eslint-disable */
      console.log('payload: ', payload)
      axios.post(this.signatureEndpoint, payload)
        .then(res => {
          console.log('respon: ', res)
          console.log('res: ', res.data.tokenZoom)
          // this.startMeeting(res.data.signature);
          // this.startMeeting("akkwWUNDOXBUV3lZOS1pdjlrMUFoUS4zNzIwMTkxNTE0LjE2MjA1NTExNjQ0NzIuMS5aT1VEb3ZSQjhVdkE3Z2pXR2JVSlJIdkJsenBPOTA0N0ZXUDkwWCtTYnJFPQ");
          this.startMeeting(res.data.tokenZoom)
        })
        .catch(error => {
          console.log(error)
        })
    },
    startMeeting(signature) {
      store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: 'hidden' })
      store.commit('appConfig/UPDATE_FOOTER_CONFIG', { type: 'hidden' })
      store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', 'true')
      document.getElementById('zmmtg-root').style.display = 'block'

      window.ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        isSupportAV: true,
        success: success => {
          console.log(success)
          window.ZoomMtg.i18n.load(this.lang)
          window.ZoomMtg.i18n.reload(this.lang)
          window.ZoomMtg.join({
            meetingNumber: this.meetingNumber,
            userName: this.userName,
            signature,
            apiKey: this.apiKey,
            userEmail: this.userEmail,
            passWord: this.passWord,
            success: success => {
              console.log(success)
              document.getElementById('wc-footer').style.width = '80%'
            },
            error: error => {
              console.log(error)
            },
          })
        },
        error: error => {
          console.log(error)
        },
      })
    },
  },
})
</script>
<style scoped lang="scss">
@import url("https://source.zoom.us/1.9.1/css/react-select.css");

.box-tuongtacnoibo{
  background: #FFF;
  height: 100%;
  position: relative;
  .group-item{
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 1rem;
  }

  main {
    padding: 2rem;
    width: 66%;
    margin: auto;
    text-align: center;

  }

  button {
    margin-top: 20px;
    width: 30%;
    background-color: #2D8CFF;
    color: #ffffff;
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
    display: inline-block;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    outline: none;
  }

  button:hover {
    background-color: #2681F2;
  }


  .contain-meetings{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
  }

  #zmmtg-root{
    z-index: 2;

    #wc-footer{
      width: 80% !important;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}


</style>
