<template>
  <div class="d-flex flex-column">
    <actionItemChat
      v-for="(item, idx) in ListQuest"
      :key="idx"
      :id-e-l="`box_comment_${idx}`"
      :data="item"
      :id-cap2="item.id"
    />
  </div>
</template>
<script>

export default ({
  name: 'ActionBinhLuan',
  components: {
    actionItemChat: () => import('./actionItemChat.vue'),
  },
  props: {
    ListQuest: {
      type: Array,
    },
  },
  data() {
    return {
      dataMessages: [
        {
          id_mes: 'idmes1',
          id_phien: 1,
          id_user: 1,
          user_name: 'Nguyễn Văn A - Chánh văn phòng UBND tỉnh Đồng Nai',
          mess: 'Câu hỏi 1: Nội dung phiên gồm những gì',
          children: [
            {
              id_mes: 'idmes2',
              id_phien: 1,
              id_user: 2,
              user_name: 'Người dùng 2',
              mess: 'Câu trả lời 1.',
              children: [],
            },
            {
              id_mes: 'idmes3',
              id_phien: 1,
              id_user: 1,
              user_name: 'Người dùng 1',
              mess: 'Phản hồi câu trả lời 1.',
              children: [],
            },
          ],

        },

      ],
    }
  },

})
</script>
<style scoped>

</style>
