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
    <router-link  class="tile is-parent" :to="{ name: 'BeachPage', params: {beach: beach } }">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">{{beach.name}}</p>
          <figure class="image is-4by3">
            <img :src="getImage()+beach.beachImage" />
          </figure>
        </article>
      </div>
    </router-link>

    <div class="tile is-parent">
      <article class="tile is-child notification">
        <p class="subtitle"></p>
        <div class="content">
          <p>{{beach.description}}</p>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Sviđa mi se</p>
                <p class="title">{{beach.likes}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div class="comments">
                <p class="heading">Komentari</p>
                <p class="title">{{beach.comments.length}}</p>
              </div>
            </div>
          </nav>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="title" @mouseover="hover=true" @mouseleave="hover=false">
                  <font-awesome-icon
                    icon="coffee"
                    :class="{'has-text-success' : beach.options.bar}"
                  />
                  <span v-if="hover">Beach Bar</span>
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title" @mouseover="hover=true" @mouseleave="hover=false">
                  <font-awesome-icon
                    icon="umbrella-beach"
                    :class="{'has-text-success' : beach.options.shade}"
                  />
                  <span v-if="hover">Hlad</span>
                </p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p
                  class="title"
                  @mouseover="hover=true"
                  @mouseleave="hover=false"
                  :class="{'has-text-success' : beach.options.kids}"
                >
                  <font-awesome-icon icon="child" />
                  <span v-if="hover">Djeca</span>
                </p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p
                  class="title"
                  @mouseover="hover=true"
                  @mouseleave="hover=false"
                  :class="{'has-text-success' : beach.options.pets}"
                >
                  <font-awesome-icon icon="dog" />
                  <span v-if="hover">Životinje</span>
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p
                  class="title"
                  @mouseover="hover=true"
                  @mouseleave="hover=false"
                  :class="{'has-text-success' : beach.options.parking}"
                >
                  <font-awesome-icon icon="parking" />
                  <span v-if="hover">Parking</span>
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p
                  class="title"
                  @mouseover="hover=true"
                  @mouseleave="hover=false"
                  :class="{'has-text-success' : beach.options.food}"
                >
                  <font-awesome-icon icon="utensils" />
                  <span v-if="hover">Hrana</span>
                </p>
              </div>
            </div>
          </nav>
          <article v-if="canActivate()" class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="getImage()+ userImage" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    class="textarea"
                    ref="commentText"
                    @keyup.enter="submitComment(beach)"
                    placeholder="Dodajte komentar..."
                  ></textarea>
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <a class="button is-info" @click="submitComment(beach)">Submit</a>
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
import { beaches } from "../seed.js";
import { user } from "../user.js";
import auth from "../auth/index";
import axios from "axios";
import mongoose from "mongoose";
export default {
  data() {
    return {
      isModalActive: false,
      beaches,
      isCommentModalActive: false,
      user,
      hover: false,
      authToken: "",
    };
  },
  props: {
    beach: Object,
  },
  methods: {
    activateModal() {
      this.isModalActive = !this.isModalActive;
    },
    getImage() {
      return "http://localhost:3000/";
    },
    submitComment(beach) {
      let comments = beach.comments;
      if (this.$refs.commentText.value == "") {
        this.isCommentModalActive = true;
        return;
      }
      let newComment = {
        _id: new mongoose.Types.ObjectId(),
        username: auth.user.userObject.username,
        name: auth.user.userObject.name,
        userImage: auth.user.userObject.userImage,
        text: this.$refs.commentText.value,
      };

      comments.unshift(newComment);

      axios
        .patch(
          `http://localhost:3000/beaches/` + beach._id,
          [{ propName: "comments", value: comments }],
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$refs.commentText.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    exitCommentModal() {
      this.isCommentModalActive = false;
    },
    canActivate() {
      auth.checkAuth();
      return auth.user.authenticated;
    },
  },
  computed: {
    userImage: function () {
      return auth.user.userObject.userImage;
    },
    beachCommentsNumber: function () {
      let beachComments = this.beaches.filter(
        (beach) => beach.id === this.beach.id
      );
      return beachComments[0].comments.length;
    },
  },
  mounted() {
    console.log(this.beach.options.kids);
    this.authToken = auth.getAuthHeader();
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
span {
  font-size: x-small;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
router-link {
  cursor: pointer;
  text-decoration: none;
}
</style>