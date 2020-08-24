<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Posts</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              @keyup="searchPosts()"
              ref="postText"
              type="text"
              placeholder="Pretraži objave"
            />
          </p>
          <p class="control">
            <button class="button" @click="searchPosts()">Search</button>
          </p>
        </div>
      </h2>
      <div v-for="(userPost, index) in userPosts" :key="index">
        <SinglePost :post="userPost" :class="{ hidden: userPost.isHidden }" />
      </div>
      <strong><p >{{searchResult}}</p></strong>
    </div>
  </section>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import { posts } from "../posts.js";
export default {
  props: {
    userId: Number,
  },
  components: { SinglePost },
  data() {
    return { posts, searchResult: "" };
  },
  computed: {
    userPosts: function () {
      return this.posts.filter((post) => post.id == this.userId);
    },
  },
  methods: {
    searchPosts() {
      this.userPosts.forEach((post) => {
        if (!post.postBody.includes(this.$refs.postText.value)) {
          post.isHidden = true;
          this.searchResult = "Nema rezultata";
        } else {
          this.searchResult = "";
        }
      });
      if (this.$refs.postText.value === "") {
        this.userPosts.forEach((post) => {
          post.isHidden = false;
        });
      }
    },
  },
};
</script>
<style scoped>
.subtitle {
  display: flex;
  justify-content: center;
}
.hidden {
  display: none;
}
</style>