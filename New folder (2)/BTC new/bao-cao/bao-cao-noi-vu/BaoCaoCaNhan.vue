<template>
  <div class="home">
    <div class="box-contents flex-1">
      <div class="contents-notify">
        <div class="column flex flex-wrap">
          <div
            v-for="(item, index) in dataItems"
            :key="index"
            class="contents-notify__item w-1/2"
            @click="link(item.boxUrl)"
          >
            <div class="contents">
              <div class="contents-left">
                <div class="contents-title">
                  <div class="contents-title__icon">
                    <img
                      :src="item.icon"
                      alt=""
                    >
                  </div>
                  <div class="contents-title__content">
                    <div class="title-content_text">
                      {{ item.title }}
                    </div>
                  </div>
                </div>

                <div class="over-scroll">
                  <div
                    v-for="(item2, index2) in item.data"
                    :key="index2"
                    class="contents-content"
                  >
                    <div class="content-icons">
                      <img
                        :src="item2.icon"
                        alt=""
                      >
                    </div>
                    <div class="content-text">
                      {{ item2.title }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-right">
                <span :class="item.numberDanger ? 'text-danger' : ''">
                  {{ item.number }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomePage2',
  components: {},
  data() {
    return {
      dataItems: [
        {
          id: 1,
          icon: require('@/assets/images/icons/warning.svg'),
          title: 'Báo cáo khẩn',
          number: '02',
          numberDanger: true,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/warning-fire.svg'),
              title: 'Thống kê ca nhiễm covid-19 trong ngày',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/warning-accident.svg'),
              title: 'Báo cáo vi phạm quy định về cách ly và giãn cách xã hội',
              url: '#',
            },
          ],
        },
        {
          id: 2,
          icon: require('@/assets/images/icons/document.svg'),
          title: 'Báo cáo mới nhận',
          number: '09',
          numberDanger: false,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title:
                'Báo cáo thống kê số Bộ, cơ quan ngang Bộ, cơ quan trực thuộc Chính phủ có cán bộ chủ chốt là nữ',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title: 'Báo cáo thống kê số lượng biên chế được giao',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title:
                'Tổng hợp số lượng giải quyết đơn khiếu nại, tố cáo, kiến nghị, phản ánh về ngành nội vụ',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title:
                'Tổng hợp số đoàn ra nước ngoài nghiên cứu, khảo sát về lĩnh vực nội vụ',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse_blue.svg'),
              title:
                'Thống kê số lượng cán bộ, công chức, viên chức được đánh giá, phân loại',
              url: '#',
            },
          ],
        },
        {
          id: 3,
          icon: require('@/assets/images/icons/sktn.svg'),
          title: 'Báo cáo được phân công',
          number: '06',
          numberDanger: false,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/star.svg'),
              title:
                'Tổng hợp Số lượt cán bộ, công chức, viên chức được đào tạo, bồi dưỡng',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/star.svg'),
              title: 'Thống kê số đại biểu hội đồng nhân dân các cấp',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/star.svg'),
              title: 'Thống kê số lượng khen thưởng cấp nhà nước',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/star.svg'),
              title:
                'Thống kê số lượng cán bộ, công chức, viên chức bị kỷ luật',
              url: '#',
            },
          ],
        },
        {
          id: 4,
          icon: require('@/assets/images/icons/ring-nv.svg'),
          title: 'Báo cáo chờ duyệt',
          number: '12',
          numberDanger: false,
          boxUrl: '',
          data: [
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Thống kê Các cơ quan Đảng, Nhà nước, các tổ chức chính trị - xã hội có từ 30% cán bộ nữ trở lên có cán bộ chủ chốt là nữ',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title: 'Tổng hợp số lượng công chức từ cấp huyện trở lên',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Tổng hợp số đoàn của nước ngoài, tổ chức quốc tế vào nghiên cứu, khảo sát, giới thiệu về lĩnh vực nội vụ tại Việt Nam',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Tổng hợp số chức sắc, chức việc, tín đồ, cơ sở thờ tự tôn giáo',
              url: '#',
            },
            {
              icon: require('@/assets/images/icons/ellipse.svg'),
              title:
                'Thống kê số lượng văn bản chỉ đạo và hướng dẫn nghiệp vụ công tác lưu trữ',
              url: '#',
            },
          ],
        },
      ],
      dsBaoCaoGanDay: [
        'Thống kê ca nhiễm covid-19 trong ngày',
        'Báo cáo vi phạm quy định về cách ly và giãn cách xã hội',
        'Báo cáo thống kê số Bộ, cơ quan ngang Bộ, cơ quan trực thuộc Chính phủ có cán bộ chủ chốt là nữ',
        'Báo cáo thống kê số lượng biên chế được giao',
        'Tổng hợp số lượng giải quyết đơn khiếu nại, tố cáo, kiến nghị, phản ánh về ngành nội vụ',
        'Tổng hợp số đoàn ra nước ngoài nghiên cứu, khảo sát về lĩnh vực nội vụ',
        'Thống kê số lượng cán bộ, công chức, viên chức được đánh giá, phân loại',
        'Thống kê Các cơ quan Đảng, Nhà nước, các tổ chức chính trị - xã hội có từ 30% cán bộ nữ trở lên có cán bộ chủ chốt là nữ',
        'Tổng hợp số lượng công chức từ cấp huyện trở lên',
        'Tổng hợp số đoàn của nước ngoài, tổ chức quốc tế vào nghiên cứu, khảo sát, giới thiệu về lĩnh vực nội vụ tại Việt Nam',
        'Tổng hợp số chức sắc, chức việc, tín đồ, cơ sở thờ tự tôn giáo',
        'Thống kê số lượng văn bản chỉ đạo và hướng dẫn nghiệp vụ công tác lưu trữ',
      ],
    }
  },
  methods: {
    link(route) {
      this.$router.push({ name: route })
    },
    miniSidebar() {
      document.querySelector('body').classList.add('sidebar-main')
    },
  },
}
</script>
<style scoped lang="scss">
.home {
  background: var(--iq-body-bg);
  /* background-image: url('../../../assets/images/page-img/background.svg'); */
  background-repeat: no-repeat;
  background-position: center; /* Center the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  color: #475f7b;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.dark-2 .home {
  background: var(--iq-dark-2-body-bg);
  /* background-image: url('../../../assets/images/page-img/home-background-dark.svg'); */
}
.media {
  color: black;
}
h1 {
  color: white;
}
.dark-2 .contents-time {
  color: #fff !important;
}
.box-contents {
  padding-left: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 96px);
  .contents-time {
    padding: 0 30px;
    color: #475f7b;
    margin-bottom: 26px;

    &__time {
      font-weight: normal;
      font-size: 4.4rem;
      line-height: 1.25;
    }

    &__date {
      padding-left: 28px;
      .contents-time-amlich {
        svg {
          margin-right: 5px;
        }
      }
    }

    .contents-time-duonglich {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 25px;
    }
    .contents-item__right {
      .right-tabs {
        margin-top: 10px;
      }
    }
  }

  .contents-notify {
    display: flex;
    .column {
      margin-left: -8px;
      margin-right: -8px;
    }
  }
  .contents-notify__item {
    margin-bottom: 16px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .contents {
    display: flex;
    flex-direction: row;
    color: #475f7b;
    background: rgba(999, 999, 999, 1);
    backdrop-filter: blur(4px);
    cursor: pointer;
    border-radius: 10px;
    height: 100%;
    position: relative;
    .over-scroll {
      height: 60%;
      margin-top: 10px;
      overflow-x: hidden;
    }
    .contents-left {
      display: flex;
      flex-direction: column;
      width: 98%;
    }
    .content-right {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 3rem;
      margin-top: -12px;
      font-weight: 600;
      color: #475f7b;
      .text-danger {
        opacity: 1;
      }
      span {
        color: rgba(#475f7b, 0.5);
      }
    }
    .contents-title {
      padding-top: 10px;
      padding-right: 23px;
      padding-left: 16px;
      display: inline-flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.2rem;

      &__content {
        width: 100%;
        padding-left: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .contents-content {
      display: flex;
      width: 100%;
      padding-left: 44px;
      padding-right: 24px;
      padding-bottom: 7px;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;

      .content-text {
        font-size: 1rem;
        line-height: 20px;
        text-align: initial;
        padding-left: 12px;
        letter-spacing: 0.01em;
      }
    }
  }
  .contents-lich {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #475f7b;
    background: rgba(999, 999, 999, 1);
    backdrop-filter: blur(4px);
    box-shadow: 0px 0px 10px 0px #475f7b1a;
    height: 100%;
    border-radius: 10px;

    .contents-lich-title {
      padding: 10px 20px 0;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 1.2rem;
      .lich-title-content_text {
        margin-left: 12px;
        cursor: pointer;
      }
      .lich-title-content_count {
        font-size: 3rem;
        font-weight: bold;
        color: rgba(#475f7b, 0.5);
        letter-spacing: 0.01em;
        line-height: 1;
      }
      .contents-lich-title__icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #f2f4f4;
      }
      .contents-lich-number {
        position: absolute;
        font-size: 3rem;
        top: -10px;
        right: 20px;
        color: #475f7b;
      }
    }

    .contents-lich-content {
      width: 100%;
      padding: 0 20px 20px;
      font-weight: 500;
      overflow: hidden;
      .lich-content-item {
        &:not(:last-child) {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(#475f7b, 0.2);
        }
      }
      .contents-lich-content__contain {
        overflow: auto;
        height: 100%;
      }
      .lich-content-contain {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.25;
        text-align: left;
        cursor: pointer;

        svg {
          fill: #475f7b;
        }
        &__container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
        }
        &__title {
          font-size: 1rem;
          margin-bottom: 10px;
        }

        &__time {
          span {
            padding-left: 8px;
          }
          width: 50%;
          text-align: left;
        }
        &__user {
          span {
            padding-left: 8px;
          }
          width: 50%;
          text-align: left;
          margin-top: 5px;
        }
        &__room {
          span {
            padding-left: 8px;
          }
          width: 50%;
          text-align: left;
          margin-top: 5px;
        }
      }
    }
  }
}
.color-purple {
  color: #642e8e;
}
@media (min-width: 992px) {
  .acc-home-page {
    position: static;
  }
}
.dark-2 .box-header-home {
  color: #fff;
}
.dark-2 .box-notifi-content {
  color: #fff !important;
}
.dark-2 .contents,
.dark-2 .contents-lich {
  color: #fff;
  background: var(--iq-dark-2-card-bg);
}

.box-header-home {
  width: 100%;
  align-items: center;
  text-align: center;
  position: relative;
  padding-top: 10px;

  span {
    width: 100%;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
  .box-notifi {
    color: var(--iq-body-text);
    position: absolute;
    right: 0;
    top: 0;
    width: 16%;
    height: 100%;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    .box-notifi-img {
      width: 40px;
      height: 40px;
    }

    .box-notifi-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 6px;
      color: #2b486a;
      &__name {
        font-size: 1.2rem;
        line-height: 25px;
        letter-spacing: 0.01em;
        font-weight: 600;
      }
      &__rank {
        font-weight: normal;
        font-size: 0.9rem;
        line-height: 18px;
        margin-top: 4px;
      }
    }
  }
}

.w-1\/2 {
  width: 50%;
}
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.flex-1 {
  flex: 1 1 0%;
}
</style>
