<template>
  <div>
    <Navigation></Navigation>
    <section class="hero is-fullheight has-background is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{beach.name}}</h1>
          <div class="container">
            <div class="box">
              <div class="imagewrap">
                <img :src="'https://na-more.netlify.app/'+beach.beachImage" />
              </div>
              <div class="box-text">
                <h2>
                  Sviđa mi se: {{beach.likes}}
                  <span
                    v-bind:class="{ liked: isLikedByUser(beach._id) }"
                    class="icon is-small"
                    @click="upvote(beach)"
                  >
                    <font-awesome-icon icon="heart" />
                  </span>
                </h2>
                <p class="description">{{beach.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p
              class="title"
              @mouseover="hover=true"
              @mouseleave="hover=false"
              :class="{'has-text-success' : beach.bar}"
            >
              <font-awesome-icon icon="coffee" />
              <span v-if="hover">Beach Bar</span>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p
              :class="{'has-text-success' : beach.shade}"
              class="title"
              @mouseover="hover=true"
              @mouseleave="hover=false"
            >
              <font-awesome-icon icon="umbrella-beach" />
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
              :class="{'has-text-success' : beach.kids}"
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
              :class="{'has-text-success' : beach.pets}"
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
              :class="{'has-text-success' : beach.parking}"
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
              :class="{'has-text-success' : beach.food}"
            >
              <font-awesome-icon icon="utensils" />
              <span v-if="hover">Hrana</span>
            </p>
          </div>
        </div>
      </nav>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Komentari</h1>
        <div class="container" v-for="(comment,index) in beachComments" :key="index">
          <Comment @childToParent="onCommentChildMount" :comment="comment" />
        </div>

        <p v-if=" beachComments.length == 0">
          <strong>Nema komentara</strong>
        </p>
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
    return { authToken: "", hover: false };
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
      return this.beach.comments;
    },
  },
  methods: {
    isLikedByUser(clickedBeachId) {
      if (auth.user.userObject.liked.length == 0) {
        return false;
      }
      if (
        auth.user.userObject.liked.find((beach) => beach._id == clickedBeachId)
      ) {
        return true;
      } else {
        return false;
      }
    },
    upvote(beach) {
      let liked = auth.user.userObject.liked;
      let found = false;
      liked.forEach((el) => {
        if (el._id == beach._id) {
          found = true;
        }
      });
      if (!found) {
        liked.unshift(beach);

        axios
          .patch(
            `https://na-more.netlify.app/users/` + auth.user.userObject._id,
            [{ propName: "liked", value: liked }],
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then((response) => {
            auth.user.userObject.liked = liked;
            axios
              .patch(
                "https://na-more.netlify.app/beaches/" + beach._id,
                [{ propName: "likes", value: beach.likes + 1 }],
                {
                  headers: {
                    Authorization: this.authToken,
                  },
                }
              )
              .then(() => {
                beach.likes++;

                this.forceRerender();
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(response);
          });
      } else {
        const index = liked.findIndex((el) => el._id == beach._id);
        if (index > -1) {
          liked.splice(index, 1);
        }
        axios
          .patch(
            `https://na-more.netlify.app/users/` + auth.user.userObject._id,
            [{ propName: "liked", value: liked }],
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then((response) => {
            auth.user.userObject.liked = liked;
            axios
              .patch(
                "https://na-more.netlify.app/beaches/" + beach._id,
                [{ propName: "likes", value: beach.likes - 1 }],
                {
                  headers: {
                    Authorization: this.authToken,
                  },
                }
              )
              .then(() => {
                beach.likes--;
                this.forceRerender();
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(response);
          });
      }
    },
    onCommentChildMount(value) {
      const index = this.beach.comments.findIndex((el) => el._id == value);
      if (index > -1) {
        this.beach.comments.splice(index, 1);
      }
      axios
        .patch(
          "https://na-more.netlify.app/beaches/" + this.beach._id,
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
  border-top: 1px solid white;
}
p.title {
  font-size: small;
  color: white;
}
.title {
  color: white;
}
.container img {
  height: 100%;
  max-width: 100%;
  border-radius: 1%;
  box-shadow: 1px 1;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.icon:hover {
  color: red;
  transform: scale(1.2);
}
.icon.liked {
  color: red;
}
.hero {
  background-color: #250561;
}
.box {
  background-color: #250561;
  color: white;
}
.level {
  margin-bottom: 1rem;
}
@media only screen and (max-width: 800px) {
  p.title {
    font-size: x-small;
  }
}

.box {
  width: 50vw;
  display: inline-block;
  background: white;
  border-radius: 10px;
  margin: 0px 20px;
  transition: 0.3s cubic-bezier(0.15, 0.8, 0.3, 1.8);
  overflow: hidden;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.06),
    0 7px 14px 0 rgba(36, 51, 82, 0.11);
}

.box:hover {
  transform: translateY(-2px);
}

.imagewrap {
  height: 65vh;
  width: 100%;
  background-size: cover;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%);
}

.box-text {
  padding: 20px;
  padding-top: 5px;
  text-align: left;
}

h2 {
  margin: 0;
  margin-bottom: 14px;
  color: #363c50;
}

p {
  margin: 0;
  color: #6a7082;
}
</style>