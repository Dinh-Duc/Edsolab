<template>
  <b-modal
    id="modal-guiketluancuochop"
    :hide-header="true"
    ok-only
    cancel-variant="outline-secondary"
    ok-title="Gửi đi"
    centered
    title=""
  >
    <div class="title-guiketluancuochop">
      Họp bầu cử ĐBQH khóa XV đơn vị số 03
    </div>
    <b-form class="from-guiketluancuochop">
      <b-form-group>
        <label for="noi_dung">Nội dung:</label>
        <b-form-textarea
          id="noi_dung"
          rows="8"
          class="box-contents-klch"
          type="text"
          placeholder="Nhập nội dung"
        />
      </b-form-group>
      <b-form-group label="Tài liệu đính kèm">
        <b-input-group class="group-file-input-dn">
          <b-form-file
            v-model="file"
            placeholder="Thả file word (.docx, .doc, .txt)"
            class="custom-file-input-dn"
            browse-text="Chọn file"
          />
        </b-input-group>
      </b-form-group>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  name: 'ActionGuiKetLuanHop',
  data() {
    return {
      file: null,
    }
  },
}
</script>
<style scoped></style>
