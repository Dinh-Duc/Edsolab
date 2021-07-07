<template>
  <b-card
    v-if="data"
    class="card-transaction"
    no-body
    @click="$router.push('apps/bao-chi-mang-xa-hoi')"
  >
    <b-card-header>
      <b-card-title>Báo chí - mạng xã hội</b-card-title>

      <b-dropdown
        variant="link"
        no-caret
        class="chart-dropdown"
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="text-body cursor-pointer"
          />
        </template>
        <b-dropdown-item href="#">
          28 ngày trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Tháng trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Năm trước
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Chỉ đạo
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in data"
        :key="transaction.mode"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-img :src="transaction.avatar" />
          </b-media-aside>
          <b-media-body>
            <h6
              class="transaction-title"
              style="padding-top: 12px;"
            >
              {{ transaction.mode }}
            </h6>
            <!-- <small>{{ transaction.types }}</small> -->
          </b-media-body>
        </b-media>
        <div class="font-weight-bolder">
          {{ transaction.payment }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  /* BAvatar, */
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    /* BAvatar, */
    BDropdown,
    BDropdownItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
