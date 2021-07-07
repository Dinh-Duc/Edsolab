<template>
  <div
    style="height: inherit"
    class="content-tuong-tac-noi-bo"
  >
    <b-card class="height-inherit w_100">
      <!-- <Meeting /> -->
      <iframe
        id="tuong-tac-noi-bo"
        :src="chatDomain + '/home'"
        frameborder="0"
        width="100%"
        height="100%"
        allow="geolocation; microphone; camera"
        @load="loginIframe()"
      /></b-card>
  </div>
</template>
<script>
import { ROCKET_CHAT_DOMAIN } from '@/configs/config'

export default {
  name: 'TuongTacNoiBo',
  components: {
    /* Meeting: () => import('./Meeting.vue'), */
  },
  data() {
    return {
      chatDomain: ROCKET_CHAT_DOMAIN,
    }
  },
  methods: {
    loginIframe() {
      setTimeout(() => {
        const userRocket = JSON.parse(
          localStorage.getItem('rocket_chat_detail'),
        )
        window.document
          .getElementById('tuong-tac-noi-bo')
          .contentWindow.postMessage(
            {
              event: 'login-with-token',
              loginToken: userRocket.authToken,
            },
            `${this.chatDomain}/home`,
          )
      }, 1000)
    },
  },
}
</script>
<style lang="scss">
.chat-application {
  .content-right {
    width: 100%;
  }
  .height-inherit {
    height: inherit;
  }
}
</style>
