<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered" @click="changeChildMessage(1)">
      <div>
        <p class="heading">Statusi</p>
        <p class="title">{{statusNum}}</p>
      </div>
    </div>
    <div class="level-item has-text-centered" @click="changeChildMessage(2)">
      <div>
        <p class="heading">Plaže</p>
        <p class="title">{{galleryNum}}</p>
      </div>
    </div>
    <div class="level-item has-text-centered" @click="changeChildMessage(3)">
      <div>
        <p class="heading">Omiljene</p>
        <p class="title">{{likedNum}}</p>
      </div>
    </div>
  </nav>
</template>
<script>
import { posts } from "../posts.js";
import { users } from "../users.js";
import { beaches } from "../seed.js";
export default {
  data() {
    return { posts, users, beaches, beachesNumber: 0 };
  },
  props: {
    galleryNum: Number,
    likedNum: Number,
    statusNum: Number,
  },
  computed: {
    postsNumber: function () {
      let userPosts = this.posts.filter((post) => post.id === this.userId);
      return userPosts.length;
    },
    likedNumber: function () {
      return this.users.length;
    },
  },
  methods: {
    changeChildMessage(number) {
      this.$emit("childToParent", number);
    },
  },
};
</script>
<style scoped>
.level {
  margin-top: 0.75rem;
}
.level-item {
  cursor: pointer;
}
</style>