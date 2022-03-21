<template>
  <div>
    <div class="">
      <file-upload
        ref="coverImg"
        v-model="articleVm.coverImage"
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        name="avatar"
        class=""
        post-action="/upload/post"
        :drop="false"
        @input-filter="coverFilter"
        @input-file="coverFile"
      >
        Upload avatar
      </file-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverUpload',
}
</script>