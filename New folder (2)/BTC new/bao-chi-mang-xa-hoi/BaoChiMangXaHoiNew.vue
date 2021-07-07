<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="box-header-bc-mxh d-flex align-items-center">
      <div class="filter-bc-mxh d-flex justify-content-end w-100">
        <label class="lable-date-dn">
          <button
            v-for="(item, key) in dashboardItems"
            :key="key"
            :class="{
              'btn outline-primary-custom': true,
              active: activeDashboard === item.name ? true : false,
            }"
            @click="setDashboard(item.name)"
          >
            {{ item.label }}
          </button>
        </label>
      </div>
    </div>
    <div class="box-static-mxh row m-0 w-100 mt-2 mb-2">
      <div
        v-for="(item, key) in boxStatic"
        :key="key"
        class="item_box col-sm-4 col-xl-2 d-flex align-items-center"
      >
        <div
          class="icon-box-net"
          v-html="item.icon"
        />
        <div class="box-value pl-2">
          <div class="name">
            {{ item.name }}
          </div>
          <div :class="`value-box ${item.key}`">
            <animated-number
              :value="getDashboardData(key)"
              :format-value="formatNumber"
              :duration="1000"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="box-content-mxh row w-100 m-0 p-0">
      <div class="netview-list col-md-9 pl-0">
        <h3 class="title-netview-list mb-1">
          BÀI VIẾT NỔI BẬT
        </h3>
        <div
          v-for="(item, key) in dataBc"
          :key="key"
          class="list-item-baochi"
        >
          <ItemBaoChi :data-item="item" />
        </div>
      </div>
      <div class="box-right-netview col-md-3 pr-0">
        <div
          v-for="(item, key) in dataBox"
          :key="key"
          class="list-box-right"
        >
          <boxBaoCao :data-item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import AnimatedNumber from 'animated-number-vue'
// eslint-disable-next-line import/extensions
import ItemBaoChi from './ItemBaoChi'
// eslint-disable-next-line import/extensions
import boxBaoCao from './boxBaoCao'
// eslint-disable-next-line import/extensions
// import listData from './data.json'

export default {
  name: 'BaoChiMangXaHoi',
  components: {
    // NetView,
    // VuePerfectScrollbar,
    AnimatedNumber,
    ItemBaoChi,
    boxBaoCao,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      dataBc: [],
      dashboardItems: [
        { name: 'today', label: 'Hôm nay', value: [235, 47, 154, 0, 0, 34] },
        {
          name: 'yesterday',
          label: 'Hôm qua',
          value: [1.284, 583, 566, 0, 0, 135],
        },
        {
          name: '7days',
          label: '7 ngày trước',
          value: [9.568, 4738, 3816, 0, 0, 1014],
        },
        {
          name: '30days',
          label: '30 ngày trước',
          value: [41.502, 20637, 16723, 0, 0, 4142],
        },
      ],
      activeDashboard: 'today',
      boxStatic: [
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#39CEAD" fill-opacity="0.15"/><g clip-path="url(#clip0)"><path d="M39.16 17.1693C38.79 16.8993 38.25 16.9693 37.97 17.3393L34.96 21.2793L32.05 18.4293C31.93 18.3193 31.79 18.2393 31.63 18.1993C31.17 18.0993 30.72 18.3893 30.62 18.8493L28.59 28.2893L27.31 26.7193C27.14 26.5193 26.88 26.4093 26.6 26.4093C26.32 26.4293 26.07 26.5793 25.92 26.8093L22.88 31.7793L21.25 30.1793C21.08 30.0093 20.84 29.9193 20.6 29.9393C20.36 29.9493 20.14 30.0693 19.99 30.2493L15.19 36.1293C15.07 36.2793 15 36.4693 15 36.6593C15 36.8893 15.09 37.0993 15.25 37.2593C15.41 37.4193 15.62 37.4993 15.85 37.4993C16.11 37.4993 16.35 37.3893 16.51 37.1893L20.72 32.0493L22.45 33.7393C22.5 33.7893 22.55 33.8293 22.62 33.8693C23.02 34.0993 23.54 33.9693 23.78 33.5793L26.75 28.7193L28.39 30.7293C28.51 30.8793 28.69 30.9893 28.88 31.0193C29.34 31.1193 29.79 30.8193 29.89 30.3693L31.97 20.6993L34.46 23.1493C34.49 23.1793 34.52 23.1993 34.55 23.2293C34.92 23.4993 35.46 23.4293 35.74 23.0593L39.34 18.3493C39.48 18.1693 39.53 17.9493 39.5 17.7293C39.46 17.4993 39.34 17.2993 39.16 17.1693Z" fill="#05CB9E"/></g><defs><clipPath id="clip0"><rect width="24.5" height="20.5" fill="white" transform="translate(15 17)"/></clipPath></defs></svg>',
          name: 'Tổng tin',
          key: 'TONHTIN',
        },
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#F763A0" fill-opacity="0.15"/><path d="M22.417 26.2969H26.297V22.0547H22.9564C22.6453 23.3605 22.461 24.7981 22.417 26.2969Z" fill="#F763A1"/><path d="M27.7031 26.2969H31.5832C31.5391 24.7981 31.3549 23.3605 31.0438 22.0547H27.7031V26.2969Z" fill="#F763A1"/><path d="M32.9902 26.2969H38.9795C38.8942 24.8131 38.54 23.3802 37.9401 22.0547H32.4854C32.7766 23.3787 32.9487 24.8128 32.9902 26.2969Z" fill="#F763A1"/><path d="M21.5147 22.0547H16.0599C15.4601 23.3802 15.1058 24.8131 15.0205 26.2969H21.0098C21.0513 24.8128 21.2234 23.3787 21.5147 22.0547Z" fill="#F763A1"/><path d="M26.2973 16.5449C25.4239 16.8878 24.5744 17.8535 23.8916 19.3097C23.6954 19.7281 23.5176 20.1759 23.3584 20.6478H26.2973V16.5449Z" fill="#F763A1"/><path d="M22.6181 18.7134C23.7409 16.3188 25.2971 15 27.0002 15C23.7948 15 20.7814 16.2482 18.5148 18.5147C17.8614 19.1682 17.2931 19.884 16.8145 20.6484H21.8822C22.0925 19.9589 22.3383 19.3102 22.6181 18.7134Z" fill="#F763A1"/><path d="M31.3821 18.7134C31.6619 19.3101 31.9076 19.9589 32.1179 20.6484H37.1857C36.707 19.884 36.1387 19.1682 35.4852 18.5147C33.2188 16.2482 30.2053 15 27 15C28.703 15 30.2593 16.3188 31.3821 18.7134Z" fill="#F763A1"/><path d="M27.7031 16.5449V20.6478H30.642C30.4828 20.1759 30.305 19.7281 30.1088 19.3097C29.4261 17.8535 28.5766 16.8879 27.7031 16.5449Z" fill="#F763A1"/><path d="M15 27.7031V38.2969C15 38.6852 15.3148 39 15.7031 39H38.2969C38.6852 39 39 38.6852 39 38.2969V27.7031H15ZM21.4394 35.9713C21.1693 36.0556 20.8851 35.9516 20.7152 35.7062L18.9359 33.1298V35.461C18.9359 35.7846 18.6736 36.0469 18.35 36.0469C18.0264 36.0469 17.764 35.7846 17.764 35.461V31.2502C17.764 30.9937 17.9308 30.7671 18.1756 30.6907C18.4204 30.6143 18.6863 30.7062 18.8321 30.9172L20.7039 33.6277L20.6809 31.2479C20.6777 30.9243 20.9376 30.6595 21.2611 30.6563H21.2669C21.5879 30.6563 21.8496 30.915 21.8527 31.2366L21.8921 35.3132V35.3189C21.8922 35.6293 21.7144 35.8854 21.4394 35.9713ZM24.9452 32.7657C25.2688 32.7657 25.5312 33.028 25.5312 33.3517C25.5312 33.6753 25.2688 33.9376 24.9452 33.9376H23.8846V34.8751H25.0763C25.3999 34.8751 25.6622 35.1375 25.6622 35.461C25.6622 35.7846 25.3999 36.047 25.0763 36.047H23.2987C22.9751 36.047 22.7128 35.7846 22.7128 35.461V31.2423C22.7128 30.9187 22.9751 30.6563 23.2987 30.6563H25.0763C25.3999 30.6563 25.6622 30.9187 25.6622 31.2423C25.6622 31.5659 25.3999 31.8282 25.0763 31.8282H23.8846V32.7657H24.9452ZM32.0631 31.3644L31.2378 35.5108C31.2328 35.536 31.2262 35.5608 31.2179 35.5851C31.1246 35.8594 30.8673 36.045 30.5775 36.0469C30.576 36.0469 30.5745 36.0469 30.573 36.0469C30.2851 36.0469 30.0276 35.8653 29.9311 35.5937C29.9283 35.5859 29.9258 35.5781 29.9233 35.5702L29.203 33.2321L28.4795 35.5697C28.4779 35.5748 28.4762 35.58 28.4745 35.5851C28.3812 35.8593 28.1239 36.0449 27.8343 36.0469C27.8327 36.0469 27.8312 36.0469 27.8295 36.0469C27.5418 36.0469 27.2843 35.8654 27.1878 35.594C27.1782 35.567 27.1706 35.5394 27.165 35.5113L26.3431 31.3559C26.2803 31.0385 26.4868 30.7302 26.8043 30.6674C27.1216 30.6046 27.4299 30.811 27.4928 31.1285L27.9352 33.3651L28.6317 31.1146C28.6762 30.9162 28.8225 30.7463 29.0308 30.6822C29.34 30.5869 29.6679 30.7604 29.7632 31.0697L30.4702 33.3646L30.9138 31.1356C30.977 30.8182 31.2855 30.6123 31.6029 30.6753C31.9201 30.7385 32.1262 31.047 32.0631 31.3644ZM36.2926 34.6497C36.148 35.4593 35.3772 36.047 34.4597 36.047C33.7204 36.047 33.0263 35.7489 32.5553 35.2291C32.338 34.9893 32.3563 34.6188 32.5961 34.4015C32.8359 34.1842 33.2064 34.2025 33.4237 34.4423C33.6693 34.7133 34.0566 34.8751 34.4597 34.8751C34.8367 34.8751 35.1011 34.6558 35.139 34.4437C35.1885 34.1662 34.7567 33.9839 34.6232 33.9346C33.9671 33.6926 33.3844 33.4333 33.36 33.4223C33.3317 33.4097 33.3045 33.395 33.2787 33.3781C32.8146 33.0755 32.5754 32.5449 32.6546 31.9933C32.7388 31.407 33.1665 30.9297 33.771 30.7476C34.8866 30.4114 35.815 31.1059 35.9506 31.2143C36.088 31.3216 36.1766 31.4883 36.1766 31.676C36.1766 31.9996 35.9143 32.262 35.5906 32.262C35.4468 32.262 35.3153 32.2099 35.2132 32.124L35.2127 32.1246L35.2164 32.1277C35.2112 32.1233 34.6778 31.6982 34.109 31.8697C33.8705 31.9415 33.8236 32.0965 33.8145 32.1599C33.8085 32.2021 33.8053 32.3021 33.891 32.3758C34.047 32.4439 34.5207 32.6478 35.0287 32.8352C36.1271 33.2403 36.4018 34.0381 36.2926 34.6497Z" fill="#F763A1"/></svg>',
          name: 'Báo chí',
          key: 'BAOCHI',
        },
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#51A6F4" fill-opacity="0.15"/><path d="M29.4388 40V28.5972H33.2701L33.8449 24.152H29.4388V21.3143C29.4388 20.0277 29.7951 19.151 31.6448 19.151L34 19.15V15.174C33.5927 15.1212 32.1946 15 30.5673 15C27.1693 15 24.8429 17.0712 24.8429 20.8741V24.152H21V28.5972H24.8429V40H29.4388Z" fill="#2F80ED"/></svg>',
          name: 'Mạng xã hội',
          key: 'MANGXAHOI',
        },
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#7367F0" fill-opacity="0.15"/><path d="M18.0215 16H36.9785C38.0932 16 39 16.9068 39 18.0215V21.4355H16V18.0215C16 16.9068 16.9068 16 18.0215 16ZM35.6309 20.043C36.003 20.043 36.3047 19.7413 36.3047 19.3691C36.3047 18.9969 36.003 18.6953 35.6309 18.6953C35.2587 18.6953 34.957 18.9969 34.957 19.3691C34.957 19.7413 35.2587 20.043 35.6309 20.043ZM32.9355 20.043C33.3077 20.043 33.6094 19.7413 33.6094 19.3691C33.6094 18.9969 33.3077 18.6953 32.9355 18.6953C32.5634 18.6953 32.2617 18.9969 32.2617 19.3691C32.2617 19.7413 32.5634 20.043 32.9355 20.043ZM30.2402 20.043C30.6124 20.043 30.9141 19.7413 30.9141 19.3691C30.9141 18.9969 30.6124 18.6953 30.2402 18.6953C29.8681 18.6953 29.5664 18.9969 29.5664 19.3691C29.5664 19.7413 29.8681 20.043 30.2402 20.043Z" fill="#7367F0"/><path d="M39 22.7832V36.9785C39 38.0932 38.0932 39 36.9785 39H18.0215C16.9068 39 16 38.0932 16 36.9785V22.7832H39ZM36.3047 24.8496C36.3047 24.4772 36.0033 24.1758 35.6309 24.1758H28.8926C28.5201 24.1758 28.2188 24.4772 28.2188 24.8496V30.2402C28.2188 30.6127 28.5201 30.9141 28.8926 30.9141H35.6309C36.0033 30.9141 36.3047 30.6127 36.3047 30.2402V24.8496ZM19.3691 36.3047H35.6309C36.0033 36.3047 36.3047 36.0033 36.3047 35.6309C36.3047 35.2584 36.0033 34.957 35.6309 34.957H19.3691C18.9967 34.957 18.6953 35.2584 18.6953 35.6309C18.6953 36.0033 18.9967 36.3047 19.3691 36.3047ZM19.3691 33.6094H35.6309C36.0033 33.6094 36.3047 33.308 36.3047 32.9355C36.3047 32.5631 36.0033 32.2617 35.6309 32.2617H19.3691C18.9967 32.2617 18.6953 32.5631 18.6953 32.9355C18.6953 33.308 18.9967 33.6094 19.3691 33.6094ZM19.3691 30.9141H26.1973C26.5697 30.9141 26.8711 30.6127 26.8711 30.2402C26.8711 29.8678 26.5697 29.5664 26.1973 29.5664H19.3691C18.9967 29.5664 18.6953 29.8678 18.6953 30.2402C18.6953 30.6127 18.9967 30.9141 19.3691 30.9141ZM19.3691 28.2188H26.1973C26.5697 28.2188 26.8711 27.9174 26.8711 27.5449C26.8711 27.1725 26.5697 26.8711 26.1973 26.8711H19.3691C18.9967 26.8711 18.6953 27.1725 18.6953 27.5449C18.6953 27.9174 18.9967 28.2188 19.3691 28.2188Z" fill="#7367F0"/><path d="M29.5664 25.5234H34.957V29.5664H29.5664V25.5234Z" fill="#7367F0"/></svg>',
          name: 'Blog',
          key: 'BLOG',
        },
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#FF9F43" fill-opacity="0.15"/><path d="M19.5 21.25V16.75C19.5 16.49 19.53 16.24 19.6 16H16.75C15.79 16 15 16.79 15 17.75V22.25C15 23.21 15.79 24 16.75 24H17.12L18.4 25.7C18.54 25.88 18.75 25.99 18.97 26H19C19.22 26 19.42 25.91 19.56 25.74L21.06 24.03C20.13 23.45 19.5 22.42 19.5 21.25Z" fill="#FF9F43"/><path d="M37.2495 16H34.3995C34.4695 16.24 34.4995 16.49 34.4995 16.75V21.25C34.4995 22.42 33.8695 23.45 32.9395 24.03L34.4395 25.74C34.5795 25.91 34.7795 26 34.9995 26H35.0295C35.2495 25.99 35.4595 25.88 35.5995 25.7L36.8695 24H37.2495C38.2095 24 38.9995 23.21 38.9995 22.25V17.75C38.9995 16.79 38.2095 16 37.2495 16Z" fill="#FF9F43"/><path d="M27 25C26.991 25 26.981 25 26.972 25C26.746 24.991 26.536 24.881 26.4 24.7L25.125 23H22.75C21.785 23 21 22.215 21 21.25V16.75C21 15.785 21.785 15 22.75 15H31.25C32.215 15 33 15.785 33 16.75V21.25C33 22.215 32.215 23 31.25 23H29.09L27.564 24.744C27.422 24.907 27.216 25 27 25Z" fill="#FF9F43"/><path d="M19 32C20.1046 32 21 31.1046 21 30C21 28.8954 20.1046 28 19 28C17.8954 28 17 28.8954 17 30C17 31.1046 17.8954 32 19 32Z" fill="#FF9F43"/><path d="M21.67 33.4C20.66 34.16 20 35.38 20 36.75V37H15.75C15.34 37 15 36.66 15 36.25V35.75C15 34.23 16.23 33 17.75 33H20.25C20.77 33 21.26 33.15 21.67 33.4Z" fill="#FF9F43"/><path d="M35 32C36.1046 32 37 31.1046 37 30C37 28.8954 36.1046 28 35 28C33.8954 28 33 28.8954 33 30C33 31.1046 33.8954 32 35 32Z" fill="#FF9F43"/><path d="M39.0001 35.75V36.25C39.0001 36.66 38.6601 37 38.2501 37H34.0001V36.75C34.0001 35.38 33.3401 34.16 32.3301 33.4C32.7401 33.15 33.2301 33 33.7501 33H36.2501C37.7701 33 39.0001 34.23 39.0001 35.75Z" fill="#FF9F43"/><path d="M27 32.5C28.6569 32.5 30 31.1569 30 29.5C30 27.8431 28.6569 26.5 27 26.5C25.3431 26.5 24 27.8431 24 29.5C24 31.1569 25.3431 32.5 27 32.5Z" fill="#FF9F43"/><path d="M29.75 34H24.25C22.733 34 21.5 35.233 21.5 36.75V38.25C21.5 38.664 21.836 39 22.25 39H31.75C32.164 39 32.5 38.664 32.5 38.25V36.75C32.5 35.233 31.267 34 29.75 34Z" fill="#FF9F43"/></svg>',
          name: 'Forum',
          key: 'FORUM',
        },
        {
          icon:
            '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="27" r="27" fill="#F57168" fill-opacity="0.15"/><path d="M26.8594 15C31.8994 15 36 19.1006 36 24.1406C36 26.1352 35.37 28.0303 34.1766 29.6203L27.4228 38.7165C27.4059 38.7385 27.3802 38.7469 27.3614 38.7666C27.0239 39.128 26.5369 39.0371 26.2964 38.7165C24.3516 36.1215 20.7867 31.275 19.4161 29.4469C19.4161 29.4469 19.4156 29.4455 19.4152 29.4445L19.4067 29.4333C18.3023 27.8817 17.7187 26.0517 17.7187 24.1406C17.7187 19.1006 21.8194 15 26.8594 15ZM26.8594 29.0719C29.573 29.0719 31.7906 26.8542 31.7906 24.1406C31.7906 21.427 29.573 19.2094 26.8594 19.2094C24.1458 19.2094 21.9281 21.427 21.9281 24.1406C21.9281 26.8542 24.1458 29.0719 26.8594 29.0719Z" fill="#F57168"/></svg>',
          name: 'Nguồn khác',
          number: 235,
          key: 'NGUONKHAC',
        },
      ],
      dashboardCurent: {},
      dataBox: [
        {
          title: 'Tin tổng hợp',
          valueFb: 11.085,
          valueLike: 398.849,
          valueShare: 171,
          valueCm: 1.219,
        },
        {
          title: 'Các địa phương',
          valueFb: 11.085,
          valueLike: 398.849,
          valueShare: 171,
          valueCm: 1.219,
        },
        {
          title: 'Ủy ban nhân dân tỉnh',
          valueFb: 11.085,
          valueLike: 398.849,
          valueShare: 171,
          valueCm: 1.219,
        },
      ],
      dataNumberStatic: [],
    }
  },
  computed: {
    currentDashboard() {
      return (
        this.dashboardItems.find(item => item.name === this.activeDashboard)
          .value || []
      )
    },
  },
  created() {
    this.setDashboard('today')
    const params = {
      pageIndex: 1,
      pageSize: 15,
      keyword: '',
      fromNgayDen: '',
      toNgayDen: '',
      loaiNguonTin: 5,
    }
    // eslint-disable-next-line no-undef
    COMMON_POST(
      'http://agribank-be.chinhquyendientu.vn/api/NewsNetViews/getall',
      params,
    ).then(res => {
      this.dataBc = res.pageData
    })
  },
  methods: {
    setDashboard(name) {
      this.activeDashboard = name
      if (name === 'today') {
        const params = {
          anchorDay: '2021-05-24',
          numberOfDay: 0,
        }
        this.getApiBc(params)
      } else if (name === 'yesterday') {
        const params = {
          anchorDay: '2021-05-24',
          numberOfDay: 1,
        }
        this.getApiBc(params)
      } else if (name === '7days') {
        const params = {
          anchorDay: '2021-05-24',
          numberOfDay: 7,
        }
        this.getApiBc(params)
      } else if (name === '30days') {
        const params = {
          anchorDay: '2021-05-24',
          numberOfDay: 30,
        }
        this.getApiBc(params)
      }
    },
    getApiBc(params) {
      // eslint-disable-next-line no-undef
      COMMON_POST(
        'http://agribank-be.chinhquyendientu.vn/api/NewsNetViews/getall_statistics',
        params,
      ).then(res => {
        this.sortData(res.resultObj)
      })
    },
    getDashboardData(index) {
      return this.dataNumberStatic[index]
    },
    formatNumber: number => `${number.toFixed(0)}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
    formatDate(number) {
      let date = ''
      if (!number) {
        date = new Date()
      } else {
        date = new Date(Date.now() - number * 24 * 60 * 60 * 1000)
      }
      const result = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      console.log(result)
      return result
    },
    sortData(arr) {
      // const data = arr.sort((a, b) => a.source_id - b.source_id)
      this.dataNumberStatic = []
      // eslint-disable-next-line array-callback-return
      arr.map(item => {
        this.dataNumberStatic.push(item.total_count)
      })
    },
  },
}
</script>
<style lang="scss">
.baochi-mangxahoi {
  //   .todo-task-list-wrapper {
  //     position: relative;
  //     height: 890px;
  //   }
  .content-wrapper {
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid rgba(71, 95, 123, 0.1);
  }
  .lable-date-dn {
    background: #fff;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgba(71, 95, 123, 0.1);
  }
  .box-header-bc-mxh {
    .title-header {
      font-size: 24px;
      font-weight: 600;
    }
    .filter-bc-mxh {
      button {
        &.active {
          color: #fff;
          background-color: #5a8dee;
        }
      }
    }
  }
  .box-static-mxh {
    border: 1px solid rgba(71, 95, 123, 0.1);
    border-radius: 6px;
    background-color: #fff;
    .item_box {
      padding: 20px;
      height: 100px;
      .image-box {
        width: 45px;
        height: 45px;
        margin-right: 15px;
        img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      }
      .box-value {
        .name {
          font-size: 18px;
          font-weight: 600;
        }
        .value-box {
          font-size: 25px;
          font-weight: 600;
          &.TONGTIN {
            color: #39cead;
          }
          &.MANGXAHOI {
            color: #2f80ed;
          }
          &.BAOCHI {
            color: #f763a0;
          }
          &.FORUM {
            color: #ff9f43;
          }
          &.BLOG {
            color: #7367f0;
          }
          &.NGUONKHAC {
            color: #f57168;
          }
        }
      }
    }
  }
}
</style>
