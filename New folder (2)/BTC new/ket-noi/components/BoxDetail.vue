<template>
  <div class="box-detail">
    <!-- image - scroll -->
    <div class="detail-img-carousel">
      <div class="img-to">
        <img
          src="@/assets/images/KetNoi/detail-img-to.png"
          alt=""
        >
      </div>
      <div class="list-img-con">
        <img
          src="@/assets/images/KetNoi/detail-img1.png"
          alt=""
        >
        <img
          src="@/assets/images/KetNoi/detail-img-2.png"
          alt=""
        >
        <img
          src="@/assets/images/KetNoi/detail-img-3.png"
          alt=""
        >
        <img
          src="@/assets/images/KetNoi/detail-img-4.png"
          alt=""
        >
        <img
          src="@/assets/images/KetNoi/detail-img-5.png"
          alt=""
        >
      </div>
    </div>

    <!-- Content-detail -->
    <div class="base-info-detail">
      <div class="elm-line-detail">
        <b>Chương trình 'Camera Y tế': Đến với Bệnh viện Đại học Y dược Shing
          Mark...</b>
        <div
          class="action-edit"
          @click="editSuKien()"
        >
          <img
            src="@/assets/images/KetNoi/edit-ketnoi.svg"
            alt=""
          >
        </div>
      </div>
      <div class="elm-line-detail">
        <div class="lock-info">
          <div class="svn-w">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM14.4 8C14.4 11.5346 11.5346 14.4 8 14.4C4.46538 14.4 1.6 11.5346 1.6 8C1.6 4.46538 4.46538 1.6 8 1.6C11.5346 1.6 14.4 4.46538 14.4 8ZM8.8 5.2C8.8 4.75817 8.44183 4.4 8 4.4C7.55817 4.4 7.2 4.75817 7.2 5.2V7.8C7.2 8.35229 7.64772 8.8 8.2 8.8H11.6C12.0418 8.8 12.4 8.44183 12.4 8C12.4 7.55817 12.0418 7.2 11.6 7.2H8.8V5.2Z"
                fill="#727E8C"
                fill-opacity="0.5"
              />
            </svg>
          </div>
          <span class="text-elm-info">09:00</span>
        </div>
        <div class="day-info">
          <div class="confix-right">
            <div class="svn-w">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5703 8.08594C13.9586 8.08594 14.2734 7.77114 14.2734 7.38281C14.2734 6.99449 13.9586 6.67969 13.5703 6.67969C13.182 6.67969 12.8672 6.99449 12.8672 7.38281C12.8672 7.77114 13.182 8.08594 13.5703 8.08594Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M15.1875 1.40625H14.2734V0.703125C14.2734 0.314789 13.9586 0 13.5703 0C13.182 0 12.8672 0.314789 12.8672 0.703125V1.40625H9.66797V0.703125C9.66797 0.314789 9.35318 0 8.96484 0C8.57651 0 8.26172 0.314789 8.26172 0.703125V1.40625H5.09766V0.703125C5.09766 0.314789 4.78287 0 4.39453 0C4.0062 0 3.69141 0.314789 3.69141 0.703125V1.40625H2.8125C1.26169 1.40625 0 2.66794 0 4.21875V15.1875C0 16.7383 1.26169 18 2.8125 18H8.19141C8.57974 18 8.89453 17.6852 8.89453 17.2969C8.89453 16.9085 8.57974 16.5938 8.19141 16.5938H2.8125C2.03709 16.5938 1.40625 15.9629 1.40625 15.1875V4.21875C1.40625 3.44334 2.03709 2.8125 2.8125 2.8125H3.69141V3.51562C3.69141 3.90396 4.0062 4.21875 4.39453 4.21875C4.78287 4.21875 5.09766 3.90396 5.09766 3.51562V2.8125H8.26172V3.51562C8.26172 3.90396 8.57651 4.21875 8.96484 4.21875C9.35318 4.21875 9.66797 3.90396 9.66797 3.51562V2.8125H12.8672V3.51562C12.8672 3.90396 13.182 4.21875 13.5703 4.21875C13.9586 4.21875 14.2734 3.90396 14.2734 3.51562V2.8125H15.1875C15.9629 2.8125 16.5938 3.44334 16.5938 4.21875V8.22656C16.5938 8.6149 16.9085 8.92969 17.2969 8.92969C17.6852 8.92969 18 8.6149 18 8.22656V4.21875C18 2.66794 16.7383 1.40625 15.1875 1.40625Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M13.7461 9.49219C11.4005 9.49219 9.49219 11.4005 9.49219 13.7461C9.49219 16.0917 11.4005 18 13.7461 18C16.0917 18 18 16.0917 18 13.7461C18 11.4005 16.0917 9.49219 13.7461 9.49219ZM13.7461 16.5938C12.1759 16.5938 10.8984 15.3163 10.8984 13.7461C10.8984 12.1759 12.1759 10.8984 13.7461 10.8984C15.3163 10.8984 16.5938 12.1759 16.5938 13.7461C16.5938 15.3163 15.3163 16.5938 13.7461 16.5938Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M14.7656 13.043H14.4492V12.3047C14.4492 11.9164 14.1344 11.6016 13.7461 11.6016C13.3578 11.6016 13.043 11.9164 13.043 12.3047V13.7461C13.043 14.1344 13.3578 14.4492 13.7461 14.4492H14.7656C15.154 14.4492 15.4688 14.1344 15.4688 13.7461C15.4688 13.3578 15.154 13.043 14.7656 13.043Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M10.5117 8.08594C10.9 8.08594 11.2148 7.77114 11.2148 7.38281C11.2148 6.99449 10.9 6.67969 10.5117 6.67969C10.1234 6.67969 9.80859 6.99449 9.80859 7.38281C9.80859 7.77114 10.1234 8.08594 10.5117 8.08594Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M7.45312 11.1445C7.84145 11.1445 8.15625 10.8297 8.15625 10.4414C8.15625 10.0531 7.84145 9.73828 7.45312 9.73828C7.0648 9.73828 6.75 10.0531 6.75 10.4414C6.75 10.8297 7.0648 11.1445 7.45312 11.1445Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M4.39453 8.08594C4.78286 8.08594 5.09766 7.77114 5.09766 7.38281C5.09766 6.99449 4.78286 6.67969 4.39453 6.67969C4.00621 6.67969 3.69141 6.99449 3.69141 7.38281C3.69141 7.77114 4.00621 8.08594 4.39453 8.08594Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M4.39453 11.1445C4.78286 11.1445 5.09766 10.8297 5.09766 10.4414C5.09766 10.0531 4.78286 9.73828 4.39453 9.73828C4.00621 9.73828 3.69141 10.0531 3.69141 10.4414C3.69141 10.8297 4.00621 11.1445 4.39453 11.1445Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M4.39453 14.2031C4.78286 14.2031 5.09766 13.8883 5.09766 13.5C5.09766 13.1117 4.78286 12.7969 4.39453 12.7969C4.00621 12.7969 3.69141 13.1117 3.69141 13.5C3.69141 13.8883 4.00621 14.2031 4.39453 14.2031Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M7.45312 14.2031C7.84145 14.2031 8.15625 13.8883 8.15625 13.5C8.15625 13.1117 7.84145 12.7969 7.45312 12.7969C7.0648 12.7969 6.75 13.1117 6.75 13.5C6.75 13.8883 7.0648 14.2031 7.45312 14.2031Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
                <path
                  d="M7.45312 8.08594C7.84145 8.08594 8.15625 7.77114 8.15625 7.38281C8.15625 6.99449 7.84145 6.67969 7.45312 6.67969C7.0648 6.67969 6.75 6.99449 6.75 7.38281C6.75 7.77114 7.0648 8.08594 7.45312 8.08594Z"
                  fill="#727E8C"
                  fill-opacity="0.5"
                />
              </svg>
            </div>
            <span class="text-elm-info">T3, 23/05/2021</span>
          </div>
        </div>
      </div>
      <div class="elm-line-detail">
        <div class="svn-w">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C5.87827 0 3.84344 0.862011 2.34315 2.3964C0.842855 3.93079 0 6.01187 0 8.18182C0 9.10601 0.0958782 9.92012 0.345812 10.6913C0.597059 11.4665 0.989277 12.153 1.52861 12.8413C1.53574 12.8504 1.54304 12.8593 1.5505 12.8681L7.32828 19.6863C7.49711 19.8855 7.74221 20 8 20C8.25779 20 8.50289 19.8855 8.67172 19.6863L14.4495 12.8681C14.457 12.8593 14.4643 12.8504 14.4714 12.8413C15.0107 12.153 15.4029 11.4665 15.6542 10.6913C15.9041 9.92012 16 9.10601 16 8.18182C16 6.01187 15.1571 3.93079 13.6569 2.3964C12.1566 0.862011 10.1217 0 8 0ZM3.60022 3.68205C4.76712 2.48863 6.34976 1.81818 8 1.81818C9.65024 1.81818 11.2329 2.48863 12.3998 3.68205C13.5667 4.87546 14.2222 6.49408 14.2222 8.18182C14.2222 8.97762 14.1394 9.58624 13.9667 10.1192C13.7966 10.6439 13.5252 11.139 13.0946 11.6909L8 17.7028L2.90544 11.6909C2.4748 11.139 2.20335 10.6439 2.0333 10.1192C1.86057 9.58624 1.77778 8.97762 1.77778 8.18182C1.77778 6.49408 2.43333 4.87546 3.60022 3.68205ZM6.22222 8.18182C6.22222 7.17766 7.01816 6.36364 8 6.36364C8.98184 6.36364 9.77778 7.17766 9.77778 8.18182C9.77778 9.18597 8.98184 10 8 10C7.01816 10 6.22222 9.18597 6.22222 8.18182ZM8 4.54545C6.03632 4.54545 4.44444 6.17351 4.44444 8.18182C4.44444 10.1901 6.03632 11.8182 8 11.8182C9.96368 11.8182 11.5556 10.1901 11.5556 8.18182C11.5556 6.17351 9.96368 4.54545 8 4.54545Z"
              fill="#727E8C"
              fill-opacity="0.5"
            />
          </svg>
        </div>
        <span
          class="text-elm-info"
        >1054 QL51, Long Bình Tân, TP Hồ Chí Minh</span>
      </div>
      <div class="elm-line-detail">
        <div class="svn-w">
          <svg
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6875 16C19.6875 16 21 16 21 14.6667C21 13.3333 19.6875 9.33333 14.4375 9.33333C9.1875 9.33333 7.875 13.3333 7.875 14.6667C7.875 16 9.1875 16 9.1875 16H19.6875ZM9.21637 14.6667C9.20668 14.6653 9.19705 14.6635 9.1875 14.6613C9.18881 14.3093 9.40669 13.288 10.185 12.368C10.9095 11.5053 12.1826 10.6667 14.4375 10.6667C16.6911 10.6667 17.9642 11.5067 18.69 12.368C19.4683 13.288 19.6849 14.3107 19.6875 14.6613L19.677 14.664C19.6709 14.665 19.6648 14.6659 19.6586 14.6667H9.21637ZM14.4375 6.66667C15.1337 6.66667 15.8014 6.38572 16.2937 5.88562C16.7859 5.38552 17.0625 4.70724 17.0625 4C17.0625 3.29276 16.7859 2.61448 16.2937 2.11438C15.8014 1.61428 15.1337 1.33333 14.4375 1.33333C13.7413 1.33333 13.0736 1.61428 12.5813 2.11438C12.0891 2.61448 11.8125 3.29276 11.8125 4C11.8125 4.70724 12.0891 5.38552 12.5813 5.88562C13.0736 6.38572 13.7413 6.66667 14.4375 6.66667ZM18.375 4C18.375 4.52529 18.2732 5.04543 18.0753 5.53073C17.8774 6.01604 17.5874 6.45699 17.2217 6.82843C16.8561 7.19986 16.422 7.4945 15.9443 7.69552C15.4666 7.89654 14.9546 8 14.4375 8C13.9204 8 13.4084 7.89654 12.9307 7.69552C12.453 7.4945 12.0189 7.19986 11.6533 6.82843C11.2876 6.45699 10.9976 6.01604 10.7997 5.53073C10.6018 5.04543 10.5 4.52529 10.5 4C10.5 2.93913 10.9148 1.92172 11.6533 1.17157C12.3917 0.421427 13.3932 0 14.4375 0C15.4818 0 16.4833 0.421427 17.2217 1.17157C17.9602 1.92172 18.375 2.93913 18.375 4ZM9.1035 9.70667C8.57848 9.53872 8.03727 9.42831 7.48912 9.37733C7.18112 9.34758 6.87189 9.3329 6.5625 9.33333C1.3125 9.33333 0 13.3333 0 14.6667C0 15.556 0.437063 16 1.3125 16H6.846C6.65143 15.5838 6.55439 15.1274 6.5625 14.6667C6.5625 13.32 7.05731 11.944 7.99312 10.7947C8.31206 10.4027 8.6835 10.036 9.1035 9.70667ZM6.4575 10.6667C5.6807 11.8524 5.26108 13.2424 5.25 14.6667H1.3125C1.3125 14.32 1.52775 13.2933 2.31 12.368C3.02531 11.52 4.26825 10.6933 6.4575 10.668V10.6667ZM1.96875 4.66667C1.96875 3.6058 2.38359 2.58839 3.12202 1.83824C3.86044 1.08809 4.86196 0.666667 5.90625 0.666667C6.95054 0.666667 7.95206 1.08809 8.69048 1.83824C9.42891 2.58839 9.84375 3.6058 9.84375 4.66667C9.84375 5.72753 9.42891 6.74495 8.69048 7.49509C7.95206 8.24524 6.95054 8.66667 5.90625 8.66667C4.86196 8.66667 3.86044 8.24524 3.12202 7.49509C2.38359 6.74495 1.96875 5.72753 1.96875 4.66667ZM5.90625 2C5.21006 2 4.54238 2.28095 4.05009 2.78105C3.55781 3.28115 3.28125 3.95942 3.28125 4.66667C3.28125 5.37391 3.55781 6.05219 4.05009 6.55229C4.54238 7.05238 5.21006 7.33333 5.90625 7.33333C6.60244 7.33333 7.27012 7.05238 7.76241 6.55229C8.25469 6.05219 8.53125 5.37391 8.53125 4.66667C8.53125 3.95942 8.25469 3.28115 7.76241 2.78105C7.27012 2.28095 6.60244 2 5.90625 2Z"
              fill="#727E8C"
              fill-opacity="0.5"
            />
          </svg>
        </div>
        <span class="text-elm-info">Huỳnh Minh Hoàn Nghĩa</span>
      </div>
    </div>

    <div class="content-detail">
      <span>
        Với tổng kinh phí đầu tư lên đến hơn 6,4 ngàn tỉ đồng, Bệnh viện Đại học
        Y dược Shing Mark được đánh giá là một trong số các bệnh viện có quy mô
        đầu tư lớn nhất ở tỉnh Đồng Nai, và là bệnh viện tư nhân có vốn đầu tư
        nước ngoài lớn nhất tại Việt Nam. Là Công trình tri ân mà Ông Chao Chung
        Lee, người sáng lập Tập đoàn Shing Mark (Đài Loan) dành tặng cho Việt
        Nam với mục đích xây dựng một bệnh viện quy mô, hiện đại, chất lượng
        tốt, chi phí rẻ và ưu tiên cho người bệnh nghèo để tri ân và góp chút
        sức lực cho “ngôi nhà” thứ 2 của mình” Tất cả Vì Bệnh Nhân, Phục Vụ Bệnh
        Nhân Tốt Nhất là tiêu chí hàng đầu mà Bệnh Viện ĐHYD Shing Mark hướng
        đến. Luôn đặt mình vào vị trí của người bệnh để có thể thấu hiểu tâm tư
        & nỗi lòng của bệnh nhân, qua đó hướng đến việc chăm sóc bệnh nhân 1
        cách tốt nhất. Từng ngày, từng giờ Bệnh Viện ĐHYD Shing Mark đang phấn
        đấu để trở thành nơi mà tất cả người bệnh & người nhà bệnh nhân có thể
        an tâm đặt trọn niềm tin khi đến khám chữa bệnh tại đây. Cùng Camera Y
        Tế tham quan một vòng Bệnh viện thông qua chương trình Camera Y tế:
        “Bệnh viện Đại học Y Dược TPHCM - Bệnh Viện Tư Nhân Có Vốn Đầu Tư Nước
        Ngoài Lớn Nhất Việt Nam”. Chương trình do Đài Tuổi trẻ phối hợp cùng
        Bệnh Viện ĐHYD Shing Mark thực hiện. Với tổng kinh phí đầu tư lên đến
        hơn 6,4 ngàn tỉ đồng, Bệnh viện Đại học Y dược Shing Mark được đánh giá
        là một trong số các bệnh viện có quy mô đầu tư lớn nhất ở tỉnh Đồng Nai,
        và là bệnh viện tư nhân có vốn đầu tư nước ngoài lớn nhất tại Việt Nam.
        Là Công trình tri ân mà Ông Chao Chung Lee, người sáng lập Tập đoàn
        Shing Mark (Đài Loan) dành tặng cho Việt Nam với mục đích xây dựng một
        bệnh viện quy mô, hiện đại, chất lượng tốt, chi phí rẻ và ưu tiên cho
        người bệnh nghèo để tri ân và góp chút sức lực cho “ngôi nhà” thứ 2 của
        mình” Tất cả Vì Bệnh Nhân, Phục Vụ Bệnh Nhân Tốt Nhất là tiêu chí hàng
        đầu mà Bệnh Viện ĐHYD Shing Mark hướng đến. Luôn đặt mình vào vị trí của
        người bệnh để có thể thấu hiểu tâm tư & nỗi lòng của bệnh nhân, qua đó
        hướng đến việc chăm sóc bệnh nhân 1 cách tốt nhất. Từng ngày, từng giờ
        Bệnh Viện ĐHYD Shing Mark đang phấn đấu để trở thành nơi mà tất cả người
        bệnh & người nhà bệnh nhân có thể an tâm đặt trọn niềm tin khi đến khám
        chữa bệnh tại đây. Cùng Camera Y Tế tham quan một vòng Bệnh viện thông
        qua chương trình Camera Y tế: “Bệnh viện Đại học Y Dược TPHCM - Bệnh
        Viện Tư Nhân Có Vốn Đầu Tư Nước Ngoài Lớn Nhất Việt Nam”. Chương trình
        do Đài Tuổi trẻ phối hợp cùng Bệnh Viện ĐHYD Shing Mark thực hiện.
      </span>
    </div>

    <b-modal
      id="modal-event-add2"
      centered
      scrollable
      size="lg"
      modal-class="modal-calendar custom-form-model-dn custom-ketnoi-pop"
    >
      <CreateOrUpdatePop />
    </b-modal>
  </div>
</template>
<script>
import CreateOrUpdatePop from './CreateOrUpdatePop.vue'

export default {
  name: 'BoxDetail',
  components: {
    CreateOrUpdatePop,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    editSuKien() {
      this.$bvModal.show('modal-event-add2')
    },
  },
}
</script>
<style lang="scss">
.ket-noi {
  .detail-img-carousel {
    width: 610px;
    float: left;
    margin-bottom: 20px;
  }
  .img-to {
    width: 100%;
    float: left;
  }
  .list-img-con {
    width: 100%;
    float: left;
    margin-top: 15px;
  }
  .list-img-con img {
    margin-right: 15px;
  }
  .base-info-detail {
    width: calc(100% - 610px);
    float: left;
  }
  .elm-line-detail {
    width: 100%;
    float: left;
    margin-bottom: 15px;
  }
  .elm-line-detail b {
    width: calc(100% - 30px);
    float: left;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: #40566f;
  }
  .elm-line-detail .action-edit {
    width: 30px;
    height: 30px;
    float: left;
    cursor: pointer;
  }
  .elm-line-detail .text-elm-info {
    width: calc(100% - 30px);
    float: left;
    padding-top: 1px;
  }
  .content-detail span {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 27px;
    color: #727e8c;
  }
}
</style>
