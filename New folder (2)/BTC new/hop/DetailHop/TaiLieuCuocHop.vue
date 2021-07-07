<template>
  <div class="box-tailieucuatoi">
    <b-table
      small
      class="table-tailieucuatoi"
      :fields="fields"
      :items="items"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

    </b-table>
  </div>
</template>
<script>
export default ({
  name: 'TaiLieuCuocHop',
  data() {
    return {
      fields: [
        { key: 'index', label: 'STT' },
        { key: 'ten_tai_lieu', label: 'TÊN tài liệu' },
        { key: 'ten_can_bo_da_xem', label: 'TÊN CÁN BỘ đã xem' },
        { key: 'ten_can_bo_chua_xem', label: 'TÊN CÁN BỘ chưa xem' },
      ],
      items: [
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',

        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',

        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
        {
          ten_tai_lieu: 'Danh sách ứng cử viên ĐBQH',
          ten_can_bo_da_xem: 'Khuất Văn Khôi Dũng và 15 người khác',
          ten_can_bo_chua_xem: 'Hồ Thanh Sơn và 29 người khác',
        },
      ],
    }
  },
})
</script>
<style scoped lang="scss">
.box-tailieucuatoi{
    padding: 1rem;
    height: 47vh;

    .table-tailieucuatoi{
        height: 47vh;
        overflow-y: scroll;

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
