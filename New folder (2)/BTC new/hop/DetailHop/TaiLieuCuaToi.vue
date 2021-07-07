<template>
  <div class="box-tailieucuatoi">
    <b-table
      small
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
  name: 'TaiLieuCuaToi',
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'STT' },
        // A column that needs custom formatting
        { key: 'ten_tai_lieu', label: 'TÊN tài liệu' },
      ],
      items: [
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',

        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',

        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
        },
        {
          ten_tai_lieu: 'Thành lập ban chỉ đạo bầu cử',
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
</style>
