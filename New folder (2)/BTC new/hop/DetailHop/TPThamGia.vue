<template>
  <div class="box-tpthamgia">
    <b-table
      small
      class="table-tpthamgia"
      :fields="fields"
      :items="items"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(order_status)="data">
        <b-badge
          pill
          :variant="data.value.variant"
        >
          {{ data.value.status }}
        </b-badge>
      </template>

    </b-table>
  </div>
</template>
<script>

export default ({
  name: 'TPThamGia',
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'STT' },
        // A column that needs custom formatting
        { key: 'ten_don_vi', label: 'Tên đơn vị' },
        // A column that needs custom formatting
        { key: 'ten_can_bo', label: 'Tên cán bộ' },
        // A regular column
        { key: 'vai_tro', label: 'Vai trò' },
        // A virtual column made up from two fields
        { key: 'order_status', label: '' },
      ],
      items: [
        {
          ten_don_vi: 'Phòng Tổng hợp - Nội chính',
          ten_can_bo: 'Khuất Văn Khôi Dũng',
          order_status: { status: 'Tham dự', variant: 'success' },
          vai_tro: 'Khách mời',
        },
        {
          ten_don_vi: 'Phòng Tổng hợp - Nội chính',
          ten_can_bo: 'Khuất Văn Khôi Dũng',
          order_status: { status: 'Tham dự', variant: 'success' },
          vai_tro: 'Khách mời',
        },
        {
          ten_don_vi: 'Phòng Tổng hợp - Nội chính',
          ten_can_bo: 'Khuất Văn Khôi Dũng',
          order_status: { status: 'Tham dự', variant: 'success' },
          vai_tro: 'Khách mời',
        },
        {
          ten_don_vi: 'Phòng Tổng hợp - Nội chính',
          ten_can_bo: 'Khuất Văn Khôi Dũng',
          order_status: { status: 'Xác nhận tham dự', variant: 'warning' },
          vai_tro: 'Khách mời',
        },
        {
          ten_don_vi: 'Phòng Tổng hợp - Nội chính',
          ten_can_bo: 'Khuất Văn Khôi Dũng',
          order_status: { status: 'Không tham dự', variant: 'danger' },
          vai_tro: 'Khách mời',
        },
      ],
    }
  },
})
</script>
<style scoped lang="scss">
.box-tpthamgia{
    padding: 1rem;

    .table-tpthamgia{
        height: 47vh;
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
    }
}
</style>
