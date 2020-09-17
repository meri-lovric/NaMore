<template>
  <article :class="{hidden:deletedComment}" class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img class="image" :src="getImage() + comment.userImage" />
      </p>
      <p class="username">
        <strong>{{comment.name}}</strong>
        <small>@{{comment.username}}</small>
        <small>{{comment.time}}</small>
        <br />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p class="description container">{{comment.text}}</p>
      </div>
    </div>
    <div class="media-right" :class="{hidden:!isActiveUser}">
      <button @click="deleteComment()" class="delete has-background-danger"></button>
    </div>
  </article>
</template>
<script>
import auth from "../auth/index";
export default {
  data() {
    return { deletedComment: false };
  },
  props: {
    comment: Object,
  },
  computed: {
    isActiveUser: function () {
      if (this.comment.username === auth.user.userObject.username) {
        return true;
      }
      return false;
    },
  },
  methods: {
    deleteComment() {
      this.deletedComment = true;
      this.$emit("childToParent", this.comment._id);
    },
    getImage() {
      return "https://na-more.netlify.app/";
    },
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
.hidden {
  display: none;
}
</style>