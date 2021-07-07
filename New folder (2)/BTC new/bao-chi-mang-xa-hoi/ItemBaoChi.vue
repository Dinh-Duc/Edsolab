<template>
  <div class="item_box_netview bg-white">
    <div class="header_item d-flex mb-1">
      <div
        v-if="dataItem.avatar"
        class="avatar_user"
      >
        <img :src="dataItem.logo">
      </div>
      <div
        v-else
        class="avatar_user no-avatar"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 0C11.1943 0 0 11.1921 0 24.9989C0 38.8057 11.1932 49.9978 25 49.9978C38.8079 49.9978 50 38.8057 50 24.9989C50 11.1921 38.8079 0 25 0ZM25 7.47496C29.5682 7.47496 33.27 11.1779 33.27 15.7439C33.27 20.311 29.5682 24.0128 25 24.0128C20.434 24.0128 16.7322 20.311 16.7322 15.7439C16.7322 11.1779 20.434 7.47496 25 7.47496ZM24.9945 43.4617C20.4384 43.4617 16.2655 41.8025 13.0469 39.056C12.2628 38.3873 11.8104 37.4067 11.8104 36.3777C11.8104 31.7469 15.5583 28.0407 20.1902 28.0407H29.812C34.445 28.0407 38.1786 31.7469 38.1786 36.3777C38.1786 37.4078 37.7284 38.3862 36.9432 39.055C33.7257 41.8025 29.5517 43.4617 24.9945 43.4617Z"
            fill="#C7CBD1"
          />
        </svg>
      </div>
      <div class="info_user">
        <div
          class="name link"
          @click="goToUrl(dataItem.link)"
        >
          {{ dataItem.domain }}
        </div>
        <div class="detail_time">
          <span class="time">
            <feather-icon icon="ClockIcon" />{{ dataItem.publishedTime }}
          </span>
          <span
            class="link"
            @click="goToUrl(item.link)"
          >{{
            dataItem.domain
          }}</span>
        </div>
      </div>
    </div>

    <div class="content-bc-mxh">
      <!-- <div
        v-if="dataItem.title"
        class="content-title link"
        @click="goToUrl(dataItem.urlArticle)"
      >
        {{ dataItem.title }}
      </div> -->
      <div class="content-container-mxh mb-1">
        {{ content }}
        <span
          v-if="dataItem.contents.length > 300"
          class="link-232 show-more-content"
          @click="toggleShowAll"
        >
          {{ showAll ? 'Thu gọn' : 'Xem thêm' }}
        </span>
      </div>
    </div>
    <div
      v-if="dataItem.imageSources"
      :id="`image-${dataItem.id}`"
      ref="image-wrapper"
      class="content-images px-5 mb-2"
    >
      <div
        v-for="(image, index) in dataItem.imageSources.split(',')"
        :key="index"
        class="image-wrapper"
      >
        <img
          v-if="image"
          :src="image"
        >
      </div>
    </div>
    <div
      v-if="dataItem.tags"
      class="tag-list d-flex align-items-center mb-1"
    >
      <div class="tag-title">
        Chủ đề:
      </div>
      <div
        v-for="(tag, index) in dataItem.tags"
        :key="index"
        class="tag-item"
      >
        {{ tag }}
      </div>
    </div>
    <div class="action-pane d-flex">
      <div class="pane-left d-flex w-50">
        <div class="pane-item">
          <feather-icon
            icon="ThumbsUpIcon"
            class="icon-pane-item"
          />
          2350
          <!-- {{ dataItem.likes }} -->
          likes
        </div>
        <div class="pane-item pl-2">
          <feather-icon
            icon="MessageCircleIcon"
            class="icon-pane-item"
          />
          <!-- {{ dataItem.comments }}  -->
          393 bình luận
        </div>
        <div class="pane-item pl-2">
          <feather-icon
            icon="LinkIcon"
            class="icon-pane-item"
          />
          <!-- {{ dataItem.shares }} -->
          0 chia sẻ
        </div>
      </div>
      <div class="pane-right d-flex w-50 justify-content-end">
        <div class="news-similar link pr-3">
          Tin tương tự ({{ dataItem.similar }})
        </div>
        <div class="news-detail link">
          Xem chi tiết
          <feather-icon
            icon="ChevronRightIcon"
            class="icon-pane-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
      default() {
        return {}
      },
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
        ? this.dataItem.contents
        : `${this.dataItem.contents.slice(0, 299)}...`
    },
  },
  created() {
    // console.log(this.dataItem)
    // console.log(this.dataItem.imageSources.split(','))
  },
  methods: {
    // content(content) {
    //   return this.showAll ? content : `${content.slice(0, 299)}...`
    // },
    goToUrl(url) {
      window.open(url)
    },
    toggleShowAll() {
      this.showAll = !this.showAll
    },
    checkShow(content) {
      this.canShowAll = content.length > 300
    },
    errorImage(idImage) {
      setTimeout(() => {
        const idLink = `image-${idImage}`
        console.log(idLink)
        if (idLink) {
          // document.getElementById(idLink).style.display = 'none'
        }
      })
    },
  },
}
</script>

<style lang="scss">
.netview-list {
  .list-item-baochi {
    .item_box_netview {
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-bottom: 20px;
      padding: 20px 20px 0 20px;
      .header_item {
        .avatar_user {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          &.no-avatar {
            // border-radius: 50%;
            // background-color: #f2f2f2;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            svg {
              width: 50px;
              height: 50px;
              // color: #5d7085;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: contain;
          }
        }
        .info_user {
          .name {
            font-size: 16px;
            color: #40566f;
            font-weight: 700;
            margin-bottom: 3px;
            cursor: pointer;
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
              cursor: pointer;
            }
          }
        }
      }
      .content-container-mxh {
        font-size: 16px;
        .show-more-content {
          color: #5a8dee;
          cursor: pointer;
        }
      }
      .content-images {
        padding: 0 20px;
        max-width: 840px;
        margin: auto;
        display: flex;
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
            -o-object-fit: cover;
            object-fit: cover;
            -o-object-position: center;
            object-position: center;
          }
        }
      }
      .tag-list {
        .tag-title {
          color: #40566f;
          font-size: 16px;
          font-weight: 600;
        }
        .tag-item {
          background-color: rgba(90, 141, 238, 0.1);
          padding: 10px;
          color: #5a8dee;
          margin-left: 10px;
          border-radius: 6px;
          font-size: 14px;
        }
      }
      .action-pane {
        border-top: 1px solid #ddd;
        padding: 15px 0;
        .pane-item {
          color: #727e8c;
          cursor: pointer;
          .icon-pane-item {
            position: relative;
            top: -2px;
            font-size: 14px;
            color: #727e8c;
            cursor: pointer;
            svg {
              color: rgba(114, 126, 140, 0.4);
            }
          }
        }
        .pane-right {
          .news-similar {
            text-decoration: underline;
          }
          .news-detail {
            .icon-pane-item {
              top: -2.2px;
              position: relative;
            }
          }
          .link {
            color: #5a8dee;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
