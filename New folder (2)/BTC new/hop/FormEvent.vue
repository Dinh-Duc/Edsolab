<template>
  <div class="row m-0 form-event-dn">
    <div class="col-md-6">
      <b-form-group label="Thời gian họp">
        <b-form-datepicker
          v-model="dataInsert"
          class="mb-1"
          :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }"
        />
      </b-form-group>
    </div>

    <div class="col-md-6 box-time-select">
      <div class="col-md-6">
        <b-form-group
          class="color-white"
          label=" ."
        >
          <b-form-timepicker
            v-model="time1"
            class="mb-1"
            placeholder="Chọn"
            locale="vi-VN"
          />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          class="color-white"
          label=" ."
        >
          <b-form-timepicker
            v-model="time2"
            class="mb-1"
            placeholder="Chọn"
            locale="vi-VN"
          />
        </b-form-group>
      </div>
    </div>

    <div class="col-md-6">
      <b-form-group label="Người chủ trì">
        <b-form-select
          v-model="nPhoiHop"
          :options="options"
        />
      </b-form-group>
    </div>
    <div class="col-md-6 box-nguoichutri">
      {{ nPhoiHop }}
    </div>
    <div class="col-md-6">
      <b-form-group label="Tổng số người tham dự">
        <b-form-input placeholder="Nhập số người tham dự... " />
      </b-form-group>
    </div>
    <div class="col-md-6">
      <b-form-group label="Khách quốc tế">
        <b-form-input placeholder="Nhập số khách quốc tế... " />
      </b-form-group>
    </div>

    <div class="col-md-6">
      <b-form-group label="Khách ở cơ quan bên ngoài">
        <b-form-input placeholder="Nhập số khách ở cơ quan bên ngoài" />
      </b-form-group>
    </div>
    <div class="col-md-6 box-nguoichutri" />

    <div class="col-md-6">
      <b-form-group label="Thông tin liên hệ">
        <b-form-select
          v-model="nPhoiHop"
          :options="options"
        />
      </b-form-group>
    </div>
    <div class="col-md-6 box-nguoichutri">
      {{ nPhoiHop }}
    </div>

    <div class="col-md-12 p-0 m-0">
      <div class="row m-0 p-0 d-flex align-items-center mb-1">
        <div class="col-md-3">
          Họp trực tuyến
        </div>
        <div class="col-md-3">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="btn-hoptructuyen"
          >
            Trên Google Meeting
          </b-button>
        </div>
        <div class="col-md-3">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="btn-hoptructuyen"
          >
            Trên Zoom
          </b-button>
        </div>
        <div class="col-md-3">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="btn-hoptructuyen"
          >
            Trên MS Teams
          </b-button>
        </div>
      </div>
    </div>
    <div class="col-md-12 p-0 m-0 box-footer">
      <div class="row m-0 p-0 d-flex align-items-center mb-1">
        <div class="col-md-3">
          Nội dung
        </div>
        <div class="col-md-9">
          <b-form-textarea
            placeholder="Nhập nội dung chi tiết công việc"
            rows="3"
          />
          <div class="box-sudungmaychieu">
            <b-form-checkbox
              v-model="checkbox2"
              value="A"
            >
              Sử dụng máy chiếu
            </b-form-checkbox>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="nav-contain">
        <div
          v-for="(item, idx) in listNav"
          :key="idx"
          class="nav-box"
          :class="isActive == item.name?'ActiveNav':''"
          @click="isActive = item.name"
        >
          {{ item.name }}
        </div>
      </div>
      <ThongTin v-if="isActive === 'Thông tin'" />
      <ChuongTrinhHop v-if="isActive === 'Chương trình họp'" />
      <BieuQuyet v-if="isActive === 'Biểu quyết'" />
      <TPThamGia v-if="isActive === 'Thành phần tham gia'" />
      <KetLuanHop v-if="isActive === 'Kết luận họp'" />
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  components: {
    ThongTin: () => import('./DetailHop/ThongTin.vue'),
    ChuongTrinhHop: () => import('./DetailHop/ChuongTrinhHop.vue'),
    BieuQuyet: () => import('./DetailHop/BieuQuyet.vue'),
    TPThamGia: () => import('./DetailHop/TPThamGia.vue'),
    KetLuanHop: () => import('./DetailHop/KetLuanHop.vue'),
  },
  data() {
    /* eslint-disable */
    return {
      dataInsert: {},
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      dvPhoiHop: null,
      nPhoiHop: null,
      options: [
        { value: null, text: 'Chọn cán bộ chủ trì' },
        { value: 'Cao Tiến Dũng', text: 'Cao Tiến Dũng' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
      ],
      checkbox1: 'A',
      checkbox2: '',
      file: [],
      isActive: 'Chương trình họp',
      listNav: [
          {
              name: 'Thông tin'
          },
          {
              name: 'Chương trình họp'
          },
          {
              name: 'Thành phần tham gia'
          },
          {
            name: 'Kết luận họp'
          },
          {
            name: 'Biểu quyết'
          },

      ],
    }
  },
}
</script>

<style lang="scss">
/* eslint-disable */
.form-event-dn {
  padding-top: 1.3rem;

  .box-time-select{
    display: flex;
  }

  .box-footer{
    border-bottom: 1px solid rgba(71, 95, 123, 0.2);
  }

  .color-white{
    color: #FFF;
  }

  .btn-hoptructuyen{
    width: 11.6rem;
    padding: 0.16rem 0.116rem !important;
    height: 3rem;
  }

  .box-sudungmaychieu{
    padding-top: 0.56rem;
  }

  .box-nguoichutri{
    display: flex;
    align-content: center;
    line-height: 6rem;
    justify-content: flex-start;
    vertical-align: middle;
    flex: 1;
  }

  .custom-file-input-dn {
    .custom-file-label {
      border-top-left-radius: 0.357rem !important;
      border-bottom-left-radius: 0.357rem !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
      &::after {
        display: none !important;
      }
    }
  }
  .group-file-input-dn {
    .input-group-append {
      .input-group-text {
        padding: 0.438rem 0.6em !important;
      }
    }
  }

  .nav-contain{
    display: flex;
    align-content: center;
    justify-content: flex-start;
    text-align: center;
    font-size: 1.0rem;
    padding-top: 1rem;

    .nav-box{
        cursor: pointer;
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: space-evenly;
        padding: 0.71rem;
        background: rgba(234, 238, 245, 0.5);
        border-radius: 0.29rem;
        margin-left: 0.89rem;

        &:hover{
            color: #007bff;;
        }

    }

    .ActiveNav{
        background: #5A8DEE;
        color: #FFF;

          &:hover{
            color: #FFF;
        }
    }
  }
}
</style>
