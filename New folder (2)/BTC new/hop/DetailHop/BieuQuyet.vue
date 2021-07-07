<template>
  <div class="box-product-meetings">
    <div class="row-meetings">
      <div class="meetings-head">
        Họp bầu cử ĐBQH khóa XV đơn vị số 03
      </div>
      <div class="row-meetings-content">
        <div class="box-head">
          Thời gian còn lại: 5 phút 30 giây
        </div>
        <div class="box-bottom">
          <div class="box-child">
            <div class="box-number">
              25
            </div>
            <div class="box-accept color-dongy">
              Đồng ý
            </div>
          </div>
          <div class="box-child">
            <div class="box-number">
              36
            </div>
            <div class="box-accept color-khongdongy">
              Không đồng ý
            </div>
          </div>
          <div class="box-child">
            <div class="box-number">
              12
            </div>
            <div class="box-accept color-khongykien">
              Không ý kiến
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default ({
  name: 'BieuQuyet',
})
</script>
<style scoped lang="scss">

.box-product-meetings{
    display: flex;
    align-content: center;
    justify-content: start;
    height: 47vh;
    padding: 1rem;

    &::-webkit-scrollbar {
        background-color: #fff;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        background-color: #fff;
    }
    &:hover {
        &::-webkit-scrollbar {
        display: block;
        }
        &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #aaa;
        }
    }

    .row-meetings{
        width: 100%;
        border-bottom: 1px solid rgba(71, 95, 123, 0.2);

        .meetings-head{
            font-weight: 600;
            padding-top: 1rem;
            padding-bottom: 0.16rem;
            font-size: 1.2rem;
        }

        .row-meetings-content{
            display: flex;
            flex-direction: column;
            padding-top: 0.56rem;
            padding-bottom: 0.56rem;

            .box-head{
                font-weight: 300;
            }

            .box-bottom{
                display: flex;
                flex-direction: row;
                align-content: center;
                justify-content: start;
                padding-top: 0.96rem;
                padding-bottom: 0.56rem;

                .box-child{
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    justify-content: center;
                    padding-right: 1rem;

                    .box-number{
                        line-height: 1.4rem;
                        width: 100%;
                        text-align: center;
                        padding-bottom: 0.56rem;
                        font-weight: 600;
                    }

                    .box-accept{
                        cursor: pointer;
                        border-radius: 0.26rem;
                        line-height: 2.52rem;
                        text-align: center;
                        vertical-align: middle;
                        color: #FFF;
                        padding: 0.26rem;
                    }
                }

                .color-dongy{
                    background: #219653;
                }
                .color-khongdongy{
                    background: #EA5455;
                }
                .color-khongykien{
                    background: #FF9F43;
                }
                .color-hethan{
                    background: #D0D2D6;
                }
            }

        }
    }

}
</style>
