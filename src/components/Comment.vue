<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-rounded is-64x64">
        <img :src="comment.photo" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.username}}</strong>
          <small>@{{comment.username}}</small>
          <br />{{comment.commentBody}}
        </p>
      </div>
    </div>
    <div class="media-right">
      <small>31m</small>
    </div>
  </article>
</template>
<script>
export default {
  props:{
    comment:Object
  }
}
</script>
<style scoped>
.media img{
  height: 64px;
    width: 64px;
    border-radius: 50%;
}
</style>