<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Objave</h1>
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
            <button class="button" @click="searchPosts()">Pretraži</button>
          </p>
        </div>
      </h2>
      <div class="column" v-if="this.requestFinished">
        <div v-for="(post, index) in userPosts" :key="index">
          <SinglePost :post="post" :class="{ hidden: post.isHidden }" />
        </div>
        <strong>
          <p v-if="fetchedPosts == 0">Nema rezultata</p>
        </strong>
      </div>
    </div>
  </section>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import axios from "axios";
import auth from "../auth/index";
export default {
  components: { SinglePost },
  data() {
    return {
      posts: [],
      requestFinished: false,
      childMessage: 0,
      user: {},
      fetchedPosts: 1,
    };
  },
  computed: {
    userPosts: function () {
      let posts = this.posts.posts.filter(
        (post) => post.user._id == this.user._id
      );
      return posts.reverse();
    },
  },
  methods: {
    searchPosts() {
      this.fetchedPosts = 0;
      this.userPosts.forEach((post) => {
        if (!post.text.includes(this.$refs.postText.value)) {
          post.isHidden = true;
        } else {
          this.fetchedPosts++;
          post.isHidden = false;
        }
      });
      if (!this.$refs.postText.value) {
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
    self.user = auth.user.userObject;
    axios
      .get("https://na-more.netlify.app/posts/")
      .then((response) => {
        self.posts = JSON.parse(JSON.stringify(response.data));
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
.title {
  color: #6b5ca5 !important;
  font-variant: small-caps;
}
.subtitle {
  display: flex;
  justify-content: center;
}
.hidden {
  display: none;
}
.column {
  overflow-y: scroll;
  height: 45vh;
}
</style>