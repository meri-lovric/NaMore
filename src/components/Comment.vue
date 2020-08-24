<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-rounded is-128x128">
        <img :src="comment.photo" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.username}}</strong>
          <small>@{{comment.username}}</small>
          <br />
          {{comment.commentBody}}
        </p>
      </div>
    </div>
    <div class="media-right">
      <button
        @click="deleteComment()"
        class="delete has-background-danger"
        :class="{'hidden' : !isActiveUser}"
      ></button>
      <small>31m</small>
    </div>
  </article>
</template>
<script>
import { beaches } from "../seed.js";
import { user } from "../user.js";
export default {
  data() {
    return { beaches, user };
  },
  props: {
    comment: Object,
  },
  computed: {
    isActiveUser: function () {
      if (this.comment.username === user.username) {
        return true;
      }
      return false;
    },
  },
  methods: {
    deleteComment() {
      let currentCard = this.beaches.find((card) =>
        card.comments.includes(this.comment)
      );
      currentCard.comments.pop(this.comment);
    },
  },
};
</script>
<style scoped>
.media img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.content {
  position: relative;
  top: 1.75rem;
}
.media-right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 7rem;
}
.hidden {
  display: none;
}
</style>