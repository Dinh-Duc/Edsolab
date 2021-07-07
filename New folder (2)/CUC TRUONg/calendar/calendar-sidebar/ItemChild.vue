<template>
  <div
    role="button"
    class="event-sidebarleft align-items-center w-100 pl-2"
  >
    <div
      class="d-flex flex-row align-items-center pl-1 w-100"
      :class="{ active: isActiveLeftSideBarLich === dataMenu.id }"
      @click="
        actionGetAndCountDonVI(dataMenu.id);
        $store.dispatch(
          'lichlamviec/actionIsActiveLeftSideBarLich',
          dataMenu.id
        );
        isActiveShow = !isActiveShow;
      "
    >
      <div class="w-10">
        <svg
          v-svg
          symbol="icon-layer"
          size="12 12"
        />
      </div>
      <span class="ml-1">{{ dataMenu.tenDonVi }}</span>
      <b-badge
        pill
        class="ml-auto d-flex justify-content-center align-items-center"
      >
        <span>{{ dataMenu.count }}</span>
      </b-badge>
    </div>
    <div
      v-if="dataMenu.children && dataMenu.children.length > 0 && isActiveShow"
      class="d-flex flex-column mt-1 pb-1"
    >
      <ItemChild
        v-for="item in dataMenu.children"
        :key="item.tenDonVi"
        :class="{ active: isActiveLeftSideBarLich === item.id }"
        :data-menu="item"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getLeftSideBar } from "@/api/calendar/indexNew";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "ItemChild",
  data() {
    return {
      isActiveShow: false,
      paramPayload: {
        DateFrom: moment().startOf("month").format("YYYY-MM-DD"),
        DateTo: moment().endOf("month").format("YYYY-MM-DD"),
        CanBoId: "",
        DonViId: null,
        Type: -1,
        PageIndex: 1,
        PageSize: 1000,
      },
      dataDonVi: [],
      payload: {
        DonViId: null,
      },
    };
  },
  props: {
    dataMenu: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      isActiveLeftSideBarLich: "lichlamviec/isActiveLeftSideBarLich",
    }),
  },
  methods: {
    actionGetAndCountDonVI(val) {
      this.paramPayload.CanBoId = null;
      this.paramPayload.Type = 1;
      this.paramPayload.DonViId = val;
      this.$store.dispatch("lichlamviec/getListEvents", this.paramPayload);

      this.payload.DonViId = val;

      getLeftSideBar(this.payload)
        .then((data) => {
          this.dataDonVi = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
</style>