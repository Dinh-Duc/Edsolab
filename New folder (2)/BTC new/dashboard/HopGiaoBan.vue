<template>
  <b-card
    v-if="data"
    no-body
    class="card-developer-meetup"
  >
    <div
      class="bg-light-primary rounded-top text-center"
      style="position: relative"
    >
      <b-img
        :src="require('@/assets/images/illustration/email.svg')"
        alt="Meeting Pic"
        height="170"
      />
      <span class="title-dash-trinh-ky">Văn bản trình ký</span>
    </div>

    <b-card-body>
      <!-- metting header -->
      <div class="meetup-header d-flex align-items-center">
        <div class="meetup-day">
          <h6 class="mb-0">
            {{ day }}
          </h6>
          <h3 class="mb-0">
            {{ date }}
          </h3>
        </div>
        <div class="my-auto">
          <b-card-title class="mb-25">
            Bạn có 12 văn bản trình ký
          </b-card-title>
        </div>
      </div>
      <!--/ metting header -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="sidebar-menu-list scroll-area"
        style="max-height: 200px"
      >
        <ul class="dasboard2-ul-vb">
          <li
            v-for="(dataDocs, index) in dataListDocs"
            :key="index"
          >
            <div class="img-trinh-ky-dash">
              <b-img :src="dataDocs.imgTrinhKy" />
            </div>
            <div class="elm-vb-db">
              <div>
                <b>{{ dataDocs.title }}</b>
                <span>{{ dataDocs.time }}</span>
              </div>
              <div>{{ dataDocs.content }}</div>
            </div>
          </li>
        </ul>
      </vue-perfect-scrollbar>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
  BCardBody,
  /* BCardText, */
  BCardTitle,
  /* BMedia, BMediaAside,  BAvatar,
  BAvatarGroup, */
  VBTooltip,
  /* BMediaBody, */
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    /* BCardText, */
    BCardTitle,
    /*  BMedia,
    BMediaAside,
    BAvatar,
    BAvatarGroup, */
    VuePerfectScrollbar,
    /* BMediaBody, */
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataListDocs: [
        {
          imgTrinhKy: require('@/assets/images/dashboard2/vb-trinh-ky.png'),
          title: 'Viện Vật lý trình ký',
          content: 'Tài liệu báo cáo',
          time: '10:00 AM',
        },
        {
          imgTrinhKy: require('@/assets/images/dashboard2/vb-trinh-ky.png'),
          title: 'Trung tâm Vũ trụ Việt Nam',
          content: 'Kết quả nghiên cứu, sản phẩm KHCN',
          time: '11:30 AM',
        },
        {
          imgTrinhKy: require('@/assets/images/dashboard2/vb-trinh-ky.png'),
          title: 'Viện Hóa học trình ký',
          content: 'Tài liệu báo cáo',
          time: '11:00 AM',
        },
        {
          imgTrinhKy: require('@/assets/images/dashboard2/vb-trinh-ky.png'),
          title: 'Ban Hợp tác quốc tế',
          content: 'Nghiên cứu thuần hóa nhập nội một số loài cây thuốc và cây tinh dầu vào Việt Nam và Belarus',
          time: '14:30 PM',
        },
      ],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
      day: '',
      date: '',
    }
  },
  created() {
    const date = new Date()
    this.day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      new Date().getDay()
    ]
    this.date = date.getDate()
  },
}
</script>
<style lang="scss">
.dasboard2-ul-vb {
  padding: 0;
}
ul.dasboard2-ul-vb li {
  width: 100%;
  float: left;
  margin-bottom: 20px;
}
span.title-dash-trinh-ky {
  position: absolute;
  width: 200px;
  left: 0;
  font-weight: 500;
  font-size: 18.993px;
  line-height: 30px;
  color: #5e5873;
  top: 6px;
}

.img-trinh-ky-dash {
  width: 48px;
  height: 48px;
  text-align: center;
  background: rgba(115, 103, 240, 0.12);
  border-radius: 6.94249px;
  padding-top: 7px;
  float: left;
}
.elm-vb-db {
  width: calc(100% - 48px);
  float: left;
  padding-left: 15px;
}
.elm-vb-db div {
  width: 100%;
  float: left;
}
.elm-vb-db div b {
  float: left;
  font-weight: 500;
  font-size: 17.439px;
  color: #5e5873;
  width: calc(100% - 80px);
}
.elm-vb-db div span {
  float: left;
  width: 80px;
  text-align: right;
  padding-top: 5px;
}
</style>
