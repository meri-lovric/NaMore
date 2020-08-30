<template>
<div>
  <Navigation :isActiveLogo="true" />
  <section class="section">
    <div class="container">
      <HeroTitle pageName="NaMore" pageSubtitle="Di se kupaš?" />
    </div>
  </section>
  <router-view />
  <BeachesContainer />
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">Feed</h1>
        <h2 class="subtitle">
          A simple container to divide your page into
          <strong>sections</strong>, like the one you're currently reading
        </h2>
        <div class="container" v-for="(post,index) in posts.posts" :key="index">
          <SinglePost :post="post" />
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
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        self.posts = JSON.parse(JSON.stringify(response.data));
        console.log(self.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>