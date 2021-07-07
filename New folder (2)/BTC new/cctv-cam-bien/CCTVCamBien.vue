<template>
  <div class="main bg-white">
    <div class="filter-top d-flex align-items-center space-x-20 mb-3 row">
      <div class="col-md-6">
        <b-form-group>
          <label class="font-semibold text-base mb-1">Tìm theo danh mục</label>
          <b-input-group
            v-click-outside="clickOut"
            class="has-popup"
          >
            <b-form-input
              v-model="keywordCat"
              type="text"
              placeholder="Nhập tên danh mục"
              @focus="statusPopupCat = true"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="ChevronDownIcon"
                class="cursor-pointer"
                size="20"
              />
            </b-input-group-append>
            <div
              v-if="statusPopupCat"
              class="popup-input"
            >
              <div class="arrow-up" />
              <ul class="parent">
                <li
                  v-for="(item, key) in dataCategory"
                  :key="key"
                >
                  <div
                    class="name"
                    @click="getDataCamp(item.id, item.categoryName)"
                  >
                    {{ item.categoryName }}
                  </div>
                  <ul
                    v-if="item.hasChildrenCategory"
                    class="child"
                  >
                    <li
                      v-for="(item1, key1) in item.childrenCategory"
                      :key="key1"
                    >
                      <div
                        class="name"
                        @click="
                          getDataCamp(item.idSubCategory, item1.subCategoryName)
                        "
                      >
                        {{ item1.subCategoryName }}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group>
          <label class="font-semibold text-base mb-1">Tìm theo keyword</label>
          <b-input-group>
            <b-form-input
              v-model="keyword"
              type="text"
              placeholder="Nhập tên danh mục"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="cursor-pointer"
                size="20"
              />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(itemcam, index) in dataCams"
        :key="'cam-' + index"
        class="col-md-3 px-10 mb-20"
      >
        <ItemGridCamera :info-cam="itemcam" />
      </div>
      <div class="text-center w-100">
        <Loading v-if="loading" />
      </div>
      <div
        v-if="dataCams.length == 0"
        class="py-4 w-100 text-center"
      >
        Không có dữ liệu
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Loading from '@core/components/loading/Loading'
// eslint-disable-next-line import/extensions
// import { UrlAPI } from '@/configs/config'
import ItemGridCamera from './ItemGridCamera.vue'

export default {
  name: 'GiamSatCamera',
  components: {
    ItemGridCamera,
    Loading,
  },
  data() {
    return {
      stationSelected: 0,
      nameSelected: 0,
      dataCams: [],
      statusPopupCat: false,
      dataCategory: [],
      keyword: '',
      loading: false,
      timeOutStatus: null,
      keywordCat: '',
    }
  },
  watch: {
    keyword(val) {
      if (val.length > 0) {
        if (this.timeOutStatus) clearTimeout(this.timeOutStatus)
        this.timeOutStatus = setTimeout(() => {
          this.search()
        }, 300)
      } else if (val.length === 0) {
        this.loading = false
        this.getDataCamp()
      } else {
        this.loading = false
      }
    },
  },
  created() {
    this.getDataCamp()
    this.getApiCategory()
  },
  methods: {
    getDataCamp(id, key) {
      this.statusPopupCat = false
      const params = {
        pageIndex: 1,
        pageSize: 15,
        searchKeyword: '',
        categoryId: id || '',
      }
      this.keywordCat = key
      // eslint-disable-next-line no-undef
      COMMON_GET(`${URLAPI}/api/Cctv/get-danhsach-camera`, params).then(res => {
        this.dataCams = res.pageData
      })
    },
    clickOut() {
      this.statusPopupCat = false
    },
    getApiCategory() {
      // eslint-disable-next-line no-undef
      COMMON_GET(`${URLAPI}/api/Cctv/get-danhsach-category-camera`, {}).then(
        res => {
          this.dataCategory = res
        },
      )
    },
    search() {
      this.loading = true
      const params = {
        pageIndex: 1,
        pageSize: 15,
        searchKeyword: this.keyword,
      }
      this.dataCams = []
      // eslint-disable-next-line no-undef
      COMMON_GET(`${URLAPI}/api/Cctv/get-danhsach-camera`, params)
        .then(res => {
          if (res.pageData.length > 0) {
            this.dataCams = res.pageData
          } else {
            this.dataCams = []
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss">
.cctv-cam-bien {
  .main {
    padding: 30px 25px;
    border-radius: 10px;
  }
  .font-semibold {
    font-weight: 600;
  }
  .text-base {
    font-size: 16px;
  }
  .v-select {
    input {
      cursor: pointer;
    }
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .item-cam {
    border: 1px solid #dbdfef;
    border-radius: 4px;
    overflow: hidden;
    .cam-thumbnail {
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
    .group-hover {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 8px 16px;
      opacity: 0;
      transform: translateY(100%);
      transition: all 0.35s ease;
    }
    .cam-name {
      color: #2e466e;
      margin-bottom: 4px;
    }
    .cam-station {
      color: #586b8b;
    }
    &:hover {
      .group-hover {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.35s ease;
      }
    }
    .group-hover {
      svg {
        width: 18px;
        height: 18px;
        // background: #fff;
        fill: #fff;
      }
    }

    .fullcam-name {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(#fff, 0.8);
      padding: 10px 30px;
      color: #000;
      display: none;
    }
    .box-name-cam {
      padding: 18px 20px;
    }

    .fullscreen {
      display: flex;
      align-items: center;
      justify-content: center;
      .actions {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(#fff, 0.8);
        padding: 10px 20px;
        color: #000;
      }
    }
  }
  .has-popup {
    position: relative;
    .popup-input {
      position: absolute;
      width: 100%;
      left: 0;
      top: 50px;
      z-index: 9;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      .arrow-up {
        position: absolute;
        left: 25px;
        transform: translateX(-50%);
        top: -8px;
        z-index: 5;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #ccc;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 1px;
          z-index: 5;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 7px solid #fff;
        }
      }
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
          cursor: pointer;
          border-bottom: 1px solid #f2f2f2;
          &:last-child {
            border-bottom: 0;
          }
          .child {
            padding-left: 15px;
          }
          .name {
            padding: 10px;
            width: 100%;
            height: 100%;
            &:hover {
              background-color: #5a8dee;
              color: #fff;
            }
          }
        }
      }
      .parent {
        max-height: 285px;
        border-radius: 6px;
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 6px;
          border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 6px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        }
        &:hover {
          &::-webkit-scrollbar {
            display: block;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
            background-color: #aaa;
          }
        }
      }
    }
    .input-group-text {
      border-right: 1px solid #ddd !important;
      border-top-right-radius: 0.357rem !important;
      border-bottom-right-radius: 0.357rem !important;
    }
  }
  .input-group {
    box-shadow: none !important;
    input {
      border-right: 0 !important;
      &:focus {
        border-color: unset !important;
        border: 1px solid #ddd !important;
        border-right: 0 !important;
        box-shadow: none !important;
        .input-group-text {
          border-color: unset !important;
          border: 1px solid #ddd !important;
        }
      }
    }
    .input-group-append {
      &:focus {
        border-color: unset !important;
        border: 1px solid #ddd !important;
        box-shadow: none !important;
      }
    }
    .input-group-text {
      &:focus {
        border-color: unset !important;
        border: 1px solid #ddd !important;
        box-shadow: none !important;
      }
    }
    .input-group-text {
      svg {
        color: #b7b4b4;
      }
    }
    .input-group-text {
      border-color: unset !important;
      border: 1px solid #ddd !important;
    }
  }
}
</style>
