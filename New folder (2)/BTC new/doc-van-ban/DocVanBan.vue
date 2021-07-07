<template>
  <div style="height: inherit">
    <b-card class="content-doc-van-ban">
      <p class="title text-upper">
        Chuyển văn bản thành giọng nói tiếng việt
      </p>
      <b-form class="form-doc-van-ban">
        <b-form-textarea
          rows="12"
          placeholder="Nhập văn bản..."
        />
        <div class="d-flex flex-wrap mt-20">
          <div class="form-label d-flex w_35 mr_10">
            <p class="w_40 text-bold">
              Giọng nói
            </p>
            <b-form-select />
          </div>
          <div class="form-label d-flex w_43 mr_2">
            <p class="w_40 text-bold">
              Chất lượng giọng
            </p>
            <b-form-select />
          </div>
          <div class="">
            <b-button
              variant="primary"
              type="submit"
              class="btn-submit"
            >
              Đọc ngay
            </b-button>
          </div>
        </div>
      </b-form>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'DocVanBan',
}
</script>
<style lang="scss">
.doc-van-ban {
  @for $i from 1 through 100 {
    .w_#{$i} {
      width: ($i/100) * 100%;
    }
    .mr_#{$i} {
      margin-right: ($i/100) * 100%;
    }
    .mt-#{$i} {
      margin-top: $i + px;
    }
  }
  .content-doc-van-ban {
    padding: 20px 100px;
  }
  .text-upper {
    text-transform: uppercase;
  }
  .title {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 30px;
  }
  .btn-submit {
    width: 130px;
  }
  .text-bold{
    font-weight: 700;
  }
}
</style>
