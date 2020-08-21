<template>
    <nav class="level is-mobile">
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Statusi</p>
      <p class="title">{{postsNumber}}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Prijatelji</p>
      <p class="title">{{friendsNumber}}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Plaže</p>
      <p class="title">{{beachesNumber}}</p>
    </div>
  </div>
</nav>
</template>
<script>
import {posts} from "../posts.js"
import {users} from "../users.js"
import { beaches } from '../seed.js'
export default {
    data(){
      return{posts, users, beaches}
    },
    props:{   
      userId: Number
     },
     computed: {
       postsNumber: function() {
         let userPosts = this.posts.filter((post) => post.id === this.userId);
         return userPosts.length;
       },
       friendsNumber: function() {
         return this.users.length;
       },
       beachesNumber: function() {
         return this.beaches.length;
       }
     }
}
</script>
<style scoped>
.level{
  margin-top:.75rem;
}
</style>