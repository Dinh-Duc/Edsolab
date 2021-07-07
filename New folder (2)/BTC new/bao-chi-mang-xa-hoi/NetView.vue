<template>
  <div id="NetView">
    <div class="dashboard">
      <div class="dashboard-header d-flex">
        <div class="title">
          Đồng Nai
        </div>
        <div class="ml-auto mr-0 d-flex flex-wrap filter-buttons">
          <div
            v-for="(item, index) in dashboardItems"
            :key="index"
            :class="
              `filter-button ${activeDashboard === item.name ? 'active' : ''}`
            "
            @click="setDashboard(item.name)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="dashboard-content container-fluid">
        <b-row class="dashboard-list">
          <b-col
            xl="2"
            sm="4"
          >
            <div class="dashboard-item d-flex align-items-center">
              <div class="dashboard-img">
                <img src="@/assets/images/baochi/total.png">
              </div>
              <div class="dashboard-sumerize">
                <div class="dashboard-sumerize-title">
                  Tổng tin
                </div>
                <div class="dashboard-sumerize-number">
                  <animated-number
                    :value="totalDashboard"
                    :format-value="formatNumber"
                    :duration="1000"
                  />
                </div>
              </div>
            </div>
          </b-col>
          <b-col
            v-for="(item, index) in dashboardList"
            :key="index"
            xl="2"
            sm="4"
          >
            <div class="dashboard-item d-flex align-items-center">
              <div class="dashboard-img">
                <img :src="item.image">
              </div>
              <div class="dashboard-sumerize">
                <div class="dashboard-sumerize-title ">
                  {{ item.title }}
                </div>
                <div class="dashboard-sumerize-number">
                  <animated-number
                    :value="getDashboardData(index)"
                    :format-value="formatNumber"
                    :duration="1000"
                  />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="container-fluid netview-container p-0 mt-3">
      <b-row>
        <b-col
          md="7"
          class="netview-list"
        >
          <div class="netview-item-box">
            <Item
              v-for="(item, index) in listNews"
              :key="index"
              :data="item"
            />
          </div>
        </b-col>
        <b-col
          md="5"
          class="statistic-chart-list"
        >
          <div class="statistic-container common-statistic">
            <div class="card">
              <div class="card-header">
                <h5 class="title-statistic">
                  Tin tổng hợp bộ
                </h5>
              </div>
              <div class="card-body d-flex pt-5">
                <div class="col-lg-8 d-flex flex-wrap">
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/facebook-logo.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Bài viết
                      </p>
                      <p>793</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/like-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Like
                      </p>
                      <p>2,148</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/link-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Share
                      </p>
                      <p>9</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/comment-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Comment
                      </p>
                      <p>217</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <p class="title">
                      Xu thế
                    </p>
                    <div
                      id="chart"
                      style="color:black;"
                    >
                      <apexchart
                        type="line"
                        width="182"
                        height="120"
                        :options="chartOptions"
                        :series="series"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a href="">Báo cáo chi tiết ></a>
              </div>
            </div>
          </div>
          <div class="statistic-container area-statistic">
            <div class="card">
              <div class="card-header">
                <h5 class="title-statistic">
                  Cơ quan thực hiện chức năng qlnn
                </h5>
              </div>
              <div class="card-body d-flex pt-5">
                <div class="col-lg-8 d-flex flex-wrap">
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/facebook-logo.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Bài viết
                      </p>
                      <p>328</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/like-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Like
                      </p>
                      <p>588</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/link-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Share
                      </p>
                      <p>7</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/comment-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Comment
                      </p>
                      <p>64</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <p class="title">
                      Xu thế
                    </p>
                    <div id="chart">
                      <apexchart
                        type="line"
                        width="182"
                        height="120"
                        :options="chartOptions"
                        :series="series"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a href="">Báo cáo chi tiết ></a>
              </div>
            </div>
          </div>
          <div class="statistic-container ubnd-statistic">
            <div class="card">
              <div class="card-header">
                <h5 class="title-statistic">
                  Ban lãnh đạo
                </h5>
              </div>
              <div class="card-body d-flex pt-5">
                <div class="col-lg-8 d-flex flex-wrap">
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/facebook-logo.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Bài viết
                      </p>
                      <p>41</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/like-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Like
                      </p>
                      <p>4</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/link-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Share
                      </p>
                      <p>1</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/comment-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Comment
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <p class="title">
                      Xu thế
                    </p>
                    <div
                      id="chart"
                      style="color:black;"
                    >
                      <apexchart
                        type="line"
                        width="182"
                        height="120"
                        :options="chartOptions"
                        :series="series"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a href="">Báo cáo chi tiết ></a>
              </div>
            </div>
          </div>
          <div class="statistic-container leader-statistic">
            <div class="card">
              <div class="card-header">
                <h5 class="title-statistic">
                  Các đơn vị sự nghiệp
                </h5>
              </div>
              <div class="card-body d-flex pt-5">
                <div class="col-lg-8 d-flex flex-wrap">
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/facebook-logo.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Bài viết
                      </p>
                      <p>39</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/like-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Like
                      </p>
                      <p>20</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/link-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Share
                      </p>
                      <p>1</p>
                    </div>
                  </div>
                  <div class="col-sm-6 d-flex">
                    <img
                      class="icon"
                      src="./image/comment-icon.png"
                      alt=""
                    >
                    <div>
                      <p class="title">
                        Comment
                      </p>
                      <p>2</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div>
                    <p class="title">
                      Xu thế
                    </p>
                    <div
                      id="chart"
                      style="color:black;"
                    >
                      <apexchart
                        type="line"
                        width="182"
                        height="120"
                        :options="chartOptions"
                        :series="series"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div>
                  <a href="">Báo cáo chi tiết ></a>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-container news-statistic-chart">
            <div class="card">
              <div class="card-header dashboard-header d-flex">
                <div>
                  <a
                    href=""
                    style="text-decoration:none; fontSize:20px;"
                    class="number-new"
                  >Số tin</a>
                </div>
                <div class="ml-auto mr-0 d-flex flex-wrap filter-buttons">
                  <div
                    v-for="(item, index) in chartSoTinLine"
                    :key="index"
                    :class="
                      `filter-button ${
                        activeSoTinLine === item.name ? 'active' : ''
                      }`
                    "
                    @click="setSoTinLine(item.name)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div id="chart">
                  <apexchart
                    type="line"
                    width="603"
                    height="350"
                    :options="chartOptionsLine"
                    :series="seriesLine"
                  />
                </div>
                <p style="text-align:center; fontSize:18px;">
                  Biểu đồ số tin theo sắc thái từ 05/04 - 11/04
                </p>
              </div>
            </div>
          </div>
          <div class="chart-container news-category-statistic-chart">
            <div class="card">
              <div class="card-header dashboard-header d-flex my-0">
                <div class="d-flex align-items-center">
                  <p
                    class="m-0 number-new"
                    style="fontSize:20px;"
                  >
                    Tỉ lệ tin theo sắc thái
                  </p>
                </div>
                <div
                  class="ml-auto mr-0 d-flex flex-wrap filter-buttons align-items-center"
                >
                  <div
                    v-for="(item, index) in chartSoTinPie"
                    :key="index"
                    :class="
                      `filter-height filter-button ${
                        activeSoTinPie === item.name ? 'active' : ''
                      }`
                    "
                    @click="setSoTinPie(item.name)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
              <div class="card-body pt-4">
                <div
                  id="chart"
                  class="d-flex justify-content-center"
                >
                  <apexchart
                    type="pie"
                    width="400"
                    height="256.70000000000005"
                    :options="chartOptionsPie"
                    :series="seriesPie"
                  />
                </div>
                <br>
                <p style="text-align:center; fontSize:18px;">
                  Tỷ lệ tin theo sắc thái trong ngày hôm nay
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import AnimatedNumber from 'animated-number-vue'
import data from './data.json'
// eslint-disable-next-line import/extensions
import Item from './Item'

export default {
  name: 'NetView',
  components: {
    AnimatedNumber,
    Item,
  },
  data() {
    return {
      colors: ['#1A73E8', '#B32824'],

      dashboardList: [
        {
          title: 'Mạng xã hội',
          image: require('@/assets/images/baochi/social-media.png'),
        },
        {
          title: 'Báo chí',
          image: require('@/assets/images/baochi/news.png'),
        },
        {
          title: 'Forum',
          image: require('@/assets/images/baochi/forum.png'),
        },
        {
          title: 'Blog',
          image: require('@/assets/images/baochi/blog.png'),
        },
        {
          title: 'Nguồn khác',
          image: require('@/assets/images/baochi/others.png'),
        },
      ],
      dashboardItems: [
        { name: 'today', label: 'Hôm nay' },
        { name: 'yesterday', label: 'Hôm qua' },
        { name: '7days', label: '7 ngày trước' },
        { name: '30days', label: '30 ngày trước' },
      ],
      chartSoTinLine: [
        { name: 'week', label: 'Tuần' },
        { name: 'month', label: 'Tháng' },
      ],
      chartSoTinPie: [
        { name: '1day', label: '1 Ngày' },
        { name: '3days', label: '3 Ngày' },
        { name: '7days', label: '7 Ngày' },
      ],
      activeDashboard: 'today',
      dashboardData: [
        { name: 'today', value: [47, 154, 0, 0, 34] },
        { name: 'yesterday', value: [583, 566, 0, 0, 135] },
        { name: '7days', value: [4738, 3816, 0, 0, 1014] },
        { name: '30days', value: [20637, 16723, 0, 0, 4142] },
      ],
      activeSoTinLine: 'week',
      soTinLineData: [
        { name: 'week', value: [] },
        { name: 'month', value: [] },
      ],
      activeSoTinPie: '1day',
      soTinPieData: [
        { name: '1day', value: [] },
        { name: '3days', value: [] },
        { name: '7days', value: [] },
      ],
      listNews: data,
      series: [
        {
          name: 'Số tin bài',
          data: [0, 4, 1, 3, 8, 15, 0],
        },
      ],
      chartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
          row: {
            colors: ['transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            '04/04',
            '05/04',
            '06/04',
            '07/04',
            '08/04',
            '09/04',
            '10/04',
          ],
          labels: {
            show: false,
            style: {
              colors: '#FFF',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          categories: [''],
          labels: {
            show: false,
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        stroke: {
          width: 3,
          colors: ['#475f7b'],
        },
      },
      seriesLine: [
        {
          name: 'Trung lập',
          data: [0, 90, 222, 173, 128, 183, 133],
        },
        {
          name: 'Tích cực',
          data: [0, 11, 4, 3, 2, 15, 5],
        },
        {
          name: 'Tiêu cực',
          data: [0, 0, 0, 7, 0, 4, 0],
        },
      ],
      chartOptionsLine: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5],
        },
        legend: {
          tooltipHoverFormatter: (val, opts) => {
            const value = val
            const option = opts
            // eslint-disable-next-line prefer-template
            return `${value} - ${
              option.w.globals.series[option.seriesIndex][option.dataPointIndex]
            }`
          },
        },
        markers: {
          size: 2,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            '01/04',
            '05/04',
            '06/04',
            '07/04',
            '08/04',
            '09/04',
            '10/04',
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                // eslint-disable-next-line arrow-parens
                formatter: val => {
                  const value = val
                  return value
                },
              },
            },
            {
              title: {
                formatter: val => {
                  const value = val
                  return value
                },
              },
            },
            {
              title: {
                formatter: val => {
                  const value = val
                  return value
                },
              },
            },
          ],
        },
        grid: {
          borderColor: 'grey',
        },
      },
      seriesPie: [966, 45, 11],
      chartOptionsPie: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Trung Lập', 'Tích cực', 'Tiêu cực'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 1100,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },
  computed: {
    totalDashboard() {
      return this.currentDashboard.reduce((x, item) => x + item, 0)
    },
    currentDashboard() {
      return (
        this.dashboardData.find(item => item.name === this.activeDashboard)
          .value || []
      )
    },
    totalSoTinLine() {
      return this.currentSoTinLine.reduce((x, item) => x + item, 0)
    },
    currentSoTinLine() {
      return (
        this.soTinLineData.find(item => item.name === this.activeSoTinLine)
          .value || []
      )
    },
    totalSoTinPie() {
      return this.currentSoTinPie.reduce((x, item) => x + item, 0)
    },
    currentSoTinPie() {
      return (
        this.soTinPieData.find(item => item.name === this.activeSoTinPie)
          .value || []
      )
    },
  },
  methods: {
    setDashboard(type) {
      this.activeDashboard = type
    },
    getDashboardData(index) {
      return this.currentDashboard[index]
    },
    setSoTinLine(type) {
      this.activeSoTinLine = type
    },
    setSoTinPie(type) {
      this.activeSoTinPie = type
    },
    formatNumber: number => `${number.toFixed(0)}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
  },
}
</script>

<style lang="scss" >
  .baochi-mangxahoi{
    .title-statistic {
    color: #5A8DEE;
    font-weight: 500;
    font-size: 20px;
  }
  .number-new {
    color: #5A8DEE;
  }
  .news-statistic-chart{
    .filter-button{
      height: 32px;
    }
  }
  .news-category-statistic-chart{
     .filter-button{
        height: 32px;
      }
    }
  #NetView {
    .filter-buttons {
      .active {
        background: #5A8DEE;
      }
    }
    .statistic-container {
      .card {
        border: 1px solid #eaf3fd;
        .card-header {
          padding: .75rem 1.25rem;
          background-color: #fff;
          h5{
            margin-bottom:0;
          }
        }
        .card-body {
          background: #fff;
          .title {
            color: #333;
          }
          .icon {
            background-color: #5A8DEE;
          }
        }
        .card-footer {
          background-color: #fff;
          padding: .75rem 1.25rem;
          border-top: 1px solid #eaeaea;
        }
      }
    }
    .dashboard-content {
      .dashboard-sumerize-title {
        font-size: 18px;
      }
    }
  }
  .dashboard {
    &-header {
      margin-bottom: 20px;
      .title {
        font-size: 24px;
        color: #5A8DEE;
      }
      .filter-button {
        cursor: pointer;
        color: #788db4;
        padding: 0.786rem 1.5rem;
        border-radius: 0.358rem;
        display: flex;
        align-items: center;
        &.active {
          color: #ffffff;
          background-color: #2fbfa0;
        }
      }
    }
    &-content {
      .dashboard {
        &-list {
          background-color: #fff;
          > * {
            @media (max-width: 991px) {
              border: 1px solid #748daa;
            }
            border-right: 1px solid #eaf3fd;
            border-bottom: 1px solid #eaf3fd;
          }
        }
        &-item {
          padding: 30px 5px;
        }
        &-img {
          width: 45px;
          height: 45px;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &-sumerize {
          cursor: pointer;
          &-title {
            font-size: 12px;
          }
          &-number {
            font-size: 24px;
            color: #4d5a68;
          }
        }
      }
    }
  }
  .netview {
    &-container {
      padding: 25px;
      @media (max-width: 575px) {
        flex-direction: column;
      }
      .statistic-chart-list {
        & > * {
          margin-bottom: 30px;
        }
        .chart-container {
          border: 1px solid #eaf3fd;
          border-radius: 10px;
          overflow: hidden;
          .card-header {
            background-color: #fff;
          }
        }
      }
    }
  }
  .apexcharts-menu-icon {
    display: none;
  }
  .icon {
    background-color: hsla(0, 0%, 100%, 0.4);
    width: 40px;
    height: 40px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 50%;
    font-size: 18px;
    margin-right: 10px;
  }
  .title {
    color: hsla(0, 0%, 100%, 0.8);
    margin-bottom: 0;
  }

  .card{
    margin-bottom: 0 !important;
    .card-header {
        padding: .75rem 1.25rem;
        border-bottom: 1px solid rgba(0,0,0,.125);
    }
  }
}

</style>
