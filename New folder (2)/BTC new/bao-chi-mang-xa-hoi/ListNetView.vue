<template>
  <div class="list_item_netview">
    <h3 class="title_item">
      BÀI VIẾT NỔI BẬT
    </h3>
    <div
      v-for="(item, key) in dataNetView"
      :key="key"
      class="item_box_netview bg-white p-2"
    >
      <div class="header_item d-flex">
        <div class="avatar_user">
          <img :src="item.logo">
        </div>
        <div class="info_user">
          <div
            class="name link"
            @click="goToUrl(item.urlUser)"
          >
            {{ item.name }}
          </div>
          <div class="detail_time">
            <span class="time">
              <feather-icon icon="ClockIcon" />{{ item.time }}
            </span>
            <span
              class="link"
              @click="goToUrl(item.urlArticle)"
            >{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
      <div class="content-bc-mxh mt-2">
        <div
          v-if="item.title"
          class="content-title link"
          @click="goToUrl(item.urlArticle)"
        >
          {{ item.title }}
        </div>
        <div class="content-container-mxh">
          {{ content(item.content) }}
          <span
            v-if="item.content.length > 300"
            class="link-232 show-more-123"
            @click="toggleShowAll"
          >
            {{ showAll ? 'Thu gọn' : 'Xem thêm' }}
          </span>
        </div>
        <div
          ref="image-wrapper"
          class="content-images"
        >
          <!-- <div
            v-for="(image, index) in item.images"
            :key="index"
            class="image-wrapper"
          >
            <img
              :ref="'image-' + index"
              :src="image"
            >
          </div> -->
        </div>
      </div>
      <div class="tag-list d-flex align-items-center">
        <div class="tag-title">
          Chủ đề:
        </div>
        <div
          v-for="(tag, index) in item.tags"
          :key="index"
          class="tag-item"
        >
          {{ tag }}
        </div>
      </div>
      <div class="action-pane d-flex">
        <div class="pane-left d-flex">
          <div class="pane-item">
            <feather-icon icon="ClockIcon" /> {{ item.likes }} likes
          </div>
          <div class="pane-item">
            <feather-icon icon="MessageCircleIcon" /> {{ item.comments }} bình
            luận
          </div>
          <div class="pane-item">
            <feather-icon icon="LinkIcon" /> {{ item.shares }} chia sẻ
          </div>
        </div>
        <div class="pane-right d-flex">
          <div class="news-similar link">
            Tin tương tự ({{ item.similar }})
          </div>
          <div class="news-detail link">
            Xem chi tiết
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listData from './data.json'

export default {
  data() {
    return {
      dataNetView: listData,
      showAll: false,
      canShowAll: false,
    }
  },
  methods: {
    content(content) {
      return this.showAll ? content : `${content.slice(0, 299)}...`
    },
    goToUrl(url) {
      window.open(url)
    },
    toggleShowAll() {
      this.showAll = !this.showAll
    },
    checkShow(content) {
      this.canShowAll = content.length > 300
    },
  },
}
</script>

<style lang="scss">
.netview-list {
  .list_item_netview {
    .item_box_netview {
      .header_item {
        .avatar_user {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          img{
              width: 100%;
              height: 100%;
              object-fit: contain;
          }
        }
        .info_user {
          .name {
            font-size: 16px;
            color: #007bff;
            font-weight: 700;
            margin-bottom: 3px;
          }
          .detail_time {
            font-size: 12px;
            .time {
              color: rgba(113, 142, 177, 0.6);
              margin-right: 10px;
              svg {
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
    }
  }
}
</style>
