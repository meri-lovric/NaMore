<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img class="image" :src="getImage() + post.user.userImage" />
      </p>
      <p class="username">
        <strong>{{post.user.name}}</strong>
        <small>@{{post.user.username}}</small>
        <small>{{post.time}}</small>
        <br />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p class="description container">{{post.text}}</p>
      </div>
    </div>
    <div class="media-right" :class="{hidden:!isLoggedUser}">
      <button @click="deleteStatus()" class="delete has-background-danger"></button>
    </div>
  </article>
</template>

<script>
import { posts } from "../posts.js";
import auth from "../auth/index";
import axios from "axios";
export default {
  data() {
    return { posts, isLoggedUser: false, authToken:"" };
  },
  props: {
    post: Object,
  },
  methods: {
    deleteStatus() {
      axios
        .delete("http://localhost:3000/posts/" + this.post._id, {
          headers: {
            Authorization: this.authToken,
          },
        })
        .then(console.log("Successfully deleted post"))
        .catch((error) => {
          console.log(error);
        });
    },
    getImage() {
      return "http://localhost:3000/";
    },
  },
  mounted() {
    this.authToken = auth.getAuthHeader();

    if (this.post.user._id == auth.user.userObject._id) {
      this.isLoggedUser = true;
    } else {
      this.isLoggedUser = false;
    }
  },
};
</script>
<style scoped>
.media {
  margin-bottom: 2.5rem;
  padding: 0.75rem;
  border: #eaeef3 1px solid;
}
.media-left {
  display: flex;
}
.media-left p {
  margin: 2%;
}
.media-content {
  display: flex;
  justify-content: center;
  margin-top: 2%;
}
.content {
  height: fit-content;
}
.username {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  border-right: 1px grey solid;
}
.description {
  word-break: break-all;
}
.hidden {
  display: none;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.delete:hover {
  transform: scale(1.2);
}
</style>