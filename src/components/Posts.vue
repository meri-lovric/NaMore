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
      <div class="column" v-if="this.requestFinished">
        <div  v-for="(post, index) in userPosts" :key="index">
          <SinglePost :post="post" :class="{ hidden: post.isHidden }" />
        </div>
        <strong>
          <p>{{searchResult}}</p>
        </strong>
      </div>
    </div>
  </section>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import axios from "axios";

export default {
  props: {
    userId: String,
  },
  components: { SinglePost },
  data() {
    return {
      searchResult: "",
      posts: [],
      requestFinished: false,
      childMessage: 0,
    };
  },
  computed: {
    userPosts: function () {
      console.log(this.posts);
      return this.posts.posts.filter((post) => post.user._id == this.userId);
    },
  },
  methods: {
    searchPosts() {
      this.userPosts.forEach((post) => {
        if (!post.text.includes(this.$refs.postText.value)) {
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
    emitToParent() {
      this.childMessage = this.userPosts.length;
      this.$emit("childToParent", this.childMessage);
    },
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/posts/")
      .then((response) => {
        self.posts = JSON.parse(JSON.stringify(response.data));
        console.log(self.posts);
        this.requestFinished = true;
        this.emitToParent();
      })
      .catch((error) => {
        console.log(error);
      });
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
.column{
  display:flex;
  flex-direction: column-reverse;
}
</style>