<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered" @click="changeTab(1)">
      <div>
        <p class="heading">Statusi</p>
        <p class="title">{{postsNumber}}</p>
      </div>
    </div>
    <div class="level-item has-text-centered" @click="changeTab(2)">
      <div>
        <p class="heading">Prijatelji</p>
        <p class="title">{{friendsNumber}}</p>
      </div>
    </div>
    <div class="level-item has-text-centered" @click="changeTab(3)">
      <div>
        <p class="heading">Plaže</p>
        <p class="title">{{beachesNumber}}</p>
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
    return { posts, users, beaches };
  },
  props: {
    userId: Number,
  },
  computed: {
    postsNumber: function () {
      let userPosts = this.posts.filter((post) => post.id === this.userId);
      return userPosts.length;
    },
    friendsNumber: function () {
      return this.users.length;
    },
    beachesNumber: function () {
      let filteredBeaches = this.beaches.filter((beach) => beach.isClicked);
      return filteredBeaches.length;
    },
  },
};
</script>
<style scoped>
.level {
  margin-top: 0.75rem;
}
.level-item{
  cursor:pointer;
}
</style>