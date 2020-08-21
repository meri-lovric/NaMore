<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="image " :src="post.userPost.profilePhoto" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{post.userPost.name}}</strong>
          <small>@{{post.userPost.username}}</small>
          <small>31m</small>
          <br />
          {{post.userPost.postBody}}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <font-awesome-icon icon="reply" />
            </span>
          </a>
          <a class="level-item" id="retweet2">
            <span class="icon is-small">
              <font-awesome-icon icon="retweet" />
            </span>
          </a>
          <a class="level-item" id="retweet3">
            <span class="icon is-small">
              <font-awesome-icon icon="heart" />
            </span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button @click="deleteStatus()" class="delete"></button>
    </div>
  </article>
</template>

<script>
import {posts} from "../posts.js"
export default {
  data(){
    return{ posts}
  },
  props: {
    post: Object,
  },
  methods:{
    deleteStatus(){
      this.posts.pop(this.post.userPost)
    }
  }
};
</script>
<style scoped>
.media {
  margin-bottom: 2.5rem;
}

</style>