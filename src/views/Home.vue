<template>
<div>
  <Navigation :isActiveLogo="true" />
  <section class="section">
    <div class="container">
      <HeroTitle pageName="NaMore" pageSubtitle="Di se kupaš?" />
    </div>
  </section>
  <router-view />
  <BeachesContainer :creds="creds" />
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">Feed</h1>
        <h2 class="subtitle">
          A simple container to divide your page into
          <strong>sections</strong>, like the one you're currently reading
        </h2>
        <div class="posts">
          <div class="container" v-for="(post,index) in reversedPosts" :key="index">
            <SinglePost :post="post" />
          </div>
        </div>
      </div>
    </section>
  </body>
</div>
</template>

<script>
// @ is an alias to /src
import HeroTitle from "../components/HeroTitle";
import BeachesContainer from "../components/BeachesContainer.vue";
import SinglePost from "../components/SinglePost.vue";
import Navigation from "../components/Navigation.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    HeroTitle,
    BeachesContainer,
    SinglePost,
    Navigation,
  },
  props: {
    creds: Object,
  },
  data() {
    return {
      posts: [],
      reversedPosts: [],
    };
  },
  methods: {},
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        self.posts = JSON.parse(JSON.stringify(response.data));
        self.reversedPosts = self.posts.posts.reverse();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.posts {
  height: 45vh;
  overflow-y: scroll;
}
</style>