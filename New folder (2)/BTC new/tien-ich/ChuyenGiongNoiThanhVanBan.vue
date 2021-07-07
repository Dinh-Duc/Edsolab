<template>
  <div class="w-100">
    <div class="form-icon-cgntvb mb-2 mt-3 w-100 text-center">
      <div class="icon">
        <img
          v-if="!hold"
          :src="require('@/assets/images/tienich/record-black.svg')"
          alt="recording"
          @click=";(hold = true), listenVoice()"
        >
        <img
          v-if="hold"
          :src="require('@/assets/images/tienich/record-blue.svg')"
          alt="recording"
          @click=";(hold = false), stopListenVoice()"
        >
      </div>
      <div class="text mt-1">
        Click vào icon để thu âm giọng nói
      </div>
    </div>
    <div class="from-vb-giongnoi p-2">
      <b-form-textarea
        id="textarea-rows"
        v-model="textFromSpeech"
        rows="12"
      />
    </div>
  </div>
</template>

<script>
import { BFormTextarea } from 'bootstrap-vue'

export default {
  components: {
    BFormTextarea,
  },
  data() {
    return {
      hold: false,
      textFromSpeech: '',
      runtimeTranscription: '', // default component vue-speech
      transcription: [], // default component vue-speech
    }
  },
  watch: {
    transcription(arrText) {
      this.textFromSpeech += arrText[arrText.length - 1]
    },
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      throw new Error(
        'Speech Recognition does not exist on this browser. Use Chrome or Firefox',
      )
    }
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'vi-VN'
    recognition.interimResults = true

    recognition.addEventListener('result', event => {
      const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      this.runtimeTranscription = text
    })

    recognition.addEventListener('end', () => {
      if (this.runtimeTranscription !== '') this.transcription.push(this.runtimeTranscription)
      this.runtimeTranscription = ''
      this.listenVoice()
    })
    window.recognition = recognition
  },
  methods: {
    listenVoice() {
      if (!this.hold) return
      window.recognition.start()
    },

    stopListenVoice() {
      window.recognition.stop()
      this.hold = false
    },
  },
}
</script>

<style lang="scss">
.form-icon-cgntvb {
  .icon {
    cursor: pointer;
    svg {
      width: 50px;
    }
    .hold-ghi-am {
      width: 500px;
    }
  }
  .text {
    font-size: 18px;
    color: #727e8c;
  }
}
</style>
