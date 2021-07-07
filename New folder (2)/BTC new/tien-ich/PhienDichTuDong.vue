<template>
  <div class="content-tien-ich mt-2 p-2">
    <div class="list-event-dich">
      <ul>
        <li
          :class="`${actionGg == 1 ? 'active' : ''}`"
          @click="actionGg = 1"
        >
          <span class="icon icon-custom">
            <img
              v-if="actionGg != 1"
              :src="require('@/assets/images/tienich/text.svg')"
              alt="text"
            >
            <img
              v-if="actionGg == 1"
              :src="require('@/assets/images/tienich/text-blue.svg')"
              alt="text"
            >
          </span>
          <span class="text">
            Văn Bản
          </span>
        </li>
        <li
          :class="`${actionGg == 2 ? 'active' : ''}`"
          @click="actionGg = 2"
        >
          <span class="icon">
            <img
              v-if="actionGg != 2"
              :src="require('@/assets/images/tienich/tailieu.svg')"
              alt="tailieu"
            >
            <img
              v-if="actionGg == 2"
              :src="require('@/assets/images/tienich/tailieu-blue.svg')"
              alt="tailieu"
            >
          </span>
          <span class="text">
            Tài liệu
          </span>
        </li>
      </ul>
    </div>
    <BoxVanBan v-if="actionGg == 1" />
    <BoxTaiLieu v-if="actionGg == 2" />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import BoxVanBan from './BoxVanBan'
// eslint-disable-next-line import/extensions
import BoxTaiLieu from './BoxTaiLieu'

export default {
  components: {
    BoxVanBan,
    BoxTaiLieu,
  },
  data() {
    return {
      actionGg: 1,
    }
  },
}
</script>

<style lang="scss">
.content-tien-ich {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .list-event-dich {
    ul {
      li {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #ddd;
        .icon {
          margin-right: 4px;
          svg {
            width: 30px;
            height: 20px;
          }
        }
        .text {
          font-size: 20px;
          position: relative;
          top: 7px;
        }
        &.active {
          color: #5a8dee;
          border-bottom: 2px solid #5a8dee;
          svg {
            path {
              fill: #5a8dee !important;
            }
          }
        }
      }
    }
  }
}
</style>
