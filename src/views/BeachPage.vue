<template>
  <div>
    <Navigation></Navigation>
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{beach.name}}</h1>
          <img :src="'http://localhost:3000/'+beach.beachImage" />

          <section class="section">
            <div class="container">
              <h2 class="subtitle">
                Sviđa mi se: {{beach.likes}}
                <span
                  class="icon is-small has-text-danger"
                  @click="upvote(beach)"
                >
                  <font-awesome-icon icon="heart" />
                </span>
              </h2>
              <div class="description">{{beach.description}}</div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Komentari</h1>
        <div class="container" v-for="(comment,index) in beachComments" :key="index">
          <Comment @childToParent="onCommentChildMount" :comment="comment" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Navigation from "../components/Navigation";
import Comment from "../components/Comment";
import axios from "axios";
import auth from "../auth/index";
export default {
  data() {
    return { authToken: "" };
  },
  components: {
    Navigation,
    Comment,
  },
  props: {
    beach: Object,
  },
  computed: {
    beachComments() {
      console.log(this.beach);
      console.log(this.beach.comments);
      return this.beach.comments;
    },
  },
  methods: {
    onCommentChildMount(value) {
      const index = this.beach.comments.findIndex((el) => el._id == value);
      if (index > -1) {
        this.beach.comments.splice(index, 1);
      }
      axios
        .patch(
          "http://localhost:3000/beaches/" + this.beach._id,
          [{ propName: "comments", value: this.beach.comments }],
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then(() => {
          console.log("Successfully deleted comment");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.authToken = auth.getAuthHeader();
  },
};
</script>
<style scoped>
.description {
  border: 1px solid white;
}
</style>