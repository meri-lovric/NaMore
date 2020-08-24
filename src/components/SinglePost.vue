<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img class="image" :src="post.photo" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p class="username">
          <strong>{{post.name}}</strong>
          <small>@{{post.username}}</small>
          <small>31m</small>
          <br />
        </p>
        <p class="description container">{{post.postBody}}</p>
      </div>
    </div>
    <div class="media-right " :class="{hidden:!(post.id==4)}">
      <button @click="deleteStatus()" class="delete has-background-danger"></button>
    </div>
  </article>
</template>

<script>
import { posts } from "../posts.js";
export default {
  data() {
    return { posts };
  },
  props: {
    post: Object,
  },
  methods: {
    deleteStatus() {
      this.posts.pop(this.post.userPost);
    },
  },
};
</script>
<style scoped>
.media {
  margin-bottom: 2.5rem;
  padding: 0.75rem;
  border: #eaeef3 1px solid;
}
.content {
  height: fit-content;
}
.username {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: fit-content;
}
.description {
  align-self: center;
  position: relative;
  top: -5rem;
  width: 70%;
  word-break: break-all;
}
.hidden{
  display:none;
}
.image img{
  height: 100%;
    width: 100%;
    object-fit: cover
}
</style>