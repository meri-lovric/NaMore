<template>
  <div class="beach-card-instance">
    <div class="modal" :class="{'is-active': isCommentModalActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification is-danger">
          <button class="delete" @click="exitCommentModal()"></button>
          Greška! Ne možete poslati prazan komentar.
        </div>
      </div>
    </div>
    <BeachCommentsModal :beachId="beach.id" :isModalActive="isModalActive" />
    <div class="tile is-parent">
      <article class="tile is-child notification is-info">
        <p class="title">{{beach.name}}</p>
        <figure class="image is-4by3">
          <img :src="beach.url" />
        </figure>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification">
        <p class="subtitle"></p>
        <div class="content">
          <p>{{beach.description}}</p>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Sviđa mi se</p>
                <p class="title">{{beach.votes}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered" @click="activateModal()">
              <div class="comments">
                <p class="heading">Komentari</p>
                <p class="title">{{beachCommentsNumber}}</p>
              </div>
            </div>
          </nav>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon
                    icon="coffee"
                    :class="{'has-text-success' : beach.options.bar}"
                  />
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon
                    icon="umbrella-beach"
                    :class="{'has-text-success' : beach.options.shade}"
                  />
                </p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon
                    icon="child"
                    :class="{'has-text-success' : beach.options.kids}"
                  />
                </p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon icon="dog" :class="{'has-text-success' : beach.options.pets}" />
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon
                    icon="parking"
                    :class="{'has-text-success' : beach.options.parking}"
                  />
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title">
                  <font-awesome-icon
                    icon="utensils"
                    :class="{'has-text-success' : beach.options.food}"
                  />
                </p>
              </div>
            </div>
          </nav>
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="this.user.photo" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    class="textarea"
                    ref="commentText"
                    @keyup.enter="submitComment()"
                    placeholder="Dodajte komentar..."
                  ></textarea>
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <a class="button is-info" @click="submitComment()">Submit</a>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import BeachCommentsModal from "../components/BeachCommentsModal";
import { beaches } from "../seed.js";
import {user} from "../user.js";
export default {
  data() {
    return {
      isModalActive: false,
      beaches,
      isCommentModalActive: false,
      user
    };
  },
  props: {
    beach: Object,
  },
  components: {
    BeachCommentsModal,
  },
  methods: {
    activateModal() {
      this.isModalActive = !this.isModalActive;
    },
    submitComment() {
      let newComment = {
        username: this.user.username,
        commentBody: this.$refs.commentText.value,
        photo:
          this.user.photo,
      };
      if (this.$refs.commentText.value) {
        this.beaches
          .find((beach) => beach.id === this.beach.id)
          .comments.push(newComment);
        this.$refs.commentText.value = "";
      } else {
        this.isCommentModalActive = true;
      }
    },
    exitCommentModal() {
      this.isCommentModalActive = false;
    },
  },
  computed: {
    beachCommentsNumber: function () {
      let beachComments = this.beaches.filter(
        (beach) => beach.id === this.beach.id
      );
      return beachComments[0].comments.length;
    },
  },
};
</script>
<style scoped>
.beach-card-instance {
  display: flex;
  height: auto;
  padding: 2%;
  align-items: center;
}
.content p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.comments {
  cursor: pointer;
}
</style>