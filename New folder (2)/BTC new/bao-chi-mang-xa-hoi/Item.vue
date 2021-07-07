<template>
  <div class="netview-item">
    <div class="title">
      <div class="logo">
        <img :src="data.logo">
      </div>
      <div class="info">
        <div
          class="name link"
          @click="goToUrl(data.urlUser)"
        >
          {{ data.name }}
        </div>
        <div class="detail">
          <span class="time">
            <feather-icon icon="ClockIcon" />{{ data.time }}
          </span>
          <span
            class="link"
            @click="goToUrl(data.urlArticle)"
          >{{
            data.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="content-bc-mxh">
      <div
        v-if="data.title"
        class="content-title link"
        @click="goToUrl(data.urlArticle)"
      >
        {{ data.title }}
      </div>
      <div class="content-container">
        {{ content }}
        <span
          v-if="canShowAll"
          class="link show-more"
          @click="toggleShowAll"
        >
          {{ showAll ? 'Thu gọn' : 'Xem thêm' }}
        </span>
      </div>
      <div
        ref="image-wrapper"
        class="content-images"
      >
        <div
          v-for="(image, index) in data.images"
          :key="index"
          class="image-wrapper"
        >
          <img
            :ref="'image-' + index"
            :src="image"
          >
        </div>
      </div>
    </div>
    <div class="tag-list d-flex align-items-center">
      <div class="tag-title">
        Chủ đề:
      </div>
      <div
        v-for="(tag, index) in data.tags"
        :key="index"
        class="tag-item"
      >
        {{ tag }}
      </div>
    </div>
    <div class="action-pane d-flex">
      <div class="pane-left d-flex">
        <div class="pane-item">
          <feather-icon icon="ClockIcon" /> {{ data.likes }} likes
        </div>
        <div class="pane-item">
          <feather-icon icon="MessageCircleIcon" /> {{ data.comments }} bình
          luận
        </div>
        <div class="pane-item">
          <feather-icon icon="LinkIcon" /> {{ data.shares }} chia sẻ
        </div>
      </div>
      <div class="pane-right d-flex">
        <div class="news-similar link">
          Tin tương tự ({{ data.similar }})
        </div>
        <div class="news-detail link">
          Xem chi tiết
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showAll: false,
      canShowAll: false,
    }
  },
  computed: {
    content() {
      return this.showAll
        ? this.data.content
        : `${this.data.content.slice(0, 299)}...`
    },
  },
  mounted() {
    this.canShowAll = this.data.content.length > 300
  },
  methods: {
    goToUrl(url) {
      window.open(url)
    },
    toggleShowAll() {
      this.showAll = !this.showAll
    },
  },
}
</script>
<style lang="scss">
#NetView {
  .netview-item {
    .action-pane {
      .pane-right {
        .news-similar {
          color: rgba(113, 142, 177, 0.8);
        }
      }
    }
  }
}
.netview-item {
  font-family: sans-serif;
  background-color: #ffffff;
  margin-bottom: 30px;
  font-size: 14px;
  .tag-list {
    .tag-item {
      border: 1px solid var(--iq-primary);
      color: var(--iq-primary);
      cursor: pointer;
      border-radius: 4px;
    }
  }
  @media (max-width: 991px) {
    border: 1px solid #eaf3fd;
    border-radius: 18px;
  }
  .title {
    padding: 20px;
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      .name {
        font-size: 16px;
        color: #007bff;
        font-weight: 700;
      }
      .detail {
        font-size: 12px;
        .time {
          color: rgba(113, 142, 177, 0.6);
          margin-right: 10px;
          svg{
            position: relative;
            top: -1px;
            margin-right: 5px;
          }
        }
        .link {
          color: #399af2;
        }
      }
    }
  }
  .content {
    padding-top: 10px;
    &-title {
      padding: 0 20px;
      margin-bottom: 12px;
      font-size: 16px;
      color: #125dd5;
      font-weight: 700;
    }
    &-container {
      padding: 0 20px 15px;
      word-break: break-word;
      line-height: 22px;
      display: block;
      margin-bottom: 10px;
      white-space: pre-wrap;
      font-size: 14px;
      .show-more {
        color: #007bff;
      }
    }
    &-images {
      padding: 0 20px;
      max-width: 840px;
      margin: auto;
      display: flex;
      @media (max-width: 575px) {
        flex-direction: column;
      }
      .image-wrapper {
        flex: 1;
        overflow: hidden;
        padding: 1px;
        margin-bottom: 25px;
        img {
          position: relative;
          width: 100%;
          height: auto;
          margin: 0;
          max-height: 200px;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
  .tag-list {
    border-top: 1px solid rgba(234, 243, 253, 0.9);
    padding: 5px 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tag {
      &-title {
        font-weight: 700;
        margin-right: 10px;
      }
      &-item {
        background-color: #f0f6ff;
        padding: 5px 10px;
        margin: 5px;
      }
    }
  }
  .action-pane {
    border-top: 1px solid rgba(234, 243, 253, 0.9);
    padding: 16px 20px;
    justify-content: space-between;
    .pane {
      &-left {
        .pane-item {
          color: rgba(113, 142, 177, 0.8);
          font-size: 12px;
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
      &-right {
        .news {
          &-similar {
            color: #2fbfa0;
          }
          &-detail {
            margin-left: 18px;
            color: #399af2;
          }
        }
      }
    }
  }
}
.link {
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
